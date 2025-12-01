// Products.jsx - Página de productos
import React, { useState, useEffect, useCallback } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { productService } from '../services/apiServices';

const Products = () => {
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [imagesCargadas, setImagesCargadas] = useState({});
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalProductos, setTotalProductos] = useState(0);
  const productosPorPagina = 12;
  
  const { agregarAlCarrito } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Cargar todos los productos la primera vez
  useEffect(() => {
    const cargarTodosProductos = async () => {
      try {
        setCargando(true);
        // Cargar todos los productos (sin límite para contar el total)
        const data = await productService.getAll(0, 1000);
        
        const productosArray = Array.isArray(data) ? data : (data.value || []);
        
        const productosFormateados = productosArray.map(producto => ({
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          // Usar imagen local si está disponible, sino generar placeholder
          imagen: producto.imagenUrl && !producto.imagenUrl.includes('unsplash') 
            ? producto.imagenUrl 
            : `/img/${producto.nombre.toLowerCase().replace(/\s+/g, '-')}.jpg`,
          categoria: producto.categoria,
          descripcion: producto.descripcion,
          stock: producto.stock
        }));
        
        setProductos(productosFormateados);
        setTotalProductos(productosFormateados.length);
        setError(null);
        setPaginaActual(1);
        
        console.log('Total productos cargados:', productosFormateados.length);
      } catch (err) {
        console.error('Error cargando productos:', err);
        setError('Error al cargar los productos. Intenta nuevamente.');
        setProductos([]);
      } finally {
        setCargando(false);
      }
    };

    cargarTodosProductos();
  }, []);

  // Manejar carga de imágenes con lazy loading
  const handleImageLoad = useCallback((productoId) => {
    setImagesCargadas(prev => ({
      ...prev,
      [productoId]: true
    }));
  }, []);

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

  // Calcular paginación
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const indiceInicio = (paginaActual - 1) * productosPorPagina;
  const indiceFin = indiceInicio + productosPorPagina;
  const productosActuales = productosFiltrados.slice(indiceInicio, indiceFin);

  // Cambiar de página
  const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
    // Scroll al top de la página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="productos-page">
      <section className="hero-productos">
        <h1>Nuestros Productos</h1>
        <p>Descubre toda nuestra selección de pasteles y postres artesanales</p>
      </section>

      {/* Mensaje de error */}
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {/* Estado de carga */}
      {cargando ? (
        <div className="cargando">
          <p>Cargando productos...</p>
        </div>
      ) : (
        <>
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
                {[...new Set(productos.map(p => p.categoria))].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </section>

          <section className="catalogo">
            {productosActuales.length === 0 ? (
              <p className="no-productos">No se encontraron productos</p>
            ) : (
              productosActuales.map(producto => (
                <div key={producto.id} className="producto-card">
                  <div className="producto-imagen-container" style={{
                    background: imagesCargadas[producto.id] ? 'transparent' : '#f0f0f0',
                    minHeight: '200px'
                  }}>
                    <img 
                      src={producto.imagen} 
                      alt={producto.nombre}
                      className="producto-imagen"
                      loading="lazy"
                      onLoad={() => handleImageLoad(producto.id)}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/200?text=' + encodeURIComponent(producto.nombre);
                        handleImageLoad(producto.id);
                      }}
                    />
                  </div>
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

          {/* Paginación */}
          {totalPaginas > 1 && (
            <div className="paginacion">
              <button 
                className="btn-pagina"
                onClick={() => cambiarPagina(paginaActual - 1)}
                disabled={paginaActual === 1}
              >
                ← Anterior
              </button>

              <div className="paginas">
                {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(pagina => (
                  <button
                    key={pagina}
                    className={`btn-numero ${paginaActual === pagina ? 'activa' : ''}`}
                    onClick={() => cambiarPagina(pagina)}
                  >
                    {pagina}
                  </button>
                ))}
              </div>

              <button 
                className="btn-pagina"
                onClick={() => cambiarPagina(paginaActual + 1)}
                disabled={paginaActual === totalPaginas}
              >
                Siguiente →
              </button>
            </div>
          )}

          {/* Info de página */}
          {productosFiltrados.length > 0 && (
            <div className="info-pagina">
              <p>Mostrando {indiceInicio + 1} - {Math.min(indiceFin, productosFiltrados.length)} de {productosFiltrados.length} productos</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Products;