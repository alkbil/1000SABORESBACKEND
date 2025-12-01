# 1000 SABORES - E-commerce Completo 🍰

![Status](https://img.shields.io/badge/status-ready-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Version](https://img.shields.io/badge/version-1.0-blue)

**Stack Full Stack completo para panadería/pastelería e-commerce con autenticación JWT, panel admin, carrito de compras y más.**

---

## 🎯 Características Principales

### ✅ Frontend (React 18)
- 🎨 Diseño responsive moderno
- 🔐 Autenticación con JWT
- 🛒 Carrito de compras persistente
- 👤 Gestión de usuario
- 📱 Mobile-first design
- 🔔 SweetAlert2 para notificaciones

### ✅ Backend (Spring Boot 3.5.7)
- 🔒 Seguridad con Spring Security + JWT
- 📦 API REST completa
- 📊 Base de datos relacional (MySQL)
- 📖 Swagger/OpenAPI documentado
- ✔️ Validaciones robustas
- 🔄 CORS configurado

### ✅ Funcionalidades
- 👥 Registro e login de usuarios
- 👨‍💼 Panel admin para gestionar productos
- 🛍️ Catálogo de productos por categoría
- 🛒 Carrito de compra con cálculo automático
- 📦 Sistema de órdenes
- 🔐 Control de acceso basado en roles (RBAC)

---

## 📋 Requisitos Previos

Antes de empezar, asegúrate de tener instalado:

- **Java 17+** ([descargar](https://www.oracle.com/java/technologies/downloads/))
- **MySQL 8.0+** o **Laragon** ([descargar](https://laragon.org/))
- **Node.js 16+** ([descargar](https://nodejs.org/))
- **Git** ([descargar](https://git-scm.com/))

Verificar instalación:
```bash
java -version
node --version
npm --version
git --version
```

---

## 🚀 Instalación Rápida

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/alkbil/1000SABORESBACKEND.git
cd 1000SABORESBACKEND
```

### 2️⃣ Configurar Base de Datos

**Opción A: Con Laragon (RECOMENDADO)**
1. Abrir Laragon → Tools → HeidiSQL
2. Archivo → Cargar SQL → `SETUP-DATABASE-LARAGON.sql`
3. Ejecutar (F9)

**Opción B: Línea de comandos**
```bash
mysql -u root -p < SETUP-DATABASE-LARAGON.sql
```

### 3️⃣ Configurar Backend

Editar: `1000-sabores-backend/backend/src/main/resources/application.properties`

```properties
spring.datasource.username=root
spring.datasource.password=  # tu_password_mysql
```

### 4️⃣ Configurar Frontend

Crear/editar: `1000-sabores-react/.env`
```env
REACT_APP_API_URL=http://localhost:8080/api
```

### 5️⃣ Ejecutar

**Terminal 1 - Backend:**
```bash
cd 1000-sabores-backend/backend
.\mvnw spring-boot:run
```

**Terminal 2 - Frontend:**
```bash
cd 1000-sabores-react
npm install
npm start
```

✅ Abrir http://localhost:3002

---

## 👤 Credenciales Precargadas

| Email | Contraseña | Rol |
|-------|------------|-----|
| `admin@1000sabores.com` | `admin123` | 👨‍💼 Admin |
| `usuario@test.com` | `usuario123` | 👤 Usuario |

---

## 📚 Documentación Completa

- 📖 **[INSTRUCCIONES-PARA-AMIGO.md](./INSTRUCCIONES-PARA-AMIGO.md)** - Guía paso a paso para instalación
- 🗄️ **[SETUP-DATABASE-LARAGON.sql](./SETUP-DATABASE-LARAGON.sql)** - Script SQL completo
- 📋 **[INSTRUCCIONES-MIGRACION.md](./INSTRUCCIONES-MIGRACION.md)** - Guía de migración
- 📚 **[Swagger API](http://localhost:8080/api/swagger-ui/index.html)** - Documentación interactiva

---

## 📁 Estructura del Proyecto

```
1000SABORESBACKEND/
├── 1000-sabores-backend/
│   └── backend/                           # Spring Boot Application
│       ├── src/main/java/.../
│       │   ├── config/                   # SecurityConfig, JwtUtil, etc.
│       │   ├── controller/               # AuthController, ProductController, etc.
│       │   ├── entity/                   # User, Product, Order
│       │   ├── service/                  # UserService, ProductService
│       │   └── repository/               # JPARepositories
│       ├── src/main/resources/
│       │   ├── application.properties    # Configuración principal
│       │   ├── init.sql                  # Inicialización BD
│       │   └── data.sql                  # Datos de prueba
│       └── pom.xml                       # Dependencias Maven
│
├── 1000-sabores-react/
│   ├── src/
│   │   ├── pages/                        # Páginas (Home, Admin, Login, etc.)
│   │   ├── components/                   # Componentes reutilizables
│   │   ├── contexts/                     # AuthContext, CartContext
│   │   ├── services/                     # API service, Axios config
│   │   └── styles/                       # CSS variables y estilos
│   ├── public/img/                       # Imágenes de productos
│   ├── .env                              # Variables de entorno
│   └── package.json
│
├── SETUP-DATABASE-LARAGON.sql           # Script SQL para crear BD
├── INSTRUCCIONES-PARA-AMIGO.md          # Guía de instalación
└── README.md                             # Este archivo
```

---

## 🔄 Flujo de Autenticación

```
1. Usuario ingresa credenciales (email, password)
   ↓
2. AuthController valida credenciales
   ↓
3. Si son correctas, genera JWT Token (24 horas)
   ↓
4. Frontend guarda token en localStorage
   ↓
5. Cada request incluye: Authorization: Bearer {token}
   ↓
6. JwtAuthenticationFilter valida el token
   ↓
7. SecurityContext se puebla con autoridades del usuario
   ↓
8. @PreAuthorize verifica si usuario es ADMIN
```

---

## 🛡️ Seguridad Implementada

- ✅ **Contraseñas hasheadas** con BCrypt
- ✅ **JWT Tokens** con expiración
- ✅ **CORS** configurado para orígenes permitidos
- ✅ **CSRF** deshabilitado (API stateless)
- ✅ **Spring Security** con roles RBAC
- ✅ **Validaciones** en Frontend + Backend
- ✅ **Inyección SQL** prevenida con JPA

---

## 📊 Endpoints Disponibles

### Autenticación
- `POST /auth/register` - Registrar nuevo usuario
- `POST /auth/login` - Login (retorna JWT)
- `GET /auth/me` - Obtener datos del usuario autenticado

### Productos
- `GET /products` - Listar todos (público)
- `GET /products/{id}` - Ver detalle (público)
- `POST /products` - Crear (ADMIN)
- `PUT /products/{id}` - Editar (ADMIN)
- `DELETE /products/{id}` - Eliminar (ADMIN)

### Órdenes
- `GET /orders` - Listar órdenes (ADMIN)
- `POST /orders` - Crear orden
- `GET /orders/{id}` - Ver detalle orden

Ver todos en: http://localhost:8080/api/swagger-ui/html

---

## 🐛 Troubleshooting

### ❌ "Network Error" en login
```
✓ Verificar que backend está ejecutándose
✓ Verificar .env tiene REACT_APP_API_URL=http://localhost:8080/api
✓ Parar React (Ctrl+C), ejecutar npm start de nuevo
```

### ❌ "Access denied for user 'root'"
```
✓ Verificar contraseña MySQL en application.properties
✓ En Laragon: Preferences → MySQL password
```

### ❌ "Table 'mil_sabores.users' doesn't exist"
```
✓ Ejecutar SETUP-DATABASE-LARAGON.sql en HeidiSQL
✓ Verificar que el script se ejecutó sin errores
```

### ❌ "Cannot find module" en React
```
✓ Ejecutar: npm install
✓ Eliminar carpeta node_modules: rm -r node_modules
✓ Instalar de nuevo: npm install
```

---

## 📈 Próximas Mejoras

- [ ] Implementar pasarela de pago (Stripe/MercadoPago)
- [ ] Email de confirmación
- [ ] Recuperación de contraseña
- [ ] Calificaciones y comentarios
- [ ] Wishlist de productos
- [ ] Sistema de cupones/descuentos
- [ ] Dashboard analytics para admin
- [ ] Deploy en producción (AWS/Heroku/DigitalOcean)

---

## 🤝 Contribuir

1. Hacer fork del proyecto
2. Crear rama para nueva funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

---

## 📄 Licencia

Este proyecto está bajo licencia MIT - Ver archivo [LICENSE](LICENSE) para detalles.

---

## 👨‍💻 Autor

Desarrollado con ❤️ para 1000 Sabores E-commerce

**Versión**: 1.0  
**Fecha**: Diciembre 2025  
**Stack**: Java 17 + Spring Boot 3.5.7 + React 18 + MySQL 8.4+

---

## 📞 Soporte

Para problemas o preguntas:
1. Revisar [INSTRUCCIONES-PARA-AMIGO.md](./INSTRUCCIONES-PARA-AMIGO.md)
2. Revisar sección Troubleshooting arriba
3. Abrir un Issue en GitHub

---

**¡Gracias por usar 1000 Sabores!** 🎉
