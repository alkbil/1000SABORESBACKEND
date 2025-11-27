// Header.jsx - Componente de encabezado principal
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const Header = () => {
  const { usuario, cerrarSesion, isAuthenticated } = useAuth();
  const { calcularTotalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    cerrarSesion();
    navigate('/');
  };

  // Obtener la cantidad total de items en el carrito
  const totalItems = calcularTotalItems();

  return (
    <header className="site-header">
      <div className="logo">
        <Link to="/">
          <span>🍰</span>
          <strong>1000 Sabores</strong>
        </Link>
      </div>
      
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/nosotros">Nosotros</Link></li>
          <li><Link to="/blogs">Blogs</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
        </ul>
      </nav>
      
      <div className="cart-login">
        <Link to="/carrito">
          🛒 Carrito (<span id="carrito-count">{totalItems}</span>)
        </Link>
        
        <div className="user-menu">
          {isAuthenticated ? (
            <div className="user-authenticated">
              <span>Hola, {usuario?.nombre || usuario?.email}</span>
              <button onClick={handleLogout} className="logout-btn">
                Cerrar sesión
              </button>
            </div>
          ) : (
            <div className="user-not-authenticated">
              <Link to="/login">Iniciar sesión</Link>
              <span> | </span>
              <Link to="/registro">Registrarse</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;