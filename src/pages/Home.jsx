// Home.jsx - Página principal
import React from 'react';

const Home = () => {
  return (
    <div className="home">
      {/* LOGIN / REGISTRO Links */}
      <div className="login-links">
        <a href="/login">Iniciar sesión</a> | 
        <a href="/registro">Registrar usuario</a>
      </div>

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

      {/* Secciones adicionales */}
      <section className="featured">
        <h2>Productos Destacados</h2>
        <p>Descubre nuestras creaciones más populares</p>
        
        <div className="productos-preview">
          <div className="producto-card">
            <img src="/img/pastel-chocolate.jpg" alt="Pastel de chocolate" />
            <div className="producto-info">
              <h3>Pastel de Chocolate</h3>
              <p>Delicioso pastel de chocolate con crema</p>
              <span className="precio">$25.99</span>
            </div>
          </div>
          
          <div className="producto-card">
            <img src="/img/cheesecake.jpg" alt="Cheesecake clásico" />
            <div className="producto-info">
              <h3>Cheesecake Clásico</h3>
              <p>Cremoso cheesecake con base de galleta</p>
              <span className="precio">$28.99</span>
            </div>
          </div>
          
          <div className="producto-card">
            <img src="/img/cupcake-fresa.webp" alt="Cupcakes de fresa" />
            <div className="producto-info">
              <h3>Cupcakes de Fresa</h3>
              <p>Deliciosos cupcakes con crema de fresa</p>
              <span className="precio">$18.99</span>
            </div>
          </div>
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