import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiHome, 
  FiUser, 
  FiBriefcase, 
  FiFileText, 
  FiBookmark,
  FiSettings,
  FiLogOut,
  FiHelpCircle,
  FiBarChart2
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

const Sidebar = ({ isOpen, onClose, variant = 'default' }) => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();

  const navItems = [
    { to: '/dashboard', label: t('nav.dashboard'), icon: FiHome },
    { to: '/profile', label: t('nav.profile'), icon: FiUser },
    { to: '/jobs', label: t('nav.jobs'), icon: FiBriefcase },
    { to: '/profile/resumes', label: t('nav.resumes'), icon: FiFileText },
    { to: '/profile/saved-jobs', label: t('nav.savedJobs'), icon: FiBookmark },
    { to: '/analytics', label: t('nav.analytics'), icon: FiBarChart2 },
    { divider: true },
    { to: '/settings', label: t('nav.settings'), icon: FiSettings },
    { to: '/help', label: t('nav.help'), icon: FiHelpCircle }
  ];

  if (variant === 'mobile') {
    return (
      <motion.aside
        initial={{ x: -320 }}
        animate={{ x: isOpen ? 0 : -320 }}
        transition={{ type: 'spring', damping: 20 }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 shadow-xl"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-3">
              <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                ResumeParser
              </span>
            </div>
          </div>

          {/* User Info */}
          {user && (
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item, index) => {
              if (item.divider) {
                return (
                  <hr key={index} className="my-2 border-gray-200 dark:border-gray-800" />
                );
              }

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) => `
                    flex items-center space-x-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${isActive 
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' 
                      : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="flex items-center space-x-3 px-4 py-2 w-full rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <FiLogOut className="w-5 h-5" />
              <span>{t('nav.logout')}</span>
            </button>
          </div>
        </div>
      </motion.aside>
    );
  }

  // Desktop sidebar
  return (
    <aside className="hidden lg:block w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      <div className="sticky top-16 h-[calc(100vh-4rem)] flex flex-col">
        {/* User Info */}
        {user && (
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold text-lg">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {user.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item, index) => {
            if (item.divider) {
              return (
                <hr key={index} className="my-2 border-gray-200 dark:border-gray-800" />
              );
            }

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `
                  flex items-center space-x-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${isActive 
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' 
                    : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }
                `}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={logout}
            className="flex items-center space-x-3 px-4 py-2 w-full rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <FiLogOut className="w-5 h-5" />
            <span>{t('nav.logout')}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;