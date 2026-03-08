import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiTrendingUp, 
  FiUsers, 
  FiBriefcase, 
  FiAward,
  FiActivity,
  FiClock
} from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import Card from '../common/Card';

const Analytics = ({ data = {} }) => {
  const { t } = useLanguage();

  const metrics = [
    {
      label: t('analytics.totalViews'),
      value: data.totalViews || '1,234',
      change: '+12.3%',
      icon: FiActivity,
      color: 'blue'
    },
    {
      label: t('analytics.profileViews'),
      value: data.profileViews || '567',
      change: '+8.1%',
      icon: FiUsers,
      color: 'green'
    },
    {
      label: t('analytics.jobMatches'),
      value: data.jobMatches || '89',
      change: '+23.5%',
      icon: FiBriefcase,
      color: 'purple'
    },
    {
      label: t('analytics.applicationRate'),
      value: data.applicationRate || '34%',
      change: '+5.2%',
      icon: FiTrendingUp,
      color: 'orange'
    }
  ];

  const recentActivity = [
    { action: 'Resume viewed', time: '5 minutes ago', icon: FiActivity },
    { action: 'Job match found', time: '1 hour ago', icon: FiBriefcase },
    { action: 'Profile updated', time: '2 hours ago', icon: FiUsers },
    { action: 'Application submitted', time: '1 day ago', icon: FiAward }
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {metric.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {metric.value}
                  </p>
                  <p className={`text-xs mt-1 ${
                    metric.change.startsWith('+') 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {metric.change} from last month
                  </p>
                </div>
                <div className={`p-3 bg-${metric.color}-100 dark:bg-${metric.color}-900/20 rounded-lg`}>
                  <metric.icon className={`w-5 h-5 text-${metric.color}-600 dark:text-${metric.color}-400`} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2">
          <Card title={t('analytics.overview')}>
            <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <p className="text-gray-500 dark:text-gray-400">
                Chart component would go here
              </p>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <Card title={t('analytics.recentActivity')}>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <activity.icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
                      <FiClock className="mr-1" />
                      {activity.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title={t('analytics.topSkills')}>
          <div className="space-y-3">
            {['JavaScript', 'React', 'Node.js', 'Python', 'Communication'].map((skill, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">{skill}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${85 - index * 10}%` }}
                      className="bg-primary-600 h-2 rounded-full"
                    />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {85 - index * 10}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title={t('analytics.jobCategories')}>
          <div className="space-y-3">
            {['Technology', 'Finance', 'Marketing', 'Sales', 'Operations'].map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">{category}</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {Math.floor(Math.random() * 50) + 10} jobs
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;