import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiUpload, FiPlay } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../common/Button';

const Hero = ({ 
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  showStats = true,
  className = ''
}) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const defaultContent = {
    title: t('home.hero.title'),
    subtitle: t('home.hero.subtitle'),
    primaryAction: {
      label: t('home.hero.upload'),
      onClick: () => navigate('/upload'),
      icon: FiUpload
    },
    secondaryAction: {
      label: t('home.hero.watchDemo'),
      onClick: () => window.open('#', '_blank'),
      icon: FiPlay
    }
  };

  const content = {
    title: title || defaultContent.title,
    subtitle: subtitle || defaultContent.subtitle,
    primaryAction: primaryAction || defaultContent.primaryAction,
    secondaryAction: secondaryAction || defaultContent.secondaryAction
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className={`relative bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden ${className}`}>
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Animated circles */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-20 w-64 h-64 bg-primary-200 dark:bg-primary-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
      />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-200 rounded-full">
              <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 animate-pulse" />
              {t('home.hero.new')}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            {content.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto"
          >
            {content.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
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
          </motion.div>

          {/* Stats */}
          {showStats && (
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('home.stats.resumes')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">1000+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('home.stats.jobs')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">85%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('home.stats.success')}</div>
              </div>
            </motion.div>
          )}

          {/* Demo preview */}
          <motion.div 
            variants={itemVariants}
            className="mt-12 relative"
          >
            <div className="relative mx-auto max-w-3xl">
              <img 
                src="/images/demo-preview.svg" 
                alt="Demo Preview"
                className="w-full rounded-xl shadow-2xl"
              />
              
              {/* Play button overlay */}
              <button className="absolute inset-0 flex items-center justify-center group">
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FiPlay className="w-6 h-6 text-primary-600 ml-1" />
                </div>
              </button>
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm font-medium">95% Match</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3"
            >
              <div className="flex items-center space-x-2">
                <FiUpload className="text-primary-600" />
                <span className="text-sm font-medium">Upload Resume</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;