// helpers.js - Funciones utilitarias adaptadas para React
import Swal from 'sweetalert2';

/**
 * Formatear precio con validación
 */
export const formatearPrecio = (precio) => {
  const precioNumerico = parseFloat(precio);
  
  if (isNaN(precioNumerico)) {
    console.error('Precio no válido:', precio);
    return '$0.00';
  }
  
  return `$${precioNumerico.toFixed(2)}`;
};

/**
 * Validar email
 */
export const validarEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validar formulario genérico
 */
export const validarCampos = (campos, reglas = {}) => {
  const errores = {};
  
  Object.keys(campos).forEach(campo => {
    const valor = campos[campo];
    const regla = reglas[campo];
    
    // Validación requerido
    if (regla?.required && (!valor || valor.toString().trim() === '')) {
      errores[campo] = regla.requiredMessage || `El campo ${campo} es requerido`;
      return;
    }
    
    // Validación email
    if (campo === 'email' && valor && !validarEmail(valor)) {
      errores[campo] = 'Por favor ingresa un correo válido';
      return;
    }
    
    // Validación longitud mínima
    if (regla?.minLength && valor && valor.length < regla.minLength) {
      errores[campo] = `Debe tener al menos ${regla.minLength} caracteres`;
      return;
    }
    
    // Validación personalizada
    if (regla?.validate && valor) {
      const resultadoValidacion = regla.validate(valor);
      if (resultadoValidacion !== true) {
        errores[campo] = resultadoValidacion;
        return;
      }
    }
  });
  
  return {
    isValid: Object.keys(errores).length === 0,
    errores
  };
};

/**
 * Mostrar notificación con SweetAlert2
 */
export const mostrarNotificacion = (titulo, texto, tipo = 'info', opciones = {}) => {
  const configDefault = {
    title: titulo,
    text: texto,
    icon: tipo,
    confirmButtonText: 'Entendido',
    ...opciones
  };
  
  return Swal.fire(configDefault);
};

/**
 * Mostrar confirmación
 */
export const mostrarConfirmacion = (titulo, texto, opciones = {}) => {
  const configDefault = {
    title: titulo,
    text: texto,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, continuar',
    cancelButtonText: 'Cancelar',
    ...opciones
  };
  
  return Swal.fire(configDefault);
};

/**
 * Debounce function para optimizar eventos
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Formatear fecha
 */
export const formatearFecha = (fecha, formato = 'es-CL') => {
  if (!fecha) return '';
  
  try {
    const fechaObj = new Date(fecha);
    return fechaObj.toLocaleDateString(formato, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error al formatear fecha:', error);
    return '';
  }
};

/**
 * Generar ID único
 */
export const generarId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Scroll suave a elemento
 */
export const scrollSuave = (elementId, offset = 0) => {
  const elemento = document.getElementById(elementId);
  if (elemento) {
    const posicion = elemento.getBoundingClientRect().top + window.pageYOffset + offset;
    window.scrollTo({
      top: posicion,
      behavior: 'smooth'
    });
  }
};

/**
 * Truncar texto
 */
export const truncarTexto = (texto, longitud = 100) => {
  if (!texto || texto.length <= longitud) return texto;
  return texto.substring(0, longitud) + '...';
};