// Pruebas unitarias para componentes React con Karma + Jasmine
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/common/Header.jsx';

// Wrapper para componentes que usan React Router
const RouterWrapper = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('Header Component', () => {
  beforeEach(() => {
    // Setup antes de cada test
    localStorage.clear();
  });

  afterEach(() => {
    // Cleanup después de cada test
    localStorage.clear();
  });

  it('should render header with logo', () => {
    // Arrange
    const component = render(
      <RouterWrapper>
        <Header />
      </RouterWrapper>
    );

    // Act & Assert
    expect(component).toBeDefined();
    expect(screen.getByText('1000 Sabores')).toBeInTheDocument();
  });

  it('should display navigation links', () => {
    // Arrange
    render(
      <RouterWrapper>
        <Header />
      </RouterWrapper>
    );

    // Act & Assert
    expect(screen.getByText('🏠 Home')).toBeInTheDocument();
    expect(screen.getByText('🍰 Productos')).toBeInTheDocument();
    expect(screen.getByText('ℹ️ Nosotros')).toBeInTheDocument();
    expect(screen.getByText('📝 Blog')).toBeInTheDocument();
    expect(screen.getByText('📞 Contacto')).toBeInTheDocument();
  });

  it('should show login link when user is not logged in', () => {
    // Arrange
    localStorage.removeItem('usuarioActual');
    
    render(
      <RouterWrapper>
        <Header />
      </RouterWrapper>
    );

    // Act & Assert
    expect(screen.getByText('👤 Login')).toBeInTheDocument();
  });

  it('should show cart with counter when user is logged in', () => {
    // Arrange
    const mockUser = {
      email: 'test@test.com',
      nombre: 'Test User'
    };
    localStorage.setItem('usuarioActual', JSON.stringify(mockUser));
    localStorage.setItem('carrito', JSON.stringify([
      { id: 1, nombre: 'Pastel', precio: 25.99, cantidad: 2 }
    ]));

    render(
      <RouterWrapper>
        <Header />
      </RouterWrapper>
    );

    // Act & Assert
    expect(screen.getByText(/🛒 Carrito/)).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument(); // Counter
  });
});