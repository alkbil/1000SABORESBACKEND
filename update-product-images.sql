-- Actualizar URLs de imágenes de productos a rutas locales
-- Utilizando las imágenes disponibles en la carpeta public/img

-- Primeras 8 productos (primeros datos insertados)
UPDATE products SET imagen_url = '/img/Torta de Chocolate Clásica.jpg' WHERE id = 1 OR nombre LIKE '%Torta de Chocolate Clásica%';
UPDATE products SET imagen_url = '/img/Cheesecake de Frutos Rojos.jpg' WHERE id = 2 OR nombre LIKE '%Cheesecake de Frutos Rojos%';
UPDATE products SET imagen_url = '/img/Cupcakes Variados.jpg' WHERE id = 3 OR nombre LIKE '%Cupcakes Variados%';
UPDATE products SET imagen_url = '/img/Croissant de Mantequilla.jpg' WHERE id = 4 OR nombre LIKE '%Croissant de Mantequilla%';
UPDATE products SET imagen_url = '/img/Macarons Franceses.jpg' WHERE id = 5 OR nombre LIKE '%Macarons Franceses%';
UPDATE products SET imagen_url = '/img/Pan de Campo Artesanal.jpg' WHERE id = 6 OR nombre LIKE '%Pan de Campo Artesanal%';
UPDATE products SET imagen_url = '/img/Brownie con Nueces.jpg' WHERE id = 7 OR nombre LIKE '%Brownie con Nueces%';
UPDATE products SET imagen_url = '/img/Torta Red Velvet.jpg' WHERE id = 8 OR nombre LIKE '%Torta Red Velvet%';

-- Productos 9-16
UPDATE products SET imagen_url = '/img/Galletas de Avena x12.png' WHERE id = 9 OR nombre LIKE '%Galletas de Avena%';
UPDATE products SET imagen_url = '/img/Donuts Glaseadas x6.jpg' WHERE id = 10 OR nombre LIKE '%Donuts Glaseadas%';
UPDATE products SET imagen_url = '/img/Torta de Zanahoria.avif' WHERE id = 11 OR nombre LIKE '%Torta de Zanahoria%';
UPDATE products SET imagen_url = '/img/Alfajores de Maicena x12.jpg' WHERE id = 12 OR nombre LIKE '%Alfajores de Maicena%';
UPDATE products SET imagen_url = '/img/Pavlova de Frutas.jpg' WHERE id = 13 OR nombre LIKE '%Pavlova de Frutas%';
UPDATE products SET imagen_url = '/img/Tarta de Limón.jpg' WHERE id = 14 OR nombre LIKE '%Tarta de Limón%';
UPDATE products SET imagen_url = '/img/Medialuna de Manteca x6.jpg' WHERE id = 15 OR nombre LIKE '%Medialuna de Manteca%';
UPDATE products SET imagen_url = '/img/Torta de Chocolate Clásica.jpg' WHERE id = 16 OR nombre LIKE '%Torta Oreo%';

-- Últimos productos (17-23)
UPDATE products SET imagen_url = '/img/pastel-chocolate.jpg' WHERE id = 17 OR nombre LIKE '%Torta de Chocolate%';
UPDATE products SET imagen_url = '/img/cheesecake.jpg' WHERE id = 18 OR nombre LIKE '%Cheesecake de Frutilla%';
UPDATE products SET imagen_url = '/img/Brownie con Nueces.jpg' WHERE id = 19 OR nombre LIKE '%Brownies%';
UPDATE products SET imagen_url = '/img/Cupcakes Variados.jpg' WHERE id = 20 OR nombre LIKE '%Cupcakes Variados%';
UPDATE products SET imagen_url = '/img/Alfajores de Maicena x12.jpg' WHERE id = 21 OR nombre LIKE '%Alfajores de Maicena%';
UPDATE products SET imagen_url = '/img/Tarta de Limón.jpg' WHERE id = 22 OR nombre LIKE '%Lemon Pie%';
UPDATE products SET imagen_url = '/img/Croissant de Mantequilla.jpg' WHERE id = 23 OR nombre LIKE '%Croissants%';

-- Verificar los cambios
SELECT id, nombre, imagen_url FROM products ORDER BY id;
