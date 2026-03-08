// App Constants
export const APP_NAME = 'Resume Parser & Job Matcher';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'AI-powered resume parser and job matcher for Ethiopian job market';

// API Endpoints
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
  SETTINGS: 'settings',
  RECENT_SEARCHES: 'recentSearches',
  SAVED_FILTERS: 'savedFilters'
};

// Routes
export const ROUTES = {
  HOME: '/',
  JOBS: '/jobs',
  JOB_DETAILS: '/jobs/:id',
  RESULTS: '/results/:id',
  PROFILE: '/profile',
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password/:token',
  ABOUT: '/about',
  CONTACT: '/contact',
  FAQ: '/faq',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  NOT_FOUND: '/404'
};

// Job Types
export const JOB_TYPES = {
  FULL_TIME: 'full-time',
  PART_TIME: 'part-time',
  CONTRACT: 'contract',
  INTERNSHIP: 'internship',
  REMOTE: 'remote'
};

// Experience Levels
export const EXPERIENCE_LEVELS = {
  ENTRY: 'entry',
  MID: 'mid',
  SENIOR: 'senior',
  LEAD: 'lead',
  MANAGER: 'manager'
};

// Education Levels
export const EDUCATION_LEVELS = {
  HIGH_SCHOOL: 'high-school',
  DIPLOMA: 'diploma',
  BACHELOR: 'bachelor',
  MASTER: 'master',
  PHD: 'phd',
  CERTIFICATE: 'certificate'
};

// Ethiopian Cities
export const ETHIOPIAN_CITIES = [
  'Addis Ababa',
  'Adama',
  'Bahir Dar',
  'Gondar',
  'Hawassa',
  'Mekelle',
  'Jimma',
  'Dire Dawa',
  'Debre Zeit',
  'Arba Minch',
  'Dessie',
  'Jijiga',
  'Shashamane',
  'Bishoftu',
  'Sodo',
  'Haramaya',
  'Dilla',
  'Nekemte',
  'Debre Markos',
  'Asosa',
  'Gambela',
  'Semera'
];

// Ethiopian Regions
export const ETHIOPIAN_REGIONS = [
  'Addis Ababa',
  'Afar',
  'Amhara',
  'Benishangul-Gumuz',
  'Dire Dawa',
  'Gambela',
  'Harari',
  'Oromia',
  'Sidama',
  'Somali',
  'SNNPR',
  'South West',
  'Tigray'
];

// Common Skills in Ethiopia
export const COMMON_SKILLS = {
  HARD: [
    'JavaScript',
    'Python',
    'Java',
    'C++',
    'PHP',
    'React',
    'Node.js',
    'Angular',
    'Vue.js',
    'SQL',
    'MongoDB',
    'Excel',
    'QuickBooks',
    'Peachtree',
    'SAP',
    'Oracle',
    'AutoCAD',
    'SolidWorks',
    'SPSS',
    'STATA',
    'R',
    'MATLAB',
    'Adobe Suite',
    'Photoshop',
    'Illustrator',
    'WordPress',
    'Digital Marketing',
    'SEO',
    'Social Media Management',
    'Data Analysis',
    'Machine Learning',
    'Accounting',
    'Financial Analysis',
    'Project Management',
    'Microsoft Office',
    'Google Suite'
  ],
  SOFT: [
    'Communication',
    'Team Leadership',
    'Problem Solving',
    'Critical Thinking',
    'Time Management',
    'Adaptability',
    'Creativity',
    'Emotional Intelligence',
    'Conflict Resolution',
    'Negotiation',
    'Presentation Skills',
    'Customer Service',
    'Attention to Detail',
    'Organization',
    'Multitasking',
    'Decision Making',
    'Collaboration',
    'Work Ethic',
    'Flexibility',
    'Self-Motivation'
  ],
  LANGUAGES: [
    'Amharic',
    'English',
    'Afan Oromo',
    'Tigrinya',
    'Somali',
    'Arabic',
    'French',
    'Italian'
  ]
};

// Resume Score Thresholds
export const RESUME_SCORES = {
  POOR: { min: 0, max: 40, label: 'Needs Improvement', color: 'red' },
  AVERAGE: { min: 41, max: 60, label: 'Average', color: 'yellow' },
  GOOD: { min: 61, max: 80, label: 'Good', color: 'blue' },
  EXCELLENT: { min: 81, max: 100, label: 'Excellent', color: 'green' }
};

// Match Score Thresholds
export const MATCH_SCORES = {
  LOW: { min: 0, max: 40, label: 'Low Match', color: 'red' },
  MEDIUM: { min: 41, max: 60, label: 'Medium Match', color: 'yellow' },
  HIGH: { min: 61, max: 80, label: 'High Match', color: 'blue' },
  EXCELLENT: { min: 81, max: 100, label: 'Excellent Match', color: 'green' }
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  PAGE_SIZES: [10, 20, 50, 100]
};

// File Upload
export const UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['application/pdf'],
  MAX_FILES: 1
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  DISPLAY_TIME: 'MMM dd, yyyy hh:mm a',
  ISO: 'yyyy-MM-dd',
  API: 'yyyy-MM-dd'
};

// Animation Durations
export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500
};

// Toast Durations
export const TOAST_DURATION = {
  SHORT: 3000,
  NORMAL: 5000,
  LONG: 8000
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  SERVER_ERROR: 500
};

// Error Codes
export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  NETWORK_ERROR: 'NETWORK_ERROR',
  SERVER_ERROR: 'SERVER_ERROR'
};