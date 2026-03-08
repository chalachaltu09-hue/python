import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import FileUploader from '../components/Upload/FileUploader';
import { 
  FiTrendingUp, 
  FiAward, 
  FiUsers, 
  FiBriefcase,
  FiArrowRight
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const HomePage = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleUploadSuccess = (data) => {
    navigate(`/results/${data.resumeId}`);
  };

  const features = [
    {
      icon: FiTrendingUp,
      title: t('home.features.analysis.title'),
      description: t('home.features.analysis.desc'),
      color: 'blue'
    },
    {
      icon: FiAward,
      title: t('home.features.scoring.title'),
      description: t('home.features.scoring.desc'),
      color: 'green'
    },
    {
      icon: FiUsers,
      title: t('home.features.matching.title'),
      description: t('home.features.matching.desc'),
      color: 'purple'
    },
    {
      icon: FiBriefcase,
      title: t('home.features.insights.title'),
      description: t('home.features.insights.desc'),
      color: 'orange'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {t('home.hero.title')}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
              {t('home.hero.subtitle')}
            </p>

            {/* Upload Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                {t('home.upload.title')}
              </h2>
              
              <FileUploader onUploadSuccess={handleUploadSuccess} />

              {!user && (
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  {t('home.upload.loginPrompt')}{' '}
                  <button
                    onClick={() => navigate('/login')}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    {t('common.login')}
                  </button>
                </p>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('home.stats.resumes')}</div>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">1000+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('home.stats.jobs')}</div>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">85%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('home.stats.success')}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home.features.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('home.features.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 bg-${feature.color}-100 dark:bg-${feature.color}-900/20 rounded-lg flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}-600 dark:text-${feature.color}-400`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 dark:bg-primary-800">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('home.cta.title')}
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              {t('home.cta.subtitle')}
            </p>
            <button
              onClick={() => {
                document.querySelector('.bg-gradient-to-br')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {t('home.cta.button')}
              <FiArrowRight className="ml-2" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;