import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBell, FiMail, FiGlobe, FiMoon, FiSun, FiSave } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Card from '../common/Card';
import Button from '../common/Button';
import toast from 'react-hot-toast';

const Preferences = () => {
  const { t, language, setLanguage } = useLanguage();
  const { user, updatePreferences } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [preferences, setPreferences] = useState({
    language: user?.preferences?.language || language,
    darkMode: user?.preferences?.darkMode || theme === 'dark',
    emailNotifications: user?.preferences?.emailNotifications ?? true,
    jobAlerts: user?.preferences?.jobAlerts ?? true,
    weeklyNewsletter: user?.preferences?.weeklyNewsletter ?? false,
    applicationReminders: user?.preferences?.applicationReminders ?? true
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (key, value) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updatePreferences(preferences);
      
      // Apply language change
      if (preferences.language !== language) {
        setLanguage(preferences.language);
      }
      
      // Apply theme change
      if (preferences.darkMode !== (theme === 'dark')) {
        toggleTheme();
      }
      
      toast.success(t('profile.preferencesSaved'));
    } catch (error) {
      toast.error(t('common.error'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('profile.preferences')}
        </h2>
      </div>

      <Card>
        <div className="space-y-6">
          {/* Language Preference */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                <FiGlobe className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {t('profile.language')}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('profile.languageDescription')}
                </p>
              </div>
            </div>
            <select
              value={preferences.language}
              onChange={(e) => handleChange('language', e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="en">English</option>
              <option value="am">አማርኛ</option>
            </select>
          </div>

          {/* Theme Preference */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                         <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                  {preferences.darkMode ? (
                    <FiMoon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  ) : (
                    <FiSun className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {t('profile.theme')}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('profile.themeDescription')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleChange('darkMode', !preferences.darkMode)}
                className="relative inline-flex items-center h-6 rounded-full w-11 bg-gray-200 dark:bg-gray-700 transition-colors focus:outline-none"
              >
                <span
                  className={`inline-block w-4 h-4 transform rounded-full bg-white transition-transform ${
                    preferences.darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Email Notifications */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                  <FiMail className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {t('profile.emailNotifications')}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('profile.emailNotificationsDescription')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleChange('emailNotifications', !preferences.emailNotifications)}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${
                  preferences.emailNotifications ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block w-4 h-4 transform rounded-full bg-white transition-transform ${
                    preferences.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Job Alerts */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                  <FiBell className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {t('profile.jobAlerts')}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('profile.jobAlertsDescription')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleChange('jobAlerts', !preferences.jobAlerts)}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${
                  preferences.jobAlerts ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block w-4 h-4 transform rounded-full bg-white transition-transform ${
                    preferences.jobAlerts ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Weekly Newsletter */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                  <FiMail className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {t('profile.weeklyNewsletter')}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('profile.weeklyNewsletterDescription')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleChange('weeklyNewsletter', !preferences.weeklyNewsletter)}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${
                  preferences.weeklyNewsletter ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block w-4 h-4 transform rounded-full bg-white transition-transform ${
                    preferences.weeklyNewsletter ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Application Reminders */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                  <FiBell className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {t('profile.applicationReminders')}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('profile.applicationRemindersDescription')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleChange('applicationReminders', !preferences.applicationReminders)}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${
                  preferences.applicationReminders ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block w-4 h-4 transform rounded-full bg-white transition-transform ${
                    preferences.applicationReminders ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="primary"
              onClick={handleSave}
              loading={saving}
              icon={FiSave}
            >
              {t('common.save')}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Preferences;