import { useState, useCallback } from 'react';
import { resumeService } from '../services/resumeService';
import { useLanguage } from './useLanguage';
import toast from 'react-hot-toast';

export const useUpload = () => {
  const { language } = useLanguage();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const uploadFile = useCallback(async (file) => {
    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      const response = await resumeService.uploadResume(file, language);
      
      clearInterval(progressInterval);
      setProgress(100);
      setResult(response.data);
      
      return response.data;
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
      throw err;
    } finally {
      setUploading(false);
    }
  }, [language]);

  const reset = useCallback(() => {
    setUploading(false);
    setProgress(0);
    setError(null);
    setResult(null);
  }, []);

  return {
    uploadFile,
    uploading,
    progress,
    error,
    result,
    reset
  };
};