
function verificarLogin() {
    if (!localStorage.getItem('usuarioActual')) {
        Swal.fire({
            title: 'Inicia sesión',
            text: 'Debes iniciar sesión para ver el carrito',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Iniciar sesión',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = 'login.html';
            } else {
                window.location.href = 'productos.html';
            }
        });
        return false;
    }
    return true;
}

// En tu función de procesar pago, añade al inicio:
function procesarPago() {
    if (!verificarLogin()) return;
    // ... el resto de tu código
}

// ===== FUNCIONES BÁSICAS =====
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
  const carrito = obtenerCarrito();
  const totalItems = carrito.reduce((total, producto) => total + producto.cantidad, 0);
  const contador = document.getElementById("carrito-count");
  if (contador) {
    contador.textContent = totalItems;
  }
}

function formatearPrecio(precio) {
  // Asegurarse de que el precio sea un número válido
  const precioNumerico = parseFloat(precio);
  
  if (isNaN(precioNumerico)) {
    console.error('Precio no válido:', precio);
    return '$0.00';
  }
  
  return `$${precioNumerico.toFixed(2)}`;
}

function calcularTotal(carrito) {
  return carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
}

function toggleEstadoCarrito() {
  const carrito = obtenerCarrito();
  const carritoVacio = document.getElementById("carrito-vacio");
  const carritoContenido = document.getElementById("carrito-contenido");
  
  if (carrito.length === 0) {
    carritoVacio.classList.remove("oculto");
    carritoContenido.classList.add("oculto");
  } else {
    carritoVacio.classList.add("oculto");
    carritoContenido.classList.remove("oculto");
  }
}

// ===== FUNCIONALIDAD DEL CARRITO =====
function agregarProductoAlCarrito(id, nombre, precio) {
  let carrito = obtenerCarrito();
  
  // Convertir precio a número y validar
  const precioNumerico = parseFloat(precio);
  if (isNaN(precioNumerico)) {
    console.error('Precio no válido al agregar producto:', precio);
    Swal.fire('Error', 'Hubo un problema al agregar el producto', 'error');
    return;
  }
  
  // Buscar si ya existe
  const productoExistente = carrito.find(p => p.id === id);
  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({ 
      id, 
      nombre, 
      precio: precioNumerico, // Usar el precio convertido a número
      cantidad: 1 
    });
  }

  guardarCarrito(carrito);
  
  Swal.fire({
    title: '¡Producto agregado!',
    text: `"${nombre}" se añadió al carrito 🛒`,
    icon: 'success',
    confirmButtonText: 'Genial 😍'
  });
}

function manejarClickAgregar(e) {
  const boton = e.currentTarget;
  const id = boton.dataset.id;
  const nombre = boton.dataset.nombre;
  const precio = boton.dataset.precio;
  
  // Debug: verificar los valores
  console.log('Agregando producto:', { id, nombre, precio });
  
  agregarProductoAlCarrito(id, nombre, precio);
}

// ===== INICIALIZACIÓN =====
function inicializarBotonesAgregar() {
  const botones = document.querySelectorAll(".agregar");
  botones.forEach(boton => {
    // Remover event listeners existentes para evitar duplicación
    boton.removeEventListener("click", manejarClickAgregar);
    // Agregar el event listener
    boton.addEventListener("click", manejarClickAgregar);
  });
}

