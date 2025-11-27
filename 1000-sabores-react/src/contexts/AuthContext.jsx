// AuthContext.jsx - Manejo de autenticación con React Context
import React, { createContext, useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { authService } from '../services/apiServices';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar sesión al cargar la aplicación
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (usuarioGuardado && token) {
      try {
        setUsuario(JSON.parse(usuarioGuardado));
      } catch (error) {
        console.error('Error al cargar usuario:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, []);

  const iniciarSesion = async (email, password) => {
    try {
      const response = await authService.login({ email, password });
      
      setUsuario({
        id: response.id,
        email: response.email,
        role: response.role
      });
      
      Swal.fire({
        title: '¡Bienvenido de nuevo!',
        text: `Hola ${response.email}`,
        icon: 'success',
        timer: 2000,
        timerProgressBar: true
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      const mensaje = error.response?.data?.message || 'Credenciales incorrectas';
      
      Swal.fire({
        title: 'Error',
        text: mensaje,
        icon: 'error'
      });
      
      return { success: false, error: mensaje };
    }
  };

  const registrarUsuario = async (datosUsuario) => {
    try {
      const response = await authService.register({
        email: datosUsuario.email,
        password: datosUsuario.password,
        confirmPassword: datosUsuario.confirmPassword
      });
      
      setUsuario({
        id: response.id,
        email: response.email,
        role: response.role
      });
      
      Swal.fire({
        title: '¡Cuenta creada exitosamente!',
        text: 'Bienvenido a 1000 Sabores',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error completo:', error);
      console.error('Error response:', error.response);
      console.error('Error response data:', error.response?.data);
      
      let mensaje = 'Error al crear la cuenta';
      
      if (error.response?.data) {
        // Si es un objeto con mensaje
        if (typeof error.response.data === 'object' && error.response.data.message) {
          mensaje = error.response.data.message;
        } 
        // Si es un string directo
        else if (typeof error.response.data === 'string') {
          mensaje = error.response.data;
        }
      } else if (error.message) {
        mensaje = error.message;
      }
      
      Swal.fire({
        title: 'Error',
        text: mensaje,
        icon: 'error'
      });
      
      throw error; // Lanzar el error para que Register.jsx lo capture
    }
  };

  const cerrarSesion = () => {
    authService.logout();
    setUsuario(null);
    
    Swal.fire({
      title: 'Sesión cerrada',
      text: 'Has cerrado sesión correctamente',
      icon: 'info',
      timer: 1500,
      timerProgressBar: true
    });
  };

  const value = {
    usuario,
    isLoading,
    iniciarSesion,
    registrarUsuario,
    cerrarSesion,
    isAuthenticated: !!usuario
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};