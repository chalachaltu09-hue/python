import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import Layout from '../components/layout/Layout';
import SavedJobs from '../components/jobs/SavedJobs';

const SavedJobsPage = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('nav.savedJobs')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t('savedJobs.subtitle')}
          </p>
          
          <SavedJobs />
        </motion.div>
      </div>
    </Layout>
  );
};

export default SavedJobsPage;