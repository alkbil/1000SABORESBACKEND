// PaymentRequest.java - DTO para solicitudes de pago
package com.milsabores.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequest {
    
    private Double amount;
    private String sessionId;
    private String returnUrl;
    private String buyOrder;
    private String description;
}
