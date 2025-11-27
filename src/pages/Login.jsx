// Login.jsx - Página de inicio de sesión
import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { validarCampos } from '../utils/helpers';

const Login = () => {
  const { iniciarSesion, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    
    // Limpiar error del campo cuando el usuario empiece a escribir
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

    // Validar campos
    const reglasValidacion = {
      email: {
        required: true,
        requiredMessage: 'El correo electrónico es requerido'
      },
      password: {
        required: true,
        requiredMessage: 'La contraseña es requerida',
        minLength: 6
      }
    };

    const validacion = validarCampos(formData, reglasValidacion);
    
    if (!validacion.isValid) {
      setErrores(validacion.errores);
      setIsLoading(false);
      return;
    }

    // Intentar iniciar sesión
    const resultado = await iniciarSesion(formData.email, formData.password);
    
    if (!resultado.success) {
      setErrores({ general: resultado.error });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="login-page">
      <section className="hero">
        <h2>Bienvenido de nuevo</h2>
        <p>Ingresa a tu cuenta para continuar disfrutando de nuestros sabores.</p>
      </section>

      <section className="formulario login">
        <div className="logo-login">
          <img src="/img/logo.png" alt="Logo 1000 Sabores" />
        </div>

        <h2>Iniciar Sesión</h2>
        
        <form onSubmit={handleSubmit}>
          {errores.general && (
            <div className="error-general">
              {errores.general}
            </div>
          )}
          
          <div className="campo">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errores.email && (
              <small className="error">{errores.email}</small>
            )}
          </div>

          <div className="campo">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errores.password && (
              <small className="error">{errores.password}</small>
            )}
          </div>

          <button 
            type="submit" 
            className="btn"
            disabled={isLoading}
          >
            {isLoading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <p className="extra-links">
          ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
        </p>
      </section>
    </div>
  );
};

export default Login;