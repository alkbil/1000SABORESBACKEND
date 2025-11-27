// Contact.jsx - Página de contacto completa
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });
  const [errores, setErrores] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    } else if (formData.nombre.trim().length < 2) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.email.trim()) {
      nuevosErrores.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nuevosErrores.email = 'Formato de email inválido';
    }

    if (!formData.mensaje.trim()) {
      nuevosErrores.mensaje = 'El mensaje es obligatorio';
    } else if (formData.mensaje.trim().length < 10) {
      nuevosErrores.mensaje = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simular envío del formulario
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mostrar mensaje de éxito
      await Swal.fire({
        title: '¡Mensaje enviado!',
        text: 'Gracias por contactarnos. Te responderemos pronto.',
        icon: 'success',
        confirmButtonColor: '#F8BBD0'
      });

      // Limpiar formulario
      setFormData({
        nombre: '',
        email: '',
        mensaje: ''
      });

    } catch (error) {
      await Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al enviar el mensaje. Inténtalo nuevamente.',
        icon: 'error',
        confirmButtonColor: '#F8BBD0'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="hero">
        <h2>Contáctanos</h2>
        <p>¿Tienes alguna pregunta, sugerencia o encargo especial? Escríbenos y nos pondremos en contacto contigo.</p>
      </section>

      {/* Sección de Contacto */}
      <section className="contacto">
        <div className="formulario">
          <form onSubmit={handleSubmit}>
            <div className="campo">
              <label htmlFor="nombre">Nombre</label>
              <input 
                type="text" 
                id="nombre" 
                name="nombre" 
                value={formData.nombre}
                onChange={handleChange}
                className={errores.nombre ? 'error' : ''}
                required
              />
              {errores.nombre && <small className="error">{errores.nombre}</small>}
            </div>

            <div className="campo">
              <label htmlFor="email">Correo electrónico</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                className={errores.email ? 'error' : ''}
                required
              />
              {errores.email && <small className="error">{errores.email}</small>}
            </div>

            <div className="campo">
              <label htmlFor="mensaje">Mensaje</label>
              <textarea 
                id="mensaje" 
                name="mensaje" 
                rows="4" 
                value={formData.mensaje}
                onChange={handleChange}
                className={errores.mensaje ? 'error' : ''}
                required
              />
              {errores.mensaje && <small className="error">{errores.mensaje}</small>}
            </div>

            <button 
              type="submit" 
              className="btn"
              disabled={isLoading}
            >
              {isLoading ? 'Enviando...' : 'Enviar mensaje'}
            </button>
          </form>
        </div>

        <div className="info-contacto">
          <h3>También puedes encontrarnos en:</h3>
          <ul>
            <li>📍 Dirección: Av. Sabores 123, Santiago</li>
            <li>📞 Teléfono: +56 9 1234 5678</li>
            <li>📧 Email: contacto@1000sabores.cl</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Contact;