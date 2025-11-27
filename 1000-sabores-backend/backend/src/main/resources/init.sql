-- Base de datos para 1000 Sabores
CREATE DATABASE IF NOT EXISTS mil_sabores CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mil_sabores;

-- Las tablas se crearán automáticamente con Hibernate
-- Este script es solo para asegurar que la base de datos existe

-- Datos iniciales de productos (se insertarán después de que las tablas se creen)
-- INSERT INTO products (nombre, descripcion, precio, categoria, imagen_url, stock, is_active, created_at, updated_at)
-- VALUES
-- ('Torta de Chocolate', 'Deliciosa torta de chocolate con cobertura de ganache', 35000.00, 'tortas', '/img/torta-chocolate.jpg', 10, true, NOW(), NOW()),
-- ('Cheesecake de Frutilla', 'Suave cheesecake con coulis de frutilla', 28000.00, 'tortas', '/img/cheesecake.jpg', 8, true, NOW(), NOW()),
-- ('Croissant', 'Croissant francés de mantequilla', 3000.00, 'panes', '/img/croissant.jpg', 50, true, NOW(), NOW()),
-- ('Alfajores', 'Pack de 6 alfajores artesanales', 8000.00, 'postres', '/img/alfajores.jpg', 30, true, NOW(), NOW()),
-- ('Torta Red Velvet', 'Clásica torta red velvet con crema', 40000.00, 'tortas', '/img/red-velvet.jpg', 6, true, NOW(), NOW()),
-- ('Macarons', 'Caja de 12 macarons surtidos', 15000.00, 'postres', '/img/macarons.jpg', 20, true, NOW(), NOW());
