import React from 'react';
import { motion } from 'framer-motion';

const Spinner = ({ 
  size = 'md', // 'sm', 'md', 'lg'
  variant = 'primary', // 'primary', 'secondary', 'white'
  fullPage = false,
  text,
  className = ''
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4 border-2';
      case 'lg':
        return 'w-12 h-12 border-4';
      default:
        return 'w-8 h-8 border-3';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'secondary':
        return 'border-gray-200 border-t-gray-600 dark:border-gray-700 dark:border-t-gray-300';
      case 'white':
        return 'border-white/30 border-t-white';
      default:
        return 'border-primary-200 border-t-primary-600 dark:border-primary-800 dark:border-t-primary-400';
    }
  };

  const spinner = (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className={`
          rounded-full
          ${getSizeClasses()}
          ${getVariantClasses()}
        `}
      />
      {text && (
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          {text}
        </p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default Spinner;