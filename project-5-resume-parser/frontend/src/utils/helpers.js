/**
 * Generate random ID
 */
export const generateId = (prefix = '') => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 10);
  return prefix ? `${prefix}_${timestamp}${random}` : `${timestamp}${random}`;
};

/**
 * Debounce function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function
 */
export const throttle = (func, limit = 300) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

/**
 * Deep clone object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Deep merge objects
 */
export const deepMerge = (target, source) => {
  const output = { ...target };
  
  Object.keys(source).forEach(key => {
    if (source[key] instanceof Object && key in target) {
      output[key] = deepMerge(target[key], source[key]);
    } else {
      output[key] = source[key];
    }
  });
  
  return output;
};

/**
 * Check if object is empty
 */
export const isEmpty = (obj) => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};

/**
 * Remove null/undefined values from object
 */
export const cleanObject = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v != null && v !== '')
  );
};

/**
 * Group array by key
 */
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const groupKey = item[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {});
};

/**
 * Sort array by key
 */
export const sortBy = (array, key, order = 'asc') => {
  return [...array].sort((a, b) => {
    if (order === 'asc') {
      return a[key] > b[key] ? 1 : -1;
    } else {
      return a[key] < b[key] ? 1 : -1;
    }
  });
};

/**
 * Unique array
 */
export const unique = (array) => {
  return [...new Set(array)];
};

/**
 * Chunk array
 */
export const chunk = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

/**
 * Flatten array
 */
export const flatten = (array) => {
  return array.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
};

/**
 * Intersection of arrays
 */
export const intersection = (...arrays) => {
  return arrays.reduce((result, array) => {
    return result.filter(item => array.includes(item));
  });
};

/**
 * Difference of arrays
 */
export const difference = (array1, array2) => {
  return array1.filter(item => !array2.includes(item));
};

/**
 * Get query params from URL
 */
export const getQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  const result = {};
  for (const [key, value] of params) {
    result[key] = value;
  }
  return result;
};

/**
 * Build URL with query params
 */
export const buildUrl = (base, params) => {
  const url = new URL(base, window.location.origin);
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
      url.searchParams.set(key, params[key]);
    }
  });
  return url.pathname + url.search;
};

/**
 * Copy to clipboard
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};

/**
 * Download file
 */
export const downloadFile = (content, fileName, type = 'text/plain') => {
  const blob = new Blob([content], { type });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

/**
 * Scroll to element
 */
export const scrollToElement = (elementId, offset = 0) => {
  const element = document.getElementById(elementId);
  if (element) {
    const y = element.getBoundingClientRect().top + window.pageYOffset + offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

/**
 * Detect mobile device
 */
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

/**
 * Detect touch device
 */
export const isTouchDevice = () => {
  return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
};

/**
 * Get device type
 */
export const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
};

/**
 * Check if element is in viewport
 */
export const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Get reading time
 */
export const getReadingTime = (text, wordsPerMinute = 200) => {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
};

/**
 * Validate email
 */
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Validate phone (Ethiopian)
 */
export const isValidEthiopianPhone = (phone) => {
  const re = /^(\+251|0)[1-9]\d{8}$/;
  return re.test(phone);
};

/**
 * Calculate match percentage
 */
export const calculateMatchPercentage = (skills1, skills2) => {
  if (!skills1?.length || !skills2?.length) return 0;
  
  const set1 = new Set(skills1.map(s => s.toLowerCase()));
  const set2 = new Set(skills2.map(s => s.toLowerCase()));
  
  const matches = [...set1].filter(s => set2.has(s)).length;
  return Math.round((matches / set2.size) * 100);
};