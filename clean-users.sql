USE mil_sabores;

-- Deshabilitar constraints de clave foránea
SET FOREIGN_KEY_CHECKS = 0;

-- Limpiar todos los usuarios
TRUNCATE TABLE users;

-- Reabilitar constraints
SET FOREIGN_KEY_CHECKS = 1;

SELECT * FROM users;
