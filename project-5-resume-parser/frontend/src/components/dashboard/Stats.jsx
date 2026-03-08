import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiTrendingUp, 
  FiTrendingDown, 
  FiMinus,
  FiDownload,
  FiUpload,
  FiEye,
  FiUsers
} from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';

const Stats = ({ 
  stats = [],
  columns = 4,
  showTrend = true,
  size = 'md' // 'sm', 'md', 'lg'
}) => {
  const { t } = useLanguage();

  const getTrendIcon = (trend) => {
    if (trend > 0) return <FiTrendingUp className="w-4 h-4" />;
    if (trend < 0) return <FiTrendingDown className="w-4 h-4" />;
    return <FiMinus className="w-4 h-4" />;
  };

  const getTrendColor = (trend) => {
    if (trend > 0) return 'text-green-600 dark:text-green-400';
    if (trend < 0) return 'text-red-600 dark:text-red-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          card: 'p-4',
          icon: 'w-8 h-8',
          value: 'text-xl',
          label: 'text-xs'
        };
      case 'lg':
        return {
          card: 'p-6',
          icon: 'w-12 h-12',
          value: 'text-3xl',
          label: 'text-sm'
        };
      default:
        return {
          card: 'p-5',
          icon: 'w-10 h-10',
          value: 'text-2xl',
          label: 'text-sm'
        };
    }
  };

  const defaultStats = [
    {
      label: t('stats.totalViews'),
      value: '12,345',
      trend: +12.5,
      icon: FiEye,
      color: 'blue'
    },
    {
      label: t('stats.uniqueVisitors'),
      value: '8,901',
      trend: +5.2,
      icon: FiUsers,
      color: 'green'
    },
    {
      label: t('stats.resumeDownloads'),
      value: '456',
      trend: -2.3,
      icon: FiDownload,
      color: 'purple'
    },
    {
      label: t('stats.jobApplications'),
      value: '89',
      trend: +23.1,
      icon: FiUpload,
      color: 'orange'
    }
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;
  const sizeClasses = getSizeClasses();

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-4`}>
      {displayStats.slice(0, columns).map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow ${sizeClasses.card}`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className={`${sizeClasses.label} text-gray-600 dark:text-gray-400 mb-1`}>
                {stat.label}
              </p>
              <p className={`${sizeClasses.value} font-bold text-gray-900 dark:text-white`}>
                {stat.value}
              </p>
              
              {showTrend && stat.trend !== undefined && (
                <div className={`flex items-center mt-2 ${getTrendColor(stat.trend)}`}>
                  {getTrendIcon(stat.trend)}
                  <span className="text-xs ml-1">
                    {Math.abs(stat.trend)}% {stat.trend > 0 ? 'increase' : 'decrease'}
                  </span>
                </div>
              )}
            </div>

            <div className={`p-3 bg-${stat.color}-100 dark:bg-${stat.color}-900/20 rounded-lg ${sizeClasses.icon}`}>
              <stat.icon className={`w-5 h-5 text-${stat.color}-600 dark:text-${stat.color}-400`} />
            </div>
          </div>

          {/* Mini sparkline (simplified) */}
          {stat.sparkline && (
            <div className="mt-4 h-8 flex items-end space-x-1">
              {[40, 60, 45, 70, 55, 80, 65].map((height, i) => (
                <div
                  key={i}
                  className="w-2 bg-primary-200 dark:bg-primary-800 rounded-t"
                  style={{ height: `${height / 2}px` }}
                >
                  <div
                    className="w-full bg-primary-600 dark:bg-primary-400 rounded-t"
                    style={{ height: `${height / 4}px` }}
                  />
                </div>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default Stats;