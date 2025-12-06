import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_URL,
});

// Request interceptor: add JWT token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_URL}/auth/refresh`, {
            refreshToken,
          });
          const { accessToken } = response.data;
          localStorage.setItem('token', accessToken);
          // Retry original request
          return apiClient(error.config);
        } catch (refreshError) {
          // Refresh failed, clear tokens and redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          window.location.href = '/';
        }
      }
    }
    return Promise.reject(error);
  }
);

// API methods
export const authAPI = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
  refresh: (refreshToken) => apiClient.post('/auth/refresh', { refreshToken }),
};

export const productAPI = {
  getAll: () => apiClient.get('/products'),
  getById: (id) => apiClient.get(`/products/${id}`),
  create: (data) => apiClient.post('/products', data),
  update: (id, data) => apiClient.put(`/products/${id}`, data),
  delete: (id) => apiClient.delete(`/products/${id}`),
};

export default apiClient;
