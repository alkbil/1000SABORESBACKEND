// CartContext.jsx - Manejo del carrito de compras con React Context
import React, { createContext, useContext, useState, useEffect } from 'react';
import { orderService } from '../services/apiServices';
import { useAuth } from './AuthContext';
import Swal from 'sweetalert2';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [carrito, setCarrito] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar carrito del localStorage al inicializar
  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      try {
        setCarrito(JSON.parse(carritoGuardado));
      } catch (error) {
        console.error('Error al cargar carrito:', error);
        localStorage.removeItem('carrito');
      }
    }
    setIsLoading(false);
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('carrito', JSON.stringify(carrito));
    }
  }, [carrito, isLoading]);

  const formatearPrecio = (precio) => {
    const precioNumerico = parseFloat(precio);
    if (isNaN(precioNumerico)) {
      console.error('Precio no válido:', precio);
      return '$0.00';
    }
    return `$${precioNumerico.toFixed(2)}`;
  };

  const agregarProducto = (producto) => {
    const { id, nombre, precio } = producto;
    
    // Validar precio
    const precioNumerico = parseFloat(precio);
    if (isNaN(precioNumerico)) {
      Swal.fire('Error', 'Precio no válido', 'error');
      return;
    }

    setCarrito(carritoActual => {
      const productoExistente = carritoActual.find(item => item.id === id);
      
      if (productoExistente) {
        return carritoActual.map(item =>
          item.id === id 
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...carritoActual, { 
          id, 
          nombre, 
          precio: precioNumerico, 
          cantidad: 1 
        }];
      }
    });

    Swal.fire({
      title: 'Producto agregado',
      text: `${nombre} agregado al carrito`,
      icon: 'success',
      timer: 1500,
      timerProgressBar: true,
      toast: true,
      position: 'top-end',
      showConfirmButton: false
    });
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarProducto(id);
      return;
    }

    setCarrito(carritoActual =>
      carritoActual.map(item =>
        item.id === id 
          ? { ...item, cantidad: nuevaCantidad }
          : item
      )
    );
  };

  const eliminarProducto = (id) => {
    setCarrito(carritoActual => 
      carritoActual.filter(item => item.id !== id)
    );
  };

  const vaciarCarrito = () => {
    Swal.fire({
      title: '¿Vaciar carrito?',
      text: 'Se eliminarán todos los productos',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, vaciar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setCarrito([]);
        Swal.fire('Carrito vacío', 'Todos los productos fueron eliminados', 'success');
      }
    });
  };

  const calcularTotal = () => {
    return carrito.reduce((total, producto) => {
      return total + (producto.precio * producto.cantidad);
    }, 0);
  };

  const calcularTotalItems = () => {
    return carrito.reduce((total, producto) => total + producto.cantidad, 0);
  };

  const procesarPago = async () => {
    // Validar autenticación
    if (!isAuthenticated) {
      Swal.fire({
        title: 'Error',
        text: 'Debes iniciar sesión para procesar el pago',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    // Validar carrito no vacío
    if (carrito.length === 0) {
      Swal.fire('Error', 'El carrito está vacío', 'error');
      return;
    }

    const total = calcularTotal();
    
    const result = await Swal.fire({
      title: '¿Procesar pago?',
      html: `
        <div>
          <p><strong>Total a pagar: ${formatearPrecio(total)}</strong></p>
          <p>Se procesará el pago y se creará tu pedido</p>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Pagar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        // Mostrar loading
        Swal.fire({
          title: 'Procesando pago...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        // Preparar datos del pedido
        const orderData = {
          items: carrito.map(item => ({
            productId: item.id,
            cantidad: item.cantidad
          })),
          metodoPago: 'Tarjeta de crédito',
          metodoEnvio: 'Envío a domicilio',
          direccionEnvio: 'Dirección por defecto',
          notas: ''
        };

        // Crear pedido en el backend
        const response = await orderService.create(orderData);

        // Limpiar carrito
        setCarrito([]);

        // Mostrar confirmación
        Swal.fire({
          title: '¡Pedido creado!',
          html: `
            <div>
              <p><strong>Número de orden: ${response.id}</strong></p>
              <p>Total: ${formatearPrecio(response.total)}</p>
              <p>Estado: ${response.estado}</p>
              <p>Tu pedido ha sido procesado exitosamente</p>
            </div>
          `,
          icon: 'success',
          confirmButtonText: 'OK'
        });

      } catch (error) {
        console.error('Error al procesar el pedido:', error);
        Swal.fire({
          title: 'Error',
          text: error.response?.data?.message || 'Error al procesar el pedido. Intenta nuevamente.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };

  const value = {
    carrito,
    isLoading,
    agregarProducto,
    agregarAlCarrito: agregarProducto, // Alias para compatibilidad
    actualizarCantidad,
    eliminarProducto,
    vaciarCarrito,
    calcularTotal,
    calcularTotalItems,
    procesarPago,
    formatearPrecio,
    isEmpty: carrito.length === 0
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};