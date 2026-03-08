import React from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { FiUploadCloud, FiFile, FiAlertCircle } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';

const UploadZone = ({ onDrop, accept, maxSize, isDragActive, isDragReject, error }) => {
  const { t } = useLanguage();
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles: 1
  });

  const getBorderColor = () => {
    if (isDragReject || error) return 'border-red-400 dark:border-red-600';
    if (isDragActive) return 'border-primary-500';
    return 'border-gray-300 dark:border-gray-600';
  };

  const getBgColor = () => {
    if (isDragReject || error) return 'bg-red-50 dark:bg-red-900/20';
    if (isDragActive) return 'bg-primary-50 dark:bg-primary-900/20';
    return 'bg-gray-50 dark:bg-gray-800/50';
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...getRootProps()}
      className={`
        relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
        transition-all duration-300 ${getBorderColor()} ${getBgColor()}
      `}
    >
      <input {...getInputProps()} />
      
      <div className="space-y-4">
        <div className="flex justify-center">
          <div className={`
            p-4 rounded-full transition-colors
            ${isDragReject || error ? 'bg-red-100 dark:bg-red-900/40' : 'bg-primary-100 dark:bg-primary-900/40'}
          `}>
            {isDragReject || error ? (
              <FiAlertCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
            ) : (
              <FiUploadCloud className="w-12 h-12 text-primary-600 dark:text-primary-400" />
            )}
          </div>
        </div>

        <div>
          <p className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {isDragActive ? t('upload.drop') : t('upload.dragDrop')}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('upload.or')} <span className="text-primary-600 dark:text-primary-400 font-medium">{t('upload.browse')}</span>
          </p>
        </div>

        <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center">
            <FiFile className="mr-1" />
            PDF
          </span>
          <span>•</span>
          <span>Max {maxSize / (1024 * 1024)}MB</span>
        </div>

        {(isDragReject || error) && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-red-600 dark:text-red-400"
          >
            {error || t('upload.invalidFile')}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default UploadZone;