import api from './api';

class ResumeService {
  /**
   * Upload resume
   */
  async uploadResume(file, language = 'en') {
    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('language', language);

      const response = await api.post('/resumes/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          // You can emit this progress via a callback or event
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get user's resumes
   */
  async getUserResumes() {
    try {
      const response = await api.get('/resumes');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get resume by ID
   */
  async getResume(id) {
    try {
      const response = await api.get(`/resumes/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete resume
   */
  async deleteResume(id) {
    try {
      const response = await api.delete(`/resumes/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Analyze skill gap
   */
  async analyzeSkillGap(resumeId, jobId, language = 'en') {
    try {
      const response = await api.post(`/resumes/${resumeId}/analyze-gap/${jobId}`, {
        language,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Download resume
   */
  async downloadResume(resumeId) {
    try {
      const response = await api.get(`/resumes/${resumeId}/download`, {
        responseType: 'blob',
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get resume analysis
   */
  async getResumeAnalysis(resumeId) {
    try {
      const response = await api.get(`/resumes/${resumeId}/analysis`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get resume score
   */
  async getResumeScore(resumeId) {
    try {
      const response = await api.get(`/resumes/${resumeId}/score`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get matched jobs for resume
   */
  async getMatchedJobs(resumeId) {
    try {
      const response = await api.get(`/resumes/${resumeId}/matches`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update resume
   */
  async updateResume(resumeId, data) {
    try {
      const response = await api.put(`/resumes/${resumeId}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Share resume
   */
  async shareResume(resumeId, email) {
    try {
      const response = await api.post(`/resumes/${resumeId}/share`, { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Extract skills from text
   */
  extractSkills(text) {
    const commonSkills = [
      'JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js',
      'Accounting', 'Excel', 'QuickBooks', 'Management',
      'Communication', 'Leadership', 'Problem Solving',
      'Amharic', 'English', 'Microsoft Office', 'Data Analysis',
      'Project Management', 'Team Leadership', 'Customer Service',
      'Sales', 'Marketing', 'Social Media', 'Content Writing',
      'Graphic Design', 'Adobe Suite', 'Photoshop', 'Illustrator',
      'HTML', 'CSS', 'PHP', 'SQL', 'MongoDB', 'AWS', 'Docker',
      'Agile', 'Scrum', 'Kanban', 'JIRA', 'Confluence'
    ];

    const found = [];
    const lowerText = text.toLowerCase();

    commonSkills.forEach(skill => {
      if (lowerText.includes(skill.toLowerCase())) {
        found.push(skill);
      }
    });

    return found;
  }

  /**
   * Calculate resume score
   */
  calculateResumeScore(resumeData) {
    let score = 0;
    const feedback = [];

    // Check for contact information
    if (resumeData.email) score += 10;
    else feedback.push({ type: 'warning', message: 'Add your email address' });

    if (resumeData.phone) score += 10;
    else feedback.push({ type: 'warning', message: 'Add your phone number' });

    // Check for skills
    if (resumeData.skills?.hard?.length > 0) {
      score += Math.min(20, resumeData.skills.hard.length * 2);
    } else {
      feedback.push({ type: 'error', message: 'Add your technical skills' });
    }

    if (resumeData.skills?.soft?.length > 0) {
      score += Math.min(10, resumeData.skills.soft.length);
    }

    // Check for experience
    if (resumeData.experience?.length > 0) {
      score += 20;
      
      // Check for achievements in experience
      const hasAchievements = resumeData.experience.some(exp => 
        exp.achievements?.length > 0
      );
      if (hasAchievements) score += 10;
    } else {
      feedback.push({ type: 'error', message: 'Add your work experience' });
    }

    // Check for education
    if (resumeData.education?.length > 0) {
      score += 15;
    } else {
      feedback.push({ type: 'warning', message: 'Add your education details' });
    }

    // Check for languages
    if (resumeData.languages?.length > 0) {
      score += 10;
    }

    // Check for summary
    if (resumeData.summary) {
      score += resumeData.summary.length > 100 ? 15 : 10;
    } else {
      feedback.push({ type: 'warning', message: 'Add a professional summary' });
    }

    return {
      score: Math.min(100, score),
      feedback,
    };
  }
}

export default new ResumeService();