// Pruebas unitarias para el Context de Carrito
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider, useCart } from '../contexts/CartContext.jsx';

// Componente de prueba para usar el CartContext
const CartTestComponent = () => {
  const { carrito, agregarAlCarrito, eliminarDelCarrito, limpiarCarrito, total } = useCart();

  return (
    <div>
      <div data-testid="cart-count">{carrito.length}</div>
      <div data-testid="cart-total">${total.toFixed(2)}</div>
      
      <button 
        data-testid="add-item"
        onClick={() => agregarAlCarrito({
          id: 1,
          nombre: 'Pastel Test',
          precio: 15.99,
          cantidad: 1
        })}
      >
        Agregar Item
      </button>
      
      <button 
        data-testid="remove-item"
        onClick={() => eliminarDelCarrito(1)}
      >
        Eliminar Item
      </button>
      
      <button 
        data-testid="clear-cart"
        onClick={limpiarCarrito}
      >
        Limpiar Carrito
      </button>

      {carrito.map(item => (
        <div key={item.id} data-testid={`item-${item.id}`}>
          {item.nombre} - ${item.precio} x {item.cantidad}
        </div>
      ))}
    </div>
  );
};

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should start with empty cart', () => {
    // Arrange & Act
    render(
      <CartProvider>
        <CartTestComponent />
      </CartProvider>
    );

    // Assert
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$0.00');
  });

  it('should add item to cart', () => {
    // Arrange
    render(
      <CartProvider>
        <CartTestComponent />
      </CartProvider>
    );

    // Act
    fireEvent.click(screen.getByTestId('add-item'));

    // Assert
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$15.99');
    expect(screen.getByTestId('item-1')).toHaveTextContent('Pastel Test - $15.99 x 1');
  });

  it('should remove item from cart', () => {
    // Arrange
    render(
      <CartProvider>
        <CartTestComponent />
      </CartProvider>
    );

    // Act - Agregar item y luego eliminarlo
    fireEvent.click(screen.getByTestId('add-item'));
    fireEvent.click(screen.getByTestId('remove-item'));

    // Assert
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$0.00');
  });

  it('should clear entire cart', () => {
    // Arrange
    render(
      <CartProvider>
        <CartTestComponent />
      </CartProvider>
    );

    // Act - Agregar varios items y limpiar
    fireEvent.click(screen.getByTestId('add-item'));
    fireEvent.click(screen.getByTestId('add-item'));
    fireEvent.click(screen.getByTestId('clear-cart'));

    // Assert
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$0.00');
  });

  it('should persist cart in localStorage', () => {
    // Arrange
    render(
      <CartProvider>
        <CartTestComponent />
      </CartProvider>
    );

    // Act
    fireEvent.click(screen.getByTestId('add-item'));

    // Assert
    const savedCart = JSON.parse(localStorage.getItem('carrito'));
    expect(savedCart).toHaveLength(1);
    expect(savedCart[0].nombre).toBe('Pastel Test');
  });
});