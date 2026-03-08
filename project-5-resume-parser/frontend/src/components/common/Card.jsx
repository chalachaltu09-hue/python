import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  title,
  subtitle,
  headerAction,
  footer,
  variant = 'default', // 'default', 'bordered', 'elevated'
  padding = 'md',
  className = '',
  onClick,
  hoverable = false
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'bordered':
        return 'border border-gray-200 dark:border-gray-700';
      case 'elevated':
        return 'shadow-lg hover:shadow-xl dark:shadow-gray-900/30';
      default:
        return 'shadow-sm';
    }
  };

  const getPaddingClasses = () => {
    switch (padding) {
      case 'sm':
        return 'p-4';
      case 'lg':
        return 'p-8';
      default:
        return 'p-6';
    }
  };

  const baseClasses = `
    bg-white dark:bg-gray-800 rounded-xl overflow-hidden
    transition-all duration-200
    ${getVariantClasses()}
    ${getPaddingClasses()}
    ${hoverable ? 'hover:shadow-md cursor-pointer transform hover:-translate-y-1' : ''}
    ${className}
  `;

  const content = (
    <>
      {(title || subtitle || headerAction) && (
        <div className="flex items-center justify-between mb-4">
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          {headerAction && (
            <div className="ml-4">{headerAction}</div>
          )}
        </div>
      )}

      <div>{children}</div>

      {footer && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          {footer}
        </div>
      )}
    </>
  );

  if (onClick) {
    return (
      <motion.div
        whileHover={hoverable ? { scale: 1.02 } : {}}
        whileTap={hoverable ? { scale: 0.98 } : {}}
        className={baseClasses}
        onClick={onClick}
        role="button"
        tabIndex={0}
      >
        {content}
      </motion.div>
    );
  }

  return <div className={baseClasses}>{content}</div>;
};

export default Card;