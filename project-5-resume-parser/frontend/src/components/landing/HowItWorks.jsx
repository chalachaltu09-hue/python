import React from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiCpu, FiBriefcase, FiCheckCircle } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import Card from '../common/Card';

const HowItWorks = ({ steps = [], className = '' }) => {
  const { t } = useLanguage();

  const defaultSteps = [
    {
      icon: FiUpload,
      title: t('howItWorks.step1.title'),
      description: t('howItWorks.step1.description'),
      color: 'blue'
    },
    {
      icon: FiCpu,
      title: t('howItWorks.step2.title'),
      description: t('howItWorks.step2.description'),
      color: 'purple'
    },
    {
      icon: FiBriefcase,
      title: t('howItWorks.step3.title'),
      description: t('howItWorks.step3.description'),
      color: 'green'
    },
    {
      icon: FiCheckCircle,
      title: t('howItWorks.step4.title'),
      description: t('howItWorks.step4.description'),
      color: 'orange'
    }
  ];

  const displaySteps = steps.length > 0 ? steps : defaultSteps;

  const getStepColor = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
      purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
      green: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
      orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
    };
    return colors[color] || colors.blue;
  };

  return (
    <section className={`py-16 bg-white dark:bg-gray-900 ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('howItWorks.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('howItWorks.subtitle')}
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line (visible on desktop) */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500" style={{ width: '75%', margin: '0 auto' }} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {displaySteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <Card className="text-center h-full hover:shadow-lg transition-shadow">
                  {/* Step Number */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${getStepColor(step.color)} mb-4`}>
                    <step.icon className="w-10 h-10" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>

                  {/* Arrow (except last) */}
                  {index < displaySteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                      <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Video Demo Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <button className="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium">
            <FiPlay className="mr-2" />
            {t('howItWorks.watchVideo')}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;