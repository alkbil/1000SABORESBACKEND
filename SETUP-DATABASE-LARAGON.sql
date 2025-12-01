
DROP DATABASE IF EXISTS mil_sabores;
CREATE DATABASE IF NOT EXISTS mil_sabores CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mil_sabores;


CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('ROLE_USER', 'ROLE_ADMIN') DEFAULT 'ROLE_USER',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE products (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(500),
    precio DECIMAL(10, 2) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    imagen_url VARCHAR(255),
    stock INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_categoria (categoria),
    INDEX idx_is_active (is_active),
    INDEX idx_nombre (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE orders (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    status ENUM('PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE order_items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT,
    INDEX idx_order_id (order_id),
    INDEX idx_product_id (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO users (email, password, role, is_active) VALUES
('admin@1000sabores.com', '$2a$10$J2aAsgtYLpONQ3mVYsvHOeXvlou3o9gvatd22HcpSDP2Xv9Ocx3We', 'ROLE_ADMIN', true);


INSERT INTO users (email, password, role, is_active) VALUES
('usuario@test.com', '$2a$10$N.wmkYhY7TJx8fZgLlL8/.6nV3E3p3nh3m0Yq7F4Qg9fJ8rH7/YZ6', 'ROLE_USER', true);

INSERT INTO products (nombre, descripcion, precio, categoria, imagen_url, stock, is_active) VALUES

('Torta de Chocolate Clásica', 'Deliciosa torta de chocolate con cobertura de ganache y relleno esponjoso', 35000.00, 'tortas', '/img/Torta de Chocolate Clásica.jpg', 10, true),
('Torta Red Velvet', 'Elegante torta red velvet con frosting de queso crema y decoración en vivo', 40000.00, 'tortas', '/img/Torta Red Velvet.jpg', 5, true),
('Torta de Zanahoria', 'Torta húmeda de zanahoria con nueces y cobertura de queso crema', 32000.00, 'tortas', '/img/Torta de Zanahoria.avif', 8, true),
('Cheesecake de Frutos Rojos', 'Suave cheesecake con coulis de frutos rojos y base de galleta', 38000.00, 'tortas', '/img/Cheesecake de Frutos Rojos.jpg', 6, true),
('Pavlova de Frutas', 'Pavlova crujiente rellena de crema y frutas frescas de temporada', 28000.00, 'tortas', '/img/Pavlova de Frutas.jpg', 7, true),


('Brownie con Nueces', 'Brownie intenso de chocolate con nueces crocantes', 12000.00, 'postres', '/img/Brownie con Nueces.jpg', 20, true),
('Cupcakes Variados', 'Set de 6 cupcakes con diferentes sabores y coberturas', 18000.00, 'cupcakes', '/img/Cupcakes Variados.jpg', 15, true),
('Donuts Glaseadas x6', 'Pack de 6 donuts con glaseado artesanal', 14000.00, 'postres', '/img/Donuts Glaseadas x6.jpg', 25, true),
('Tarta de Limón', 'Tarta de limón fresco con merengue italiano', 26000.00, 'tartas', '/img/Tarta de Limón.jpg', 10, true),
('Macarons Franceses', 'Caja de 12 macarons surtidos con diferentes sabores', 22000.00, 'postres', '/img/Macarons Franceses.jpg', 12, true),


('Alfajores de Maicena x12', 'Docena de alfajores rellenos con dulce de leche', 16000.00, 'galletas', '/img/Alfajores de Maicena x12.jpg', 30, true),
('Galletas de Avena x12', 'Pack de galletas de avena artesanales y naturales', 10000.00, 'galletas', '/img/Galletas de Avena x12.png', 40, true),


('Croissant de Mantequilla', 'Croissant francés crujiente hecho con mantequilla de calidad', 8000.00, 'panes', '/img/Croissant de Mantequilla.jpg', 35, true),
('Medialuna de Manteca x6', 'Pack de 6 medialunas recién horneadas', 12000.00, 'panes', '/img/Medialuna de Manteca x6.jpg', 25, true),
('Pan de Campo Artesanal', 'Pan de campo tradicional elaborado de forma artesanal', 9000.00, 'panes', '/img/Pan de Campo Artesanal.jpg', 20, true);

