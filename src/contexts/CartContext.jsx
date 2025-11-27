// CartContext.jsx - Manejo del carrito de compras con React Context
import React, { createContext, useContext, useState, useEffect } from 'react';
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

  const procesarPago = () => {
    if (carrito.length === 0) {
      Swal.fire('Error', 'El carrito está vacío', 'error');
      return;
    }

    const total = calcularTotal();
    
    Swal.fire({
      title: '¿Procesar pago?',
      html: `
        <div>
          <p><strong>Total a pagar: ${formatearPrecio(total)}</strong></p>
          <p>Se procesará el pago y se enviará tu pedido</p>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Pagar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Simular procesamiento de pago
        Swal.fire({
          title: 'Procesando pago...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        setTimeout(() => {
          setCarrito([]);
          Swal.fire({
            title: '¡Pago exitoso!',
            text: 'Tu pedido ha sido procesado correctamente',
            icon: 'success',
            confirmButtonText: '¡Genial!'
          });
        }, 2000);
      }
    });
  };

  const value = {
    carrito,
    isLoading,
    agregarProducto,
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