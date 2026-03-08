import React from 'react';
import { motion } from 'framer-motion';
import { FiGlobe } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';

const LanguageSwitcher = ({ variant = 'dropdown' }) => { // 'dropdown' or 'buttons'
  const { language, setLanguage, t } = useLanguage();

  if (variant === 'buttons') {
    return (
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setLanguage('en')}
          className={`
            px-3 py-1 text-sm font-medium rounded-md transition-colors
            ${language === 'en' 
              ? 'bg-primary-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }
          `}
        >
          English
        </button>
        <button
          onClick={() => setLanguage('am')}
          className={`
            px-3 py-1 text-sm font-medium rounded-md transition-colors font-amharic
            ${language === 'am' 
              ? 'bg-primary-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }
          `}
        >
          አማርኛ
        </button>
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => document.getElementById('language-menu')?.classList.toggle('hidden')}
        className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <FiGlobe className="w-4 h-4" />
        <span className="text-sm font-medium">
          {language === 'en' ? 'English' : 'አማርኛ'}
        </span>
      </motion.button>

      <div
        id="language-menu"
        className="hidden absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
      >
        <div className="py-1">
          <button
            onClick={() => {
              setLanguage('en');
              document.getElementById('language-menu')?.classList.add('hidden');
            }}
            className={`
              w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700
              ${language === 'en' 
                ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' 
                : 'text-gray-700 dark:text-gray-300'
              }
            `}
          >
            English
          </button>
          <button
            onClick={() => {
              setLanguage('am');
              document.getElementById('language-menu')?.classList.add('hidden');
            }}
            className={`
              w-full text-left px-4 py-2 text-sm font-amharic hover:bg-gray-100 dark:hover:bg-gray-700
              ${language === 'am' 
                ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' 
                : 'text-gray-700 dark:text-gray-300'
              }
            `}
          >
            አማርኛ
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;