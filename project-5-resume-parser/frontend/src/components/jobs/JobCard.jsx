import { motion } from 'framer-motion';
import { 
  FiMapPin, 
  FiBriefcase, 
  FiClock, 
  FiDollarSign,
  FiExternalLink,
  FiBookmark,
  FiCheckCircle,
  FiXCircle
} from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import MatchPercentage from './MatchPercentage';

const JobCard = ({ job, matchDetails, onSave }) => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(user?.savedJobs?.includes(job._id) || false);

  const handleSave = async () => {
    if (!user) {
      toast.error(t('jobs.loginToSave'));
      return;
    }

    setSaving(true);
    try {
      if (saved) {
        await axios.delete(`/api/users/saved-jobs/${job._id}`);
        toast.success(t('jobs.removed'));
      } else {
        await axios.post(`/api/users/saved-jobs/${job._id}`);
        toast.success(t('jobs.saved'));
      }
      setSaved(!saved);
      if (onSave) onSave(job._id, !saved);
    } catch (error) {
      toast.error(error.response?.data?.error || t('common.error'));
    } finally {
      setSaving(false);
    }
  };

  const formatSalary = (salary) => {
    if (!salary || (!salary.min && !salary.max)) return null;
    
    const currency = salary.currency || 'ETB';
    const period = salary.period === 'monthly' ? t('jobs.perMonth') : 
                   salary.period === 'yearly' ? t('jobs.perYear') : t('jobs.perHour');
    
    if (salary.min && salary.max) {
      return `${currency} ${salary.min.toLocaleString()} - ${salary.max.toLocaleString()} ${period}`;
    } else if (salary.min) {
      return `${currency} ${salary.min.toLocaleString()}+ ${period}`;
    } else if (salary.max) {
      return `${t('jobs.upTo')} ${currency} ${salary.max.toLocaleString()} ${period}`;
    }
  };

  const timeAgo = (date) => {
    const now = new Date();
    const posted = new Date(date);
    const diffDays = Math.floor((now - posted) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return t('jobs.today');
    if (diffDays === 1) return t('jobs.yesterday');
    if (diffDays < 7) return t('jobs.daysAgo', { days: diffDays });
    if (diffDays < 30) return t('jobs.weeksAgo', { weeks: Math.floor(diffDays / 7) });
    return t('jobs.monthsAgo', { months: Math.floor(diffDays / 30) });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {job.title}
            </h3>
            <p className="text-primary-600 dark:text-primary-400 font-medium">
              {job.company}
            </p>
          </div>
          
          {job.companyLogo && (
            <img 
              src={job.companyLogo} 
              alt={job.company}
              className="w-12 h-12 rounded-lg object-cover"
            />
          )}
        </div>

        {/* Match Percentage */}
        {matchDetails && (
          <MatchPercentage 
            percentage={matchDetails.matchScore}
            matchedSkills={matchDetails.matchedSkills}
            missingSkills={matchDetails.missingSkills}
          />
        )}

        {/* Details */}
        <div className="space-y-2 mt-4">
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <FiMapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{job.location}</span>
          </div>
          
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <FiBriefcase className="w-4 h-4 mr-2" />
            <span className="text-sm">{t(`jobs.types.${job.jobType?.toLowerCase()}`)}</span>
          </div>
          
          {job.salary && formatSalary(job.salary) && (
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <FiDollarSign className="w-4 h-4 mr-2" />
              <span className="text-sm">{formatSalary(job.salary)}</span>
            </div>
          )}
          
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <FiClock className="w-4 h-4 mr-2" />
            <span className="text-sm">{timeAgo(job.postedDate)}</span>
          </div>
        </div>

        {/* Skills */}
        {job.requiredSkills && job.requiredSkills.length > 0 && (
          <div className="mt-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              {t('jobs.keySkills')}
            </p>
            <div className="flex flex-wrap gap-1">
              {job.requiredSkills.slice(0, 5).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                >
                  {typeof skill === 'string' ? skill : skill.name}
                </span>
              ))}
              {job.requiredSkills.length > 5 && (
                <span className="px-2 py-1 text-xs text-primary-600 dark:text-primary-400">
                  +{job.requiredSkills.length - 5}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={handleSave}
            disabled={saving}
            className={`
              flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors
              ${saved 
                ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }
            `}
          >
            <FiBookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
            <span className="text-sm">
              {saved ? t('jobs.saved') : t('jobs.save')}
            </span>
          </button>

          <a
            href={job.applicationUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            <span className="text-sm font-medium">{t('jobs.apply')}</span>
            <FiExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;