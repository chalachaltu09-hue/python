import React, { createContext, useContext, useState, useCallback } from 'react';
import { jobService } from '../services/jobService';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const JobContext = createContext();

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};

export const JobProvider = ({ children }) => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [filters, setFilters] = useState({});

  // Fetch jobs with filters
  const fetchJobs = useCallback(async (page = 1, newFilters = {}) => {
    setLoading(true);
    try {
      const response = await jobService.getJobs({ page, ...filters, ...newFilters });
      setJobs(response.data);
      setPagination(response.pagination);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Fetch recommended jobs
  const fetchRecommendedJobs = useCallback(async () => {
    try {
      const response = await jobService.getRecommendedJobs();
      setRecommendedJobs(response.data);
    } catch (error) {
      console.error('Failed to fetch recommended jobs:', error);
    }
  }, []);

  // Fetch saved jobs
  const fetchSavedJobs = useCallback(async () => {
    if (!user) return;
    
    try {
      const response = await jobService.getSavedJobs();
      setSavedJobs(response.data);
    } catch (error) {
      console.error('Failed to fetch saved jobs:', error);
    }
  }, [user]);

  // Save a job
  const saveJob = useCallback(async (jobId, notes = '') => {
    try {
      await jobService.saveJob(jobId, notes);
      await fetchSavedJobs();
      toast.success('Job saved successfully');
      return true;
    } catch (error) {
      toast.error(error.message || 'Failed to save job');
      return false;
    }
  }, [fetchSavedJobs]);

  // Remove saved job
  const removeSavedJob = useCallback(async (jobId) => {
    try {
      await jobService.removeSavedJob(jobId);
      setSavedJobs(prev => prev.filter(job => job._id !== jobId));
      toast.success('Job removed from saved');
      return true;
    } catch (error) {
      toast.error(error.message || 'Failed to remove job');
      return false;
    }
  }, []);

  // Update job status
  const updateJobStatus = useCallback(async (jobId, status) => {
    try {
      await jobService.updateJobStatus(jobId, status);
      await fetchSavedJobs();
      toast.success('Job status updated');
      return true;
    } catch (error) {
      toast.error(error.message || 'Failed to update job status');
      return false;
    }
  }, [fetchSavedJobs]);

  // Search jobs
  const searchJobs = useCallback(async (query) => {
    setLoading(true);
    try {
      const response = await jobService.searchJobs(query);
      setJobs(response.data);
      return response.data;
    } catch (error) {
      toast.error(error.message || 'Search failed');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Clear filters
  const clearFilters = useCallback(() => {
    setFilters({});
    fetchJobs(1, {});
  }, [fetchJobs]);

  // Get job by ID
  const getJobById = useCallback(async (jobId) => {
    try {
      return await jobService.getJobById(jobId);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch job details');
      return null;
    }
  }, []);

  // Check if job is saved
  const isJobSaved = useCallback((jobId) => {
    return savedJobs.some(job => job._id === jobId);
  }, [savedJobs]);

  const value = {
    jobs,
    recommendedJobs,
    savedJobs,
    loading,
    pagination,
    filters,
    fetchJobs,
    fetchRecommendedJobs,
    fetchSavedJobs,
    saveJob,
    removeSavedJob,
    updateJobStatus,
    searchJobs,
    updateFilters,
    clearFilters,
    getJobById,
    isJobSaved
  };

  return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
  );
};