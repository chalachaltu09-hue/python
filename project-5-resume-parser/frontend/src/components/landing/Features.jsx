import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiFileText, 
  FiTrendingUp, 
  FiAward, 
  FiBriefcase, 
  FiUsers, 
  FiShield,
  FiBarChart2,
  FiStar
} from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import Card from '../common/Card';

const Features = ({ features = [], columns = 3, className = '' }) => {
  const { t } = useLanguage();

  const defaultFeatures = [
    {
      icon: FiFileText,
      title: t('features.resumeParsing.title'),
      description: t('features.resumeParsing.description'),
      color: 'blue'
    },
    {
      icon: FiTrendingUp,
      title: t('features.skillAnalysis.title'),
      description: t('features.skillAnalysis.description'),
      color: 'green'
    },
    {
      icon: FiBriefcase,
      title: t('features.jobMatching.title'),
      description: t('features.jobMatching.description'),
      color: 'purple'
    },
    {
      icon: FiAward,
      title: t('features.resumeScoring.title'),
      description: t('features.resumeScoring.description'),
      color: 'orange'
    },
    {
      icon: FiBarChart2,
      title: t('features.skillGap.title'),
      description: t('features.skillGap.description'),
      color: 'pink'
    },
    {
      icon: FiUsers,
      title: t('features.bilingual.title'),
      description: t('features.bilingual.description'),
      color: 'indigo'
    },
    {
      icon: FiShield,
      title: t('features.privacy.title'),
      description: t('features.privacy.description'),
      color: 'cyan'
    },
    {
      icon: FiStar,
      title: t('features.insights.title'),
      description: t('features.insights.description'),
      color: 'yellow'
    }
  ];

  const displayFeatures = features.length > 0 ? features : defaultFeatures;

  const getGradientClass = (color) => {
    const gradients = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      orange: 'from-orange-500 to-orange-600',
      pink: 'from-pink-500 to-pink-600',
      indigo: 'from-indigo-500 to-indigo-600',
      cyan: 'from-cyan-500 to-cyan-600',
      yellow: 'from-yellow-500 to-yellow-600'
    };
    return gradients[color] || gradients.blue;
  };

  return (
    <section className={`py-16 bg-gray-50 dark:bg-gray-800/50 ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('features.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </motion.div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-6`}>
          {displayFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                hoverable 
                className="h-full group"
              >
                <div className="text-center">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 mb-4 rounded-xl bg-gradient-to-r ${getGradientClass(feature.color)} text-white group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-8 h-8" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>

                  {/* Hover effect line */}
                  <div className={`w-0 group-hover:w-12 h-0.5 bg-gradient-to-r ${getGradientClass(feature.color)} mx-auto mt-4 transition-all duration-300`} />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center"
        >
          <div>
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">500+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{t('features.stats.resumes')}</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">1000+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{t('features.stats.jobs')}</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">95%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{t('features.stats.accuracy')}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;