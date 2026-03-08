import React from 'react';
import { motion } from 'framer-motion';
import { FiLoader, FiCheckCircle } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';

const UploadProgress = ({ progress, fileName, status = 'uploading' }) => {
  const { t } = useLanguage();

  const getStatusMessage = () => {
    switch (status) {
      case 'uploading':
        return t('upload.uploading');
      case 'processing':
        return t('upload.processing');
      case 'analyzing':
        return t('upload.analyzing');
      case 'complete':
        return t('upload.complete');
      default:
        return t('upload.uploading');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center mb-4">
        {status === 'complete' ? (
          <FiCheckCircle className="w-8 h-8 text-green-500 mr-3" />
        ) : (
          <FiLoader className="w-8 h-8 text-primary-500 animate-spin mr-3" />
        )}
        
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {getStatusMessage()}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {fileName}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            {t('upload.progress')}
          </span>
          <span className="font-medium text-gray-900 dark:text-white">
            {progress}%
          </span>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            className="bg-primary-600 h-2.5 rounded-full"
          />
        </div>

        {status !== 'complete' && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {t('upload.pleaseWait')}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default UploadProgress;