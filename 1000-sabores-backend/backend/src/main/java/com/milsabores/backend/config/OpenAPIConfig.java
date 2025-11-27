package com.milsabores.backend.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "1000 Sabores API",
                version = "1.0",
                description = "API REST para el sistema de gestión de pastelería 1000 Sabores",
                contact = @Contact(
                        name = "1000 Sabores",
                        email = "contacto@1000sabores.com"
                )
        ),
        servers = {
                @Server(url = "http://localhost:8080/api", description = "Servidor local"),
                @Server(url = "http://98.84.132.246:8080/api", description = "Servidor de producción")
        }
)
@SecurityScheme(
        name = "bearer-jwt",
        type = SecuritySchemeType.HTTP,
        scheme = "bearer",
        bearerFormat = "JWT",
        in = SecuritySchemeIn.HEADER
)
public class OpenAPIConfig {
}
