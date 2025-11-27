// helpers.js - Funciones utilitarias

/**
 * Obtener carrito de localStorage
 */
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

/**
 * Guardar carrito en localStorage
 */
function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
}

/**
 * Validar formulario
 */
function validarFormulario(formulario) {
    let esValido = true;
    formulario.classList.add('was-validated');
    
    // Limpiar errores anteriores
    const errores = formulario.querySelectorAll('.error');
    errores.forEach(error => error.textContent = '');
    
    // Validar cada campo
    const campos = formulario.querySelectorAll('[required]');
    campos.forEach(campo => {
        if (!campo.checkValidity()) {
            mostrarError(campo.name, obtenerMensajeError(campo));
            esValido = false;
        }
    });
    
    return esValido;
}

/**
 * Mostrar error en formulario
 */
function mostrarError(campoId, mensaje) {
    const errorElement = document.getElementById(`${campoId}Error`);
    if (errorElement) {
        errorElement.textContent = mensaje;
    }
}

/**
 * Obtener mensaje de error personalizado
 */
function obtenerMensajeError(campo) {
    if (campo.validity.valueMissing) {
        return 'Este campo es obligatorio';
    }
    
    if (campo.validity.typeMismatch) {
        if (campo.type === 'email') {
            return 'Por favor ingresa un email válido';
        }
    }
    
    if (campo.validity.tooShort) {
        return `Mínimo ${campo.minLength} caracteres`;
    }
    
    return 'Campo inválido';
}

/**
 * Debounce function para optimizar eventos
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Formatear fecha
 */
function formatearFecha(fecha, formato = 'es-CL') {
    return new Intl.DateTimeFormat(formato, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(fecha));
}

/**
 * Generar ID único
 */
function generarId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}