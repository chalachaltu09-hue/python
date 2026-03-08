import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiHome, 
  FiBriefcase, 
  FiUser, 
  FiInfo, 
  FiMail,
  FiMenu,
  FiX 
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import Button from './Button';
import DarkModeToggle from './DarkModeToggle';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: t('nav.home'), icon: FiHome },
    { to: '/jobs', label: t('nav.jobs'), icon: FiBriefcase },
    { to: '/about', label: t('nav.about'), icon: FiInfo },
    { to: '/contact', label: t('nav.contact'), icon: FiMail }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
            <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:inline">
              ResumeParser
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`
                  px-3 py-2 rounded-md text-sm font-medium transition-colors
                  flex items-center space-x-1
                  ${isActive(link.to)
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }
                `}
              >
                <link.icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            <LanguageSwitcher />
            <DarkModeToggle />

            {user ? (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/profile">
                  <Button variant="outline" size="sm">
                    {t('nav.profile')}
                  </Button>
                </Link>
                <Button variant="primary" size="sm" onClick={logout}>
                  {t('nav.logout')}
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    {t('nav.login')}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    {t('nav.register')}
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={isMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-2 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={`
                  block px-3 py-2 rounded-md text-base font-medium
                  flex items-center space-x-2
                  ${isActive(link.to)
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }
                `}
              >
                <link.icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            ))}

            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-800">
              {user ? (
                <div className="space-y-2">
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  >
                    {t('nav.profile')}
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                  >
                    {t('nav.logout')}
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-md"
                  >
                    {t('nav.login')}
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 bg-primary-600 text-white rounded-md text-center"
                  >
                    {t('nav.register')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;