import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import { FiHome } from 'react-icons/fi';

const NotFoundPage = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-lg"
        >
          <h1 className="text-9xl font-bold text-primary-600 dark:text-primary-400 mb-4">
            404
          </h1>
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('notFound.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            {t('notFound.message')}
          </p>
          <Link to="/">
            <Button variant="primary" size="lg" icon={FiHome}>
              {t('notFound.backHome')}
            </Button>
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;