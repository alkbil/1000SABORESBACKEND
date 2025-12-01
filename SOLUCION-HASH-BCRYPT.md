# 🔐 Solución: Hash BCrypt - Credenciales de Admin

## El Problema

Cuando tu amigo intentaba hacer login con:
```
Email: admin@1000sabores.com
Contraseña: admin123
```

Recibía error: **"Credenciales incorrectas"** o **"Usuario no encontrado"**

### ¿Por qué sucedía?

El hash BCrypt guardado en la base de datos era incorrecto:

```sql
-- ❌ INCORRECTO (lo que estaba)
Password: $2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG
```

Cuando Spring Security intentaba verificar:
1. Recibía: `admin123` (contraseña en texto plano)
2. Hacía hash de esa contraseña
3. Comparaba con el hash de BD
4. **No coincidían** → ❌ Fallo de autenticación

---

## ¿Qué es un Hash BCrypt?

**BCrypt** es un algoritmo de hashing seguro para contraseñas:

```
Contraseña Normal: admin123
        ↓
     Algoritmo BCrypt
        ↓
Hash BCrypt: $2a$10$J2aAsgtYLpONQ3mVYsvHOeXvlou3o9gvatd22HcpSDP2Xv9Ocx3We
```

**Características importantes:**
- ✅ Es de **una sola dirección** (no se puede desencriptar)
- ✅ Cada vez que hasheas la misma contraseña, obtienes diferente hash
- ✅ Pero Spring Security puede verificar que coinciden
- ✅ Las contraseñas NUNCA se guardan en texto plano
- ✅ Los hackers no pueden descifrar la contraseña aunque tengan el hash

---

## La Solución

Tu amigo usó el endpoint `/debug/hash` del backend para generar el hash correcto:

```bash
GET http://localhost:8080/api/debug/hash?password=admin123
```

**Resultado:**
```
✅ Hash Correcto: $2a$10$J2aAsgtYLpONQ3mVYsvHOeXvlou3o9gvatd22HcpSDP2Xv9Ocx3We
```

Luego actualizó la base de datos:

```sql
UPDATE users 
SET password = '$2a$10$J2aAsgtYLpONQ3mVYsvHOeXvlou3o9gvatd22HcpSDP2Xv9Ocx3We'
WHERE email = 'admin@1000sabores.com';
```

**Ahora funciona:**
```
admin@1000sabores.com / admin123 ✅
```

---

## 🔧 Cómo Generar Hashes BCrypt

### Opción 1: Usar el endpoint del backend (RECOMENDADO)

```bash
# Cuando el backend está ejecutándose:
GET http://localhost:8080/api/debug/hash?password=tucontraseña
```

### Opción 2: Usar una herramienta online

Ir a: https://bcrypt-generator.com/

1. Escribir contraseña
2. Hacer clic en "Generate"
3. Copiar el hash resultante

### Opción 3: Usar código Java

```java
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
String hashedPassword = encoder.encode("admin123");
System.out.println(hashedPassword);
// Output: $2a$10$... (diferente cada vez, pero Spring lo verifica igual)
```

---

## 📝 Credenciales Actualizadas

Los archivos han sido actualizados con el hash correcto:

### ✅ SETUP-DATABASE-LARAGON.sql
```sql
INSERT INTO users (email, password, role, is_active) VALUES
('admin@1000sabores.com', '$2a$10$J2aAsgtYLpONQ3mVYsvHOeXvlou3o9gvatd22HcpSDP2Xv9Ocx3We', 'ROLE_ADMIN', true);
```

### ✅ 1000-sabores-backend/backend/src/main/resources/data.sql
```sql
INSERT INTO users (email, password, role, is_active, created_at, updated_at) 
SELECT 'admin@1000sabores.com', '$2a$10$J2aAsgtYLpONQ3mVYsvHOeXvlou3o9gvatd22HcpSDP2Xv9Ocx3We', 'ROLE_ADMIN', ...
```

---

## ✅ Usuarios Precargados (FUNCIONANDO)

| Email | Contraseña | Rol | Hash BCrypt |
|-------|-----------|-----|-------------|
| `admin@1000sabores.com` | `admin123` | ADMIN | `$2a$10$J2aAsgtYLpONQ3mVYsvHOeXvlou3o9gvatd22HcpSDP2Xv9Ocx3We` |
| `usuario@test.com` | `usuario123` | USER | `$2a$10$N.wmkYhY7TJx8fZgLlL8/.6nV3E3p3nh3m0Yq7F4Qg9fJ8rH7/YZ6` |

