import api from './api';

class AuthService {
  /**
   * Register new user
   */
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Login user
   */
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Login with Google
   */
  async googleLogin(credential) {
    try {
      const response = await api.post('/auth/google', { credential });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Logout user
   */
  async logout() {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    }
  }

  /**
   * Get current user
   */
  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Refresh token
   */
  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await api.post('/auth/refresh-token', { refreshToken });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update password
   */
  async updatePassword(currentPassword, newPassword) {
    try {
      const response = await api.put('/auth/password', {
        currentPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Forgot password
   */
  async forgotPassword(email) {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Reset password
   */
  async resetPassword(token, password) {
    try {
      const response = await api.put(`/auth/reset-password/${token}`, { password });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Verify email
   */
  async verifyEmail(token) {
    try {
      const response = await api.get(`/auth/verify-email/${token}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Resend verification email
   */
  async resendVerification() {
    try {
      const response = await api.post('/auth/resend-verification');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  /**
   * Get token
   */
  getToken() {
    return localStorage.getItem('token');
  }

  /**
   * Get refresh token
   */
  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }
}

export default new AuthService();