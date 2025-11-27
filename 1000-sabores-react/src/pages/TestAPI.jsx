// TestAPI.jsx - Página de prueba de conexión con backend
import React, { useState, useEffect } from 'react';
import { productService, authService } from '../services/apiServices';

const TestAPI = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAll();
      setProductos(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async () => {
    try {
      const response = await authService.login({
        email: 'nuevoadmin@test.com',
        password: 'admin123'
      });
      alert('Login exitoso! Token: ' + response.token.substring(0, 20) + '...');
    } catch (err) {
      alert('Error en login: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>🧪 Test de Conexión Backend</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={testLogin} style={{ padding: '10px 20px', marginRight: '10px' }}>
          Test Login
        </button>
        <button onClick={loadProducts} style={{ padding: '10px 20px' }}>
          Recargar Productos
        </button>
      </div>

      {loading && <p>Cargando productos...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <h2>Productos desde Backend ({productos.length})</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {productos.map(producto => (
          <div key={producto.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
            <img 
              src={producto.imagenUrl || 'https://via.placeholder.com/150'} 
              alt={producto.nombre}
              style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
            />
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <p><strong>${Number(producto.precio).toLocaleString('es-CL')}</strong></p>
            <p><small>Categoría: {producto.categoria}</small></p>
            <p><small>Stock: {producto.stock}</small></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestAPI;
