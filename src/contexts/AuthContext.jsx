// AuthContext.jsx - Manejo de autenticación con React Context
import React, { createContext, useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';

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
    const usuarioGuardado = localStorage.getItem('usuarioActual');
    if (usuarioGuardado) {
      try {
        setUsuario(JSON.parse(usuarioGuardado));
      } catch (error) {
        console.error('Error al cargar usuario:', error);
        localStorage.removeItem('usuarioActual');
      }
    }
    setIsLoading(false);
  }, []);

  const iniciarSesion = async (email, password) => {
    try {
      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      const usuarioEncontrado = usuarios.find(u => u.email === email && u.password === password);
      
      if (usuarioEncontrado) {
        setUsuario(usuarioEncontrado);
        localStorage.setItem('usuarioActual', JSON.stringify(usuarioEncontrado));
        
        Swal.fire({
          title: '¡Bienvenido de nuevo!',
          text: `Hola ${usuarioEncontrado.nombre || usuarioEncontrado.email}`,
          icon: 'success',
          timer: 2000,
          timerProgressBar: true
        });
        
        return { success: true };
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Credenciales incorrectas',
          icon: 'error'
        });
        return { success: false, error: 'Credenciales incorrectas' };
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al iniciar sesión',
        icon: 'error'
      });
      return { success: false, error: 'Error interno' };
    }
  };

  const registrarUsuario = async (datosUsuario) => {
    try {
      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      
      // Verificar si el email ya existe
      if (usuarios.some(u => u.email === datosUsuario.email)) {
        Swal.fire({
          title: 'Error',
          text: 'Este email ya está registrado',
          icon: 'error'
        });
        return { success: false, error: 'Email ya registrado' };
      }
      
      const nuevoUsuario = {
        ...datosUsuario,
        fechaRegistro: new Date().toISOString()
      };
      
      usuarios.push(nuevoUsuario);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      setUsuario(nuevoUsuario);
      localStorage.setItem('usuarioActual', JSON.stringify(nuevoUsuario));
      
      Swal.fire({
        title: '¡Cuenta creada exitosamente!',
        text: 'Bienvenido a 1000 Sabores',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al crear la cuenta',
        icon: 'error'
      });
      return { success: false, error: 'Error interno' };
    }
  };

  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem('usuarioActual');
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