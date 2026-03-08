import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md', // 'sm', 'md', 'lg', 'xl', 'full'
  showCloseButton = true,
  closeOnClickOutside = true,
  closeOnEsc = true,
  footer
}) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (closeOnEsc && e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeOnEsc, onClose]);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'max-w-md';
      case 'lg':
        return 'max-w-4xl';
      case 'xl':
        return 'max-w-6xl';
      case 'full':
        return 'max-w-full mx-4';
      default:
        return 'max-w-2xl';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeOnClickOutside ? onClose : undefined}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full ${getSizeClasses()} max-h-[90vh] overflow-hidden`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              {(title || showCloseButton) && (
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  {title && (
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {title}
                    </h3>
                  )}
                  {showCloseButton && (
                    <button
                      onClick={onClose}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="px-6 py-4 overflow-y-auto max-h-[calc(90vh-120px)]">
                {children}
              </div>

              {/* Footer */}
              {footer && (
                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                  {footer}
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;