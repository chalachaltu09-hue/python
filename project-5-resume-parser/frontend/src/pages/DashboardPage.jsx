import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../context/JobContext';
import { useResume } from '../context/ResumeContext';
import Layout from '../components/layout/Layout';
import Stats from '../components/dashboard/Stats';
import Analytics from '../components/dashboard/Analytics';
import RecentActivity from '../components/dashboard/RecentActivity';
import RecommendedJobs from '../components/jobs/RecommendedJobs';
import ResumeScore from '../components/analysis/ResumeScore';
import Spinner from '../components/common/Spinner';

const DashboardPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { fetchRecommendedJobs, recommendedJobs } = useJobs();
  const { resumes, fetchResumes, loading: resumeLoading } = useResume();

  useEffect(() => {
    fetchRecommendedJobs();
    fetchResumes();
  }, [fetchRecommendedJobs, fetchResumes]);

  const latestResume = resumes[0];

  if (resumeLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Spinner size="lg" text={t('common.loading')} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('dashboard.welcomeBack')}, {user?.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('dashboard.subtitle')}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="mb-8">
          <Stats />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Analytics & Resume Score */}
          <div className="lg:col-span-2 space-y-8">
            {/* Resume Score */}
            {latestResume && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <ResumeScore
                  score={latestResume.analysis?.score}
                  analysis={latestResume.analysis}
                />
              </motion.div>
            )}

            {/* Analytics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Analytics />
            </motion.div>
          </div>

          {/* Right Column - Recent Activity & Recommendations */}
          <div className="space-y-8">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <RecentActivity />
            </motion.div>

            {/* Recommended Jobs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <RecommendedJobs />
            </motion.div>
          </div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <button className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg text-left hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-primary-700 dark:text-primary-300 mb-1">
              {t('dashboard.uploadResume')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('dashboard.uploadDesc')}
            </p>
          </button>
          
          <button className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-left hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-green-700 dark:text-green-300 mb-1">
              {t('dashboard.browseJobs')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('dashboard.browseDesc')}
            </p>
          </button>
          
          <button className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-left hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-1">
              {t('dashboard.skillAnalysis')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('dashboard.skillDesc')}
            </p>
          </button>
          
          <button className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-left hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-orange-700 dark:text-orange-300 mb-1">
              {t('dashboard.profileTips')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('dashboard.tipsDesc')}
            </p>
          </button>
        </motion.div>
      </div>
    </Layout>
  );
};

export default DashboardPage;