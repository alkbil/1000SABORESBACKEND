// auth.js - Manejo de autenticación y usuarios

/**
 * Inicializar funcionalidad de autenticación
 */
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('loginForm')) {
        inicializarLogin();
    }
    
    if (document.getElementById('registroForm')) {
        inicializarRegistro();
    }
    
    verificarAutenticacion();
});

/**
 * Inicializar formulario de login
 */
function inicializarLogin() {
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validarFormulario(this)) {
            const email = this.email.value;
            const password = this.password.value;
            
            iniciarSesion(email, password);
        }
    });
}

/**
 * Inicializar formulario de registro
 */
function inicializarRegistro() {
    const form = document.getElementById('registroForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validarFormulario(this)) {
            if (this.password.value !== this.confirmPassword.value) {
                mostrarError('confirmPassword', 'Las contraseñas no coinciden');
                return;
            }
            
            const usuario = {
                nombre: this.nombre.value,
                email: this.email.value,
                password: this.password.value
            };
            
            registrarUsuario(usuario);
        }
    });
}

/**
 * Iniciar sesión
 */
function iniciarSesion(email, password) {
    // Simular autenticación (en un caso real, sería una API)
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find(u => u.email === email && u.password === password);
    
    if (usuario) {
        localStorage.setItem('usuarioActual', JSON.stringify(usuario));
        mostrarNotificacion('¡Bienvenido de nuevo!', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } else {
        mostrarNotificacion('Credenciales incorrectas', 'error');
    }
}

/**
 * Registrar usuario
 */
function registrarUsuario(usuario) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    
    // Verificar si el email ya existe
    if (usuarios.some(u => u.email === usuario.email)) {
        mostrarNotificacion('Este email ya está registrado', 'error');
        return;
    }
    
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    localStorage.setItem('usuarioActual', JSON.stringify(usuario));
    
    mostrarNotificacion('¡Cuenta creada exitosamente!', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

/**
 * Verificar autenticación
 */
function verificarAutenticacion() {
    const usuario = JSON.parse(localStorage.getItem('usuarioActual') || 'null');
    
    if (usuario) {
        actualizarUIautenticado(usuario);
    } else {
        actualizarUInoAutenticado();
    }
}

/**
 * Actualizar UI cuando está autenticado
 */
function actualizarUIautenticado(usuario) {
    const elementosLogin = document.querySelectorAll('.login-required');
    const elementosNoLogin = document.querySelectorAll('.no-login');
    
    elementosLogin.forEach(el => el.style.display = 'block');
    elementosNoLogin.forEach(el => el.style.display = 'none');
    
    // Actualizar nombre de usuario si existe el elemento
    const nombreUsuario = document.querySelector('.nombre-usuario');
    if (nombreUsuario) {
        nombreUsuario.textContent = usuario.nombre;
    }
}

/**
 * Actualizar UI cuando no está autenticado
 */
function actualizarUInoAutenticado() {
    const elementosLogin = document.querySelectorAll('.login-required');
    const elementosNoLogin = document.querySelectorAll('.no-login');
    
    elementosLogin.forEach(el => el.style.display = 'none');
    elementosNoLogin.forEach(el => el.style.display = 'block');
}

/**
 * Cerrar sesión
 */
function cerrarSesion() {
    localStorage.removeItem('usuarioActual');
    mostrarNotificacion('Sesión cerrada', 'info');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}