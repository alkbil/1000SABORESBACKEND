// Pruebas unitarias para utilidades y helpers
import { 
  obtenerCarrito, 
  guardarCarrito, 
  formatearPrecio, 
  validarEmail 
} from '../utils/helpers.js';

describe('Helper Functions', () => {
  beforeEach(() => {
    // Limpiar localStorage antes de cada test
    localStorage.clear();
  });

  describe('obtenerCarrito', () => {
    it('should return empty array when no cart exists', () => {
      // Act
      const carrito = obtenerCarrito();
      
      // Assert
      expect(carrito).toEqual([]);
      expect(Array.isArray(carrito)).toBe(true);
    });

    it('should return parsed cart from localStorage', () => {
      // Arrange
      const mockCarrito = [
        { id: 1, nombre: 'Pastel Chocolate', precio: 25.99, cantidad: 1 },
        { id: 2, nombre: 'Cupcake Fresa', precio: 3.50, cantidad: 3 }
      ];
      localStorage.setItem('carrito', JSON.stringify(mockCarrito));

      // Act
      const carrito = obtenerCarrito();

      // Assert
      expect(carrito).toEqual(mockCarrito);
      expect(carrito).toHaveLength(2);
    });

    it('should handle corrupted localStorage data', () => {
      // Arrange
      localStorage.setItem('carrito', 'invalid-json');

      // Act
      const carrito = obtenerCarrito();

      // Assert
      expect(carrito).toEqual([]);
    });
  });

  describe('guardarCarrito', () => {
    it('should save cart to localStorage', () => {
      // Arrange
      const mockCarrito = [
        { id: 1, nombre: 'Brownie', precio: 4.99, cantidad: 2 }
      ];

      // Act
      guardarCarrito(mockCarrito);

      // Assert
      const savedCarrito = JSON.parse(localStorage.getItem('carrito'));
      expect(savedCarrito).toEqual(mockCarrito);
    });

    it('should handle empty cart', () => {
      // Act
      guardarCarrito([]);

      // Assert
      const savedCarrito = JSON.parse(localStorage.getItem('carrito'));
      expect(savedCarrito).toEqual([]);
    });
  });

  describe('formatearPrecio', () => {
    it('should format price correctly with dollar sign', () => {
      // Test cases
      expect(formatearPrecio(25.99)).toBe('$25.99');
      expect(formatearPrecio(10)).toBe('$10.00');
      expect(formatearPrecio(1.5)).toBe('$1.50');
    });

    it('should handle zero price', () => {
      expect(formatearPrecio(0)).toBe('$0.00');
    });

    it('should handle invalid input', () => {
      expect(formatearPrecio(null)).toBe('$0.00');
      expect(formatearPrecio(undefined)).toBe('$0.00');
      expect(formatearPrecio('invalid')).toBe('$0.00');
    });
  });

  describe('validarEmail', () => {
    it('should validate correct email formats', () => {
      // Valid emails
      expect(validarEmail('test@example.com')).toBe(true);
      expect(validarEmail('user.name@domain.co.uk')).toBe(true);
      expect(validarEmail('user+tag@example.org')).toBe(true);
    });

    it('should reject invalid email formats', () => {
      // Invalid emails
      expect(validarEmail('invalid-email')).toBe(false);
      expect(validarEmail('test@')).toBe(false);
      expect(validarEmail('@domain.com')).toBe(false);
      expect(validarEmail('test..test@domain.com')).toBe(false);
      expect(validarEmail('')).toBe(false);
      expect(validarEmail(null)).toBe(false);
      expect(validarEmail(undefined)).toBe(false);
    });
  });
});