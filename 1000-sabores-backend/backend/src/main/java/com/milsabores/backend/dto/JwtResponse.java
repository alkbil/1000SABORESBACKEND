package com.milsabores.backend.dto;

import com.milsabores.backend.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JwtResponse {
    
    private String token;
    
    @Builder.Default
    private String type = "Bearer";
    
    private Long id;
    private String email;
    private Role role;
    
    public JwtResponse(String token, Long id, String email, Role role) {
        this.token = token;
        this.id = id;
        this.email = email;
        this.role = role;
    }
}
