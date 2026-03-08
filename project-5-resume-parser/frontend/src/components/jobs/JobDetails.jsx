import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiMapPin, 
  FiBriefcase, 
  FiClock, 
  FiDollarSign,
  FiCalendar,
  FiAward,
  FiBookmark,
  FiShare2,
  FiExternalLink,
  FiCheckCircle,
  FiXCircle
} from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import MatchPercentage from './MatchPercentage';
import axios from 'axios';
import toast from 'react-hot-toast';

const JobDetails = ({ job, matchDetails, onSave, onApply }) => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(user?.savedJobs?.includes(job?._id) || false);

  if (!job) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">{t('jobs.notFound')}</p>
      </div>
    );
  }

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

  const formatSalary = () => {
    if (!job.salary || (!job.salary.min && !job.salary.max)) return null;
    
    const currency = job.salary.currency || 'ETB';
    const period = job.salary.period === 'monthly' ? t('jobs.perMonth') : 
                   job.salary.period === 'yearly' ? t('jobs.perYear') : t('jobs.perHour');
    
    if (job.salary.min && job.salary.max) {
      return `${currency} ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()} ${period}`;
    } else if (job.salary.min) {
      return `${currency} ${job.salary.min.toLocaleString()}+ ${period}`;
    } else if (job.salary.max) {
      return `${t('jobs.upTo')} ${currency} ${job.salary.max.toLocaleString()} ${period}`;
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(language === 'am' ? 'am-ET' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: job.title,
          text: `${job.title} at ${job.company}`,
          url: window.location.href
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          navigator.clipboard.writeText(window.location.href);
          toast.success(t('common.linkCopied'));
        }
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success(t('common.linkCopied'));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start gap-4">
              {job.companyLogo && (
                <img 
                  src={job.companyLogo} 
                  alt={job.company}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {job.title}
                </h1>
                <p className="text-lg text-primary-600 dark:text-primary-400 mb-2">
                  {job.company}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center">
                    <FiMapPin className="mr-1" />
                    {job.location}
                  </span>
                  <span className="flex items-center">
                    <FiBriefcase className="mr-1" />
                    {t(`jobs.types.${job.jobType?.toLowerCase()}`)}
                  </span>
                  {job.experienceLevel && (
                    <span className="flex items-center">
                      <FiAward className="mr-1" />
                      {job.experienceLevel}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              icon={FiShare2}
            >
              {t('common.share')}
            </Button>
            <Button
              variant={saved ? 'primary' : 'outline'}
              size="sm"
              onClick={handleSave}
              loading={saving}
              icon={FiBookmark}
            >
              {saved ? t('jobs.saved') : t('jobs.save')}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                if (onApply) onApply(job);
                else window.open(job.applicationUrl, '_blank');
              }}
              icon={FiExternalLink}
            >
              {t('jobs.apply')}
            </Button>
          </div>
        </div>

        {/* Match Percentage */}
        {matchDetails && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <MatchPercentage 
              percentage={matchDetails.matchScore}
              matchedSkills={matchDetails.matchedSkills}
              missingSkills={matchDetails.missingSkills}
              size="lg"
            />
          </div>
        )}
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card title={t('jobs.description')}>
            <div className="prose dark:prose-invert max-w-none">
              {job.description.split('\n').map((paragraph, index) => (
                <p key={index} className="text-gray-700 dark:text-gray-300">
                  {paragraph}
                </p>
              ))}
            </div>
          </Card>

          {/* Responsibilities */}
          {job.responsibilities?.length > 0 && (
            <Card title={t('jobs.responsibilities')}>
              <ul className="space-y-2">
                {job.responsibilities.map((item, index) => (
                  <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                    <FiCheckCircle className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Requirements */}
          {job.requirements?.length > 0 && (
            <Card title={t('jobs.requirements')}>
              <ul className="space-y-2">
                {job.requirements.map((item, index) => (
                  <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                    <FiCheckCircle className="w-4 h-4 text-primary-500 mr-2 mt-1 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Job Overview */}
          <Card title={t('jobs.overview')}>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {t('jobs.postedDate')}
                </p>
                <p className="text-gray-900 dark:text-white flex items-center">
                  <FiCalendar className="mr-2 text-gray-400" />
                  {formatDate(job.postedDate)}
                </p>
              </div>

              {job.expiryDate && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    {t('jobs.expiryDate')}
                  </p>
                  <p className="text-gray-900 dark:text-white flex items-center">
                    <FiClock className="mr-2 text-gray-400" />
                    {formatDate(job.expiryDate)}
                  </p>
                </div>
              )}

              {job.salary && formatSalary() && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    {t('jobs.salary')}
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <FiDollarSign className="mr-2 text-gray-400" />
                    {formatSalary()}
                  </p>
                </div>
              )}

              {job.education && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    {t('jobs.education')}
                  </p>
                  <p className="text-gray-900 dark:text-white">
                    {job.education}
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Required Skills */}
          {job.requiredSkills?.length > 0 && (
            <Card title={t('jobs.requiredSkills')}>
              <div className="flex flex-wrap gap-2">
                {job.requiredSkills.map((skill, index) => (
                  <Badge key={index} variant="primary">
                    {typeof skill === 'string' ? skill : skill.name}
                    {typeof skill !== 'string' && skill.importance === 'required' && (
                      <span className="ml-1 text-xs">*</span>
                    )}
                  </Badge>
                ))}
              </div>
            </Card>
          )}

          {/* Preferred Skills */}
          {job.preferredSkills?.length > 0 && (
            <Card title={t('jobs.preferredSkills')}>
              <div className="flex flex-wrap gap-2">
                {job.preferredSkills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          )}

          {/* Company Info */}
          <Card title={t('jobs.aboutCompany')}>
            <div className="space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                {job.companyDescription || t('jobs.noCompanyDescription')}
              </p>
              {job.industry && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('jobs.industry')}
                  </p>
                  <p className="text-gray-900 dark:text-white">{job.industry}</p>
                </div>
              )}
              {job.companySize && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('jobs.companySize')}
                  </p>
                  <p className="text-gray-900 dark:text-white">{job.companySize}</p>
                </div>
              )}
            </div>
          </Card>

          {/* Apply Button (Sticky on mobile) */}
          <div className="lg:hidden fixed bottom-4 left-4 right-4 z-10">
            <Button
              variant="primary"
              fullWidth
              size="lg"
              onClick={() => window.open(job.applicationUrl, '_blank')}
              icon={FiExternalLink}
            >
              {t('jobs.apply')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;