---

## 🔄 Flujo de Autenticación Completo

```
1. Usuario entra: admin123
   ↓
2. Spring recibe la contraseña en texto plano
   ↓
3. BCryptPasswordEncoder.encode(password) genera un hash temporal
   ↓
4. Compara el hash temporal con el hash guardado en BD
   ↓
5. Si coinciden → Genera JWT Token
   ↓
6. Token se guarda en localStorage del navegador
   ↓
7. Cada request incluye: Authorization: Bearer {token}
   ↓
8. JwtAuthenticationFilter valida el token
   ↓
9. ✅ Usuario autenticado como ADMIN
```

---

## ⚠️ Problemas Comunes

### ❌ "Credenciales incorrectas" después de actualizar BD

**Problema:** El hash no coincide

**Soluciones:**
1. Regenerar hash con `/debug/hash`
2. Asegurarse de que el hash está completo (no cortado)
3. Verificar que no hay espacios en blanco al copiar

```sql
-- ❌ MAL (tiene espacios)
password = ' $2a$10$J2aAsgtYLpONQ3mVYsvHOeXvlou3o9gvatd22HcpSDP2Xv9Ocx3We '

-- ✅ BIEN (sin espacios)
password = '$2a$10$J2aAsgtYLpONQ3mVYsvHOeXvlou3o9gvatd22HcpSDP2Xv9Ocx3We'
```

### ❌ "Unexpected error: java.lang.IllegalArgumentException: Invalid salt version"

**Problema:** El hash está corrupto o mal formado

**Solución:** Regenerar el hash con `/debug/hash`

### ❌ Login funciona en Postman pero no en React

**Problema:** Token no se guarda correctamente

**Soluciones:**
1. Verificar que localStorage está habilitado en navegador
2. Borrar cookies del navegador (Ctrl+Shift+Delete)
3. Ejecutar `npm start` de nuevo

---

## 🧪 Probar las Credenciales

### Test 1: Swagger (API)

1. Ir a http://localhost:8080/api/swagger-ui/index.html
2. Expandir **POST /auth/login**
3. Clic en "Try it out"
4. Pegar JSON:
```json
{
  "email": "admin@1000sabores.com",
  "password": "admin123"
}
```
5. Clic en "Execute"
6. ✅ Debe retornar: `{token: "eyJhbGc...", ...}`

### Test 2: Frontend React

1. Ir a http://localhost:3002/login
2. Usar:
   - Email: `admin@1000sabores.com`
   - Contraseña: `admin123`
3. Clic en "Ingresar"
4. ✅ Debe redirigir al dashboard

### Test 3: PowerShell (Command Line)

```powershell
$loginResp = Invoke-WebRequest -Uri "http://localhost:8080/api/auth/login" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"email":"admin@1000sabores.com","password":"admin123"}'

# Ver el token
($loginResp.Content | ConvertFrom-Json).token
```

---

## 🔐 Seguridad: Mejores Prácticas

1. **NUNCA** guardes contraseñas en texto plano ❌
2. **SIEMPRE** usa BCrypt o similar ✅
3. **SIEMPRE** valida contraseñas en el backend ✅
4. **NUNCA** devuelvas contraseña en respuestas ✅
5. **SIEMPRE** usa HTTPS en producción ✅

---

## 📚 Referencia Rápida

```javascript
// Spring Security verifica así:
BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

String passwordIngresada = "admin123";
String hashEnBD = "$2a$10$J2aAsgtYLpONQ3mVYsvHOeXvlou3o9gvatd22HcpSDP2Xv9Ocx3We";

boolean coincide = encoder.matches(passwordIngresada, hashEnBD);
// ✅ true
```

---

## ✨ Resumen

| Antes | Después |
|--------|---------|
| ❌ Hash incorrecto | ✅ Hash correcto generado |
| ❌ Login fallaba | ✅ Login funciona |
| ❌ Acceso denegado | ✅ Acceso permitido |

**Con estos cambios, el login de admin funciona perfectamente** ✅

---

**Fecha de actualización:** Diciembre 2025  
**Versión:** 1.1 (Con hash BCrypt correcto)  
**Estado:** ✅ LISTO PARA USAR
