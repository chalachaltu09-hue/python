import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick,
  to,
  href,
  type = 'button',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  ...props 
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500 dark:bg-primary-600 dark:hover:bg-primary-700';
      case 'secondary':
        return 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white';
      case 'outline':
        return 'border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-gray-500 dark:border-gray-600 dark:hover:bg-gray-800 dark:text-gray-300';
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700';
      default:
        return 'bg-primary-600 hover:bg-primary-700 text-white';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'lg':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2 text-base';
    }
  };

  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-lg
    transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
    ${getVariantClasses()}
    ${getSizeClasses()}
    ${className}
  `;

  const content = (
    <>
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {Icon && iconPosition === 'left' && !loading && <Icon className="mr-2 h-5 w-5" />}
      {children}
      {Icon && iconPosition === 'right' && !loading && <Icon className="ml-2 h-5 w-5" />}
    </>
  );

  const motionProps = {
    whileHover: { scale: disabled || loading ? 1 : 1.02 },
    whileTap: { scale: disabled || loading ? 1 : 0.98 },
    transition: { duration: 0.2 }
  };

  if (to) {
    return (
      <motion.div {...motionProps}>
        <Link to={to} className={baseClasses} {...props}>
          {content}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseClasses}
        target="_blank"
        rel="noopener noreferrer"
        {...motionProps}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={baseClasses}
      onClick={onClick}
      disabled={disabled || loading}
      {...motionProps}
      {...props}
    >
      {content}
    </motion.button>
  );
};

export default Button;