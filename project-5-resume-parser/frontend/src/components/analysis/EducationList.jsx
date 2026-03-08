import React from 'react';
import { motion } from 'framer-motion';
import { FiGraduationCap, FiCalendar, FiMapPin } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';

const EducationList = ({ education = [] }) => {
  const { t, language } = useLanguage();

  if (!education || education.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('analysis.education')}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
          {t('analysis.noEducation')}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {t('analysis.education')}
      </h3>
      
      <div className="space-y-4">
        {education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-8 pb-4 border-l-2 border-primary-200 dark:border-primary-800 last:pb-0"
          >
            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary-500" />
            
            <div className="mb-1 flex items-center flex-wrap gap-2">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                {edu.degree}
              </h4>
              {edu.graduationYear && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                  <FiCalendar className="mr-1" />
                  {edu.graduationYear}
                </span>
              )}
            </div>
            
            <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
              {edu.institution}
            </p>
            
            {edu.field && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {t('education.field')}: {edu.field}
              </p>
            )}
            
            {edu.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {edu.description}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EducationList;