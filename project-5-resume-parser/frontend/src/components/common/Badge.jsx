import React from 'react';

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  removable = false,
  onRemove,
  className = ''
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 border-primary-200 dark:border-primary-800';
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200 dark:border-red-800';
      case 'info':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-0.5 text-xs';
      case 'lg':
        return 'px-4 py-2 text-base';
      default:
        return 'px-2.5 py-1 text-sm';
    }
  };

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full border
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${removable ? 'pr-1' : ''}
        ${className}
      `}
    >
      {children}
      {removable && (
        <button
          onClick={onRemove}
          className="ml-1 hover:opacity-75 focus:outline-none"
          aria-label="Remove"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </span>
  );
};

export default Badge;