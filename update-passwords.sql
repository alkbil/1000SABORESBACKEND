USE mil_sabores;

-- Actualizar contraseñas con hashes BCrypt válidos (generados por el backend)
UPDATE users SET password = '$2a$10$wodrrO2/iiVEjhK3kLAtEe1w.om3d1sHFmALy.kMNjvBoXxuDv8YS' WHERE email = 'admin@1000sabores.com';
UPDATE users SET password = '$2a$10$inogDNlQNefPTNIatWxdvepeRGgYWDbQBYYBdP64GuAn8X7NHA4UW' WHERE email = 'usuario@test.com';

-- Verificar
SELECT id, email, role, password FROM users;
