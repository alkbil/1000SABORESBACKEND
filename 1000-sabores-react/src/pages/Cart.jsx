// Cart.jsx - Página del carrito de compras
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import Swal from 'sweetalert2';

const Cart = () => {
  const { isAuthenticated } = useAuth();
  const { 
    carrito, 
    actualizarCantidad, 
    eliminarProducto, 
    vaciarCarrito, 
    calcularTotal, 
    formatearPrecio, 
    isEmpty 
  } = useCart();

  // Estados para el proceso de pago
  const [mostrarPago, setMostrarPago] = useState(false);
  const [metodoEnvio, setMetodoEnvio] = useState('retiro');
  const [metodoPago, setMetodoPago] = useState('tarjeta');
  const [datosTarjeta, setDatosTarjeta] = useState({
    numero: '',
    fecha: '',
    cvv: '',
    titular: ''
  });

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isEmpty) {
    return (
      <div className="cart-page">
        <div className="carrito-vacio">
          <h2>Tu carrito está vacío</h2>
          <p>¡Agrega algunos productos deliciosos!</p>
          <Link to="/productos" className="btn">
            Ver productos
          </Link>
        </div>
      </div>
    );
  }

  // Calcular costos
  const subtotal = calcularTotal();
  const costoEnvio = metodoEnvio === 'retiro' ? 0 : metodoEnvio === 'estandar' ? 5 : 10;
  const total = subtotal + costoEnvio;

  // Formatear número de tarjeta
  const formatearNumeroTarjeta = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  // Formatear fecha MM/AA
  const formatearFecha = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + (v.length > 2 ? '/' + v.substring(2, 4) : '');
    }
    return v;
  };

  // Validar formulario de pago
  const validarFormularioPago = () => {
    if (metodoPago === 'tarjeta') {
      const numeroTarjeta = datosTarjeta.numero.replace(/\s/g, '');
      const fechaExpiracion = datosTarjeta.fecha;
      const cvv = datosTarjeta.cvv;
      const nombreTitular = datosTarjeta.titular;
      
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
  };

  // Procesar pago
  const procesarPago = () => {
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
      Swal.fire({
        title: '¡Pago exitoso!',
        html: `Tu pedido ha sido procesado correctamente.<br>
               Recibirás un correo con los detalles de tu compra.<br>
               <strong>Número de orden: #${Math.floor(100000 + Math.random() * 900000)}</strong>`,
        icon: 'success',
        confirmButtonColor: '#d2691e',
        confirmButtonText: '¡Genial!'
      }).then(() => {
        vaciarCarrito();
        window.location.href = '/';
      });
    }, 2000);
  };

  // Continuar al formulario de pago
  const continuarPago = () => {
    setMostrarPago(true);
    setTimeout(() => {
      const seccionPago = document.getElementById('seccionPago');
      if (seccionPago) {
        seccionPago.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="cart-page">
      <h1>🛒 Tu Carrito de Compras</h1>
      
      <div className="carrito-contenido">
        <div className="productos-carrito">
          {carrito.map(producto => (
            <div key={producto.id} className="carrito-item">
              <div className="carrito-item-info">
                <div className="carrito-item-nombre">{producto.nombre}</div>
                <div className="carrito-item-precio">{formatearPrecio(producto.precio)} c/u</div>
              </div>
              
              <div className="carrito-item-cantidad">
                <button 
                  className="cantidad-btn disminuir"
                  onClick={() => actualizarCantidad(producto.id, producto.cantidad - 1)}
                >
                  -
                </button>
                <span className="cantidad-texto">{producto.cantidad}</span>
                <button 
                  className="cantidad-btn aumentar"
                  onClick={() => actualizarCantidad(producto.id, producto.cantidad + 1)}
                >
                  +
                </button>
              </div>
              
              <div className="carrito-item-total">
                {formatearPrecio(producto.precio * producto.cantidad)}
              </div>
              
              <button 
                className="eliminar"
                onClick={() => eliminarProducto(producto.id)}
              >
                ❌
              </button>
            </div>
          ))}
        </div>
        
        <div className="carrito-resumen">
          <h3>Resumen del pedido</h3>
          <div className="total">
            <strong>Total: {formatearPrecio(subtotal)}</strong>
          </div>
          
          <div className="acciones-carrito">
            {!mostrarPago && (
              <button 
                onClick={continuarPago}
                className="btn btn-primary"
                id="continuarPago"
              >
                Continuar con el pago
              </button>
            )}
            
            <button 
              onClick={vaciarCarrito}
              className="btn btn-secondary"
              id="vaciarCarrito"
            >
              Vaciar Carrito
            </button>
          </div>
        </div>
      </div>

      {/* Sección de Pago */}
      {mostrarPago && (
        <div className="seccion-pago" id="seccionPago">
          <h2>Información de Pago</h2>
          
          {/* Opciones de Envío */}
          <div className="grupo-formulario">
            <h3>Método de Envío</h3>
            <div className="opciones-envio">
              <label className="opcion-radio">
                <input 
                  type="radio" 
                  name="envio" 
                  value="retiro"
                  checked={metodoEnvio === 'retiro'}
                  onChange={(e) => setMetodoEnvio(e.target.value)}
                />
                <span className="radio-custom"></span>
                <div className="opcion-contenido">
                  <strong>Retiro en tienda</strong>
                  <span className="precio-envio">Gratis</span>
                  <small>Retira tu pedido en nuestro local</small>
                </div>
              </label>
              
              <label className="opcion-radio">
                <input 
                  type="radio" 
                  name="envio" 
                  value="estandar"
                  checked={metodoEnvio === 'estandar'}
                  onChange={(e) => setMetodoEnvio(e.target.value)}
                />
                <span className="radio-custom"></span>
                <div className="opcion-contenido">
                  <strong>Envío Estándar</strong>
                  <span className="precio-envio">$5.00</span>
                  <small>Entrega en 3-5 días hábiles</small>
                </div>
              </label>
              
              <label className="opcion-radio">
                <input 
                  type="radio" 
                  name="envio" 
                  value="express"
                  checked={metodoEnvio === 'express'}
                  onChange={(e) => setMetodoEnvio(e.target.value)}
                />
                <span className="radio-custom"></span>
                <div className="opcion-contenido">
                  <strong>Envío Express</strong>
                  <span className="precio-envio">$10.00</span>
                  <small>Entrega en 24-48 horas</small>
                </div>
              </label>
            </div>
          </div>

          {/* Métodos de Pago */}
          <div className="grupo-formulario">
            <h3>Método de Pago</h3>
            <div className="opciones-pago">
              <label className="opcion-radio">
                <input 
                  type="radio" 
                  name="pago" 
                  value="tarjeta"
                  checked={metodoPago === 'tarjeta'}
                  onChange={(e) => setMetodoPago(e.target.value)}
                />
                <span className="radio-custom"></span>
                <div className="opcion-contenido">
                  <strong>💳 Tarjeta de Crédito/Débito</strong>
                  <small>Visa, Mastercard, American Express</small>
                </div>
              </label>
              
              <label className="opcion-radio">
                <input 
                  type="radio" 
                  name="pago" 
                  value="paypal"
                  checked={metodoPago === 'paypal'}
                  onChange={(e) => setMetodoPago(e.target.value)}
                />
                <span className="radio-custom"></span>
                <div className="opcion-contenido">
                  <strong>🌐 PayPal</strong>
                  <small>Paga de forma segura con tu cuenta PayPal</small>
                </div>
              </label>
              
              <label className="opcion-radio">
                <input 
                  type="radio" 
                  name="pago" 
                  value="efectivo"
                  checked={metodoPago === 'efectivo'}
                  onChange={(e) => setMetodoPago(e.target.value)}
                />
                <span className="radio-custom"></span>
                <div className="opcion-contenido">
                  <strong>💵 Pago en Efectivo</strong>
                  <small>Paga al momento de recibir tu pedido</small>
                </div>
              </label>
            </div>
          </div>

          {/* Datos de Tarjeta */}
          {metodoPago === 'tarjeta' && (
            <div className="grupo-formulario tarjeta-datos">
              <h3>Datos de la Tarjeta</h3>
              <div className="formulario-tarjeta">
                <div className="campo-completo">
                  <label htmlFor="numeroTarjeta">Número de Tarjeta</label>
                  <input 
                    type="text" 
                    id="numeroTarjeta"
                    placeholder="1234 5678 9012 3456"
                    value={datosTarjeta.numero}
                    onChange={(e) => setDatosTarjeta({
                      ...datosTarjeta, 
                      numero: formatearNumeroTarjeta(e.target.value)
                    })}
                    maxLength="19"
                  />
                </div>
                
                <div className="campo-mitad">
                  <label htmlFor="fechaExpiracion">Fecha de Expiración</label>
                  <input 
                    type="text" 
                    id="fechaExpiracion"
                    placeholder="MM/AA"
                    value={datosTarjeta.fecha}
                    onChange={(e) => setDatosTarjeta({
                      ...datosTarjeta, 
                      fecha: formatearFecha(e.target.value)
                    })}
                    maxLength="5"
                  />
                </div>
                
                <div className="campo-mitad">
                  <label htmlFor="cvv">CVV</label>
                  <input 
                    type="text" 
                    id="cvv"
                    placeholder="123"
                    value={datosTarjeta.cvv}
                    onChange={(e) => setDatosTarjeta({
                      ...datosTarjeta, 
                      cvv: e.target.value.replace(/\D/g, '').substring(0, 3)
                    })}
                    maxLength="3"
                  />
                </div>
                
                <div className="campo-completo">
                  <label htmlFor="nombreTitular">Nombre del Titular</label>
                  <input 
                    type="text" 
                    id="nombreTitular"
                    placeholder="Nombre como aparece en la tarjeta"
                    value={datosTarjeta.titular}
                    onChange={(e) => setDatosTarjeta({
                      ...datosTarjeta, 
                      titular: e.target.value
                    })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Resumen Final */}
          <div className="resumen-pago">
            <h3>Resumen del Pedido</h3>
            <div className="linea-resumen">
              <span>Subtotal:</span>
              <span id="resumen-subtotal">{formatearPrecio(subtotal)}</span>
            </div>
            <div className="linea-resumen">
              <span>Envío:</span>
              <span id="resumen-envio">{formatearPrecio(costoEnvio)}</span>
            </div>
            <div className="linea-resumen total-final">
              <strong>
                <span>Total:</span>
                <span id="resumen-total">{formatearPrecio(total)}</span>
              </strong>
            </div>
            
            <button 
              onClick={procesarPago}
              className="btn btn-primary btn-pago"
            >
              Completar Pago - {formatearPrecio(total)}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;