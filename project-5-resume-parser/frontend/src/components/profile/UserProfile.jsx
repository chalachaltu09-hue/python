import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin,
  FiBriefcase,
  FiCalendar,
  FiAward
} from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import Card from '../common/Card';
import Badge from '../common/Badge';

const UserProfile = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const stats = [
    { label: t('profile.resumes'), value: user?.resumes?.length || 0, icon: FiBriefcase },
    { label: t('profile.savedJobs'), value: user?.savedJobs?.length || 0, icon: FiAward },
    { label: t('profile.memberSince'), value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '2024', icon: FiCalendar }
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-3xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <button className="absolute bottom-0 right-0 p-1 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow">
              <FiUser className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {user?.name}
            </h1>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center">
                <FiMail className="mr-1" />
                {user?.email}
              </span>
              
              {user?.phone && (
                <span className="flex items-center">
                  <FiPhone className="mr-1" />
                  {user.phone}
                </span>
              )}
              
              {user?.location && (
                <span className="flex items-center">
                  <FiMapPin className="mr-1" />
                  {user.location}
                </span>
              )}
            </div>

            {/* Skills */}
            {user?.skills && user.skills.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {t('profile.topSkills')}:
                </p>
                <div className="flex flex-wrap gap-2">
                  {user.skills.slice(0, 5).map((skill, index) => (
                    <Badge key={index} variant="primary" size="sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-full mb-3">
                <stat.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Bio Section */}
      {user?.bio && (
        <Card title={t('profile.about')}>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {user.bio}
          </p>
        </Card>
      )}

      {/* Activity Summary */}
      <Card title={t('profile.recentActivity')}>
        <div className="space-y-4">
          {user?.recentActivity?.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 mt-2 bg-primary-500 rounded-full" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {activity.action}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(activity.timestamp).toLocaleDateString()}
                </p>
              </div>
            </div>
          )) || (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              {t('profile.noRecentActivity')}
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;