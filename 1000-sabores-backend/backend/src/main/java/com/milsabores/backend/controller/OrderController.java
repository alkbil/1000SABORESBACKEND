package com.milsabores.backend.controller;

import com.milsabores.backend.dto.MessageResponse;
import com.milsabores.backend.entity.Order;
import com.milsabores.backend.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
@SecurityRequirement(name = "bearer-jwt")
@Tag(name = "Pedidos", description = "Gestión de pedidos de clientes")
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/my-orders")
    @Operation(summary = "Mis pedidos", description = "Obtiene los pedidos del usuario autenticado")
    public ResponseEntity<List<Order>> getMyOrders() {
        return ResponseEntity.ok(orderService.getMyOrders());
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Listar todos los pedidos", description = "Obtiene todos los pedidos (solo administradores)")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener pedido por ID", description = "Obtiene los detalles de un pedido específico")
    public ResponseEntity<?> getOrderById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(orderService.getOrderById(id));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage()));
        }
    }

    @PostMapping
    @Operation(summary = "Crear nuevo pedido", description = "Crea un nuevo pedido para el usuario autenticado")
    public ResponseEntity<?> createOrder(@Valid @RequestBody Order order) {
        try {
            return ResponseEntity.ok(orderService.createOrder(order));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage()));
        }
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Actualizar estado del pedido", description = "Cambia el estado de un pedido (solo administradores)")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long id, @RequestParam Order.OrderStatus status) {
        try {
            return ResponseEntity.ok(orderService.updateOrderStatus(id, status));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Eliminar pedido", description = "Elimina un pedido (solo administradores)")
    public ResponseEntity<?> deleteOrder(@PathVariable Long id) {
        try {
            orderService.deleteOrder(id);
            return ResponseEntity.ok(new MessageResponse("Pedido eliminado exitosamente"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage()));
        }
    }
}