function inicializarCarrito() {
  mostrarCarrito();
  actualizarContadorCarrito();

  // Eventos para métodos de envío
  const opcionesEnvio = document.querySelectorAll('input[name="envio"]');
  opcionesEnvio.forEach(opcion => {
    opcion.addEventListener("change", actualizarResumenPago);
  });

  // Eventos para métodos de pago
  const opcionesPago = document.querySelectorAll('input[name="pago"]');
  opcionesPago.forEach(opcion => {
    opcion.addEventListener("change", function() {
      const datosTarjeta = document.getElementById("datosTarjeta");
      if (this.value === "tarjeta") {
        datosTarjeta.classList.remove("oculto");
      } else {
        datosTarjeta.classList.add("oculto");
      }
    });
  });

  // Evento para procesar pago
  const btnProcesarPago = document.getElementById("procesarPago");
  if (btnProcesarPago) {
    btnProcesarPago.addEventListener("click", procesarPago);
  }

  // Formatear inputs de tarjeta
  const numeroTarjeta = document.getElementById("numeroTarjeta");
  if (numeroTarjeta) {
    numeroTarjeta.addEventListener("input", function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 16) value = value.slice(0, 16);
      
      let formatted = '';
      for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) formatted += ' ';
        formatted += value[i];
      }
      
      e.target.value = formatted;
    });
  }

  const fechaExpiracion = document.getElementById("fechaExpiracion");
  if (fechaExpiracion) {
    fechaExpiracion.addEventListener("input", function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 4) value = value.slice(0, 4);
      
      if (value.length > 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
      }
      
      e.target.value = value;
    });
  }

  const cvv = document.getElementById("cvv");
  if (cvv) {
    cvv.addEventListener("input", function(e) {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
    });
  }
}

// ===== MOSTRAR CARRITO =====
function mostrarCarrito() {
  const listaCarrito = document.getElementById("listaCarrito");
  const totalTexto = document.getElementById("total");
  const vaciarBtn = document.getElementById("vaciarCarrito");
  const continuarBtn = document.getElementById("continuarPago");

  if (!listaCarrito) return;

  const carrito = obtenerCarrito();
  listaCarrito.innerHTML = "";

  if (carrito.length === 0) {
    toggleEstadoCarrito();
    return;
  }

  let total = 0;

  carrito.forEach((producto, index) => {
    const item = document.createElement("div");
    item.className = "carrito-item";
    item.innerHTML = `
      <div class="carrito-item-info">
        <div class="carrito-item-nombre">${producto.nombre}</div>
        <div class="carrito-item-precio">${formatearPrecio(producto.precio)} c/u</div>
      </div>
      <div class="carrito-item-cantidad">
        <button class="cantidad-btn disminuir" data-index="${index}">-</button>
        <span class="cantidad-texto">${producto.cantidad}</span>
        <button class="cantidad-btn aumentar" data-index="${index}">+</button>
      </div>
      <div class="carrito-item-total">${formatearPrecio(producto.precio * producto.cantidad)}</div>
      <button class="eliminar" data-index="${index}">❌</button>
    `;
    listaCarrito.appendChild(item);
    total += producto.precio * producto.cantidad;
  });

  totalTexto.textContent = `Total: ${formatearPrecio(total)}`;
  toggleEstadoCarrito();
  actualizarResumenPago();

  // Botones de cantidad
  document.querySelectorAll(".disminuir").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      let carrito = obtenerCarrito();
      if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
      } else {
        carrito.splice(index, 1);
      }
      guardarCarrito(carrito);
      mostrarCarrito();
    });
  });

  document.querySelectorAll(".aumentar").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      let carrito = obtenerCarrito();
      carrito[index].cantidad++;
      guardarCarrito(carrito);
      mostrarCarrito();
    });
  });

  // Botón eliminar producto
  document.querySelectorAll(".eliminar").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      let carrito = obtenerCarrito();
      carrito.splice(index, 1);
      guardarCarrito(carrito);
      mostrarCarrito();
    });
  });

  // Vaciar carrito
  if (vaciarBtn) {
    vaciarBtn.addEventListener("click", () => {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "Se eliminarán todos los productos del carrito",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d2691e',
        cancelButtonColor: '#9b7d5e',
        confirmButtonText: 'Sí, vaciar carrito',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("carrito");
          mostrarCarrito();
          actualizarContadorCarrito();
          Swal.fire(
            '¡Carrito vacío!',
            'Tu carrito ha sido vaciado',
            'success'
          );
        }
      });
    });
  }

  // Continuar con el pago
  if (continuarBtn) {
    continuarBtn.addEventListener("click", () => {
      document.getElementById("seccionPago").classList.remove("oculto");
      continuarBtn.classList.add("oculto");
      window.scrollTo({
        top: document.getElementById("seccionPago").offsetTop - 20,
        behavior: 'smooth'
      });
    });
  }
}

