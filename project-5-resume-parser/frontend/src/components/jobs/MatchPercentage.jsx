import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiXCircle, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import ProgressBar from '../common/ProgressBar';
import Badge from '../common/Badge';

const MatchPercentage = ({ 
  percentage = 0, 
  matchedSkills = [], 
  missingSkills = [],
  size = 'md', // 'sm', 'md', 'lg'
  showDetails = false,
  className = ''
}) => {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(showDetails);

  const getMatchColor = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'primary';
    if (score >= 40) return 'warning';
    return 'danger';
  };

  const getMatchLabel = (score) => {
    if (score >= 80) return t('jobs.excellentMatch');
    if (score >= 60) return t('jobs.goodMatch');
    if (score >= 40) return t('jobs.fairMatch');
    return t('jobs.lowMatch');
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'p-3',
          percentage: 'text-xl',
          label: 'text-xs',
          icon: 'w-4 h-4'
        };
      case 'lg':
        return {
          container: 'p-6',
          percentage: 'text-4xl',
          label: 'text-base',
          icon: 'w-6 h-6'
        };
      default:
        return {
          container: 'p-4',
          percentage: 'text-2xl',
          label: 'text-sm',
          icon: 'w-5 h-5'
        };
    }
  };

  const classes = getSizeClasses();
  const matchColor = getMatchColor(percentage);

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm ${classes.container} ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`text-${matchColor === 'danger' ? 'red' : matchColor}-600 dark:text-${matchColor === 'danger' ? 'red' : matchColor}-400`}>
            <span className={`font-bold ${classes.percentage}`}>{percentage}%</span>
          </div>
          <div>
            <p className={`font-medium text-gray-900 dark:text-white ${classes.label}`}>
              {getMatchLabel(percentage)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {matchedSkills.length} {t('jobs.skillsMatched')} • {missingSkills.length} {t('jobs.skillsMissing')}
            </p>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          {expanded ? <FiChevronUp /> : <FiChevronDown />}
        </button>
      </div>

      {/* Progress Bar */}
      <ProgressBar 
        value={percentage} 
        max={100}
        variant={matchColor}
        size="sm"
        showLabel={false}
      />

      {/* Details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mt-4"
          >
            <div className="space-y-4">
              {/* Matched Skills */}
              {matchedSkills.length > 0 && (
                <div>
                  <h4 className="flex items-center text-sm font-medium text-green-600 dark:text-green-400 mb-2">
                    <FiCheckCircle className={`mr-1 ${classes.icon}`} />
                    {t('jobs.matchedSkills')} ({matchedSkills.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {matchedSkills.map((skill, index) => (
                      <Badge key={index} variant="success" size="sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Missing Skills */}
              {missingSkills.length > 0 && (
                <div>
                  <h4 className="flex items-center text-sm font-medium text-red-600 dark:text-red-400 mb-2">
                    <FiXCircle className={`mr-1 ${classes.icon}`} />
                    {t('jobs.missingSkills')} ({missingSkills.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {missingSkills.map((skill, index) => (
                      <Badge key={index} variant="error" size="sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendation */}
              {percentage < 60 && (
                <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <p className="text-xs text-yellow-800 dark:text-yellow-200">
                    {t('jobs.improveMatch')}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MatchPercentage;