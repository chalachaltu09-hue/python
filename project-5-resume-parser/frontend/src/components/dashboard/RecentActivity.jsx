import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiFileText, 
  FiBriefcase, 
  FiUser, 
  FiStar,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle
} from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import Card from '../common/Card';
import Badge from '../common/Badge';

const RecentActivity = ({ activities = [], limit = 5 }) => {
  const { t } = useLanguage();

  const getActivityIcon = (type) => {
    switch (type) {
      case 'resume_upload':
        return <FiFileText className="w-4 h-4" />;
      case 'job_match':
        return <FiBriefcase className="w-4 h-4" />;
      case 'profile_update':
        return <FiUser className="w-4 h-4" />;
      case 'application':
        return <FiCheckCircle className="w-4 h-4" />;
      default:
        return <FiAlertCircle className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'resume_upload':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400';
      case 'job_match':
        return 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400';
      case 'profile_update':
        return 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400';
      case 'application':
        return 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));

    if (diffInMinutes < 1) return t('activity.justNow');
    if (diffInMinutes < 60) return t('activity.minutesAgo', { count: diffInMinutes });
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return t('activity.hoursAgo', { count: diffInHours });
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return t('activity.daysAgo', { count: diffInDays });
    
    return activityTime.toLocaleDateString();
  };

  const sampleActivities = activities.length > 0 ? activities : [
    {
      type: 'resume_upload',
      title: 'Resume uploaded',
      description: 'Software Developer Resume',
      timestamp: new Date(Date.now() - 5 * 60000),
      status: 'success'
    },
    {
      type: 'job_match',
      title: 'New job match found',
      description: 'Senior Developer at Ethio Telecom - 85% match',
      timestamp: new Date(Date.now() - 2 * 3600000),
      status: 'info'
    },
    {
      type: 'profile_update',
      title: 'Profile updated',
      description: 'Skills section updated',
      timestamp: new Date(Date.now() - 1 * 86400000),
      status: 'success'
    },
    {
      type: 'application',
      title: 'Application submitted',
      description: 'Frontend Developer at CBREX',
      timestamp: new Date(Date.now() - 2 * 86400000),
      status: 'success'
    },
    {
      type: 'job_match',
      title: 'Application deadline approaching',
      description: 'React Developer at Kifiya - 2 days left',
      timestamp: new Date(Date.now() - 3 * 86400000),
      status: 'warning'
    }
  ].slice(0, limit);

  return (
    <Card 
      title={t('dashboard.recentActivity')}
      headerAction={
        <button className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400">
          {t('common.viewAll')}
        </button>
      }
    >
      <div className="space-y-4">
        {sampleActivities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
          >
            <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
              {getActivityIcon(activity.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {activity.title}
                </h4>
                {activity.status && (
                  <Badge 
                    size="sm" 
                    variant={activity.status === 'warning' ? 'warning' : 'success'}
                  >
                    {activity.status}
                  </Badge>
                )}
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate mb-1">
                {activity.description}
              </p>
              
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                <FiClock className="mr-1" />
                {formatTimeAgo(activity.timestamp)}
              </div>
            </div>
          </motion.div>
        ))}

        {sampleActivities.length === 0 && (
          <div className="text-center py-8">
            <FiClock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">
              {t('activity.noActivity')}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default RecentActivity;