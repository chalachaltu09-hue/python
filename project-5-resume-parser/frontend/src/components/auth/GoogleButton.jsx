import React from 'react';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { useLanguage } from '../../context/LanguageContext';

const GoogleButton = ({ onClick, isLoading = false, text }) => {
  const { t } = useLanguage();

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={isLoading}
      className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2" />
      ) : (
        <FcGoogle className="w-5 h-5 mr-2" />
      )}
      {text || t('auth.google')}
    </motion.button>
  );
};

export default GoogleButton;