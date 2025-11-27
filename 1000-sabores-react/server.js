const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para servir archivos estáticos del build
app.use(express.static(path.join(__dirname, 'build')));

// Para React Router - capturar todas las rutas y servir index.html
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, function() {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${port}`);
  console.log(`📱 Aplicación lista para producción`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'production'}`);
});