import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import LoginForm from '../components/auth/LoginForm';
import GoogleButton from '../components/auth/GoogleButton';
import Card from '../components/common/Card';

const LoginPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <Card className="p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/">
              <img src="/logo.svg" alt="Logo" className="h-12 mx-auto mb-4" />
            </Link>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('auth.login.title')}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {t('auth.login.subtitle')}
            </p>
          </div>

          {/* Login Form */}
          <LoginForm />

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                {t('common.or')}
              </span>
            </div>
          </div>

          {/* Google Login */}
          <GoogleButton />

          {/* Register Link */}
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            {t('auth.noAccount')}{' '}
            <Link
              to="/register"
              className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              {t('auth.registerLink')}
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;