# 🍰 1000 Sabores - Pastelería Online

Una aplicación web moderna desarrollada en React para la pastelería "1000 Sabores", featuring un catálogo de productos, sistema de carrito de compras, blog y formularios de contacto.

## 🚀 Características

- ✅ **Catálogo de Productos**: Navegación intuitiva con productos organizados en categorías
- ✅ **Carrito de Compras**: Sistema completo de carrito con localStorage
- ✅ **Autenticación**: Sistema de login y registro de usuarios
- ✅ **Blog**: Sección de artículos sobre repostería y consejos
- ✅ **Formularios**: Contacto y registro con validaciones
- ✅ **Responsive Design**: Optimizado para móvil, tablet y desktop
- ✅ **Performance**: Build optimizado para producción

## 🛠️ Tecnologías

- **Frontend**: React 19.2.0 + React Router 7.9.4
- **UI/UX**: CSS Custom + Responsive Design
- **Notifications**: SweetAlert2 11.26.3
- **Build Tool**: Create React App
- **Server**: Express.js 4.21.2

## 📋 Prerequisitos

- Node.js 18+ 
- npm 9+

## 🔧 Instalación

```bash
# Clonar el repositorio
git clone [tu-repositorio]
cd 1000-sabores-react

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm start
```

La aplicación estará disponible en `http://localhost:3002`

## 📝 Scripts Disponibles

```bash
npm start          # Servidor de desarrollo
npm run build      # Build de producción  
npm test           # Ejecutar tests
npm run serve      # Build + servidor de producción
node server.js     # Solo servidor de producción
```

## 🏗️ Build de Producción

```bash
# Generar build optimizado
npm run build

# Servir build de producción
npm run serve
```

### Métricas del Build
- **JavaScript**: 105.09 kB (gzipped)
- **CSS**: 4.71 kB (gzipped)
- **Total**: ~110 kB (gzipped)

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── auth/           # Componentes de autenticación
│   ├── cart/           # Componentes del carrito
│   └── common/         # Componentes reutilizables
├── contexts/           # Context API (Auth, Cart)
├── hooks/              # Custom hooks
├── pages/              # Páginas principales
├── styles/             # CSS por componente
└── utils/              # Utilidades y helpers
```

## 🌐 Páginas

| Ruta | Descripción | Estado |
|------|-------------|--------|
| `/` | Página principal con productos destacados | ✅ |
| `/productos` | Catálogo completo de productos | ✅ |
| `/nosotros` | Historia y misión de la empresa | ✅ |
| `/blog` | Artículos y consejos de repostería | ✅ |
| `/contacto` | Formulario de contacto | ✅ |
| `/carrito` | Carrito de compras | ✅ |
| `/login` | Inicio de sesión | ✅ |
| `/registro` | Registro de usuarios | ✅ |

## 🎨 Diseño

### Paleta de Colores
```css
--rosa: #d2691e        /* Naranja cálido */
--crema: #f5f5dc       /* Beige claro */
--celeste: #87ceeb     /* Azul cielo */
--marron: #8b4513      /* Marrón chocolate */
--blanco: #ffffff      /* Blanco puro */
```

### Tipografías
- **Headers**: 'Quicksand', sans-serif
- **Body**: 'Inter', sans-serif

## 🛒 Funcionalidades del Carrito

- Agregar/eliminar productos
- Modificar cantidades
- Persistencia en localStorage
- Formulario de checkout completo
- Validaciones de campos
- Cálculo automático de totales

## 🔐 Sistema de Autenticación

- Registro con validación de email
- Login con credenciales guardadas
- Sesión persistente en localStorage
- Protección de rutas del carrito

## 📱 Responsive Design

- **Mobile First**: Diseño optimizado para móvil
- **Breakpoints**: 
  - Mobile: < 768px
  - Tablet: 768px - 1024px  
  - Desktop: > 1024px

## 🚀 Despliegue

### Desarrollo Local
```bash
npm start  # http://localhost:3002
```

### Producción Local
```bash
npm run serve  # http://localhost:3000
```

### AWS EC2 (Recomendado)
Ver documentación completa en [`BUILD.md`](./BUILD.md)

## 🔄 Estado del Proyecto

### ✅ Completado
- [x] Migración completa de vanilla JS a React
- [x] Todas las páginas funcionales
- [x] Sistema de carrito operativo
- [x] Formularios con validaciones
- [x] Responsive design implementado
- [x] Build de producción optimizado
- [x] Servidor Express configurado

### 🔄 En Desarrollo
- [ ] Tests unitarios
- [ ] Service Worker (PWA)
- [ ] Optimización de imágenes

### 🎯 Futuras Mejoras
- [ ] Backend API real
- [ ] Base de datos
- [ ] Pasarela de pagos
- [ ] Panel de administración

## 📞 Soporte

Para issues o preguntas sobre el proyecto, crear un issue en el repositorio.

---

**Versión**: 1.0.0  
**Última actualización**: 26 de Octubre 2025  
**Estado**: ✅ Production Ready

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
