package com.milsabores.backend.repository;

import com.milsabores.backend.entity.Order;
import com.milsabores.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    
    List<Order> findByUser(User user);
    
    List<Order> findByUserOrderByCreatedAtDesc(User user);
    
    List<Order> findByStatus(Order.OrderStatus status);
}
