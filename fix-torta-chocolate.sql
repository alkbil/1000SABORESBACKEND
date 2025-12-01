-- Activar Torta de Chocolate (ID 1)
UPDATE products SET is_active = 1 WHERE id = 1;
SELECT id, nombre, is_active FROM products WHERE id = 1;
