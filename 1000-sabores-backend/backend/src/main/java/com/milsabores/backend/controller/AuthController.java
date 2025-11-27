package com.milsabores.backend.controller;

import com.milsabores.backend.dto.JwtResponse;
import com.milsabores.backend.dto.LoginRequest;
import com.milsabores.backend.dto.MessageResponse;
import com.milsabores.backend.dto.RegisterRequest;
import com.milsabores.backend.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
@Tag(name = "Autenticación", description = "Endpoints para registro y login de usuarios")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    @Operation(summary = "Registrar nuevo usuario", description = "Crea una nueva cuenta de usuario")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        try {
            JwtResponse response = authService.register(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage()));
        }
    }

    @PostMapping("/login")
    @Operation(summary = "Iniciar sesión", description = "Autentica un usuario y devuelve un token JWT")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            JwtResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Email o contraseña incorrectos"));
        }
    }

    @GetMapping("/me")
    @Operation(summary = "Obtener usuario actual", description = "Retorna la información del usuario autenticado")
    @SecurityRequirement(name = "bearer-jwt")
    public ResponseEntity<?> getCurrentUser() {
        try {
            return ResponseEntity.ok(authService.getCurrentUser());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage()));
        }
    }
}
