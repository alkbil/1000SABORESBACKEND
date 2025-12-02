// PaymentConfirmRequest.java - DTO para confirmar pago
package com.milsabores.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentConfirmRequest {
    
    private String token;
    private String sessionId;
}
