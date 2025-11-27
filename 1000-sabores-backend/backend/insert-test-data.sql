-- Script para insertar datos de prueba en la base de datos
-- Ejecutar este script en HeidiSQL después de que Spring Boot haya creado las tablas

USE mil_sabores;

-- Limpiar datos existentes (opcional)
-- DELETE FROM order_items;
-- DELETE FROM orders;
-- DELETE FROM products;
-- DELETE FROM users;

-- Insertar usuarios de prueba
-- Password para ambos: admin123 (encriptado con BCrypt online)
INSERT INTO users (email, password, role, is_active, created_at, updated_at) VALUES
('admin@milsabores.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ROLE_ADMIN', 1, NOW(), NOW()),
('usuario@test.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ROLE_USER', 1, NOW(), NOW());

-- Insertar productos variados
INSERT INTO products (nombre, descripcion, precio, categoria, imagen_url, stock, is_active, created_at, updated_at) VALUES
('Torta de Chocolate Clásica', 'Deliciosa torta de chocolate con cobertura de ganache suave', 35000.00, 'Tortas', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587', 10, 1, NOW(), NOW()),
('Cheesecake de Frutos Rojos', 'Suave cheesecake con salsa de frutos del bosque frescos', 32000.00, 'Tortas', 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866', 8, 1, NOW(), NOW()),
('Cupcakes Variados x6', 'Set de 6 cupcakes con diferentes sabores y decoraciones artesanales', 18000.00, 'Cupcakes', 'https://images.unsplash.com/photo-1426869884541-df7117556757', 20, 1, NOW(), NOW()),
('Croissant de Mantequilla', 'Croissant francés hojaldrado y crujiente recién horneado', 3500.00, 'Panadería', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a', 30, 1, NOW(), NOW()),
('Macarons Franceses x12', 'Caja de 12 macarons de diferentes sabores importados', 25000.00, 'Postres', 'https://images.unsplash.com/photo-1569864358642-9d1684040f43', 15, 1, NOW(), NOW()),
('Pan de Campo Artesanal', 'Pan rústico con masa madre recién horneado', 4500.00, 'Panadería', 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73', 25, 1, NOW(), NOW()),
('Brownie con Nueces', 'Brownie de chocolate intenso con nueces caramelizadas', 8000.00, 'Postres', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c', 18, 1, NOW(), NOW()),
('Torta Red Velvet', 'Torta red velvet premium con frosting de queso crema', 38000.00, 'Tortas', 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e', 6, 1, NOW(), NOW()),
('Galletas de Avena x12', 'Docena de galletas caseras de avena y pasas', 6000.00, 'Galletas', 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35', 40, 1, NOW(), NOW()),
('Donuts Glaseadas x6', 'Set de 6 donuts con glaseado de colores variados', 12000.00, 'Postres', 'https://images.unsplash.com/photo-1551024506-0bccd828d307', 22, 1, NOW(), NOW()),
('Torta de Zanahoria', 'Torta húmeda de zanahoria con frosting de queso crema y nueces', 33000.00, 'Tortas', 'https://images.unsplash.com/photo-1621303837174-89787a7d4729', 7, 1, NOW(), NOW()),
('Alfajores de Maicena x12', 'Docena de alfajores artesanales rellenos de dulce de leche', 15000.00, 'Galletas', 'https://images.unsplash.com/photo-1599785209796-786432b228bc', 35, 1, NOW(), NOW()),
('Pavlova de Frutas', 'Postre de merengue crujiente con crema y frutas frescas', 28000.00, 'Postres', 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3', 5, 1, NOW(), NOW()),
('Tarta de Limón', 'Tarta de limón con merengue italiano dorado', 24000.00, 'Tartas', 'https://images.unsplash.com/photo-1519915212116-7cfef71f1d3e', 9, 1, NOW(), NOW()),
('Medialuna de Manteca x6', 'Set de 6 medialunas de manteca recién horneadas', 5000.00, 'Panadería', 'https://images.unsplash.com/photo-1509440159596-0249088772ff', 50, 1, NOW(), NOW()),
('Torta Oreo', 'Torta decorada con galletas Oreo y crema', 36000.00, 'Tortas', 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35', 8, 1, NOW(), NOW());

-- Verificar datos insertados
SELECT 'Usuarios creados:' AS mensaje;
SELECT id, email, role FROM users;

SELECT 'Productos creados:' AS mensaje;
SELECT id, nombre, precio, categoria, stock FROM products;
