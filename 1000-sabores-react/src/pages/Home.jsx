// Home.jsx - Página principal
import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Home = () => {
  const { agregarAlCarrito } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Productos destacados (primeros 3 de la lista original)
  const productosDestacados = [
    {
      id: 1,
      nombre: 'Pastel de Chocolate',
      precio: 15.00,
      imagen: '/img/pastel-chocolate.jpg',
      descripcion: 'Artesanal • 1kg'
    },
    {
      id: 2,
      nombre: 'Pastel de Fresas',
      precio: 18.00,
      imagen: '/img/pastel-frutosrojos.jpeg',
      descripcion: 'Artesanal • 1kg'
    },
    {
      id: 5,
      nombre: 'Cupcake de Fresa',
      precio: 5.00,
      imagen: '/img/cupcake-fresa.webp',
      descripcion: 'Caja x 6'
    }
  ];

  const handleAgregarCarrito = (producto) => {
    if (!isAuthenticated) {
      Swal.fire({
        title: 'Inicia sesión',
        text: 'Debes iniciar sesión para agregar productos al carrito',
        icon: 'warning',
        confirmButtonText: 'Ir a Login'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
      return;
    }
    
    agregarAlCarrito(producto);
    Swal.fire({
      title: '¡Agregado!',
      text: `${producto.nombre} agregado al carrito`,
      icon: 'success',
      timer: 1500,
      timerProgressBar: true
    });
  };
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>TIENDA ONLINE</h1>
          <p>
            Endulzamos tus momentos especiales con pasteles artesanales. 
            Explora nuestros productos y llévate el sabor a casa.
          </p>
          <a href="/productos" className="btn">🍰 Ver productos</a>
        </div>
        <div className="hero-img">
          <img src="/img/banner.webp" alt="Pasteles artesanales" />
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="featured">
        <h2>Productos Destacados</h2>
        <p>Descubre nuestras creaciones más populares</p>
        
        <div className="productos-preview">
          {productosDestacados.map(producto => (
            <div key={producto.id} className="producto-card">
              <img src={producto.imagen} alt={producto.nombre} />
              <div className="producto-info">
                <h3>{producto.nombre}</h3>
                <p>{producto.descripcion}</p>
                <span className="precio">${producto.precio.toFixed(2)}</span>
                <button 
                  className="btn-agregar" 
                  onClick={() => handleAgregarCarrito(producto)}
                >
                  🛒 Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Valores de la empresa */}
      <section className="valores">
        <h2>¿Por qué elegirnos?</h2>
        <div className="valores-grid">
          <div className="valor">
            <span className="icono">🏆</span>
            <h3>Calidad Premium</h3>
            <p>Ingredientes frescos y de la mejor calidad</p>
          </div>
          <div className="valor">
            <span className="icono">🚚</span>
            <h3>Envío Rápido</h3>
            <p>Entregamos en 24-48 horas</p>
          </div>
          <div className="valor">
            <span className="icono">👨‍🍳</span>
            <h3>Artesanal</h3>
            <p>Cada producto es hecho a mano con amor</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;