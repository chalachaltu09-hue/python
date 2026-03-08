/**
 * Format currency
 */
export const formatCurrency = (amount, currency = 'ETB') => {
  if (amount === null || amount === undefined) return '';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Format number with commas
 */
export const formatNumber = (number) => {
  if (number === null || number === undefined) return '';
  return new Intl.NumberFormat('en-US').format(number);
};

/**
 * Format percentage
 */
export const formatPercentage = (value, decimals = 0) => {
  if (value === null || value === undefined) return '';
  return `${value.toFixed(decimals)}%`;
};

/**
 * Format date
 */
export const formatDate = (date, format = 'MMM dd, yyyy') => {
  if (!date) return '';
  
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  return d.toLocaleDateString('en-US', options);
};

/**
 * Format date with time
 */
export const formatDateTime = (date) => {
  if (!date) return '';
  
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };

  return d.toLocaleDateString('en-US', options);
};

/**
 * Format relative time
 */
export const formatRelativeTime = (date) => {
  if (!date) return '';

  const d = new Date(date);
  if (isNaN(d.getTime())) return '';

  const now = new Date();
  const diffInSeconds = Math.floor((now - d) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInSeconds < 60) {
    return 'just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  } else {
    return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
  }
};

/**
 * Format file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  if (!bytes) return '';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Format phone number (Ethiopian)
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';

  // Remove non-numeric characters
  const cleaned = phone.replace(/\D/g, '');

  // Format based on length
  if (cleaned.length === 9) {
    return `0${cleaned.substring(0, 2)} ${cleaned.substring(2, 5)} ${cleaned.substring(5)}`;
  } else if (cleaned.length === 10) {
    return `${cleaned.substring(0, 3)} ${cleaned.substring(3, 6)} ${cleaned.substring(6)}`;
  } else if (cleaned.length === 12 && cleaned.startsWith('251')) {
    return `+${cleaned.substring(0, 3)} ${cleaned.substring(3, 5)} ${cleaned.substring(5, 8)} ${cleaned.substring(8)}`;
  }

  return phone;
};

/**
 * Format name initials
 */
export const formatInitials = (name) => {
  if (!name) return '';

  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

/**
 * Format address
 */
export const formatAddress = (address) => {
  if (!address) return '';

  const parts = [];
  if (address.street) parts.push(address.street);
  if (address.city) parts.push(address.city);
  if (address.state) parts.push(address.state);
  if (address.country) parts.push(address.country);

  return parts.join(', ');
};

/**
 * Format salary range
 */
export const formatSalaryRange = (min, max, currency = 'ETB', period = 'monthly') => {
  if (!min && !max) return '';

  const periodText = period === 'monthly' ? '/mo' : period === 'yearly' ? '/yr' : '/hr';

  if (min && max) {
    return `${formatCurrency(min, currency)} - ${formatCurrency(max, currency)}${periodText}`;
  } else if (min) {
    return `${formatCurrency(min, currency)}+${periodText}`;
  } else if (max) {
    return `Up to ${formatCurrency(max, currency)}${periodText}`;
  }

  return '';
};

/**
 * Format job type for display
 */
export const formatJobType = (type) => {
  const types = {
    'full-time': 'Full Time',
    'part-time': 'Part Time',
    'contract': 'Contract',
    'internship': 'Internship',
    'remote': 'Remote',
    'full_time': 'Full Time',
    'part_time': 'Part Time'
  };

  return types[type] || type;
};

/**
 * Format experience level
 */
export const formatExperienceLevel = (level) => {
  const levels = {
    'entry': 'Entry Level',
    'mid': 'Mid Level',
    'senior': 'Senior Level',
    'lead': 'Lead',
    'manager': 'Manager',
    'entry_level': 'Entry Level',
    'mid_level': 'Mid Level',
    'senior_level': 'Senior Level'
  };

  return levels[level] || level;
};

/**
 * Truncate text
 */
export const truncateText = (text, length = 100, suffix = '...') => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + suffix;
};

/**
 * Slugify text
 */
export const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-');
};

/**
 * Capitalize first letter
 */
export const capitalize = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Title case
 */
export const titleCase = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};