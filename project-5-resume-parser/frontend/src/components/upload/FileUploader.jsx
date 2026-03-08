import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUpload, FiFile, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import { useUpload } from '../../hooks/useUpload';
import UploadProgress from './UploadProgress';
import FilePreview from './FilePreview';
import Button from '../common/Button';
import Alert from '../common/Alert';

const FileUploader = ({ onUploadSuccess, maxSize = 5 * 1024 * 1024, accept = { 'application/pdf': ['.pdf'] } }) => {
  const { t } = useLanguage();
  const { uploadFile, uploading, progress, error } = useUpload();
  const [file, setFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
    setUploadError(null);

    if (rejectedFiles.length > 0) {
      const error = rejectedFiles[0].errors[0];
      if (error.code === 'file-too-large') {
        setUploadError(t('upload.fileTooLarge'));
      } else if (error.code === 'file-invalid-type') {
        setUploadError(t('upload.invalidFile'));
      } else {
        setUploadError(error.message);
      }
      return;
    }

    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);

    try {
      const result = await uploadFile(selectedFile);
      if (onUploadSuccess) {
        onUploadSuccess(result);
      }
    } catch (err) {
      setUploadError(err.message);
    }
  }, [uploadFile, onUploadSuccess, t]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles: 1
  });

  const handleRemove = () => {
    setFile(null);
    setUploadError(null);
  };

  const getDropzoneClasses = () => {
    const baseClasses = 'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300';
    
    if (isDragActive) {
      return `${baseClasses} border-primary-500 bg-primary-50 dark:bg-primary-900/20`;
    }
    
    if (isDragReject || uploadError) {
      return `${baseClasses} border-red-500 bg-red-50 dark:bg-red-900/20`;
    }
    
    return `${baseClasses} border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!file && !uploading && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div {...getRootProps()} className={getDropzoneClasses()}>
              <input {...getInputProps()} />
              
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary-100 dark:bg-primary-900/20 rounded-full">
                  <FiUpload className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {isDragActive ? t('upload.drop') : t('upload.dragDrop')}
              </h3>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {t('upload.pdfOnly')} (Max {maxSize / (1024 * 1024)}MB)
              </p>
              
              <Button variant="primary" size="lg">
                {t('upload.browse')}
              </Button>
            </div>

            {uploadError && (
              <Alert
                type="error"
                message={uploadError}
                onClose={() => setUploadError(null)}
                className="mt-4"
              />
            )}
          </motion.div>
        )}

        {file && !uploading && (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <FilePreview 
              file={file} 
              onRemove={handleRemove}
              status="pending"
            />
            
            <Button
              variant="primary"
              onClick={() => uploadFile(file)}
              fullWidth
              size="lg"
            >
              {t('upload.analyze')}
            </Button>
          </motion.div>
        )}

        {uploading && (
          <motion.div
            key="progress"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <UploadProgress 
              progress={progress} 
              fileName={file?.name}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
        {t('upload.security')}
      </p>
    </div>
  );
};

export default FileUploader;