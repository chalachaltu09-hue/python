import React from 'react';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiHome } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import Button from './Button';

const NotFound = ({ 
  title,
  message,
  showHomeButton = true,
  customAction
}) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 dark:bg-primary-900/20 rounded-full mb-6">
          <FiAlertCircle className="w-10 h-10 text-primary-600 dark:text-primary-400" />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {title || '404'}
        </h1>
        
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          {t('notFound.title')}
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {message || t('notFound.message')}
        </p>

        <div className="flex items-center justify-center space-x-4">
          {showHomeButton && (
            <Button to="/" variant="primary" icon={FiHome}>
              {t('notFound.backHome')}
            </Button>
          )}
          
          {customAction}
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;