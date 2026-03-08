import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Input = ({
  type = 'text',
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  success,
  helper,
  icon: Icon,
  required = false,
  disabled = false,
  readOnly = false,
  className = '',
  containerClassName = '',
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;

  const getInputClasses = () => {
    const baseClasses = 'w-full px-4 py-2 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2';
    
    if (error) {
      return `${baseClasses} border-red-300 focus:border-red-500 focus:ring-red-200 dark:border-red-700 dark:focus:ring-red-900`;
    }
    
    if (success) {
      return `${baseClasses} border-green-300 focus:border-green-500 focus:ring-green-200 dark:border-green-700 dark:focus:ring-green-900`;
    }
    
    return `${baseClasses} border-gray-300 focus:border-primary-500 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-primary-900`;
  };

  return (
    <div className={`mb-4 ${containerClassName}`}>
      {label && (
        <label 
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          </div>
        )}
        
        <input
          type={inputType}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={(e) => {
            setFocused(false);
            if (onBlur) onBlur(e);
          }}
          onFocus={() => setFocused(true)}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          className={`
            ${getInputClasses()}
            ${Icon ? 'pl-10' : ''}
            ${type === 'password' ? 'pr-10' : ''}
            ${disabled ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed' : ''}
            ${className}
          `}
          {...props}
        />

        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            {showPassword ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Error/Success/Helper Messages */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="mt-1"
      >
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        {success && !error && (
          <p className="text-sm text-green-600 dark:text-green-400">{success}</p>
        )}
        {helper && !error && !success && (
          <p className="text-sm text-gray-500 dark:text-gray-400">{helper}</p>
        )}
      </motion.div>
    </div>
  );
};

export default Input;