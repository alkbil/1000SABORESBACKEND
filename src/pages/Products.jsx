// Products.jsx - Página de productos (versión simplificada)
import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProductImage from '../components/common/ProductImage';

const Products = () => {
  const { agregarProducto } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Función para agregar al carrito
  const handleAgregarCarrito = (producto) => {
    if (!isAuthenticated) {
      // Si no está autenticado, redirigir al login
      navigate('/login');
      return;
    }
    
    agregarProducto(producto);
  };

  const productos = [
    {
      id: '1',
      nombre: 'Pastel de Chocolate',
      precio: 25.99,
      descripcion: 'Delicioso pastel de chocolate con crema',
      imagen: '/img/pastel-chocolate.jpg'
    },
    {
      id: '2', 
      nombre: 'Torta de Vainilla',
      precio: 22.99,
      descripcion: 'Suave torta de vainilla con frutas frescas',
      imagen: '/img/pastel-vainilla.jpg'
    },
    {
      id: '3',
      nombre: 'Cupcakes de Fresa',
      precio: 18.99,
      descripcion: 'Deliciosos cupcakes con crema de fresa',
      imagen: '/img/cupcake-fresa.webp'
    },
    {
      id: '4',
      nombre: 'Cheesecake Clásico',
      precio: 28.99,
      descripcion: 'Cremoso cheesecake con base de galleta',
      imagen: '/img/cheesecake.jpg'
    },
    {
      id: '5',
      nombre: 'Brownie de Chocolate',
      precio: 15.99,
      descripcion: 'Intenso brownie con nueces y chocolate',
      imagen: '/img/brownie.webp'
    },
    {
      id: '6',
      nombre: 'Tarta de Frutilla',
      precio: 24.99,
      descripcion: 'Fresca tarta con frutillas de estación',
      imagen: '/img/tarta-frutilla.jpg'
    }
  ];



  return (
    <div className="productos-page">
      {/* LOGIN / REGISTRO Links */}
      <div className="login-links">
        <a href="/login">Iniciar sesión</a> | 
        <a href="/registro">Registrar usuario</a>
      </div>

      <section className="hero-productos">
        <h1>Nuestros Productos</h1>
        <p>Descubre toda nuestra selección de pasteles y postres artesanales</p>
      </section>

      <section className="catalogo">
        {productos.map(producto => (
          <div key={producto.id} className="producto-card">
            <ProductImage 
              src={producto.imagen} 
              alt={producto.nombre}
            />
            <div className="producto-info">
              <h3>{producto.nombre}</h3>
              <p>{producto.descripcion}</p>
              <div className="producto-precio">
                <span className="precio">${producto.precio}</span>
              </div>
              <button 
                className="btn agregar"
                onClick={() => handleAgregarCarrito(producto)}
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Products;