import api from './api';

class UserService {
  /**
   * Get user profile
   */
  async getProfile() {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(profileData) {
    try {
      const response = await api.put('/users/profile', profileData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get user statistics
   */
  async getUserStats() {
    try {
      const response = await api.get('/users/stats');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update preferences
   */
  async updatePreferences(preferences) {
    try {
      const response = await api.put('/users/preferences', preferences);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete account
   */
  async deleteAccount() {
    try {
      const response = await api.delete('/users/account');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get user activity
   */
  async getUserActivity(limit = 10) {
    try {
      const response = await api.get('/users/activity', { params: { limit } });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get user notifications
   */
  async getNotifications() {
    try {
      const response = await api.get('/users/notifications');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Mark notification as read
   */
  async markNotificationRead(notificationId) {
    try {
      const response = await api.put(`/users/notifications/${notificationId}/read`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Mark all notifications as read
   */
  async markAllNotificationsRead() {
    try {
      const response = await api.put('/users/notifications/read-all');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete notification
   */
  async deleteNotification(notificationId) {
    try {
      const response = await api.delete(`/users/notifications/${notificationId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get user settings
   */
  async getSettings() {
    try {
      const response = await api.get('/users/settings');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update user settings
   */
  async updateSettings(settings) {
    try {
      const response = await api.put('/users/settings', settings);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Upload avatar
   */
  async uploadAvatar(file) {
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await api.post('/users/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Remove avatar
   */
  async removeAvatar() {
    try {
      const response = await api.delete('/users/avatar');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Export user data
   */
  async exportData() {
    try {
      const response = await api.get('/users/export', {
        responseType: 'blob',
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Format user data for display
   */
  formatUser(user) {
    return {
      ...user,
      displayName: user.name || user.email.split('@')[0],
      initials: this.getInitials(user.name),
      joinDate: new Date(user.createdAt).toLocaleDateString(),
    };
  }

  /**
   * Get initials from name
   */
  getInitials(name) {
    if (!name) return '';
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  /**
   * Calculate profile completion
   */
  calculateProfileCompletion(user) {
    let completed = 0;
    const total = 8; // Total number of fields to check

    if (user.name) completed++;
    if (user.email) completed++;
    if (user.phone) completed++;
    if (user.location) completed++;
    if (user.bio) completed++;
    if (user.skills?.length > 0) completed++;
    if (user.education?.length > 0) completed++;
    if (user.experience?.length > 0) completed++;

    return Math.round((completed / total) * 100);
  }

  /**
   * Get missing profile fields
   */
  getMissingFields(user) {
    const missing = [];

    if (!user.name) missing.push('name');
    if (!user.phone) missing.push('phone');
    if (!user.location) missing.push('location');
    if (!user.bio) missing.push('bio');
    if (!user.skills?.length) missing.push('skills');
    if (!user.education?.length) missing.push('education');
    if (!user.experience?.length) missing.push('experience');

    return missing;
  }
}

export default new UserService();