// PaymentResponse.java - DTO para respuestas de pago
package com.milsabores.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonInclude;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PaymentResponse {
    
    private String token;
    private String url;
    private String sessionId;
    private String buyOrder;
    private Long amount;
    private String status;
    private Boolean approved;
    private String transactionId;
    private String message;
    private Long orderId;
    
    // Para configuración de ambiente
    private String environment;
    
    // Campos del SDK Transbank
    private String vci;  // Verificación de identidad (3D Secure)
    private String authCode;  // Código de autorización
    private String paymentTypeCode;  // Código de tipo de pago
    private String responseCode;  // Código de respuesta
    private String type;  // Tipo de transacción (para refundos)
}

