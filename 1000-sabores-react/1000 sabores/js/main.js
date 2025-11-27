// main.js - Funcionalidad común a todas las páginas

/**
 * Inicialización general de la aplicación
 */
document.addEventListener('DOMContentLoaded', function() {
    inicializarNavegacion();
    actualizarContadorCarrito();
    inicializarTooltips();
    inicializarEventosGlobales();
});

/**
 * Inicializa la navegación y menús
 */
function inicializarNavegacion() {
    // Toggle de menús móviles
    const menuToggles = document.querySelectorAll('[data-toggle="menu"]');
    menuToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const target = this.dataset.target;
            const menu = document.querySelector(target);
            menu.classList.toggle('active');
        });
    });

    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Actualiza el contador del carrito en el header
 */
function actualizarContadorCarrito() {
    const contador = document.getElementById('carrito-count');
    if (contador) {
        const carrito = obtenerCarrito();
        const totalItems = carrito.reduce((total, producto) => total + producto.cantidad, 0);
        contador.textContent = totalItems;
    }
}

/**
 * Inicializa tooltips
 */
function inicializarTooltips() {
    const elements = document.querySelectorAll('[data-tooltip]');
    elements.forEach(el => {
        el.addEventListener('mouseenter', mostrarTooltip);
        el.addEventListener('mouseleave', ocultarTooltip);
    });
}

/**
 * Muestra tooltip
 */
function mostrarTooltip(e) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = this.dataset.tooltip;
    document.body.appendChild(tooltip);
    
    const rect = this.getBoundingClientRect();
    tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
    tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
}

/**
 * Oculta tooltip
 */
function ocultarTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

/**
 * Eventos globales
 */
function inicializarEventosGlobales() {
    // Cerrar menús al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.menu') && !e.target.closest('[data-toggle="menu"]')) {
            document.querySelectorAll('.menu.active').forEach(menu => {
                menu.classList.remove('active');
            });
        }
    });

    // Prevenir envío de formularios no válidos
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!this.checkValidity()) {
                e.preventDefault();
                this.classList.add('was-validated');
            }
        });
    });
}

/**
 * Formatear precio
 */
function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(precio);
}

/**
 * Mostrar notificación
 */
function mostrarNotificacion(mensaje, tipo = 'success') {
    // Puedes integrar SweetAlert2 o crear notificaciones nativas
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            icon: tipo,
            title: mensaje,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });
    } else {
        // Notificación nativa de respaldo
        const notification = document.createElement('div');
        notification.className = `notification notification-${tipo}`;
        notification.textContent = mensaje;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}