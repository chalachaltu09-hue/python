import React from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiUsers, FiFileText, FiBriefcase, FiAward } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';

const Stats = ({ stats = [], className = '' }) => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const defaultStats = [
    {
      icon: FiFileText,
      value: 500,
      label: t('stats.resumesAnalyzed'),
      suffix: '+',
      color: 'blue'
    },
    {
      icon: FiBriefcase,
      value: 1000,
      label: t('stats.jobsAvailable'),
      suffix: '+',
      color: 'green'
    },
    {
      icon: FiUsers,
      value: 5000,
      label: t('stats.activeUsers'),
      suffix: '+',
      color: 'purple'
    },
    {
      icon: FiAward,
      value: 85,
      label: t('stats.successRate'),
      suffix: '%',
      color: 'orange'
    }
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;

  const Counter = ({ value, suffix = '' }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);
    const displayValue = useTransform(rounded, (latest) => `${latest}${suffix}`);

    React.useEffect(() => {
      if (inView) {
        count.set(value);
      }
    }, [inView, value, count]);

    return <motion.span className="text-4xl font-bold">{displayValue}</motion.span>;
  };

  const getIconColor = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
      green: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
      purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
      orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
    };
    return colors[color] || colors.blue;
  };

  return (
    <section ref={ref} className={`py-16 bg-primary-600 dark:bg-primary-800 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="text-center text-white"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${getIconColor(stat.color)} bg-white/20 mb-4`}>
                <stat.icon className="w-8 h-8" />
              </div>
              
              <div className="mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              
              <p className="text-primary-100 text-lg">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Testimonial highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center text-white/80 max-w-2xl mx-auto"
        >
          <p className="text-lg italic">
            "{t('stats.testimonial')}"
          </p>
          <p className="mt-2 font-medium">
            — {t('stats.testimonialAuthor')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;