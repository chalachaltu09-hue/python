import api from './api';

class JobService {
  /**
   * Get jobs with filters
   */
  async getJobs(params = {}) {
    try {
      const response = await api.get('/jobs', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get job by ID
   */
  async getJobById(id) {
    try {
      const response = await api.get(`/jobs/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get recommended jobs
   */
  async getRecommendedJobs() {
    try {
      const response = await api.get('/jobs/recommended');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Search jobs
   */
  async searchJobs(query) {
    try {
      const response = await api.get('/jobs/search', { params: { q: query } });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get saved jobs
   */
  async getSavedJobs() {
    try {
      const response = await api.get('/users/saved-jobs');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Save job
   */
  async saveJob(jobId, notes = '') {
    try {
      const response = await api.post(`/users/saved-jobs/${jobId}`, { notes });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update saved job status
   */
  async updateJobStatus(jobId, status) {
    try {
      const response = await api.put(`/users/saved-jobs/${jobId}`, { status });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Remove saved job
   */
  async removeSavedJob(jobId) {
    try {
      const response = await api.delete(`/users/saved-jobs/${jobId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get job suggestions
   */
  async getSuggestions(query) {
    try {
      const response = await api.get('/jobs/suggestions', { params: { q: query } });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get job statistics
   */
  async getJobStats() {
    try {
      const response = await api.get('/jobs/stats');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Track job view
   */
  async trackJobView(jobId) {
    try {
      await api.post(`/jobs/${jobId}/view`);
    } catch (error) {
      console.error('Failed to track job view:', error);
    }
  }

  /**
   * Track job application
   */
  async trackJobApplication(jobId) {
    try {
      await api.post(`/jobs/${jobId}/apply`);
    } catch (error) {
      console.error('Failed to track job application:', error);
    }
  }

  /**
   * Format job data
   */
  formatJob(job) {
    return {
      ...job,
      formattedSalary: this.formatSalary(job.salary),
      timeAgo: this.getTimeAgo(job.postedDate),
      location: this.formatLocation(job.location),
    };
  }

  /**
   * Format salary
   */
  formatSalary(salary) {
    if (!salary) return null;
    
    const { min, max, currency = 'ETB', period = 'monthly' } = salary;
    
    if (min && max) {
      return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}/${period}`;
    } else if (min) {
      return `${currency} ${min.toLocaleString()}+/${period}`;
    } else if (max) {
      return `${currency} ${max.toLocaleString()}/${period}`;
    }
    
    return null;
  }

  /**
   * Get time ago string
   */
  getTimeAgo(date) {
    const now = new Date();
    const posted = new Date(date);
    const diffTime = Math.abs(now - posted);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  }

  /**
   * Format location
   */
  formatLocation(location) {
    if (!location) return '';
    
    // Handle Ethiopian locations
    const cities = {
      'addis': 'Addis Ababa',
      'addis ababa': 'Addis Ababa',
      'a.a': 'Addis Ababa',
    };
    
    const lowerLocation = location.toLowerCase();
    return cities[lowerLocation] || location;
  }
}

export default new JobService();