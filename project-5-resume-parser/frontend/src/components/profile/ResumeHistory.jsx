import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FiFileText, 
  FiCalendar, 
  FiTrendingUp, 
  FiDownload,
  FiTrash2,
  FiEye,
  FiClock
} from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import Card from '../common/Card';
import Button from '../common/Button';
import Spinner from '../common/Spinner';
import axios from 'axios';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const ResumeHistory = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/users/resumes');
      setResumes(response.data.data);
    } catch (error) {
      console.error('Error fetching resumes:', error);
      toast.error(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (resumeId) => {
    if (!window.confirm(t('profile.confirmDelete'))) return;

    setDeleting(resumeId);
    try {
      await axios.delete(`/api/resumes/${resumeId}`);
      setResumes(resumes.filter(r => r._id !== resumeId));
      toast.success(t('profile.resumeDeleted'));
    } catch (error) {
      toast.error(error.response?.data?.error || t('common.error'));
    } finally {
      setDeleting(null);
    }
  };

  const handleDownload = async (resumeId) => {
    try {
      const response = await axios.get(`/api/resumes/${resumeId}/download`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `resume-${resumeId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error(t('profile.downloadError'));
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-blue-600 dark:text-blue-400';
    if (score >= 40) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner size="lg" text={t('common.loading')} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('profile.resumeHistory')}
        </h2>
        <Button
          variant="primary"
          onClick={() => navigate('/')}
          icon={FiFileText}
        >
          {t('profile.uploadNew')}
        </Button>
      </div>

      {resumes.length === 0 ? (
        <Card className="text-center py-12">
          <FiFileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {t('profile.noResumes')}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {t('profile.uploadFirstResume')}
          </p>
          <Button variant="primary" onClick={() => navigate('/')}>
            {t('profile.uploadNow')}
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {resumes.map((resume, index) => (
              <motion.div
                key={resume._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Resume Info */}
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                        <FiFileText className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                          {resume.fileName}
                        </h3>
                        
                        <div className="flex flex-wrap items-center gap-3 text-sm">
                          <span className="flex items-center text-gray-500 dark:text-gray-400">
                            <FiCalendar className="mr-1" />
                            {format(new Date(resume.createdAt), 'MMM dd, yyyy')}
                          </span>
                          
                          <span className="flex items-center text-gray-500 dark:text-gray-400">
                            <FiClock className="mr-1" />
                            {format(new Date(resume.createdAt), 'hh:mm a')}
                          </span>
                          
                          {resume.analysis?.score && (
                            <span className={`flex items-center font-medium ${getScoreColor(resume.analysis.score)}`}>
                              <FiTrendingUp className="mr-1" />
                              {t('profile.score')}: {resume.analysis.score}
                            </span>
                          )}
                        </div>

                        {/* Skills Preview */}
                        {resume.parsedData?.skills?.all && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {resume.parsedData.skills.all.slice(0, 5).map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
                              >
                                {skill}
                              </span>
                            ))}
                            {resume.parsedData.skills.all.length > 5 && (
                              <span className="px-2 py-0.5 text-xs text-primary-600 dark:text-primary-400">
                                +{resume.parsedData.skills.all.length - 5}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 sm:ml-auto">
                      <button
                        onClick={() => navigate(`/results/${resume._id}`)}
                        className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        title={t('common.view')}
                      >
                        <FiEye className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => handleDownload(resume._id)}
                        className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        title={t('common.download')}
                      >
                        <FiDownload className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => handleDelete(resume._id)}
                        disabled={deleting === resume._id}
                        className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                        title={t('common.delete')}
                      >
                        {deleting === resume._id ? (
                          <Spinner size="sm" />
                        ) : (
                          <FiTrash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Match Summary */}
                  {resume.matchedJobs && resume.matchedJobs.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {t('profile.topMatches')}:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {resume.matchedJobs.slice(0, 3).map((match, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 text-xs rounded"
                          >
                            {match.matchScore}% Match
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default ResumeHistory;