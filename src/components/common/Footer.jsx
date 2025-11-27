// Footer.jsx - Componente de pie de página
import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="newsletter">
        <h3>Suscríbete a nuestro boletín</h3>
        <form onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Ingresa tu correo" 
            required 
          />
          <button type="submit">Suscribirse</button>
        </form>
      </div>
      <p>&copy; 2025 1000 Sabores. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;