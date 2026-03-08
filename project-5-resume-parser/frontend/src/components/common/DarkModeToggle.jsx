import React from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const DarkModeToggle = ({ variant = 'icon' }) => { // 'icon' or 'switch'
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  if (variant === 'switch') {
    return (
      <button
        onClick={toggleTheme}
        className="relative inline-flex items-center h-6 rounded-full w-11 bg-gray-200 dark:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
        role="switch"
        aria-checked={isDark}
      >
        <span className="sr-only">Toggle dark mode</span>
        <span
          className={`inline-block w-4 h-4 transform rounded-full bg-white transition-transform ${
            isDark ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle dark mode"
    >
      {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
    </motion.button>
  );
};

export default DarkModeToggle;