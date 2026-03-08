import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import JobCard from './JobCard';
import Spinner from '../common/Spinner';
import Button from '../common/Button';

const JobList = ({ 
  jobs = [], 
  loading = false, 
  error = null,
  pagination,
  onPageChange,
  onJobClick,
  onSave,
  matchDetails = {}
}) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleJobClick = (job) => {
    if (onJobClick) {
      onJobClick(job);
    } else {
      navigate(`/jobs/${job._id}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner size="lg" text={t('common.loading')} />
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
        <img 
          src="/images/no-jobs.svg" 
          alt="No jobs found"
          className="w-32 h-32 mx-auto mb-4 opacity-50"
        />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {t('jobs.noJobsFound')}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {t('jobs.tryAdjustingFilters')}
        </p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          {t('common.clearFilters')}
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results count */}
      {pagination && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('jobs.showingResults', {
              start: (pagination.page - 1) * pagination.limit + 1,
              end: Math.min(pagination.page * pagination.limit, pagination.total),
              total: pagination.total
            })}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('jobs.sortBy')}: <span className="font-medium text-gray-900 dark:text-white">Most Recent</span>
          </p>
        </div>
      )}

      {/* Job Cards */}
      <AnimatePresence mode="popLayout">
        <div className="space-y-4">
          {jobs.map((job, index) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
            >
              <JobCard
                job={job}
                matchDetails={matchDetails[job._id]}
                onClick={() => handleJobClick(job)}
                onSave={onSave}
              />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {/* Pagination */}
      {pagination && pagination.pages > 1 && (
        <div className="flex items-center justify-center mt-8">
          <nav className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
            >
              {t('common.previous')}
            </Button>
            
            {Array.from({ length: pagination.pages }, (_, i) => i + 1)
              .filter(page => (
                page === 1 ||
                page === pagination.pages ||
                Math.abs(page - pagination.page) <= 2
              ))
              .map((page, index, array) => (
                <React.Fragment key={page}>
                  {index > 0 && array[index - 1] !== page - 1 && (
                    <span className="px-2 text-gray-500">...</span>
                  )}
                  <Button
                    variant={pagination.page === page ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => onPageChange(page)}
                  >
                    {page}
                  </Button>
                </React.Fragment>
              ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.pages}
            >
              {t('common.next')}
            </Button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default JobList;