import React from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiAward, FiTarget } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import ScoreGauge from './ScoreGauge';

const ResumeScore = ({ score = 0, analysis = {} }) => {
  const { t, language } = useLanguage();

  const getScoreLevel = (score) => {
    if (score < 40) return { label: t('score.poor'), color: 'text-red-500' };
    if (score < 60) return { label: t('score.average'), color: 'text-yellow-500' };
    if (score < 80) return { label: t('score.good'), color: 'text-blue-500' };
    return { label: t('score.excellent'), color: 'text-green-500' };
  };

  const scoreLevel = getScoreLevel(score);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score Gauge */}
        <div className="lg:col-span-1">
          <ScoreGauge score={score} />
          
          <div className="text-center mt-4">
            <p className={`text-lg font-semibold ${scoreLevel.color}`}>
              {scoreLevel.label}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {t('score.outOfHundred')}
            </p>
          </div>
        </div>

        {/* Score Details */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('score.details')}
          </h3>

          <div className="space-y-4">
            {/* Categories */}
            {analysis.categories?.map((category, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {category.name}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {category.score}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${category.score}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="bg-primary-600 h-2 rounded-full"
                  />
                </div>
              </div>
            ))}

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                <div className="flex items-center text-blue-600 dark:text-blue-400 mb-1">
                  <FiTrendingUp className="mr-1" />
                  <span className="text-xs font-medium">{t('score.strength')}</span>
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {analysis.strengths?.length || 0}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                <div className="flex items-center text-yellow-600 dark:text-yellow-400 mb-1">
                  <FiTarget className="mr-1" />
                  <span className="text-xs font-medium">{t('score.improvements')}</span>
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {analysis.weaknesses?.length || 0}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                <div className="flex items-center text-green-600 dark:text-green-400 mb-1">
                  <FiAward className="mr-1" />
                  <span className="text-xs font-medium">{t('score.skills')}</span>
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {analysis.totalSkills || 0}
                </p>
              </div>
            </div>

            {/* Summary */}
            {analysis.summary && (
              <div className="mt-4 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <p className="text-sm text-primary-800 dark:text-primary-200">
                  {analysis.summary}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeScore;