// PaymentController.java - Controlador para pagos con Transbank
package com.milsabores.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.milsabores.backend.service.TransbankService;
import com.milsabores.backend.service.OrderService;
import com.milsabores.backend.dto.PaymentRequest;
import com.milsabores.backend.dto.PaymentConfirmRequest;
import com.milsabores.backend.dto.PaymentResponse;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
@Slf4j
public class PaymentController {
    
    private final TransbankService transbankService;
    private final OrderService orderService;

    /**
     * Iniciar una transacción de pago con Transbank
     * POST /api/payments/transbank/initiate
     */
    @PostMapping("/transbank/initiate")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> initiatePayment(
            @RequestBody PaymentRequest request,
            Authentication authentication) {
        try {
            log.info("Iniciando pago - Monto: {}, Usuario: {}", 
                    request.getAmount(), authentication.getName());

            if (!transbankService.isConfigured()) {
                PaymentResponse error = new PaymentResponse();
                error.setStatus("ERROR");
                error.setApproved(false);
                error.setMessage("Transbank no está configurado correctamente");
                return ResponseEntity.badRequest().body(error);
            }

            Long amount = (long) (request.getAmount() * 100); // Convertir a centavos
            String buyOrder = "ORD" + System.currentTimeMillis();

            PaymentResponse response = transbankService.initiatePayment(
                    amount,
                    request.getSessionId(),
                    buyOrder,
                    request.getReturnUrl()
            );

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error al iniciar transacción: ", e);
            PaymentResponse error = new PaymentResponse();
            error.setStatus("ERROR");
            error.setApproved(false);
            error.setMessage("Error al iniciar el pago: " + e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    /**
     * Confirmar una transacción de pago
     * POST /api/payments/transbank/confirm
     */
    @PostMapping("/transbank/confirm")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> confirmPayment(
            @RequestBody PaymentConfirmRequest request,
            Authentication authentication) {
        try {
            log.info("Confirmando pago - Token: {}, Usuario: {}", 
                    request.getToken(), authentication.getName());

            PaymentResponse response = transbankService.confirmPayment(request.getToken());

            if (response.getApproved() != null && response.getApproved()) {
                // TODO: Crear la orden en la BD después de confirmar el pago
                // Order order = orderService.createOrderFromPayment(response, authentication);
                // response.setOrderId(order.getId());
                
                return ResponseEntity.ok(response);
            } else {
                PaymentResponse error = new PaymentResponse();
                error.setToken(request.getToken());
                error.setStatus("REJECTED");
                error.setApproved(false);
                error.setMessage("El pago fue rechazado");
                return ResponseEntity.status(400).body(error);
            }

        } catch (Exception e) {
            log.error("Error al confirmar transacción: ", e);
            PaymentResponse error = new PaymentResponse();
            error.setStatus("ERROR");
            error.setApproved(false);
            error.setMessage("Error al confirmar el pago: " + e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    /**
     * Obtener estado de una transacción
     * GET /api/payments/transbank/status/{token}
     */
    @GetMapping("/transbank/status/{token}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getPaymentStatus(@PathVariable String token) {
        try {
            log.info("Obteniendo estado - Token: {}", token);

            PaymentResponse response = transbankService.getTransactionStatus(token);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error al obtener estado: ", e);
            PaymentResponse error = new PaymentResponse();
            error.setStatus("ERROR");
            error.setApproved(false);
            error.setMessage("Error al obtener estado: " + e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    /**
     * Revertir una transacción
     * POST /api/payments/transbank/refund
     */
    @PostMapping("/transbank/refund")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> refundPayment(
            @RequestBody PaymentConfirmRequest request,
            @RequestParam(required = false) Long amount) {
        try {
            log.info("Revertiendo pago - Token: {}, Monto: {}", request.getToken(), amount);

            PaymentResponse response = transbankService.refundPayment(
                    request.getToken(),
                    amount
            );

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error al revertir transacción: ", e);
            PaymentResponse error = new PaymentResponse();
            error.setStatus("ERROR");
            error.setApproved(false);
            error.setMessage("Error al revertir el pago: " + e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    /**
     * Obtener información de configuración de Transbank
     * GET /api/payments/transbank/info
     */
    @GetMapping("/transbank/info")
    public ResponseEntity<?> getTransbankInfo() {
        try {
            boolean configured = transbankService.isConfigured();
            
            PaymentResponse response = new PaymentResponse();
            response.setStatus(configured ? "CONFIGURED" : "NOT_CONFIGURED");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error al obtener información: ", e);
            PaymentResponse error = new PaymentResponse();
            error.setStatus("ERROR");
            error.setApproved(false);
            error.setMessage("Error al obtener información: " + e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }
}
