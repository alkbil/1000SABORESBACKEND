package com.milsabores.backend.service;

import com.milsabores.backend.dto.JwtResponse;
import com.milsabores.backend.dto.LoginRequest;
import com.milsabores.backend.dto.RegisterRequest;
import com.milsabores.backend.entity.Role;
import com.milsabores.backend.entity.User;
import com.milsabores.backend.repository.UserRepository;
import com.milsabores.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Transactional
    public JwtResponse register(RegisterRequest request) {
        // Validar que las contraseñas coincidan
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("Las contraseñas no coinciden");
        }

        // Verificar si el email ya existe
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }

        // Crear nuevo usuario
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ROLE_USER)
                .isActive(true)
                .build();

        user = userRepository.save(user);

        // Generar token
        String token = jwtUtil.generateTokenFromEmail(user.getEmail());

        return new JwtResponse(token, user.getId(), user.getEmail(), user.getRole());
    }

    public JwtResponse login(LoginRequest request) {
        // Autenticar usuario
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Generar token
        String token = jwtUtil.generateToken(authentication);

        User user = (User) authentication.getPrincipal();

        return new JwtResponse(token, user.getId(), user.getEmail(), user.getRole());
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        System.out.println("DEBUG - Buscando usuario con email: '" + email + "'");
        System.out.println("DEBUG - Authentication principal: " + authentication.getPrincipal());
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con email: " + email));
    }
}
