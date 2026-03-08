import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMenu, 
  FiX, 
  FiUser, 
  FiLogOut, 
  FiSettings,
  FiBookmark,
  FiFileText
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../common/Button';
import DarkModeToggle from '../common/DarkModeToggle';
import LanguageSwitcher from '../common/LanguageSwitcher';

const Header = () => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/jobs', label: t('nav.jobs') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') }
  ];

  const profileLinks = [
    { to: '/profile', label: t('nav.profile'), icon: FiUser },
    { to: '/profile/resumes', label: t('nav.resumes'), icon: FiFileText },
    { to: '/profile/saved-jobs', label: t('nav.savedJobs'), icon: FiBookmark },
    { to: '/profile/settings', label: t('nav.settings'), icon: FiSettings }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/logo.svg" 
              alt="Resume Parser" 
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:inline">
              ResumeParser
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            <LanguageSwitcher />
            <DarkModeToggle />

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden lg:inline text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user.name?.split(' ')[0]}
                  </span>
                </button>

                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
                    >
                      {profileLinks.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <link.icon className="w-4 h-4 mr-2" />
                          {link.label}
                        </Link>
                      ))}
                      <hr className="my-1 border-gray-200 dark:border-gray-700" />
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          logout();
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <FiLogOut className="w-4 h-4 mr-2" />
                        {t('nav.logout')}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMobileMenuOpen ? (
                <FiX className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <FiMenu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-2 rounded-md text-base font-medium ${
                      location.pathname === link.to
                        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                        : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                {!user && (
                  <div className="pt-4 space-y-2">
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" fullWidth>
                        {t('nav.login')}
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="primary" fullWidth>
                        {t('nav.register')}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;