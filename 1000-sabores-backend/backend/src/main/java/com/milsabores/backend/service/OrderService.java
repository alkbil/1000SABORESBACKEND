package com.milsabores.backend.service;

import com.milsabores.backend.entity.Order;
import com.milsabores.backend.entity.OrderItem;
import com.milsabores.backend.entity.Product;
import com.milsabores.backend.entity.User;
import com.milsabores.backend.repository.OrderRepository;
import com.milsabores.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final AuthService authService;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<Order> getOrdersByUser(User user) {
        return orderRepository.findByUserOrderByCreatedAtDesc(user);
    }

    public List<Order> getMyOrders() {
        User currentUser = authService.getCurrentUser();
        return getOrdersByUser(currentUser);
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada con id: " + id));
    }

    @Transactional
    public Order createOrder(Order order) {
        User currentUser = authService.getCurrentUser();
        order.setUser(currentUser);

        // Calcular totales
        BigDecimal subtotal = BigDecimal.ZERO;
        for (OrderItem item : order.getItems()) {
            Product product = productRepository.findById(item.getProduct().getId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
            
            item.setPrecio(product.getPrecio());
            item.setProduct(product);
            item.setOrder(order);
            
            BigDecimal itemSubtotal = product.getPrecio().multiply(BigDecimal.valueOf(item.getCantidad()));
            subtotal = subtotal.add(itemSubtotal);
        }

        order.setSubtotal(subtotal);
        order.setTotal(subtotal.add(order.getCostoEnvio() != null ? order.getCostoEnvio() : BigDecimal.ZERO));
        order.setStatus(Order.OrderStatus.PENDING);

        return orderRepository.save(order);
    }

    @Transactional
    public Order updateOrderStatus(Long id, Order.OrderStatus status) {
        Order order = getOrderById(id);
        order.setStatus(status);
        return orderRepository.save(order);
    }

    @Transactional
    public void deleteOrder(Long id) {
        Order order = getOrderById(id);
        orderRepository.delete(order);
    }
}
