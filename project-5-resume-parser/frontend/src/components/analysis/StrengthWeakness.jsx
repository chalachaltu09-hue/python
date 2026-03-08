import React from 'react';
import { motion } from 'framer-motion';
import { FiThumbsUp, FiAlertTriangle, FiLightbulb } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';

const StrengthWeakness = ({ strengths = [], weaknesses = [] }) => {
  const { t, language } = useLanguage();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div>
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mr-3">
              <FiThumbsUp className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('analysis.strengths')}
            </h3>
          </div>

          {strengths.length > 0 ? (
            <ul className="space-y-3">
              {strengths.map((strength, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <span className="inline-flex items-center justify-center w-5 h-5 bg-green-100 dark:bg-green-900/20 rounded-full text-green-600 dark:text-green-400 text-xs font-medium mr-3 mt-0.5">
                    ✓
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">{strength}</span>
                </motion.li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              {t('analysis.noStrengths')}
            </p>
          )}
        </div>

        {/* Weaknesses */}
        <div>
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center mr-3">
              <FiAlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('analysis.weaknesses')}
            </h3>
          </div>

          {weaknesses.length > 0 ? (
            <ul className="space-y-3">
              {weaknesses.map((weakness, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <span className="inline-flex items-center justify-center w-5 h-5 bg-yellow-100 dark:bg-yellow-900/20 rounded-full text-yellow-600 dark:text-yellow-400 text-xs font-medium mr-3 mt-0.5">
                    !
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">{weakness}</span>
                </motion.li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              {t('analysis.noWeaknesses')}
            </p>
          )}
        </div>
      </div>

      {/* Improvement Tip */}
      {strengths.length > 0 && weaknesses.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-start"
        >
          <FiLightbulb className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-primary-800 dark:text-primary-200">
            {t('analysis.improvementTip')}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default StrengthWeakness;