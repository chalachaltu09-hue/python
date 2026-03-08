import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiCheckCircle, FiArrowRight, FiX } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';

const ImprovementTips = ({ tips = [], onDismiss }) => {
  const { t, language } = useLanguage();
  const [dismissed, setDismissed] = useState([]);

  if (!tips || tips.length === 0) {
    return null;
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return {
          bg: 'bg-red-50 dark:bg-red-900/20',
          border: 'border-red-200 dark:border-red-800',
          text: 'text-red-800 dark:text-red-200',
          icon: 'text-red-500'
        };
      case 'medium':
        return {
          bg: 'bg-yellow-50 dark:bg-yellow-900/20',
          border: 'border-yellow-200 dark:border-yellow-800',
          text: 'text-yellow-800 dark:text-yellow-200',
          icon: 'text-yellow-500'
        };
      default:
        return {
          bg: 'bg-blue-50 dark:bg-blue-900/20',
          border: 'border-blue-200 dark:border-blue-800',
          text: 'text-blue-800 dark:text-blue-200',
          icon: 'text-blue-500'
        };
    }
  };

  const handleDismiss = (index) => {
    setDismissed([...dismissed, index]);
    if (onDismiss) onDismiss(index);
  };

  const visibleTips = tips.filter((_, index) => !dismissed.includes(index));

  if (visibleTips.length === 0) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
        <div className="flex items-center">
          <FiCheckCircle className="w-6 h-6 text-green-500 mr-3" />
          <p className="text-green-800 dark:text-green-200">
            {t('analysis.noImprovements')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {t('analysis.suggestions')}
      </h3>
      
      <div className="space-y-3">
        {visibleTips.map((tip, index) => {
          const colors = getSeverityColor(tip.severity);
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`relative p-4 rounded-lg border ${colors.bg} ${colors.border}`}
            >
              <button
                onClick={() => handleDismiss(index)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <FiX className="w-4 h-4" />
              </button>
              
              <div className="flex items-start pr-6">
                <FiAlertCircle className={`w-5 h-5 ${colors.icon} mr-3 flex-shrink-0 mt-0.5`} />
                <div>
                  <p className={`text-sm font-medium ${colors.text} mb-1`}>
                    {tip.category}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    {tip.message}
                  </p>
                  {tip.suggestion && (
                    <div className="flex items-center text-sm text-primary-600 dark:text-primary-400">
                      <FiArrowRight className="mr-1" />
                      {tip.suggestion}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ImprovementTips;