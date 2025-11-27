// Products.jsx - Página de productos
import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Products = () => {
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [busqueda, setBusqueda] = useState('');
  
  const { agregarAlCarrito } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Productos originales de la página HTML
  const productos = [
    {
      id: 1,
      nombre: 'Pastel de Chocolate',
      precio: 15.00,
      imagen: '/img/pastel-chocolate.jpg',
      categoria: 'Pasteles',
      stock: 10
    },
    {
      id: 2,
      nombre: 'Pastel de Fresas',
      precio: 18.00,
      imagen: '/img/pastel-frutosrojos.jpeg',
      categoria: 'Pasteles',
      stock: 8
    },
    {
      id: 3,
      nombre: 'Pastel de Limón',
      precio: 12.00,
      imagen: '/img/pastel-limon.jpeg',
      categoria: 'Pasteles',
      stock: 12
    },
    {
      id: 4,
      nombre: 'Pastel de Vainilla',
      precio: 12.00,
      imagen: '/img/pastel-vainilla.jpg',
      categoria: 'Pasteles',
      descripcion: 'Artesanal • 1kg',
      stock: 15
    },
    {
      id: 5,
      nombre: 'Cupcake de Fresa',
      precio: 5.00,
      imagen: '/img/cupcake-fresa.webp',
      categoria: 'Cupcakes',
      descripcion: 'Caja x 6',
      stock: 20
    },
    {
      id: 6,
      nombre: 'Tarta de Frutilla',
      precio: 20.00,
      imagen: '/img/tarta-frutilla.jpg',
      categoria: 'Tartas',
      descripcion: 'Familiar',
      stock: 6
    },
    {
      id: 7,
      nombre: 'Brownie',
      precio: 8.00,
      imagen: '/img/brownie.webp',
      categoria: 'Brownies',
      descripcion: 'Caja x 12',
      stock: 25
    },
    {
      id: 8,
      nombre: 'Cheesecake',
      precio: 18.00,
      imagen: '/img/cheesecake.jpg',
      categoria: 'Tartas',
      descripcion: 'Artesanal',
      stock: 10
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

  // Filtrar productos
  const productosFiltrados = productos.filter(producto => {
    const matchCategoria = !filtroCategoria || producto.categoria === filtroCategoria;
    const matchBusqueda = !busqueda || 
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
    
    return matchCategoria && matchBusqueda;
  });

  // Obtener categorías únicas
  const categorias = [...new Set(productos.map(p => p.categoria))];

  return (
    <div className="productos-page">
      <section className="hero-productos">
        <h1>Nuestros Productos</h1>
        <p>Descubre toda nuestra selección de pasteles y postres artesanales</p>
      </section>

      {/* Filtros */}
      <section className="filtros">
        <div className="filtros-container">
          <input 
            type="text"
            placeholder="🔍 Buscar productos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="search-input"
          />
          
          <select 
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
            className="categoria-select"
          >
            <option value="">Todas las categorías</option>
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </section>

      <section className="catalogo">
        {productosFiltrados.length === 0 ? (
          <p className="no-productos">No se encontraron productos</p>
        ) : (
          productosFiltrados.map(producto => (
            <div key={producto.id} className="producto-card">
              <img 
                src={producto.imagen} 
                alt={producto.nombre}
                className="producto-imagen"
              />
              <div className="producto-info">
                <h3>{producto.nombre}</h3>
                {producto.descripcion && <p className="descripcion">{producto.descripcion}</p>}
                <div className="producto-footer">
                  <span className="precio">${producto.precio.toFixed(2)}</span>
                </div>
                <button 
                  className="btn agregar"
                  onClick={() => handleAgregarCarrito(producto)}
                  disabled={producto.stock === 0}
                >
                  {producto.stock === 0 ? '❌ Sin stock' : '🛒 Agregar al carrito'}
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Products;