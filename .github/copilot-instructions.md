# Copilot Instructions for 1000 Sabores E-commerce

## Architecture Overview

This is a vanilla JavaScript e-commerce website for a bakery using localStorage for data persistence and client-side routing. The architecture follows a modular pattern with separate concerns:

- **Frontend-only**: No backend server - all data persists in browser localStorage
- **Modular CSS**: Base `styles.css` imports specialized stylesheets (`carrito.css`, `admin.css`, etc.)
- **JavaScript modules**: Each page has dedicated JS file (`carrito.js`, `auth.js`, `productos.js`, etc.)

## Key Data Patterns

### LocalStorage Schema
```javascript
// User management
localStorage.setItem('usuarios', JSON.stringify([{email, password, nombre, fechaRegistro}]))
localStorage.setItem('usuarioActual', JSON.stringify(user)) // Current session

// Shopping cart
localStorage.setItem('carrito', JSON.stringify([{id, nombre, precio, cantidad}]))
```

### Common Functions (helpers.js)
- `obtenerCarrito()` / `guardarCarrito()` - Cart state management
- `validarFormulario()` - Universal form validation with error display
- `formatearPrecio()` - Price formatting with error handling

## Authentication Flow

1. **Registration**: `validaciones.js` + `auth.js` handle form validation and user creation
2. **Login**: Multiple implementations exist - use `auth.js` pattern for consistency
3. **Session management**: Check `localStorage.getItem('usuarioActual')` for authentication
4. **Cart access**: `verificarLogin()` in `carrito.js` redirects unauthenticated users

## Development Patterns

### Form Validation
- Use `validarFormulario(form)` from `helpers.js` for consistent validation
- Error display pattern: `<small class="error" id="${fieldName}Error"></small>`
- SweetAlert2 for user feedback: `Swal.fire(title, text, icon)`

### Cart Operations
- Always call `actualizarContadorCarrito()` after cart modifications
- Price validation: Convert to `parseFloat()` and check `isNaN()` before operations
- Use `toggleEstadoCarrito()` to show/hide empty states

### CSS Architecture
- Colors defined in `css/variables.css` (--rosa, --crema, --celeste, --marron, --blanco)
- Page-specific styles in dedicated files imported by `styles.css`
- Admin interface uses separate `admin.css` with dark sidebar theme

## Page-Specific Notes

### Admin Panel (`admin.html`)
- Uses sidebar navigation with FontAwesome icons
- Separate styling system from main site
- Static dashboard - no dynamic data loading implemented

### Product Management
- Product data hardcoded in HTML (`productos.html`)
- Add to cart: `data-id`, `data-nombre`, `data-precio` attributes required
- Cart updates trigger counter refresh automatically

## Critical Files
- `js/main.js` - Global initialization, navigation, tooltips
- `js/carrito.js` - Core e-commerce functionality
- `js/auth.js` - Clean authentication pattern (prefer over inline scripts)
- `css/variables.css` - Brand color system
- `js/helpers.js` - Reusable utility functions

## Conventions
- Spanish language throughout (variable names, comments, UI text)
- Emoji icons in navigation (🍰, 🛒, 👤)
- SweetAlert2 for all user notifications
- Event delegation pattern: `document.addEventListener('DOMContentLoaded')`