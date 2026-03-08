import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ 
  value = 0, 
  max = 100, 
  variant = 'default', // 'default', 'success', 'warning', 'danger'
  size = 'md', // 'sm', 'md', 'lg'
  showLabel = false,
  labelPosition = 'top', // 'top', 'bottom', 'right'
  animated = true,
  className = ''
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const getVariantClasses = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-600 dark:bg-green-500';
      case 'warning':
        return 'bg-yellow-600 dark:bg-yellow-500';
      case 'danger':
        return 'bg-red-600 dark:bg-red-500';
      default:
        return 'bg-primary-600 dark:bg-primary-500';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-1';
      case 'lg':
        return 'h-4';
      default:
        return 'h-2.5';
    }
  };

  const getLabelSize = () => {
    switch (size) {
      case 'sm':
        return 'text-xs';
      case 'lg':
        return 'text-base';
      default:
        return 'text-sm';
    }
  };

  const label = (
    <span className={`${getLabelSize()} font-medium text-gray-700 dark:text-gray-300`}>
      {Math.round(percentage)}%
    </span>
  );

  return (
    <div className={`w-full ${className}`}>
      {showLabel && labelPosition === 'top' && (
        <div className="flex justify-between items-center mb-1">
          <span className={`${getLabelSize()} text-gray-600 dark:text-gray-400`}>
            Progress
          </span>
          {label}
        </div>
      )}

      <div className="flex items-center space-x-2">
        {showLabel && labelPosition === 'left' && label}

        <div className={`flex-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${getSizeClasses()}`}>
          <motion.div
            initial={{ width: animated ? 0 : `${percentage}%` }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`${getSizeClasses()} ${getVariantClasses()} rounded-full`}
          />
        </div>

        {showLabel && labelPosition === 'right' && label}
      </div>

      {showLabel && labelPosition === 'bottom' && (
        <div className="flex justify-between items-center mt-1">
          <span className={`${getLabelSize()} text-gray-600 dark:text-gray-400`}>
            Progress
          </span>
          {label}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;