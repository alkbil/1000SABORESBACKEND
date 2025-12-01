package com.milsabores.backend;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordHashGenerator {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        
        String password1 = "admin123";
        String password2 = "user123";
        
        String hash1 = encoder.encode(password1);
        String hash2 = encoder.encode(password2);
        
        System.out.println("admin123 hash: " + hash1);
        System.out.println("user123 hash: " + hash2);
        
        // Verificar que los hashes funcionan
        System.out.println("\nVerificación:");
        System.out.println("admin123 válido: " + encoder.matches(password1, hash1));
        System.out.println("user123 válido: " + encoder.matches(password2, hash2));
    }
}
