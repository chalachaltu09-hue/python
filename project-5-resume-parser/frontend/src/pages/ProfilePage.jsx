import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/layout/Layout';
import Tabs from '../components/common/Tabs';
import UserProfile from '../components/profile/UserProfile';
import ResumeHistory from '../components/profile/ResumeHistory';
import SavedJobsList from '../components/profile/SavedJobsList';
import Preferences from '../components/profile/Preferences';
import Settings from '../components/profile/Settings';
import { FiUser, FiFileText, FiBookmark, FiSettings, FiHeart } from 'react-icons/fi';

const ProfilePage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const tabs = [
    {
      label: t('profile.overview'),
      icon: FiUser,
      content: <UserProfile />
    },
    {
      label: t('profile.resumes'),
      icon: FiFileText,
      content: <ResumeHistory />
    },
    {
      label: t('profile.savedJobs'),
      icon: FiBookmark,
      content: <SavedJobsList />
    },
    {
      label: t('profile.preferences'),
      icon: FiHeart,
      content: <Preferences />
    },
    {
      label: t('profile.settings'),
      icon: FiSettings,
      content: <Settings />
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('profile.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('profile.subtitle')}
          </p>
        </motion.div>

        {/* Profile Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs
            tabs={tabs}
            variant="pills"
            className="mt-6"
          />
        </motion.div>
      </div>
    </Layout>
  );
};

export default ProfilePage;