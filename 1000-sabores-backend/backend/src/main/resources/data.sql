-- Insertar usuario administrador si no existe
INSERT INTO users (email, password, role, is_active, created_at, updated_at) 
SELECT 'admin@1000sabores.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'ROLE_ADMIN', true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@1000sabores.com');

-- Insertar usuario regular de prueba si no existe
INSERT INTO users (email, password, role, is_active, created_at, updated_at)
SELECT 'usuario@test.com', '$2a$10$N.wmkYhY7TJx8fZgLlL8/.6nV3E3p3nh3m0Yq7F4Qg9fJ8rH7/YZ6', 'ROLE_USER', true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'usuario@test.com');

-- Insertar productos de ejemplo si no existen
INSERT INTO products (nombre, descripcion, precio, categoria, imagen_url, stock, is_active, created_at, updated_at)
SELECT 'Torta de Chocolate', 'Deliciosa torta de chocolate con cobertura de ganache', 25.99, 'tortas', '/img/torta-chocolate.jpg', 10, true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM products WHERE nombre = 'Torta de Chocolate');

INSERT INTO products (nombre, descripcion, precio, categoria, imagen_url, stock, is_active, created_at, updated_at)
SELECT 'Cheesecake de Frutilla', 'Suave cheesecake con base de galleta y cobertura de frutillas', 28.50, 'tortas', '/img/cheesecake.jpg', 8, true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM products WHERE nombre = 'Cheesecake de Frutilla');

INSERT INTO products (nombre, descripcion, precio, categoria, imagen_url, stock, is_active, created_at, updated_at)
SELECT 'Brownies', 'Pack de 6 brownies de chocolate intenso', 12.99, 'postres', '/img/brownies.jpg', 20, true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM products WHERE nombre = 'Brownies');

INSERT INTO products (nombre, descripcion, precio, categoria, imagen_url, stock, is_active, created_at, updated_at)
SELECT 'Cupcakes Variados', 'Set de 6 cupcakes con diferentes sabores', 15.00, 'cupcakes', '/img/cupcakes.jpg', 15, true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM products WHERE nombre = 'Cupcakes Variados');

INSERT INTO products (nombre, descripcion, precio, categoria, imagen_url, stock, is_active, created_at, updated_at)
SELECT 'Alfajores de Maicena', 'Docena de alfajores rellenos con dulce de leche', 18.50, 'galletas', '/img/alfajores.jpg', 25, true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM products WHERE nombre = 'Alfajores de Maicena');

INSERT INTO products (nombre, descripcion, precio, categoria, imagen_url, stock, is_active, created_at, updated_at)
SELECT 'Torta Red Velvet', 'Elegante torta red velvet con frosting de queso crema', 32.00, 'tortas', '/img/red-velvet.jpg', 5, true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM products WHERE nombre = 'Torta Red Velvet');

INSERT INTO products (nombre, descripcion, precio, categoria, imagen_url, stock, is_active, created_at, updated_at)
SELECT 'Lemon Pie', 'Tarta de limón con merengue italiano', 22.00, 'tartas', '/img/lemon-pie.jpg', 12, true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM products WHERE nombre = 'Lemon Pie');

INSERT INTO products (nombre, descripcion, precio, categoria, imagen_url, stock, is_active, created_at, updated_at)
SELECT 'Croissants', 'Pack de 4 croissants artesanales', 10.50, 'panes', '/img/croissants.jpg', 30, true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM products WHERE nombre = 'Croissants');
