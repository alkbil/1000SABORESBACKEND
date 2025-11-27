-- ============================================
-- Script de creación de base de datos
-- 1000 Sabores E-commerce
-- Fecha: 2025-11-18
-- ============================================

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS mil_sabores CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mil_sabores;

-- ============================================
-- Tabla: users
-- ============================================
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'ROLE_USER',
    is_active BIT(1) NOT NULL DEFAULT 1,
    created_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Tabla: products
-- ============================================
CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    imagen_url VARCHAR(500),
    categoria VARCHAR(100),
    stock INT NOT NULL DEFAULT 0,
    is_active BIT(1) NOT NULL DEFAULT 1,
    created_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    INDEX idx_categoria (categoria),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Tabla: orders
-- ============================================
CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    costo_envio DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    total DECIMAL(10,2) NOT NULL,
    estado VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    metodo_pago VARCHAR(100),
    metodo_envio VARCHAR(100),
    direccion_envio TEXT,
    notas TEXT,
    created_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6),
    updated_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_estado (estado),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Tabla: order_items
-- ============================================
CREATE TABLE order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT,
    INDEX idx_order_id (order_id),
    INDEX idx_product_id (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Datos iniciales: Usuarios
-- ============================================
INSERT INTO users (email, password, role, is_active, created_at) VALUES
('admin@milsabores.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ROLE_ADMIN', 1, NOW()),
('usuario@test.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ROLE_USER', 1, NOW()),
('nuevoadmin@test.com', '$2a$10$cX0H2qs.lqE2vPFdlLxGOO1TLO4xQfBZOzKWXPF5dZBD6SIeN18LK', 'ROLE_ADMIN', 1, NOW());

-- Nota: Contraseñas por defecto (BCrypt):
-- admin@milsabores.com = password123
-- usuario@test.com = password123
-- nuevoadmin@test.com = admin123

-- ============================================
-- Datos iniciales: Productos
-- ============================================
INSERT INTO products (nombre, descripcion, precio, imagen_url, categoria, stock, is_active) VALUES
('Pastel de Chocolate', 'Delicioso pastel de chocolate con cobertura de ganache', 15000, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587', 'Pasteles', 20, 1),
('Pastel de Fresas', 'Esponjoso pastel de vainilla con fresas frescas y crema', 18000, 'https://images.unsplash.com/photo-1565958011703-44f9829ba187', 'Pasteles', 15, 1),
('Tarta de Manzana', 'Tarta casera de manzana con canela', 12000, 'https://images.unsplash.com/photo-1535920527002-b35e96722eb9', 'Tartas', 25, 1),
('Cupcakes Variados', 'Set de 6 cupcakes de diferentes sabores', 8000, 'https://images.unsplash.com/photo-1426869884541-df7117556757', 'Cupcakes', 50, 1),
('Brownie de Chocolate', 'Brownie húmedo con nueces', 5000, 'https://images.unsplash.com/photo-1607920591413-4ec007e70023', 'Brownies', 30, 1),
('Cheesecake de Frutos Rojos', 'Suave cheesecake con salsa de frutos rojos', 16000, 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866', 'Tartas', 12, 1),
('Galletas de Chocolate Chip', 'Pack de 12 galletas recién horneadas', 6000, 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e', 'Galletas', 40, 1),
('Tarta de Limón', 'Refrescante tarta de limón con merengue', 14000, 'https://images.unsplash.com/photo-1519915212116-716af141c8f9', 'Tartas', 18, 1),
('Alfajores Artesanales', 'Pack de 6 alfajores rellenos de dulce de leche', 7000, 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35', 'Galletas', 35, 1),
('Pastel Red Velvet', 'Clásico pastel red velvet con frosting de queso crema', 19000, 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e', 'Pasteles', 10, 1),
('Torta Tres Leches', 'Tradicional torta tres leches', 17000, 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d', 'Pasteles', 14, 1),
('Eclairs de Chocolate', 'Pack de 4 eclairs rellenos de crema pastelera', 9000, 'https://images.unsplash.com/photo-1612201142855-e7f29f9a1c6e', 'Postres', 22, 1),
('Macarons Franceses', 'Caja de 12 macarons de sabores variados', 15000, 'https://images.unsplash.com/photo-1569864358642-9d1684040f43', 'Postres', 25, 1),
('Tarta de Zanahoria', 'Jugosa tarta de zanahoria con frosting de queso', 14000, 'https://images.unsplash.com/photo-1621303837174-89787a7d4729', 'Tartas', 16, 1),
('Donuts Glaseados', 'Pack de 6 donuts con diferentes coberturas', 8000, 'https://images.unsplash.com/photo-1551024601-bec78aea704b', 'Donuts', 45, 1),
('Strudel de Manzana', 'Strudel austriaco relleno de manzanas y canela', 11000, 'https://images.unsplash.com/photo-1509440159596-0249088772ff', 'Tartas', 20, 1);

-- ============================================
-- Fin del script
-- ============================================