// ===== PAGO =====
function actualizarResumenPago() {
  const carrito = obtenerCarrito();
  const subtotal = calcularTotal(carrito);
  
  const envioSeleccionado = document.querySelector('input[name="envio"]:checked');
  let costoEnvio = 0;
  
  if (envioSeleccionado) {
    switch(envioSeleccionado.value) {
      case "estandar":
        costoEnvio = 5;
        break;
      case "express":
        costoEnvio = 10;
        break;
      default:
        costoEnvio = 0;
    }
  }
  
  const total = subtotal + costoEnvio;
  
  document.getElementById("resumen-subtotal").textContent = formatearPrecio(subtotal);
  document.getElementById("resumen-envio").textContent = formatearPrecio(costoEnvio);
  document.getElementById("resumen-total").textContent = formatearPrecio(total);
}

function validarFormularioPago() {
  const metodoPago = document.querySelector('input[name="pago"]:checked').value;
  
  if (metodoPago === "tarjeta") {
    const numeroTarjeta = document.getElementById("numeroTarjeta").value.replace(/\s/g, '');
    const fechaExpiracion = document.getElementById("fechaExpiracion").value;
    const cvv = document.getElementById("cvv").value;
    const nombreTitular = document.getElementById("nombreTitular").value;
    
    if (!/^\d{16}$/.test(numeroTarjeta)) {
      Swal.fire('Error', 'Por favor ingresa un número de tarjeta válido (16 dígitos)', 'error');
      return false;
    }
    
    if (!/^\d{2}\/\d{2}$/.test(fechaExpiracion)) {
      Swal.fire('Error', 'Por favor ingresa una fecha de expiración válida (MM/AA)', 'error');
      return false;
    }
    
    if (!/^\d{3}$/.test(cvv)) {
      Swal.fire('Error', 'Por favor ingresa un CVV válido (3 dígitos)', 'error');
      return false;
    }
    
    if (nombreTitular.trim().length < 3) {
      Swal.fire('Error', 'Por favor ingresa el nombre del titular de la tarjeta', 'error');
      return false;
    }
  }
  
  return true;
}

function procesarPago() {
  if (!validarFormularioPago()) return;
  
  Swal.fire({
    title: 'Procesando pago...',
    text: 'Por favor espera mientras procesamos tu pedido',
    icon: 'info',
    showConfirmButton: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });
  
  setTimeout(() => {
    const carrito = obtenerCarrito();
    const metodoPago = document.querySelector('input[name="pago"]:checked').value;
    const metodoEnvio = document.querySelector('input[name="envio"]:checked').value;
    
    Swal.fire({
      title: '¡Pago exitoso!',
      html: `Tu pedido ha sido procesado correctamente.<br>
             Recibirás un correo con los detalles de tu compra.<br>
             <strong>Número de orden: #${Math.floor(100000 + Math.random() * 900000)}</strong>`,
      icon: 'success',
      confirmButtonColor: '#d2691e',
      confirmButtonText: '¡Genial!'
    }).then(() => {
      localStorage.removeItem("carrito");
      window.location.href = "index.html";
    });
  }, 2000);
}

// ===== INICIALIZACIÓN GENERAL =====
document.addEventListener("DOMContentLoaded", function() {
  // Inicializar botones de agregar en productos.html
  inicializarBotonesAgregar();
  
  // Inicializar carrito solo si estamos en la página del carrito
  if (document.getElementById("listaCarrito")) {
    inicializarCarrito();
  }
});