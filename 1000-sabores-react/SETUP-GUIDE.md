# 🚀 Guía de Configuración - 1000 Sabores

## 📦 Configuración en un Nuevo PC

### **PASO 1: Requisitos Previos**
Instalar en el nuevo PC:
```bash
# 1. Node.js (versión 16 o superior)
# Descargar desde: https://nodejs.org/

# 2. Git (si no está instalado)
# Descargar desde: https://git-scm.com/
```

### **PASO 2: Clonar el Repositorio**
```bash
# Clonar desde GitHub
git clone https://github.com/alkbil/1000SABORES.git

# Entrar al directorio
cd 1000SABORES
```

### **PASO 3: Instalar Dependencias**
```bash
# Instalar todas las dependencias del proyecto
npm install

# Esto instalará automáticamente:
# - React y React Router
# - SweetAlert2
# - Karma y Jasmine (para testing)
# - Express (para servidor)
# - Todas las demás dependencias
```

### **PASO 4: Verificar Instalación**
```bash
# Verificar que Node.js está instalado
node --version

# Verificar que npm está instalado
npm --version

# Verificar que las dependencias se instalaron
npm list --depth=0
```

### **PASO 5: Probar en Desarrollo**
```bash
# Ejecutar en modo desarrollo
npm start

# Debería abrir en: http://localhost:3000
```

### **PASO 6: Probar las Pruebas Unitarias**
```bash
# Ejecutar pruebas de Karma
npm run test:karma:headless

# Resultado esperado: ✅ 10/10 SUCCESS
```

### **PASO 7: Generar Build de Producción**
```bash
# Crear build optimizado
npm run build

# Esto genera la carpeta build/ con archivos optimizados
```

### **PASO 8: Ejecutar Servidor de Producción**
```bash
# Ejecutar servidor Express
npm run prod

# Aplicación disponible en: http://localhost:3000
```

## ✅ **Verificación Completa**

### **Checklist de Funcionamiento:**
- [ ] Node.js instalado (v16+)
- [ ] Repositorio clonado exitosamente
- [ ] `npm install` ejecutado sin errores
- [ ] `npm start` funciona (modo desarrollo)
- [ ] `npm run test:karma:headless` pasa todas las pruebas
- [ ] `npm run build` genera carpeta build/
- [ ] `npm run prod` ejecuta servidor de producción

### **Scripts Disponibles:**
```bash
npm start              # Desarrollo (localhost:3000)
npm run build          # Build de producción
npm run prod           # Servidor producción
npm run test           # Pruebas Jest (React)
npm run test:karma:single       # Pruebas Karma (una vez)
npm run test:karma:headless     # Pruebas Karma (CI/CD)
```

## 🔧 **Solución de Problemas Comunes**

### **Error: "npm not found"**
```bash
# Instalar Node.js desde https://nodejs.org/
# Reiniciar terminal después de la instalación
```

### **Error: "Module not found"**
```bash
# Borrar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### **Error: "Port 3000 already in use"**
```bash
# Cambiar puerto o matar proceso existente
npx kill-port 3000
# O usar otro puerto:
PORT=3001 npm start
```

### **Error en pruebas de Karma**
```bash
# Verificar que Chrome está instalado
# Las pruebas requieren Chrome/Chromium
npm run test:karma:headless
```

## 🌟 **Funcionalidades Garantizadas**

Al seguir esta guía, tendrás funcionando:

✅ **Aplicación React completa**
- Todas las páginas (Home, Products, Cart, etc.)
- Sistema de autenticación
- Carrito de compras funcional
- Formulario de pago completo

✅ **Sistema de Testing**
- 10 pruebas unitarias con Karma
- Validación de lógica de negocio
- Compatibilidad con CI/CD

✅ **Servidor de Producción**
- Express server optimizado
- Archivos estáticos servidos
- Ready para deployment

## 🚀 **Para Deployment en Producción**

Si quieres deployar en un servidor:

```bash
# 1. Generar build
npm run build

# 2. Subir carpeta build/ al servidor
# 3. Configurar servidor web (Nginx/Apache)
# 4. Apuntar a index.html en build/
```

## 📞 **Soporte**

Si encuentras problemas:
1. Verificar versión de Node.js (v16+)
2. Limpiar cache: `npm cache clean --force`
3. Reinstalar dependencias: `npm install`
4. Verificar internet para descargas

---

**¡Con esta guía tu proyecto funcionará en cualquier PC!** 🎉