package com.milsabores.backend.controller;

import com.milsabores.backend.dto.MessageResponse;
import com.milsabores.backend.entity.Product;
import com.milsabores.backend.service.ProductService;
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
@RequestMapping("/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
@Tag(name = "Productos", description = "Gestión de productos de la pastelería")
public class ProductController {

    private final ProductService productService;

    @GetMapping
    @Operation(summary = "Listar todos los productos activos", description = "Obtiene la lista completa de productos disponibles")
    public ResponseEntity<List<Product>> getAllActiveProducts() {
        return ResponseEntity.ok(productService.getActiveProducts());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener producto por ID", description = "Obtiene los detalles de un producto específico")
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(productService.getProductById(id));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage()));
        }
    }

    @GetMapping("/category/{categoria}")
    @Operation(summary = "Listar productos por categoría", description = "Obtiene productos filtrados por categoría")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable String categoria) {
        return ResponseEntity.ok(productService.getProductsByCategory(categoria));
    }

    @GetMapping("/search")
    @Operation(summary = "Buscar productos", description = "Busca productos por nombre o descripción")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String query) {
        return ResponseEntity.ok(productService.searchProducts(query));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearer-jwt")
    @Operation(summary = "Crear nuevo producto", description = "Crea un nuevo producto (solo administradores)")
    public ResponseEntity<?> createProduct(@Valid @RequestBody Product product) {
        try {
            return ResponseEntity.ok(productService.createProduct(product));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearer-jwt")
    @Operation(summary = "Actualizar producto", description = "Actualiza un producto existente (solo administradores)")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @Valid @RequestBody Product product) {
        try {
            return ResponseEntity.ok(productService.updateProduct(id, product));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearer-jwt")
    @Operation(summary = "Eliminar producto", description = "Desactiva un producto (solo administradores)")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        try {
            productService.deleteProduct(id);
            return ResponseEntity.ok(new MessageResponse("Producto eliminado exitosamente"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage()));
        }
    }
}
