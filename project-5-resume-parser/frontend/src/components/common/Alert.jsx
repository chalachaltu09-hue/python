import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiAlertCircle, 
  FiCheckCircle, 
  FiInfo, 
  FiAlertTriangle,
  FiX 
} from 'react-icons/fi';

const Alert = ({ 
  type = 'info',
  message,
  description,
  show = true,
  onClose,
  dismissible = true,
  autoClose = false,
  autoCloseTime = 5000
}) => {
  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseTime);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseTime, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="w-5 h-5" />;
      case 'error':
        return <FiAlertCircle className="w-5 h-5" />;
      case 'warning':
        return <FiAlertTriangle className="w-5 h-5" />;
      default:
        return <FiInfo className="w-5 h-5" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50 dark:bg-green-900/20',
          border: 'border-green-200 dark:border-green-800',
          icon: 'text-green-500 dark:text-green-400',
          title: 'text-green-800 dark:text-green-200',
          message: 'text-green-700 dark:text-green-300'
        };
      case 'error':
        return {
          bg: 'bg-red-50 dark:bg-red-900/20',
          border: 'border-red-200 dark:border-red-800',
          icon: 'text-red-500 dark:text-red-400',
          title: 'text-red-800 dark:text-red-200',
          message: 'text-red-700 dark:text-red-300'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50 dark:bg-yellow-900/20',
          border: 'border-yellow-200 dark:border-yellow-800',
          icon: 'text-yellow-500 dark:text-yellow-400',
          title: 'text-yellow-800 dark:text-yellow-200',
          message: 'text-yellow-700 dark:text-yellow-300'
        };
      default:
        return {
          bg: 'bg-blue-50 dark:bg-blue-900/20',
          border: 'border-blue-200 dark:border-blue-800',
          icon: 'text-blue-500 dark:text-blue-400',
          title: 'text-blue-800 dark:text-blue-200',
          message: 'text-blue-700 dark:text-blue-300'
        };
    }
  };

  const styles = getStyles();

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`rounded-lg border ${styles.bg} ${styles.border} p-4`}
          role="alert"
        >
          <div className="flex items-start">
            <div className={`flex-shrink-0 ${styles.icon}`}>
              {getIcon()}
            </div>
            
            <div className="ml-3 flex-1">
              {message && (
                <h3 className={`text-sm font-medium ${styles.title}`}>
                  {message}
                </h3>
              )}
              {description && (
                <div className={`mt-1 text-sm ${styles.message}`}>
                  {description}
                </div>
              )}
            </div>

            {dismissible && onClose && (
              <button
                onClick={onClose}
                className={`ml-auto flex-shrink-0 ${styles.icon} hover:opacity-75 transition-opacity`}
              >
                <FiX className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;