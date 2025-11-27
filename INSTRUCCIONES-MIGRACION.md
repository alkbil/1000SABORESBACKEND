# 📦 Guía de Migración - 1000 Sabores E-commerce

## 🎯 Archivos Necesarios

Copia estos archivos a tu nuevo PC:
- ✅ `setup-database.sql` (este archivo crea TODO: estructura + datos)
- ✅ Carpeta completa `1000-sabores-backend/backend/`
- ✅ Carpeta completa `1000-sabores-react/`

---

## 📋 Pre-requisitos en el Nuevo PC

1. **MySQL 8.0+** (instalado con Laragon o standalone)
2. **JDK 17 o 21** (para Spring Boot)
3. **Maven** (incluido en IntelliJ/Eclipse o standalone)
4. **Node.js 16+** (para React)

---

## 🗄️ Paso 1: Configurar Base de Datos

### Opción A: Desde MySQL Command Line
```bash
# Abrir terminal MySQL
mysql -u root -p

# Ejecutar script
SOURCE C:/Users/TU_USUARIO/Desktop/1000 sabores/setup-database.sql

# Verificar instalación
USE mil_sabores;
SHOW TABLES;
SELECT COUNT(*) FROM users;     -- Debe mostrar 3
SELECT COUNT(*) FROM products;  -- Debe mostrar 16
```

### Opción B: Desde Laragon (HeidiSQL)
1. Abrir HeidiSQL desde Laragon
2. Clic derecho en servidor → **Nuevo** → **Base de datos**: `mil_sabores`
3. Menú **Archivo** → **Cargar SQL** → Seleccionar `setup-database.sql`
4. Clic en **Ejecutar** (F9)

---

## ⚙️ Paso 2: Configurar Backend

### Editar `application.properties`
Ruta: `1000-sabores-backend/backend/src/main/resources/application.properties`

```properties
# AJUSTAR SEGÚN TU CONFIGURACIÓN
spring.datasource.url=jdbc:mysql://localhost:3306/mil_sabores
spring.datasource.username=root
spring.datasource.password=TU_PASSWORD_MYSQL

# DEJAR COMO ESTÁ
spring.jpa.hibernate.ddl-auto=update
server.port=8080
server.servlet.context-path=/api
jwt.secret=1000SaboresSuperSecretKeyForJWTTokenGeneration2024!
jwt.expiration=86400000
```

### Compilar y Ejecutar
```bash
cd "C:\Users\TU_USUARIO\Desktop\1000 sabores\1000-sabores-backend\backend"

# Compilar (solo primera vez o después de cambios)
.\mvnw.cmd clean package -DskipTests

# Ejecutar
java -jar target\backend-0.0.1-SNAPSHOT.jar
```

**Verificar**: Abrir navegador en `http://localhost:8080/api/swagger-ui/index.html`

---

## 🎨 Paso 3: Configurar Frontend

### Editar `.env`
Ruta: `1000-sabores-react/.env`

```env
REACT_APP_API_URL=http://localhost:8080/api
```

⚠️ **MUY IMPORTANTE**: El puerto debe ser **8080** (no 3001)

### Instalar dependencias y ejecutar
```bash
cd "C:\Users\TU_USUARIO\Desktop\1000 sabores\1000-sabores-react"

# Primera vez: instalar dependencias (toma ~5 minutos)
npm install

# Ejecutar (cada vez)
npm start
```

**Verificar**: Abre automáticamente `http://localhost:3002`

---

## ✅ Paso 4: Probar Funcionamiento

### 4.1 Probar Login
1. Ir a `http://localhost:3002/login`
2. Usar credenciales:
   - **Email**: `admin@milsabores.com`
   - **Contraseña**: `password123`

### 4.2 Probar API (Swagger)
1. Ir a `http://localhost:8080/api/swagger-ui/index.html`
2. POST `/api/auth/login` con:
   ```json
   {
     "email": "admin@milsabores.com",
     "password": "password123"
   }
   ```
3. Copiar el `token` de la respuesta (solo el texto, SIN "Bearer")
4. Clic en botón **🔓 Authorize** (arriba derecha)
5. Pegar token en el campo y clic **Authorize**
6. Probar GET `/api/auth/me` → Debe retornar datos del usuario

### 4.3 Probar Compra Completa
1. En React: Login → Ver Productos → Agregar al carrito
2. Ir a Carrito → Procesar Pago
3. Verificar en HeidiSQL:
   ```sql
   SELECT * FROM orders ORDER BY created_at DESC LIMIT 1;
   SELECT * FROM order_items WHERE order_id = (SELECT MAX(id) FROM orders);
   ```

---

## 🔑 Usuarios Precargados

| Email | Contraseña | Rol |
|-------|------------|-----|
| `admin@milsabores.com` | `password123` | ADMIN |
| `usuario@test.com` | `password123` | USER |
| `nuevoadmin@test.com` | `admin123` | ADMIN |

---

## 🐛 Solución de Problemas

### ❌ React: "Network Error" al hacer login
- **Causa**: `.env` tiene puerto incorrecto
- **Solución**: Verificar que `.env` tenga `http://localhost:8080/api`
- **IMPORTANTE**: Después de cambiar `.env`, parar servidor (Ctrl+C) y hacer `npm start` de nuevo

### ❌ Backend: "Access denied for user 'root'"
- **Causa**: Contraseña incorrecta en `application.properties`
- **Solución**: Editar `spring.datasource.password` con tu contraseña de MySQL

### ❌ Backend: "Table 'mil_sabores.users' doesn't exist"
- **Causa**: No ejecutaste `setup-database.sql`
- **Solución**: Ir a Paso 1 y ejecutar el script SQL

### ❌ Swagger: Error 400 "Usuario no encontrado" en /auth/me
- **Causa**: Pegaste el token con "Bearer" incluido
- **Solución**: Copiar solo el token (el texto largo), NO incluir la palabra "Bearer"

---

## 📊 Verificación Rápida

```sql
-- En MySQL, verifica que todo esté OK:
USE mil_sabores;

SELECT 'users' AS tabla, COUNT(*) AS registros FROM users
UNION ALL
SELECT 'products', COUNT(*) FROM products
UNION ALL
SELECT 'orders', COUNT(*) FROM orders;

-- Resultado esperado:
-- users     | 3
-- products  | 16
-- orders    | 0 (hasta que hagas una compra)
```

---

## 📁 Estructura de Archivos Final

```
C:\Users\TU_USUARIO\Desktop\1000 sabores\
├── setup-database.sql               ← ARCHIVO PRINCIPAL
├── INSTRUCCIONES-MIGRACION.md      ← Este archivo
├── 1000-sabores-backend\
│   └── backend\
│       ├── src\main\resources\
│       │   └── application.properties  ← EDITAR AQUÍ
│       ├── pom.xml
│       └── mvnw.cmd
└── 1000-sabores-react\
    ├── .env                         ← EDITAR AQUÍ
    ├── package.json
    └── src\
```

---

## 🎓 Notas para Evaluación

- ✅ **JWT Authentication**: Implementado con tokens de 24 horas
- ✅ **Persistencia**: MySQL con relaciones (users → orders → order_items)
- ✅ **API REST**: 12 endpoints documentados en Swagger
- ✅ **Frontend React**: Context API para auth y carrito
- ✅ **Integración completa**: React → Backend → MySQL

---

**Fecha de creación**: 18 de Noviembre 2025  
**Versión Backend**: Spring Boot 3.5.7 + Java 21  
**Versión Frontend**: React 18  
**Base de datos**: MySQL 8.4.3
