import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useJobs } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import { useResume } from '../context/ResumeContext';
import Layout from '../components/layout/Layout';
import JobDetails from '../components/jobs/JobDetails';
import SkillGapAnalysis from '../components/analysis/SkillGapAnalysis';
import Spinner from '../components/common/Spinner';
import Button from '../components/common/Button';
import { FiArrowLeft } from 'react-icons/fi';

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useAuth();
  const { getJobById, isJobSaved, saveJob, removeSavedJob } = useJobs();
  const { currentResume, getResume, analyzeSkillGap } = useResume();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [skillGap, setSkillGap] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    loadJobDetails();
  }, [id]);

  useEffect(() => {
    if (user && currentResume && job) {
      analyzeGap();
    }
  }, [currentResume, job]);

  const loadJobDetails = async () => {
    setLoading(true);
    try {
      const data = await getJobById(id);
      setJob(data);
      
      // Load latest resume if user is logged in
      if (user) {
        const resumes = await getResume();
        if (resumes && resumes.length > 0) {
          await getResume(resumes[0]._id);
        }
      }
    } catch (error) {
      console.error('Error loading job details:', error);
    } finally {
      setLoading(false);
    }
  };

  const analyzeGap = async () => {
    if (!currentResume || !job) return;
    
    setAnalyzing(true);
    try {
      const result = await analyzeSkillGap(currentResume._id, job._id);
      setSkillGap(result);
    } catch (error) {
      console.error('Error analyzing skill gap:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSaveJob = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (isJobSaved(job._id)) {
      await removeSavedJob(job._id);
    } else {
      await saveJob(job._id);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Spinner size="lg" text={t('common.loading')} />
        </div>
      </Layout>
    );
  }

  if (!job) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('jobs.notFound')}
          </h2>
          <Button variant="primary" onClick={() => navigate('/jobs')}>
            {t('jobs.browseJobs')}
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-6 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          {t('common.back')}
        </button>

        {/* Job Details */}
        <JobDetails
          job={job}
          matchDetails={skillGap ? {
            matchScore: skillGap.matchPercentage,
            matchedSkills: skillGap.matchedSkills,
            missingSkills: [...(skillGap.missingRequired || []), ...(skillGap.missingPreferred || [])]
          } : null}
          onSave={handleSaveJob}
          isSaved={isJobSaved(job._id)}
        />

        {/* Skill Gap Analysis */}
        {user && currentResume && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            {analyzing ? (
              <div className="flex items-center justify-center py-12">
                <Spinner size="md" text={t('analysis.analyzing')} />
              </div>
            ) : skillGap ? (
              <SkillGapAnalysis
                data={skillGap}
                jobTitle={job.title}
              />
            ) : null}
          </motion.div>
        )}

        {/* Similar Jobs */}
        {job.similarJobs && job.similarJobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('jobs.similarJobs')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {job.similarJobs.map((similarJob) => (
                <div
                  key={similarJob._id}
                  onClick={() => navigate(`/jobs/${similarJob._id}`)}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {similarJob.title}
                  </h3>
                  <p className="text-sm text-primary-600 dark:text-primary-400 mb-2">
                    {similarJob.company}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {similarJob.location}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default JobDetailsPage;