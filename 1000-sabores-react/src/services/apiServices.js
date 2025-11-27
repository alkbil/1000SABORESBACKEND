import api from './api';

// Servicio de autenticación
export const authService = {
  // Registro de usuario
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Login
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({
        id: response.data.id,
        email: response.data.email,
        role: response.data.role
      }));
    }
    return response.data;
  },

  // Obtener usuario actual
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Servicio de productos
export const productService = {
  // Obtener todos los productos
  getAll: async () => {
    const response = await api.get('/products');
    return response.data;
  },

  // Obtener productos activos
  getActive: async () => {
    const response = await api.get('/products/active');
    return response.data;
  },

  // Obtener producto por ID
  getById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Obtener productos por categoría
  getByCategory: async (categoria) => {
    const response = await api.get(`/products/categoria/${categoria}`);
    return response.data;
  },

  // Buscar productos
  search: async (query) => {
    const response = await api.get(`/products/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },

  // Crear producto (admin)
  create: async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
  },

  // Actualizar producto (admin)
  update: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  // Eliminar producto (admin)
  delete: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  }
};

// Servicio de órdenes
export const orderService = {
  // Crear orden
  create: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  // Obtener mis órdenes
  getMyOrders: async () => {
    const response = await api.get('/orders/my-orders');
    return response.data;
  },

  // Obtener todas las órdenes (admin)
  getAll: async () => {
    const response = await api.get('/orders');
    return response.data;
  },

  // Obtener orden por ID
  getById: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  // Actualizar estado de orden (admin)
  updateStatus: async (id, status) => {
    const response = await api.put(`/orders/${id}/status`, { status });
    return response.data;
  }
};
