package com.milsabores.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/test")
public class TestController {

    @GetMapping("/hello")
    public Map<String, String> hello() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "¡Servidor funcionando correctamente!");
        response.put("status", "OK");
        response.put("timestamp", java.time.LocalDateTime.now().toString());
        return response;
    }
}
