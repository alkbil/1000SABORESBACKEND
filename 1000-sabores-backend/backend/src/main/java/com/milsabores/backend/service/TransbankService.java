// TransbankService.java - Servicio para integrar Transbank WebPay Plus API REST
package com.milsabores.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import com.milsabores.backend.dto.PaymentResponse;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class TransbankService {

    @Value("${transbank.commerce.code}")
    private String commerceCode;

    @Value("${transbank.api.key}")
    private String apiKey;

    @Value("${transbank.environment:integration}")
    private String environment;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    // URLs de Transbank según el ambiente
    private static final String INTEGRATION_URL = "https://webpay3gint.transbank.cl";
    private static final String PRODUCTION_URL = "https://webpay3g.transbank.cl";

    /**
     * Obtener la URL base según el ambiente configurado
     */
    private String getBaseUrl() {
        return "production".equalsIgnoreCase(environment) ? PRODUCTION_URL : INTEGRATION_URL;
    }

    /**
     * Crear los headers HTTP para las request a Transbank
     */
    private HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }

    /**
     * Iniciar una transacción de pago con Transbank
     * @param amount - Monto a pagar (ej: 10000 = $10.000 CLP)
     * @param sessionId - ID único de la sesión
     * @param buyOrder - Número de orden (debe ser único)
     * @param returnUrl - URL de retorno después del pago
     * @return PaymentResponse con token y URL de Transbank
     */
    public PaymentResponse initiatePayment(Long amount, String sessionId, String buyOrder, String returnUrl) {
        try {
            log.info("Iniciando transacción Transbank - Monto: {}, SessionId: {}, BuyOrder: {}", 
                amount, sessionId, buyOrder);

            // Headers para API REST de Transbank
            HttpHeaders headers = createHeaders();
            headers.set("Tbk-Api-Key-Id", commerceCode);
            headers.set("Tbk-Api-Key-Secret", apiKey);

            // Construir el body en JSON según documentación oficial
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("buy_order", buyOrder);
            requestBody.put("session_id", sessionId);
            requestBody.put("amount", amount);
            requestBody.put("return_url", returnUrl);

            String jsonBody = objectMapper.writeValueAsString(requestBody);
            HttpEntity<String> request = new HttpEntity<>(jsonBody, headers);

            // Endpoint correcto según documentación oficial de Transbank
            String initUrl = getBaseUrl() + "/rswebpaytransaction/api/webpay/v1.2/transactions";
            log.debug("Llamando a Transbank: {}", initUrl);

            try {
                ResponseEntity<String> response = restTemplate.postForEntity(initUrl, request, String.class);
                
                if (response.getStatusCode().is2xxSuccessful()) {
                    // Parsear respuesta JSON (Transbank API REST retorna JSON)
                    String responseBody = response.getBody();
                    log.debug("Respuesta de Transbank: {}", responseBody);

                    // Parsear JSON con Jackson
                    JsonNode responseNode = objectMapper.readTree(responseBody);
                    String token = responseNode.get("token").asText();
                    String transbankUrl = responseNode.get("url").asText();

                    PaymentResponse paymentResponse = new PaymentResponse();
                    paymentResponse.setToken(token);
                    paymentResponse.setUrl(transbankUrl);
                    paymentResponse.setSessionId(sessionId);
                    paymentResponse.setBuyOrder(buyOrder);
                    paymentResponse.setAmount(amount);
                    paymentResponse.setStatus("INITIALIZED");

                    log.info("Transacción iniciada correctamente - Token: {}, URL: {}", token, transbankUrl);
                    return paymentResponse;
                } else {
                    throw new RuntimeException("Error de Transbank: " + response.getStatusCode() + " - " + response.getBody());
                }
            } catch (org.springframework.web.client.HttpClientErrorException e) {
                // Error de cliente (4xx) - problemas con credenciales o datos
                log.error("Error HTTP {} al llamar a Transbank: {}", e.getStatusCode(), e.getResponseBodyAsString());
                throw new RuntimeException("Error al iniciar el pago con Transbank: " + e.getResponseBodyAsString());
            } catch (org.springframework.web.client.RestClientException e) {
                // Error de conexión o servidor (5xx)
                log.error("Error de conexión con Transbank: {}", e.getMessage());
                throw new RuntimeException("No se pudo conectar a Transbank: " + e.getMessage());
            }

        } catch (Exception e) {
            log.error("Error al iniciar transacción: ", e);
            throw new RuntimeException("Error al iniciar el pago con Transbank: " + e.getMessage());
        }
    }

    /**
     * Confirmar una transacción completada
     * @param token - Token devuelto por Transbank
     * @return Detalles de la transacción confirmada
     */
    public PaymentResponse confirmPayment(String token) {
        try {
            log.info("Confirmando transacción - Token: {}", token);

            // Headers para API REST de Transbank
            HttpHeaders headers = createHeaders();
            headers.set("Tbk-Api-Key-Id", commerceCode);
            headers.set("Tbk-Api-Key-Secret", apiKey);

            // Transbank no requiere body para confirmar (PUT sin payload)
            HttpEntity<String> request = new HttpEntity<>("", headers);

            // Endpoint: PUT /rswebpaytransaction/api/webpay/v1.2/transactions/{token}
            String confirmUrl = getBaseUrl() + "/rswebpaytransaction/api/webpay/v1.2/transactions/" + token;
            log.debug("Confirmando en Transbank: {}", confirmUrl);

            try {
                ResponseEntity<String> response = restTemplate.exchange(confirmUrl, 
                    org.springframework.http.HttpMethod.PUT, request, String.class);

                if (response.getStatusCode().is2xxSuccessful()) {
                    // Parsear respuesta JSON de Transbank
                    String responseBody = response.getBody();
                    log.debug("Respuesta confirmación Transbank: {}", responseBody);

                    JsonNode responseNode = objectMapper.readTree(responseBody);
                    
                    PaymentResponse paymentResponse = new PaymentResponse();
                    paymentResponse.setToken(token);
                    paymentResponse.setStatus(responseNode.get("status").asText());
                    paymentResponse.setApproved("AUTHORIZED".equals(responseNode.get("status").asText()));
                    paymentResponse.setAmount(responseNode.get("amount").asLong());
                    paymentResponse.setBuyOrder(responseNode.get("buy_order").asText());
                    paymentResponse.setSessionId(responseNode.get("session_id").asText());
                    
                    if (responseNode.has("authorization_code")) {
                        paymentResponse.setAuthCode(responseNode.get("authorization_code").asText());
                    }
                    if (responseNode.has("payment_type_code")) {
                        paymentResponse.setPaymentTypeCode(responseNode.get("payment_type_code").asText());
                    }
                    if (responseNode.has("vci")) {
                        paymentResponse.setVci(responseNode.get("vci").asText());
                    }
                    if (responseNode.has("response_code")) {
                        paymentResponse.setResponseCode(responseNode.get("response_code").asText());
                    }

                    log.info("Transacción confirmada - Status: {}, Aprobada: {}", 
                        paymentResponse.getStatus(), paymentResponse.getApproved());
                    return paymentResponse;
                } else {
                    throw new RuntimeException("Error confirmando pago: " + response.getStatusCode());
                }
            } catch (org.springframework.web.client.HttpClientErrorException e) {
                log.error("Error HTTP {} confirmando pago: {}", e.getStatusCode(), e.getResponseBodyAsString());
                throw new RuntimeException("Error al confirmar el pago: " + e.getResponseBodyAsString());
            }

        } catch (Exception e) {
            log.error("Error al confirmar transacción: ", e);
            throw new RuntimeException("Error al confirmar el pago: " + e.getMessage());
        }
    }

    /**
     * Obtener estado de una transacción
     * @param token - Token de la transacción
     * @return Estado actual de la transacción
     */
    public PaymentResponse getTransactionStatus(String token) {
        try {
            log.info("Obteniendo estado de transacción - Token: {}", token);

            // Headers para API REST de Transbank
            HttpHeaders headers = createHeaders();
            headers.set("Tbk-Api-Key-Id", commerceCode);
            headers.set("Tbk-Api-Key-Secret", apiKey);

            HttpEntity<String> request = new HttpEntity<>("", headers);

            // Endpoint: GET /rswebpaytransaction/api/webpay/v1.2/transactions/{token}
            String statusUrl = getBaseUrl() + "/rswebpaytransaction/api/webpay/v1.2/transactions/" + token;
            log.debug("Consultando estado en: {}", statusUrl);

            try {
                ResponseEntity<String> response = restTemplate.exchange(statusUrl, 
                    org.springframework.http.HttpMethod.GET, request, String.class);

                if (response.getStatusCode().is2xxSuccessful()) {
                    String responseBody = response.getBody();
                    log.debug("Estado de transacción: {}", responseBody);

                    JsonNode responseNode = objectMapper.readTree(responseBody);
                    
                    PaymentResponse paymentResponse = new PaymentResponse();
                    paymentResponse.setToken(token);
                    paymentResponse.setStatus(responseNode.get("status").asText());
                    paymentResponse.setApproved("AUTHORIZED".equals(responseNode.get("status").asText()));
                    paymentResponse.setAmount(responseNode.get("amount").asLong());
                    paymentResponse.setBuyOrder(responseNode.get("buy_order").asText());

                    return paymentResponse;
                } else {
                    throw new RuntimeException("Error obteniendo estado: " + response.getStatusCode());
                }
            } catch (org.springframework.web.client.HttpClientErrorException e) {
                log.error("Error HTTP {} obteniendo estado: {}", e.getStatusCode(), e.getResponseBodyAsString());
                throw new RuntimeException("Error al obtener estado de la transacción: " + e.getResponseBodyAsString());
            }

        } catch (Exception e) {
            log.error("Error al obtener estado: ", e);
            throw new RuntimeException("Error al obtener estado de la transacción: " + e.getMessage());
        }
    }

    /**
     * Revertir una transacción
     * @param token - Token de la transacción
     * @param amount - Monto a revertir (opcional, null = reversa total)
     * @return Resultado de la reversión
     */
    public PaymentResponse refundPayment(String token, Long amount) {
        try {
            log.info("Revertiendo transacción - Token: {}, Monto: {}", token, amount);

            // Headers para API REST de Transbank
            HttpHeaders headers = createHeaders();
            headers.set("Tbk-Api-Key-Id", commerceCode);
            headers.set("Tbk-Api-Key-Secret", apiKey);

            // Body con el monto a revertir
            Map<String, Object> refundBody = new HashMap<>();
            if (amount != null) {
                refundBody.put("amount", amount);
            }

            String jsonBody = objectMapper.writeValueAsString(refundBody);
            HttpEntity<String> request = new HttpEntity<>(jsonBody, headers);

            // Endpoint: POST /rswebpaytransaction/api/webpay/v1.2/transactions/{token}/refunds
            String refundUrl = getBaseUrl() + "/rswebpaytransaction/api/webpay/v1.2/transactions/" + token + "/refunds";
            log.debug("Revertiendo en: {}", refundUrl);

            try {
                ResponseEntity<String> response = restTemplate.postForEntity(refundUrl, request, String.class);

                if (response.getStatusCode().is2xxSuccessful()) {
                    String responseBody = response.getBody();
                    log.debug("Respuesta reversión: {}", responseBody);

                    JsonNode responseNode = objectMapper.readTree(responseBody);
                    
                    PaymentResponse paymentResponse = new PaymentResponse();
                    paymentResponse.setToken(token);
                    paymentResponse.setStatus(responseNode.get("type").asText());
                    
                    if (responseNode.has("authorization_code")) {
                        paymentResponse.setAuthCode(responseNode.get("authorization_code").asText());
                    }
                    if (responseNode.has("nullified_amount")) {
                        paymentResponse.setAmount(responseNode.get("nullified_amount").asLong());
                    }
                    if (responseNode.has("response_code")) {
                        paymentResponse.setResponseCode(responseNode.get("response_code").asText());
                    }

                    log.info("Transacción revertida exitosamente - Tipo: {}", paymentResponse.getStatus());
                    return paymentResponse;
                } else {
                    throw new RuntimeException("Error revertiendo pago: " + response.getStatusCode());
                }
            } catch (org.springframework.web.client.HttpClientErrorException e) {
                log.error("Error HTTP {} revertiendo pago: {}", e.getStatusCode(), e.getResponseBodyAsString());
                throw new RuntimeException("Error al revertir el pago: " + e.getResponseBodyAsString());
            }

        } catch (Exception e) {
            log.error("Error al revertir transacción: ", e);
            throw new RuntimeException("Error al revertir el pago: " + e.getMessage());
        }
    }

    /**
     * Obtener código de comercio
     */
    public String getCommerceCode() {
        return this.commerceCode;
    }

    /**
     * Validar que Transbank esté configurado correctamente
     */
    public boolean isConfigured() {
        return commerceCode != null && !commerceCode.isEmpty() &&
               apiKey != null && !apiKey.isEmpty();
    }

    /**
     * Obtener ambiente actual
     */
    public String getEnvironment() {
        return this.environment;
    }
}
