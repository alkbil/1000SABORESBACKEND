USE mil_sabores;

-- Deshabilitar constraints
SET FOREIGN_KEY_CHECKS = 0;

-- Limpiar usuarios existentes si hay duplicados
DELETE FROM users WHERE email = 'admin@1000sabores.com';
DELETE FROM users WHERE email = 'usuario@test.com';

-- Reabilitar constraints
SET FOREIGN_KEY_CHECKS = 1;

-- Insertar usuario administrador
-- Contraseña: admin123 (hasheada con BCrypt)
INSERT INTO users (email, password, role, is_active, created_at, updated_at) 
VALUES ('admin@1000sabores.com', '$2a$10$81DCc7IOV8WFMTL3t8YzJuKT8KNZr.rC0pDz4.X7KNjz7nJ9F4s2O', 'ROLE_ADMIN', true, NOW(), NOW());

-- Insertar usuario regular de prueba
-- Contraseña: user123
INSERT INTO users (email, password, role, is_active, created_at, updated_at)
VALUES ('usuario@test.com', '$2a$10$xK2LyLp/rNcHeH7z7lMnAOPXqNLmPPGD2QXkPNXCTvDO2fKnfkJhW', 'ROLE_USER', true, NOW(), NOW());

SELECT * FROM users;
