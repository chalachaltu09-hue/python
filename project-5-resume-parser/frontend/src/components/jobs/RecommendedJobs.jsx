import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiBriefcase, FiTrendingUp, FiStar } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import JobCard from './JobCard';
import Button from '../common/Button';
import Spinner from '../common/Spinner';
import axios from 'axios';

const RecommendedJobs = ({ limit = 3, showViewAll = true, className = '' }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecommendedJobs();
  }, []);

  const fetchRecommendedJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/jobs/recommended');
      setJobs(response.data.data.slice(0, limit));
    } catch (error) {
      console.error('Error fetching recommended jobs:', error);
      setError(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('jobs.recommended')}
          </h3>
        </div>
        <div className="flex items-center justify-center py-8">
          <Spinner size="md" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('jobs.recommended')}
        </h3>
        <p className="text-red-600 dark:text-red-400 text-center py-4">{error}</p>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('jobs.recommended')}
        </h3>
        <div className="text-center py-8">
          <FiBriefcase className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {user ? t('jobs.noRecommendations') : t('jobs.loginForRecommendations')}
          </p>
          {!user && (
            <Button variant="primary" onClick={() => navigate('/login')}>
              {t('auth.login')}
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
            <FiTrendingUp className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('jobs.recommended')}
          </h3>
        </div>
        
        {showViewAll && jobs.length >= limit && (
          <button
            onClick={() => navigate('/jobs')}
            className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            {t('common.viewAll')} →
          </button>
        )}
      </div>

      {/* Job Cards */}
      <div className="space-y-4">
        {jobs.map((job, index) => (
          <motion.div
            key={job._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <JobCard
              job={job}
              matchDetails={job.matchDetails}
              onClick={() => navigate(`/jobs/${job._id}`)}
              variant="compact"
            />
          </motion.div>
        ))}
      </div>

      {/* View All Link (if fewer than limit) */}
      {jobs.length < limit && showViewAll && (
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/jobs')}
            className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
          >
            {t('jobs.browseAllJobs')} →
          </button>
        </div>
      )}
    </div>
  );
};

export default RecommendedJobs;