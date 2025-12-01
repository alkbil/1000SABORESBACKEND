import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../services/api';
import '../styles/admin.css';

const Admin = () => {
  const { usuario, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    imagenUrl: '',
    stock: ''
  });

  // Verificar si es admin
  useEffect(() => {
    if (!isAuthenticated || usuario?.role !== 'ROLE_ADMIN') {
      Swal.fire({
        title: 'Acceso Denegado',
        text: 'Solo administradores pueden acceder a esta página',
        icon: 'error'
      }).then(() => navigate('/'));
    }
  }, [isAuthenticated, usuario, navigate]);

  // Cargar productos
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      // Cargar todos los productos sin límite de paginación
      const response = await api.get('/products?page=0&size=1000');
      console.log('Response de productos:', response.data);
      
      // El backend retorna un array directo
      const productosArray = Array.isArray(response.data) ? response.data : [];
      console.log('Productos cargados:', productosArray.length);
      setProductos(productosArray);
    } catch (error) {
      console.error('Error cargando productos:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudieron cargar los productos',
        icon: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos
    if (!formData.nombre || !formData.precio || !formData.categoria) {
      Swal.fire({
        title: 'Error',
        text: 'Completa los campos requeridos',
        icon: 'warning'
      });
      return;
    }

    try {
      setLoading(true);

      // DEBUG: Ver token disponible y decodificar
      const token = localStorage.getItem('token');
      console.log('Token en localStorage:', token ? `${token.substring(0, 20)}...` : 'NO HAY TOKEN');
      
      if (token) {
        try {
          const parts = token.split('.');
          const payload = parts[1];
          const paddingNeeded = 4 - (payload.length % 4);
          const paddedPayload = payload + (paddingNeeded !== 4 ? '='.repeat(paddingNeeded) : '');
          const decodedBytes = atob(paddedPayload);
          const jwtData = JSON.parse(decodedBytes);
          console.log('JWT Payload:', jwtData);
        } catch (e) {
          console.error('Error decodificando JWT:', e);
        }
      }
      console.log('Usuario:', usuario);

      const dataToSend = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: parseFloat(formData.precio),
        categoria: formData.categoria,
        imagenUrl: formData.imagenUrl,
        stock: parseInt(formData.stock) || 0,
        isActive: true  // Siempre marcar como activo cuando se edita
      };
      console.log('Data a enviar:', dataToSend);

      if (editingId) {
        // Editar
        console.log('Intentando PUT a /products/' + editingId + ' con token');
        await api.put(`/products/${editingId}`, dataToSend);
        Swal.fire({
          title: '¡Actualizado!',
          text: 'Producto actualizado correctamente',
          icon: 'success'
        });
      } else {
        // Crear
        await api.post('/products', dataToSend);
        Swal.fire({
          title: '¡Creado!',
          text: 'Producto creado correctamente',
          icon: 'success'
        });
      }

      setFormData({
        nombre: '',
        descripcion: '',
        precio: '',
        categoria: '',
        imagenUrl: '',
        stock: ''
      });
      setShowForm(false);
      setEditingId(null);
      cargarProductos();
    } catch (error) {
      console.error('Error completo:', error);
      console.error('Response data:', error.response?.data);
      const mensajeError = error.response?.data?.message || error.response?.data || error.message || 'No se pudo guardar el producto';
      Swal.fire({
        title: 'Error',
        text: mensajeError,
        icon: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (producto) => {
    setFormData({
      nombre: producto.nombre,
      descripcion: producto.descripcion || '',
      precio: producto.precio,
      categoria: producto.categoria,
      imagenUrl: producto.imagenUrl || '',
      stock: producto.stock || 0
    });
    setEditingId(producto.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Eliminar?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/products/${id}`);
          Swal.fire({
            title: '¡Eliminado!',
            text: 'Producto eliminado correctamente',
            icon: 'success'
          });
          cargarProductos();
        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo eliminar el producto',
            icon: 'error'
          });
        }
      }
    });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      nombre: '',
      descripcion: '',
      precio: '',
      categoria: '',
      imagenUrl: '',
      stock: ''
    });
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>🔐 Panel de Administración</h1>
        <p>Bienvenido, {usuario?.email}</p>
      </div>

      <div className="admin-container">
        {/* Sección de productos */}
        <section className="admin-section">
          <div className="section-header">
            <h2>Gestión de Productos</h2>
            <button 
              className="btn btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? '❌ Cancelar' : '➕ Nuevo Producto'}
            </button>
          </div>

          {/* Formulario */}
          {showForm && (
            <div className="form-container">
              <h3>{editingId ? 'Editar Producto' : 'Crear Nuevo Producto'}</h3>
              <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                  <label>Nombre *</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Ej: Pastel de Chocolate"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Descripción</label>
                  <input
                    type="text"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    placeholder="Ej: Artesanal • 1kg"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Precio *</label>
                    <input
                      type="number"
                      name="precio"
                      value={formData.precio}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      step="0.01"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Categoría *</label>
                    <input
                      type="text"
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleInputChange}
                      placeholder="Ej: Pasteles"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>URL de Imagen</label>
                    <input
                      type="text"
                      name="imagenUrl"
                      value={formData.imagenUrl}
                      onChange={handleInputChange}
                      placeholder="/img/producto.jpg"
                    />
                  </div>

                  <div className="form-group">
                    <label>Stock</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-success" disabled={loading}>
                    {loading ? '⏳ Guardando...' : '💾 Guardar'}
                  </button>
                  <button type="button" className="btn btn-cancel" onClick={handleCancel}>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tabla de productos */}
          <div className="products-table-container">
            {loading && !showForm ? (
              <p className="loading">Cargando productos...</p>
            ) : productos.length === 0 ? (
              <p className="no-products">No hay productos registrados</p>
            ) : (
              <table className="products-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Categoría</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map(producto => (
                    <tr key={producto.id}>
                      <td>{producto.id}</td>
                      <td className="nombre-col">{producto.nombre}</td>
                      <td className="desc-col">{producto.descripcion || '-'}</td>
                      <td className="precio-col">${producto.precio.toFixed(2)}</td>
                      <td>{producto.categoria}</td>
                      <td className="stock-col">
                        <span className={producto.stock > 0 ? 'stock-ok' : 'stock-low'}>
                          {producto.stock}
                        </span>
                      </td>
                      <td className="acciones-col">
                        <button
                          className="btn btn-sm btn-edit"
                          onClick={() => handleEdit(producto)}
                          title="Editar"
                        >
                          ✏️
                        </button>
                        <button
                          className="btn btn-sm btn-delete"
                          onClick={() => handleDelete(producto.id)}
                          title="Eliminar"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admin;