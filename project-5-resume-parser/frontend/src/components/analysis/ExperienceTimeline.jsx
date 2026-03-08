import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiMapPin, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';

const ExperienceTimeline = ({ experience = [] }) => {
  const { t, language } = useLanguage();
  const [expandedIndex, setExpandedIndex] = useState(null);

  if (!experience || experience.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('analysis.experience')}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
          {t('analysis.noExperience')}
        </p>
      </div>
    );
  }

  const formatDate = (date) => {
    if (!date) return t('experience.present');
    return new Date(date).toLocaleDateString(language === 'am' ? 'am-ET' : 'en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {t('analysis.experience')}
      </h3>
      
      <div className="space-y-4">
        {experience.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-8 pb-4 border-l-2 border-primary-200 dark:border-primary-800 last:pb-0"
          >
            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-green-500" />
            
            <div className="mb-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                  {exp.role}
                </h4>
                <span className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <FiCalendar className="mr-1" />
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </span>
              </div>
              
              <div className="flex items-center gap-4 mt-1">
                <p className="text-primary-600 dark:text-primary-400 font-medium">
                  {exp.company}
                </p>
                {exp.location && (
                  <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <FiMapPin className="mr-1" />
                    {exp.location}
                  </span>
                )}
              </div>
            </div>

            {(exp.responsibilities?.length > 0 || exp.achievements?.length > 0) && (
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="flex items-center text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 mt-2"
              >
                {expandedIndex === index ? (
                  <>
                    <FiChevronUp className="mr-1" />
                    {t('common.showLess')}
                  </>
                ) : (
                  <>
                    <FiChevronDown className="mr-1" />
                    {t('common.showMore')}
                  </>
                )}
              </button>
            )}

            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mt-3"
                >
                  {exp.responsibilities?.length > 0 && (
                    <div className="mb-3">
                      <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('experience.responsibilities')}:
                      </h5>
                      <ul className="list-disc list-inside space-y-1">
                        {exp.responsibilities.map((resp, idx) => (
                          <li key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {exp.achievements?.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('experience.achievements')}:
                      </h5>
                      <ul className="list-disc list-inside space-y-1">
                        {exp.achievements.map((ach, idx) => (
                          <li key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                            {ach}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceTimeline;