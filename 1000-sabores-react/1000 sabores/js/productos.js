// productos.js - Funcionalidad específica de la página de productos

/**
 * Inicializar funcionalidad de productos
 */
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.catalogo')) {
        inicializarProductos();
    }
});

/**
 * Inicializar eventos de productos
 */
function inicializarProductos() {
    // Eventos para botones de agregar al carrito
    const botonesAgregar = document.querySelectorAll('.agregar');
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarProductoAlCarrito);
    });

    // Filtros de productos (si existen)
    const filtros = document.querySelectorAll('[data-filtro]');
    filtros.forEach(filtro => {
        filtro.addEventListener('change', filtrarProductos);
    });

    // Búsqueda de productos (si existe)
    const buscador = document.querySelector('[data-buscador]');
    if (buscador) {
        buscador.addEventListener('input', buscarProductos);
    }
}

/**
 * Agregar producto al carrito
 */
function agregarProductoAlCarrito(e) {
    const boton = e.currentTarget;
    const id = boton.dataset.id;
    const nombre = boton.dataset.nombre;
    const precio = parseFloat(boton.dataset.precio);

    let carrito = obtenerCarrito();

    // Buscar si ya existe
    const productoExistente = carrito.find(p => p.id === id);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ 
            id, 
            nombre, 
            precio, 
            cantidad: 1,
            imagen: obtenerImagenProducto(id)
        });
    }

    guardarCarrito(carrito);
    actualizarContadorCarrito();
    
    // Mostrar feedback visual
    mostrarFeedbackAgregado(boton);
    mostrarNotificacion(`"${nombre}" se añadió al carrito 🛒`);
}

/**
 * Obtener imagen del producto
 */
function obtenerImagenProducto(id) {
    const producto = document.querySelector(`.agregar[data-id="${id}"]`);
    if (producto) {
        const img = producto.closest('.producto').querySelector('img');
        return img ? img.src : '';
    }
    return '';
}

/**
 * Feedback visual al agregar producto
 */
function mostrarFeedbackAgregado(boton) {
    boton.classList.add('agregado');
    setTimeout(() => {
        boton.classList.remove('agregado');
    }, 1000);
}

/**
 * Filtrar productos
 */
function filtrarProductos(e) {
    const filtro = e.target.value;
    const productos = document.querySelectorAll('.producto');
    
    productos.forEach(producto => {
        const categoria = producto.dataset.categoria;
        if (filtro === 'todos' || categoria === filtro) {
            producto.style.display = 'block';
        } else {
            producto.style.display = 'none';
        }
    });
}

/**
 * Buscar productos
 */
function buscarProductos(e) {
    const termino = e.target.value.toLowerCase();
    const productos = document.querySelectorAll('.producto');
    
    productos.forEach(producto => {
        const nombre = producto.querySelector('h3').textContent.toLowerCase();
        const descripcion = producto.querySelector('.atributos')?.textContent.toLowerCase() || '';
        
        if (nombre.includes(termino) || descripcion.includes(termino)) {
            producto.style.display = 'block';
        } else {
            producto.style.display = 'none';
        }
    });
}