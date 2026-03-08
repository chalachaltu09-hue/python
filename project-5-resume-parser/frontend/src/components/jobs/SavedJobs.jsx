import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiBookmark, FiTrash2, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import JobCard from './JobCard';
import Button from '../common/Button';
import Spinner from '../common/Spinner';
import Tabs from '../common/Tabs';
import axios from 'axios';
import toast from 'react-hot-toast';

const SavedJobs = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('saved');

  useEffect(() => {
    if (user) {
      fetchSavedJobs();
    }
  }, [user, activeTab]);

  const fetchSavedJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/users/saved-jobs?status=${activeTab}`);
      setSavedJobs(response.data.data);
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
      setError(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (jobId) => {
    try {
      await axios.delete(`/api/users/saved-jobs/${jobId}`);
      setSavedJobs(savedJobs.filter(job => job._id !== jobId));
      toast.success(t('jobs.removed'));
    } catch (error) {
      toast.error(error.response?.data?.error || t('common.error'));
    }
  };

  const handleStatusUpdate = async (jobId, status) => {
    try {
      await axios.put(`/api/users/saved-jobs/${jobId}`, { status });
      fetchSavedJobs(); // Refresh the list
      toast.success(t('jobs.statusUpdated'));
    } catch (error) {
      toast.error(error.response?.data?.error || t('common.error'));
    }
  };

  const tabs = [
    {
      label: t('jobs.saved'),
      value: 'saved',
      icon: FiBookmark,
      content: (
        <SavedJobsList
          jobs={savedJobs}
          loading={loading}
          error={error}
          onRemove={handleRemove}
          onStatusUpdate={handleStatusUpdate}
        />
      )
    },
    {
      label: t('jobs.applied'),
      value: 'applied',
      icon: FiCheckCircle,
      content: (
        <SavedJobsList
          jobs={savedJobs}
          loading={loading}
          error={error}
          onRemove={handleRemove}
          onStatusUpdate={handleStatusUpdate}
          showStatus
        />
      )
    },
    {
      label: t('jobs.interviewing'),
      value: 'interviewing',
      icon: FiClock,
      content: (
        <SavedJobsList
          jobs={savedJobs}
          loading={loading}
          error={error}
          onRemove={handleRemove}
          onStatusUpdate={handleStatusUpdate}
          showStatus
        />
      )
    }
  ];

  if (!user) {
    return (
      <div className="text-center py-12">
        <FiBookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {t('jobs.loginToSave')}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {t('jobs.createAccountToSave')}
        </p>
        <Button variant="primary" onClick={() => navigate('/login')}>
          {t('auth.login')}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('profile.savedJobs')}
        </h1>
      </div>

      <Tabs 
        tabs={tabs} 
        defaultTab={0}
        onChange={(index) => setActiveTab(tabs[index].value)}
        variant="pills"
      />
    </div>
  );
};

// Sub-component for the jobs list
const SavedJobsList = ({ jobs, loading, error, onRemove, onStatusUpdate, showStatus = false }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
        <Button variant="primary" onClick={() => window.location.reload()}>
          {t('common.tryAgain')}
        </Button>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
      >
        <FiBookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {t('jobs.noSavedJobs')}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {t('jobs.startBrowsing')}
        </p>
        <Button variant="primary" onClick={() => navigate('/jobs')}>
          {t('jobs.browseJobs')}
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {jobs.map((savedJob, index) => (
          <motion.div
            key={savedJob._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ delay: index * 0.05 }}
            className="relative group"
          >
            <JobCard
              job={savedJob.jobId}
              onClick={() => navigate(`/jobs/${savedJob.jobId._id}`)}
            />
            
            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {showStatus && (
                <select
                  value={savedJob.status}
                  onChange={(e) => onStatusUpdate(savedJob.jobId._id, e.target.value)}
                  className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 bg-white dark:bg-gray-800"
                >
                  <option value="saved">{t('jobs.saved')}</option>
                  <option value="applied">{t('jobs.applied')}</option>
                  <option value="interviewing">{t('jobs.interviewing')}</option>
                  <option value="rejected">{t('jobs.rejected')}</option>
                  <option value="accepted">{t('jobs.accepted')}</option>
                </select>
              )}
              
              <button
                onClick={() => onRemove(savedJob.jobId._id)}
                className="p-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors"
                title={t('common.remove')}
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Status Badge */}
            {savedJob.status !== 'saved' && (
              <div className="absolute top-4 left-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  savedJob.status === 'applied' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                  savedJob.status === 'interviewing' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                  savedJob.status === 'accepted' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  savedJob.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {t(`jobs.${savedJob.status}`)}
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SavedJobs;