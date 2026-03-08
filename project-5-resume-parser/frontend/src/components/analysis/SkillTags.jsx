import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCode, FiUsers, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';

const SkillTags = ({ skills = { hard: [], soft: [] } }) => {
  const { t, language } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'hard', 'soft'

  const hardSkills = skills.hard || [];
  const softSkills = skills.soft || [];
  
  const displayedSkills = filter === 'all' 
    ? [...hardSkills, ...softSkills]
    : filter === 'hard' ? hardSkills : softSkills;

  const visibleSkills = showAll ? displayedSkills : displayedSkills.slice(0, 15);

  const getSkillColor = (skill) => {
    if (hardSkills.includes(skill)) {
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800';
    }
    return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {t('analysis.skills')}
        </h3>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`
              px-3 py-1 text-sm rounded-full transition-colors
              ${filter === 'all' 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }
            `}
          >
            {t('skills.all')} ({hardSkills.length + softSkills.length})
          </button>
          
          <button
            onClick={() => setFilter('hard')}
            className={`
              px-3 py-1 text-sm rounded-full transition-colors
              ${filter === 'hard' 
                ? 'bg-blue-500 text-white' 
                : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800'
              }
            `}
          >
            <FiCode className="inline mr-1" />
            {t('skills.hard')} ({hardSkills.length})
          </button>
          
          <button
            onClick={() => setFilter('soft')}
            className={`
              px-3 py-1 text-sm rounded-full transition-colors
              ${filter === 'soft' 
                ? 'bg-green-500 text-white' 
                : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800'
              }
            `}
          >
            <FiUsers className="inline mr-1" />
            {t('skills.soft')} ({softSkills.length})
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {visibleSkills.map((skill, index) => (
            <motion.span
              key={skill + index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.05 }}
              className={`
                px-3 py-1.5 text-sm font-medium rounded-full border
                ${getSkillColor(skill)}
              `}
            >
              {skill}
              {language === 'am' && hardSkills.includes(skill) && (
                <span className="ml-1 text-xs">(ቴክኒካል)</span>
              )}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {displayedSkills.length > 15 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 flex items-center text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
        >
          {showAll ? (
            <>
              <FiChevronUp className="mr-1" />
              {t('common.showLess')}
            </>
          ) : (
            <>
              <FiChevronDown className="mr-1" />
              {t('common.showMore')} ({displayedSkills.length - 15})
            </>
          )}
        </button>
      )}

      {displayedSkills.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
          {t('analysis.noSkills')}
        </p>
      )}
    </div>
  );
};

export default SkillTags;