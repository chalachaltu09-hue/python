/**
 * Validation rules
 */
export const validators = {
  /**
   * Required field
   */
  required: (value) => {
    if (value === undefined || value === null || value === '') {
      return 'This field is required';
    }
    return null;
  },

  /**
   * Email validation
   */
  email: (value) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !re.test(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  },

  /**
   * Phone validation (Ethiopian)
   */
  phone: (value) => {
    const re = /^(\+251|0)[1-9]\d{8}$/;
    if (value && !re.test(value)) {
      return 'Please enter a valid Ethiopian phone number';
    }
    return null;
  },

  /**
   * Password validation
   */
  password: (value, options = {}) => {
    const { minLength = 6, requireNumber = true, requireSpecial = false } = options;
    
    if (!value) return null;
    
    if (value.length < minLength) {
      return `Password must be at least ${minLength} characters`;
    }
    
    if (requireNumber && !/\d/.test(value)) {
      return 'Password must contain at least one number';
    }
    
    if (requireSpecial && !/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return 'Password must contain at least one special character';
    }
    
    return null;
  },

  /**
   * Confirm password
   */
  confirmPassword: (value, compareValue) => {
    if (value !== compareValue) {
      return 'Passwords do not match';
    }
    return null;
  },

  /**
   * URL validation
   */
  url: (value) => {
    const re = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (value && !re.test(value)) {
      return 'Please enter a valid URL';
    }
    return null;
  },

  /**
   * Number validation
   */
  number: (value, options = {}) => {
    const { min, max, integer = false } = options;
    
    if (value === '' || value === null || value === undefined) return null;
    
    const num = Number(value);
    if (isNaN(num)) {
      return 'Please enter a valid number';
    }
    
    if (integer && !Number.isInteger(num)) {
      return 'Please enter an integer';
    }
    
    if (min !== undefined && num < min) {
      return `Value must be at least ${min}`;
    }
    
    if (max !== undefined && num > max) {
      return `Value must be at most ${max}`;
    }
    
    return null;
  },

  /**
   * Length validation
   */
  length: (value, options = {}) => {
    const { min, max } = options;
    
    if (!value) return null;
    
    const length = value.length;
    
    if (min !== undefined && length < min) {
      return `Must be at least ${min} characters`;
    }
    
    if (max !== undefined && length > max) {
      return `Must be at most ${max} characters`;
    }
    
    return null;
  },

  /**
   * Pattern validation
   */
  pattern: (value, pattern, message = 'Invalid format') => {
    if (value && pattern && !pattern.test(value)) {
      return message;
    }
    return null;
  },

  /**
   * Date validation
   */
  date: (value) => {
    if (value && isNaN(new Date(value).getTime())) {
      return 'Please enter a valid date';
    }
    return null;
  },

  /**
   * Future date validation
   */
  futureDate: (value) => {
    if (value) {
      const date = new Date(value);
      const now = new Date();
      if (date <= now) {
        return 'Date must be in the future';
      }
    }
    return null;
  },

  /**
   * Past date validation
   */
  pastDate: (value) => {
    if (value) {
      const date = new Date(value);
      const now = new Date();
      if (date >= now) {
        return 'Date must be in the past';
      }
    }
    return null;
  },

  /**
   * Array validation
   */
  array: (value, options = {}) => {
    const { min, max } = options;
    
    if (!Array.isArray(value)) {
      return 'Must be an array';
    }
    
    if (min !== undefined && value.length < min) {
      return `Must have at least ${min} items`;
    }
    
    if (max !== undefined && value.length > max) {
      return `Must have at most ${max} items`;
    }
    
    return null;
  },

  /**
   * File validation
   */
  file: (file, options = {}) => {
    const { maxSize = 5 * 1024 * 1024, allowedTypes = ['application/pdf'] } = options;
    
    if (!file) return null;
    
    if (file.size > maxSize) {
      return `File size must be less than ${maxSize / (1024 * 1024)}MB`;
    }
    
    if (!allowedTypes.includes(file.type)) {
      return `File type must be ${allowedTypes.join(', ')}`;
    }
    
    return null;
  },

  /**
   * Username validation
   */
  username: (value) => {
    const re = /^[a-zA-Z0-9_]{3,20}$/;
    if (value && !re.test(value)) {
      return 'Username must be 3-20 characters and can only contain letters, numbers, and underscores';
    }
    return null;
  },

  /**
   * Ethiopian tax ID validation
   */
  tinNumber: (value) => {
    const re = /^\d{10}$/;
    if (value && !re.test(value)) {
      return 'Please enter a valid 10-digit TIN number';
    }
    return null;
  },

  /**
   * Ethiopian company registration number
   */
  registrationNumber: (value) => {
    const re = /^[A-Z]{2}\d{8}$/;
    if (value && !re.test(value)) {
      return 'Please enter a valid registration number (e.g., AA12345678)';
    }
    return null;
  }
};

/**
 * Validate multiple fields
 */
export const validate = (values, rules) => {
  const errors = {};

  Object.keys(rules).forEach(field => {
    const fieldRules = rules[field];
    const value = values[field];

    if (Array.isArray(fieldRules)) {
      fieldRules.forEach(rule => {
        if (typeof rule === 'function') {
          const error = rule(value, values);
          if (error) {
            errors[field] = error;
          }
        } else if (typeof rule === 'object') {
          const { validator, options, message } = rule;
          const error = validators[validator](value, options);
          if (error) {
            errors[field] = message || error;
          }
        }
      });
    } else if (typeof fieldRules === 'function') {
      const error = fieldRules(value, values);
      if (error) {
        errors[field] = error;
      }
    }
  });

  return errors;
};

/**
 * Check if form is valid
 */
export const isValid = (errors) => {
  return Object.keys(errors).length === 0;
};

/**
 * Create validation schema
 */
export const createSchema = (rules) => {
  return {
    validate: (values) => validate(values, rules),
    isValid: (values) => isValid(validate(values, rules))
  };
};