// Register.jsx - Página de registro
import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { validarCampos } from '../utils/helpers';

const Register = () => {
  const { registrarUsuario, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errores, setErrores] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Si ya está autenticado, redirigir al home
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo
    if (errores[name]) {
      setErrores(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validaciones
    const reglasValidacion = {
      email: {
        required: true,
        requiredMessage: 'El correo electrónico es requerido'
      },
      password: {
        required: true,
        requiredMessage: 'La contraseña es requerida',
        minLength: 6
      },
      confirmPassword: {
        required: true,
        requiredMessage: 'Debes confirmar la contraseña',
        validate: (value) => {
          return value === formData.password || 'Las contraseñas no coinciden';
        }
      }
    };

    const validacion = validarCampos(formData, reglasValidacion);
    
    if (!validacion.isValid) {
      setErrores(validacion.errores);
      setIsLoading(false);
      return;
    }

    // Registrar usuario
    try {
      await registrarUsuario({
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });
    } catch (error) {
      console.error('Error en registro:', error);
      setErrores({ general: error.message || 'Error al crear la cuenta' });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="register-page">
      <section className="hero">
        <h2>Crear cuenta</h2>
        <p>Regístrate para guardar tus pedidos y recibir novedades.</p>
      </section>

      <section className="formulario">
        <div className="logo-login">
          <img src="/img/logo.png" alt="Logo 1000 Sabores" />
        </div>

        <h2>Crear cuenta</h2>
        
        <form onSubmit={handleSubmit}>
          {errores.general && (
            <div className="error-general">
              {errores.general}
            </div>
          )}
          
          <div className="campo">
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errores.email && (
              <small className="error" id="emailError">{errores.email}</small>
            )}
          </div>

          <div className="campo">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
            {errores.password && (
              <small className="error" id="passwordError">{errores.password}</small>
            )}
          </div>

          <div className="campo">
            <label htmlFor="confirmPassword">Confirmar contraseña:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errores.confirmPassword && (
              <small className="error" id="confirmPasswordError">{errores.confirmPassword}</small>
            )}
          </div>

          <button 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Creando cuenta...' : 'Registrarse'}
          </button>
        </form>

        <p className="extra-links">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </section>
    </div>
  );
};

export default Register;