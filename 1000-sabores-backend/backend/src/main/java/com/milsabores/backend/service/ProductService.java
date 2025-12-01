package com.milsabores.backend.service;

import com.milsabores.backend.entity.Product;
import com.milsabores.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> getActiveProducts() {
        return productRepository.findByIsActiveTrue();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));
    }

    public List<Product> getProductsByCategory(String categoria) {
        return productRepository.findByCategoriaAndIsActiveTrue(categoria);
    }

    public List<Product> searchProducts(String search) {
        return productRepository.searchProducts(search);
    }

    @Transactional
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @Transactional
    public Product updateProduct(Long id, Product productDetails) {
        Product product = getProductById(id);

        product.setNombre(productDetails.getNombre());
        product.setDescripcion(productDetails.getDescripcion());
        product.setPrecio(productDetails.getPrecio());
        product.setCategoria(productDetails.getCategoria());
        product.setImagenUrl(productDetails.getImagenUrl());
        product.setStock(productDetails.getStock());
        
        // Solo actualizar isActive si viene explícitamente en el request
        if (productDetails.getIsActive() != null) {
            product.setIsActive(productDetails.getIsActive());
        }

        return productRepository.save(product);
    }

    @Transactional
    public void deleteProduct(Long id) {
        Product product = getProductById(id);
        product.setIsActive(false);
        productRepository.save(product);
    }
}
