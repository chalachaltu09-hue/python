import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FiBriefcase, 
  FiMapPin, 
  FiClock, 
  FiBookmark,
  FiTrash2,
  FiCheckCircle,
  FiXCircle
} from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import Card from '../common/Card';
import Button from '../common/Button';
import Spinner from '../common/Spinner';
import Badge from '../common/Badge';
import axios from 'axios';
import toast from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';

const SavedJobsList = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'applied', 'interviewing', 'saved'
  const [removing, setRemoving] = useState(null);

  useEffect(() => {
    fetchSavedJobs();
  }, [filter]);

  const fetchSavedJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/users/saved-jobs${filter !== 'all' ? `?status=${filter}` : ''}`);
      setSavedJobs(response.data.data);
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
      toast.error(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (jobId) => {
    if (!window.confirm(t('profile.confirmRemove'))) return;

    setRemoving(jobId);
    try {
      await axios.delete(`/api/users/saved-jobs/${jobId}`);
      setSavedJobs(savedJobs.filter(job => job._id !== jobId));
      toast.success(t('jobs.removed'));
    } catch (error) {
      toast.error(error.response?.data?.error || t('common.error'));
    } finally {
      setRemoving(null);
    }
  };

  const handleStatusChange = async (jobId, newStatus) => {
    try {
      await axios.put(`/api/users/saved-jobs/${jobId}`, { status: newStatus });
      fetchSavedJobs(); // Refresh to show updated status
      toast.success(t('jobs.statusUpdated'));
    } catch (error) {
      toast.error(error.response?.data?.error || t('common.error'));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'applied':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'interviewing':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'accepted':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const filterButtons = [
    { value: 'all', label: t('common.all') },
    { value: 'saved', label: t('jobs.saved') },
    { value: 'applied', label: t('jobs.applied') },
    { value: 'interviewing', label: t('jobs.interviewing') }
  ];

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
          {t('profile.savedJobs')}
        </h2>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {filterButtons.map((btn) => (
          <button
            key={btn.value}
            onClick={() => setFilter(btn.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === btn.value
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {savedJobs.length === 0 ? (
        <Card className="text-center py-12">
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
        </Card>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {savedJobs.map((saved, index) => (
              <motion.div
                key={saved._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    {/* Job Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 
                            onClick={() => navigate(`/jobs/${saved.jobId?._id}`)}
                            className="text-lg font-semibold text-gray-900 dark:text-white mb-1 cursor-pointer hover:text-primary-600 dark:hover:text-primary-400"
                          >
                            {saved.jobId?.title}
                          </h3>
                          <p className="text-primary-600 dark:text-primary-400 mb-2">
                            {saved.jobId?.company}
                          </p>
                        </div>
                        
                        <Badge 
                          variant={
                            saved.status === 'saved' ? 'default' :
                            saved.status === 'applied' ? 'primary' :
                            saved.status === 'interviewing' ? 'warning' :
                            saved.status === 'accepted' ? 'success' : 'error'
                          }
                        >
                          {t(`jobs.${saved.status}`)}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <span className="flex items-center">
                          <FiMapPin className="mr-1" />
                          {saved.jobId?.location}
                        </span>
                        <span className="flex items-center">
                          <FiBriefcase className="mr-1" />
                          {t(`jobs.types.${saved.jobId?.jobType?.toLowerCase()}`)}
                        </span>
                        {saved.jobId?.salary && (
                          <span className="flex items-center">
                            <FiClock className="mr-1" />
                            {saved.jobId.salary.min} - {saved.jobId.salary.max} ETB
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        <select
                          value={saved.status}
                          onChange={(e) => handleStatusChange(saved._id, e.target.value)}
                          className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                        >
                          <option value="saved">{t('jobs.saved')}</option>
                          <option value="applied">{t('jobs.applied')}</option>
                          <option value="interviewing">{t('jobs.interviewing')}</option>
                          <option value="rejected">{t('jobs.rejected')}</option>
                          <option value="accepted">{t('jobs.accepted')}</option>
                        </select>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(saved.jobId?.applicationUrl, '_blank')}
                        >
                          {t('jobs.apply')}
                        </Button>

                        <button
                          onClick={() => handleRemove(saved._id)}
                          disabled={removing === saved._id}
                          className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                          title={t('common.remove')}
                        >
                          {removing === saved._id ? (
                            <Spinner size="sm" />
                          ) : (
                            <FiTrash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      {/* Notes */}
                      {saved.notes && (
                        <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium">{t('profile.notes')}:</span> {saved.notes}
                          </p>
                        </div>
                      )}

                      {/* Dates */}
                      <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-500">
                        {saved.applicationDate && (
                          <span className="flex items-center">
                            <FiCheckCircle className="mr-1" />
                            {t('profile.appliedOn')}: {formatDistanceToNow(new Date(saved.applicationDate))} ago
                          </span>
                        )}
                        {saved.interviewDate && (
                          <span className="flex items-center">
                            <FiClock className="mr-1" />
                            {t('profile.interviewOn')}: {new Date(saved.interviewDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default SavedJobsList;