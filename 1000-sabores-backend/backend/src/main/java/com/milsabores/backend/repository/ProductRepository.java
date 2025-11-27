package com.milsabores.backend.repository;

import com.milsabores.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    List<Product> findByIsActiveTrue();
    
    List<Product> findByCategoria(String categoria);
    
    List<Product> findByCategoriaAndIsActiveTrue(String categoria);
    
    @Query("SELECT p FROM Product p WHERE p.isActive = true AND " +
           "(LOWER(p.nombre) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(p.descripcion) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Product> searchProducts(String search);
}
