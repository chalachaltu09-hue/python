import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiXCircle, FiTrendingUp, FiBookOpen } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';

const SkillGapAnalysis = ({ data = {}, jobTitle }) => {
  const { t, language } = useLanguage();
  const [selectedSkill, setSelectedSkill] = useState(null);

  const {
    matchedSkills = [],
    missingRequired = [],
    missingPreferred = [],
    recommendations = [],
    matchPercentage = 0
  } = data;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {t('analysis.skillGap')} {jobTitle && `- ${jobTitle}`}
      </h3>

      {/* Match Percentage */}
      <div className="mb-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
            {t('jobs.matchPercentage', { percentage: matchPercentage })}
          </span>
          <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            {matchPercentage}%
          </span>
        </div>
        <div className="w-full bg-primary-200 dark:bg-primary-800 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${matchPercentage}%` }}
            transition={{ duration: 1 }}
            className="bg-primary-600 h-2 rounded-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Matched Skills */}
        <div>
          <h4 className="flex items-center text-green-600 dark:text-green-400 font-medium mb-3">
            <FiCheckCircle className="mr-2" />
            {t('skills.matched')} ({matchedSkills.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {matchedSkills.map((skill, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-sm"
                onMouseEnter={() => setSelectedSkill(skill)}
                onMouseLeave={() => setSelectedSkill(null)}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Missing Skills */}
        <div>
          <h4 className="flex items-center text-red-600 dark:text-red-400 font-medium mb-3">
            <FiXCircle className="mr-2" />
            {t('skills.missing')} ({missingRequired.length + missingPreferred.length})
          </h4>
          
          {missingRequired.length > 0 && (
            <div className="mb-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                {t('skills.required')}:
              </p>
              <div className="flex flex-wrap gap-2">
                {missingRequired.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {missingPreferred.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                {t('skills.preferred')}:
              </p>
              <div className="flex flex-wrap gap-2">
                {missingPreferred.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="mt-6">
          <h4 className="flex items-center text-primary-600 dark:text-primary-400 font-medium mb-3">
            <FiTrendingUp className="mr-2" />
            {t('skills.recommendations')}
          </h4>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div className="flex items-start">
                  <FiBookOpen className="text-primary-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {rec.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {rec.description}
                    </p>
                    {rec.link && (
                      <a
                        href={rec.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary-600 hover:text-primary-700 mt-2 inline-block"
                      >
                        {t('common.learnMore')} →
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillGapAnalysis;