# 📦 GUÍA DE INSTALACIÓN - 1000 SABORES (Para tu amigo)

## 🎯 Resumen Rápido

Tu amigo necesita:
1. ✅ Descargar el proyecto desde GitHub
2. ✅ Crear la base de datos con el script SQL
3. ✅ Configurar las credenciales MySQL
4. ✅ Ejecutar Backend + Frontend

---

## 📋 PRE-REQUISITOS

Asegúrate de tener instalado en tu PC:

- ✅ **Laragon** (con MySQL incluido) - [descargar](https://laragon.org/)
- ✅ **JDK 17+** (para Java) - [descargar](https://www.oracle.com/java/technologies/downloads/)
- ✅ **Node.js 16+** (para React) - [descargar](https://nodejs.org/)
- ✅ **Git** (para descargar el proyecto) - [descargar](https://git-scm.com/)

Verificar instalación:
```bash
java -version          # Debe mostrar Java 17+
node --version         # Debe mostrar Node.js 16+
npm --version          # Debe mostrar npm 7+
git --version          # Debe mostrar git 2.3+
```

---

## 🚀 PASO 1: DESCARGAR EL PROYECTO

Abrir **PowerShell** o **Git Bash** y ejecutar:

```bash
# Ir a la carpeta de escritorio o donde quieras
cd C:\Users\TUUSUARIO\Desktop

# Clonar el proyecto
git clone https://github.com/alkbil/1000SABORESBACKEND.git

# Entrar a la carpeta
cd 1000SABORESBACKEND
```

---

## 🗄️ PASO 2: CREAR BASE DE DATOS

### Opción A: Usando HeidiSQL (RECOMENDADO)

1. **Abrir Laragon** (haz clic en el icono en la bandeja del sistema)
2. **Clic en el botón "Tools"** o haz clic derecho → **Database** → **HeidiSQL**
3. HeidiSQL se abrirá automáticamente conectado a MySQL

**Ahora ejecutar el script SQL:**

1. En HeidiSQL, ir a **Archivo** → **Cargar SQL** 
2. Buscar el archivo: `1000SABORESBACKEND\SETUP-DATABASE-LARAGON.sql`
3. Clic en **Ejecutar** (F9) o **Ctrl+E**
4. ✅ Listo! La base de datos se creó

**Verificar que todo funcionó:**

1. En el panel izquierdo, hacer clic derecho en **mil_sabores** → **Actualizar**
2. Expandir **mil_sabores** → Ver las tablas:
   - ✅ users (debe tener 2 usuarios)
   - ✅ products (debe tener 15 productos)
   - ✅ orders
   - ✅ order_items

### Opción B: Usando MySQL Command Line

```bash
# Abrir MySQL (si está en PATH)
mysql -u root -p

# Pegar la contraseña de Laragon (normalmente está vacía, presionar Enter)

# En MySQL, ejecutar:
SOURCE C:\Users\TUUSUARIO\Desktop\1000SABORESBACKEND\SETUP-DATABASE-LARAGON.sql

# Verificar:
USE mil_sabores;
SHOW TABLES;
SELECT COUNT(*) FROM users;     -- Debe mostrar 2
SELECT COUNT(*) FROM products;  -- Debe mostrar 15
```

---

## ⚙️ PASO 3: CONFIGURAR BACKEND

### Editar archivo de configuración

Abrir el archivo:
```
1000SABORESBACKEND\1000-sabores-backend\backend\src\main\resources\application.properties
```

**CAMBIAR estas líneas según tu configuración:**

```properties
# Tu usuario de MySQL (generalmente es 'root')
spring.datasource.username=root

# Tu contraseña de MySQL (en Laragon generalmente está VACÍA)
spring.datasource.password=

# Si usas una contraseña diferente en Laragon, cambiar aquí
```

**DEJAR el resto igual** (puerto 8080, contexto /api, etc.)

---

## 🎨 PASO 4: CONFIGURAR FRONTEND

Crear o editar el archivo `.env`:
```
1000SABORESBACKEND\1000-sabores-react\.env
```

**Contenido:**
```env
REACT_APP_API_URL=http://localhost:8080/api
```

---

## ✅ PASO 5: EJECUTAR EL PROYECTO

### Terminal 1 - BACKEND

```bash
# Navegar a la carpeta del backend
cd C:\Users\TUUSUARIO\Desktop\1000SABORESBACKEND\1000-sabores-backend\backend

# Ejecutar con Maven
.\mvnw spring-boot:run

# ✅ Esperar a ver "Tomcat started on port 8080"
```

### Terminal 2 - FRONTEND

```bash
# Abrir NUEVA terminal (no cerrar la anterior)

# Navegar a la carpeta del frontend
cd C:\Users\TUUSUARIO\Desktop\1000SABORESBACKEND\1000-sabores-react

# Primera vez: instalar dependencias (toma 5-10 minutos)
npm install

# Ejecutar
npm start

# ✅ Se abrirá navegador en http://localhost:3002
```

---

## 🎯 PASO 6: PROBAR QUE FUNCIONA

### Test 1: Login

1. Ir a http://localhost:3002/login
2. Usar credenciales:
   - **Email**: `admin@1000sabores.com`
   - **Contraseña**: `admin123`
3. ✅ Debe entrar al dashboard

### Test 2: Admin Panel

1. Después del login, ir a http://localhost:3002/admin
2. Debe ver la lista de productos
3. Intentar **crear/editar/eliminar** un producto
4. ✅ Debe funcionar sin errores 403

### Test 3: API (Swagger)

1. Ir a http://localhost:8080/api/swagger-ui/index.html
2. Probar endpoint: **POST /auth/login**
   - Email: `admin@1000sabores.com`
   - Contraseña: `admin123`
3. ✅ Debe retornar un token JWT

---

## 📊 USUARIOS Y CONTRASEÑAS

| Email | Contraseña | Rol |
|-------|------------|-----|
| `admin@1000sabores.com` | `admin123` | ADMIN |
| `usuario@test.com` | `usuario123` | USER |

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### ❌ "Network Error" en login

**Problema:** React no puede conectarse al backend

**Soluciones:**
1. Verificar que el backend está ejecutándose (Terminal con "Tomcat started on port 8080")
2. Verificar el archivo `.env` tiene `REACT_APP_API_URL=http://localhost:8080/api`
3. Si editaste `.env`, parar React (Ctrl+C), y ejecutar `npm start` de nuevo

### ❌ "Access denied for user 'root'"

**Problema:** Contraseña de MySQL incorrecta

**Solución:**
1. En Laragon, abrir **Preferences** (rueda de engranaje)
2. Ver la sección MySQL → ver contraseña
3. Actualizar en `application.properties`

### ❌ "Table 'mil_sabores.users' doesn't exist"

**Problema:** El script SQL no se ejecutó correctamente

**Solución:**
1. En HeidiSQL, eliminar base de datos: clic derecho en `mil_sabores` → Eliminar
2. Ejecutar el script de nuevo (Archivo → Cargar SQL)
3. Verificar que dice "Query executed successfully"

### ❌ "Cannot find module" en React

**Problema:** Falta instalar dependencias

**Solución:**
```bash
cd 1000sabores-react
rm -r node_modules
npm install
npm start
```

### ❌ Maven no funciona

**Problema:** `.\mvnw` no se reconoce

**Solución:**
```bash
# Usar mvn si Maven está instalado globalmente
mvn spring-boot:run

# O descargar Maven desde: https://maven.apache.org/download.cgi
```

---

## 📞 CONTACTO Y SOPORTE

Si tu amigo tiene problemas:

1. **Verificar que Laragon está ejecutándose** (ícono en bandeja de sistema)
2. **Verificar que el backend muestra "Tomcat started on port 8080"**
3. **Verificar que `.env` tiene la URL correcta**
4. **Limpiar cache**: `Ctrl+Shift+Delete` en navegador, borrar localStorage

---

## 📁 ESTRUCTURA FINAL

```
C:\Users\TUUSUARIO\Desktop\
└── 1000SABORESBACKEND\
    ├── SETUP-DATABASE-LARAGON.sql    ← Ejecutar este archivo
    ├── INSTRUCCIONES-PARA-AMIGO.md   ← Este archivo
    ├── 1000-sabores-backend\
    │   └── backend\
    │       ├── src\main\resources\
    │       │   └── application.properties   ← Editar credenciales aquí
    │       ├── pom.xml
    │       └── mvnw.cmd
    └── 1000-sabores-react\
        ├── .env                            ← Crear/editar aquí
        ├── package.json
        └── src\
```

---

## ✨ PRÓXIMOS PASOS (Opcional)

Una vez que todo funcione:

1. **Agregar más productos** desde el admin panel
2. **Crear cuenta de usuario** desde registro
3. **Hacer compras** (agregar al carrito → checkout)
4. **Implementar pasarela de pago**
5. **Deployar a producción** (Heroku, AWS, Digital Ocean, etc.)

---

**¡Listo! Tu amigo ya puede trabajar con el proyecto 1000 Sabores** 🎉

**Fecha**: Diciembre 2025  
**Versión**: 1.0  
**Stack**: Java 17 + Spring Boot 3.5.7 + React 18 + MySQL 8.4+
