import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiFilter, 
  FiX, 
  FiMapPin, 
  FiBriefcase, 
  FiDollarSign,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../common/Button';
import Input from '../common/Input';

const JobFilters = ({ filters, onFilterChange, onClear }) => {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters || {});

  useEffect(() => {
    setLocalFilters(filters || {});
  }, [filters]);

  const handleChange = (key, value) => {
    const updated = { ...localFilters, [key]: value };
    setLocalFilters(updated);
    onFilterChange(updated);
  };

  const handleClear = () => {
    setLocalFilters({});
    if (onClear) onClear();
  };

  const jobTypes = [
    { value: 'full-time', label: t('jobs.types.full-time') },
    { value: 'part-time', label: t('jobs.types.part-time') },
    { value: 'contract', label: t('jobs.types.contract') },
    { value: 'internship', label: t('jobs.types.internship') },
    { value: 'remote', label: t('jobs.types.remote') }
  ];

  const experienceLevels = [
    { value: 'entry', label: t('jobs.experience.entry') },
    { value: 'mid', label: t('jobs.experience.mid') },
    { value: 'senior', label: t('jobs.experience.senior') },
    { value: 'lead', label: t('jobs.experience.lead') },
    { value: 'manager', label: t('jobs.experience.manager') }
  ];

  const locations = [
    'Addis Ababa', 'Adama', 'Bahir Dar', 'Gondar', 'Hawassa', 
    'Mekelle', 'Jimma', 'Dire Dawa', 'Debre Zeit'
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FiFilter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <h3 className="font-medium text-gray-900 dark:text-white">
              {t('jobs.filters')}
            </h3>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleClear}
              className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              {t('common.clearAll')}
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <AnimatePresence>
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className="lg:!h-auto overflow-hidden"
        >
          <div className="p-4 space-y-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('jobs.search')}
              </label>
              <Input
                type="text"
                placeholder={t('jobs.searchPlaceholder')}
                value={localFilters.search || ''}
                onChange={(e) => handleChange('search', e.target.value)}
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <FiMapPin className="inline mr-1" />
                {t('jobs.location')}
              </label>
              <select
                value={localFilters.location || ''}
                onChange={(e) => handleChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="">{t('common.all')}</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Job Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <FiBriefcase className="inline mr-1" />
                {t('jobs.jobType')}
              </label>
              <div className="space-y-2">
                {jobTypes.map(type => (
                  <label key={type.value} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={localFilters.jobType?.includes(type.value)}
                      onChange={(e) => {
                        const current = localFilters.jobType || [];
                        const updated = e.target.checked
                          ? [...current, type.value]
                          : current.filter(t => t !== type.value);
                        handleChange('jobType', updated);
                      }}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      {type.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('jobs.experienceLevel')}
              </label>
              <select
                value={localFilters.experience || ''}
                onChange={(e) => handleChange('experience', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="">{t('common.all')}</option>
                {experienceLevels.map(level => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>
            </div>

            {/* Salary Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <FiDollarSign className="inline mr-1" />
                {t('jobs.salaryRange')}
              </label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder={t('jobs.min')}
                  value={localFilters.salaryMin || ''}
                  onChange={(e) => handleChange('salaryMin', e.target.value)}
                />
                <span className="text-gray-500">-</span>
                <Input
                  type="number"
                  placeholder={t('jobs.max')}
                  value={localFilters.salaryMax || ''}
                  onChange={(e) => handleChange('salaryMax', e.target.value)}
                />
              </div>
            </div>

            {/* Remote Only */}
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={localFilters.remoteOnly || false}
                onChange={(e) => handleChange('remoteOnly', e.target.checked)}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {t('jobs.remoteOnly')}
              </span>
            </label>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default JobFilters;