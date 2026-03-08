import React from 'react';
import { motion } from 'framer-motion';
import { FiFile, FiX, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';

const FilePreview = ({ file, onRemove, status = 'pending' }) => {
  const { t } = useLanguage();

  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return <FiCheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <FiAlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      case 'error':
        return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      default:
        return 'border-gray-200 dark:border-gray-700';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className={`flex items-center justify-between p-4 border-2 rounded-lg ${getStatusColor()}`}
    >
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
          <FiFile className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        </div>
        
        <div>
          <p className="font-medium text-gray-900 dark:text-white">
            {file.name}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formatFileSize(file.size)}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {getStatusIcon()}
        
        {onRemove && status !== 'success' && (
          <button
            onClick={onRemove}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <FiX className="w-5 h-5 text-gray-500" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default FilePreview;