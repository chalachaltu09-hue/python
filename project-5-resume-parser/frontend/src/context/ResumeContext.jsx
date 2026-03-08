import React, { createContext, useContext, useState, useCallback } from 'react';
import { resumeService } from '../services/resumeService';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const ResumeContext = createContext();

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

export const ResumeProvider = ({ children }) => {
  const { user } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [currentResume, setCurrentResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  // Fetch user's resumes
  const fetchResumes = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const response = await resumeService.getUserResumes();
      setResumes(response.data);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch resumes');
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Upload and parse resume
  const uploadResume = useCallback(async (file, language = 'en') => {
    setLoading(true);
    try {
      const response = await resumeService.uploadResume(file, language);
      setCurrentResume(response.data);
      setAnalysis(response.data.analysis);
      
      // Refresh resume list
      await fetchResumes();
      
      toast.success('Resume uploaded and analyzed successfully');
      return response.data;
    } catch (error) {
      toast.error(error.message || 'Failed to upload resume');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [fetchResumes]);

  // Get resume by ID
  const getResume = useCallback(async (resumeId) => {
    setLoading(true);
    try {
      const response = await resumeService.getResume(resumeId);
      setCurrentResume(response.data);
      setAnalysis(response.data.analysis);
      return response.data;
    } catch (error) {
      toast.error(error.message || 'Failed to fetch resume');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete resume
  const deleteResume = useCallback(async (resumeId) => {
    try {
      await resumeService.deleteResume(resumeId);
      setResumes(prev => prev.filter(r => r._id !== resumeId));
      if (currentResume?._id === resumeId) {
        setCurrentResume(null);
        setAnalysis(null);
      }
      toast.success('Resume deleted successfully');
      return true;
    } catch (error) {
      toast.error(error.message || 'Failed to delete resume');
      return false;
    }
  }, [currentResume]);

  // Analyze skill gap
  const analyzeSkillGap = useCallback(async (resumeId, jobId, language = 'en') => {
    try {
      const response = await resumeService.analyzeSkillGap(resumeId, jobId, language);
      return response.data;
    } catch (error) {
      toast.error(error.message || 'Failed to analyze skill gap');
      return null;
    }
  }, []);

  // Get resume score
  const getResumeScore = useCallback((resumeData) => {
    return resumeData?.analysis?.score || 0;
  }, []);

  // Get matched jobs
  const getMatchedJobs = useCallback((resumeData) => {
    return resumeData?.matchedJobs || [];
  }, []);

  // Get skills from resume
  const getSkills = useCallback((resumeData) => {
    return {
      hard: resumeData?.parsedData?.skills?.hard || [],
      soft: resumeData?.parsedData?.skills?.soft || [],
      all: resumeData?.parsedData?.skills?.all || []
    };
  }, []);

  const value = {
    resumes,
    currentResume,
    analysis,
    loading,
    fetchResumes,
    uploadResume,
    getResume,
    deleteResume,
    analyzeSkillGap,
    getResumeScore,
    getMatchedJobs,
    getSkills
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};