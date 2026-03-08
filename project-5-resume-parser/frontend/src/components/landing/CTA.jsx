import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiUpload, FiBriefcase } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../common/Button';

const CTA = ({ 
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  variant = 'default', // 'default', 'simple', 'split'
  className = ''
}) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const defaultContent = {
    title: t('home.cta.title'),
    subtitle: t('home.cta.subtitle'),
    primaryAction: {
      label: t('home.cta.button'),
      onClick: () => navigate('/register'),
      icon: FiUpload
    },
    secondaryAction: {
      label: t('home.cta.browseJobs'),
      onClick: () => navigate('/jobs'),
      icon: FiBriefcase
    }
  };

  const content = {
    title: title || defaultContent.title,
    subtitle: subtitle || defaultContent.subtitle,
    primaryAction: primaryAction || defaultContent.primaryAction,
    secondaryAction: secondaryAction || defaultContent.secondaryAction
  };

  if (variant === 'simple') {
    return (
      <section className={`bg-primary-600 dark:bg-primary-800 ${className}`}>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-white mb-4"
            >
              {content.title}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-primary-100 mb-8"
            >
              {content.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Button
                variant="white"
                size="lg"
                onClick={content.primaryAction.onClick}
                icon={content.primaryAction.icon}
              >
                {content.primaryAction.label}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'split') {
    return (
      <section className={`bg-white dark:bg-gray-900 ${className}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {content.title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                {content.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={content.primaryAction.onClick}
                  icon={content.primaryAction.icon}
                >
                  {content.primaryAction.label}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={content.secondaryAction.onClick}
                  icon={content.secondaryAction.icon}
                >
                  {content.secondaryAction.label}
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="/images/cta-illustration.svg" 
                alt="CTA Illustration"
                className="w-full max-w-md mx-auto"
              />
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-10 left-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3"
              >
                <FiUpload className="w-6 h-6 text-primary-600" />
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute bottom-10 right-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3"
              >
                <FiBriefcase className="w-6 h-6 text-green-600" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  // Default variant with gradient background
  return (
    <section className={`relative bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-900 overflow-hidden ${className}`}>
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {content.title}
          </h2>
          
          <p className="text-xl text-primary-100 mb-8">
            {content.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="white"
              size="lg"
              onClick={content.primaryAction.onClick}
              icon={content.primaryAction.icon}
            >
              {content.primaryAction.label}
            </Button>
            
            <Button
              variant="outline-white"
              size="lg"
              onClick={content.secondaryAction.onClick}
              icon={content.secondaryAction.icon}
            >
              {content.secondaryAction.label}
            </Button>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8"
          >
            <div>
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-sm text-primary-200">{t('home.stats.resumes')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">1000+</div>
              <div className="text-sm text-primary-200">{t('home.stats.jobs')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">85%</div>
              <div className="text-sm text-primary-200">{t('home.stats.success')}</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;