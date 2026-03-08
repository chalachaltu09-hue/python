import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // If token exists, add to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add request ID for tracking
    config.headers['X-Request-ID'] = generateRequestId();

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
            refreshToken,
          });

          const { token } = response.data.data;
          localStorage.setItem('token', token);

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle 403 Forbidden errors
    if (error.response?.status === 403) {
      // Redirect to forbidden page or show message
      console.error('Access forbidden');
    }

    // Handle 404 Not Found errors
    if (error.response?.status === 404) {
      console.error('Resource not found');
    }

    // Handle 500 Server errors
    if (error.response?.status >= 500) {
      console.error('Server error');
    }

    // Handle network errors
    if (!error.response) {
      console.error('Network error');
    }

    // Format error message
    const errorMessage = error.response?.data?.error || error.message || 'An error occurred';
    
    return Promise.reject({
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    });
  }
);

// Generate unique request ID
const generateRequestId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Helper methods
const apiService = {
  get: (url, config = {}) => api.get(url, config),
  post: (url, data = {}, config = {}) => api.post(url, data, config),
  put: (url, data = {}, config = {}) => api.put(url, data, config),
  patch: (url, data = {}, config = {}) => api.patch(url, data, config),
  delete: (url, config = {}) => api.delete(url, config),
};

export default apiService;