import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useResume } from '../context/ResumeContext';
import { useJobs } from '../context/JobContext';
import Layout from '../components/layout/Layout';
import ResumeScore from '../components/analysis/ResumeScore';
import SkillTags from '../components/analysis/SkillTags';
import ExperienceTimeline from '../components/analysis/ExperienceTimeline';
import EducationList from '../components/analysis/EducationList';
import StrengthWeakness from '../components/analysis/StrengthWeakness';
import ImprovementTips from '../components/analysis/ImprovementTips';
import JobCard from '../components/jobs/JobCard';
import Spinner from '../components/common/Spinner';
import Button from '../components/common/Button';
import { FiDownload, FiRefreshCw } from 'react-icons/fi';

const ResultsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { currentResume, getResume, loading } = useResume();
  const { jobs, fetchJobs } = useJobs();

  const [matchedJobs, setMatchedJobs] = useState([]);

  useEffect(() => {
    loadResume();
  }, [id]);

  useEffect(() => {
    if (currentResume?.matchedJobs) {
      setMatchedJobs(currentResume.matchedJobs);
    }
  }, [currentResume]);

  const loadResume = async () => {
    await getResume(id);
    await fetchJobs({ limit: 10 });
  };

  const handleDownload = () => {
    // Implement PDF download
    console.log('Download analysis');
  };

  const handleRerunAnalysis = () => {
    loadResume();
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Spinner size="lg" text={t('analysis.processing')} />
        </div>
      </Layout>
    );
  }

  if (!currentResume) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('analysis.notFound')}
          </h2>
          <Button variant="primary" onClick={() => navigate('/')}>
            {t('analysis.uploadNew')}
          </Button>
        </div>
      </Layout>
    );
  }

  const { parsedData, analysis, matchedJobs: resumeMatches } = currentResume;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {t('analysis.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {parsedData?.name} • {new Date(currentResume.createdAt).toLocaleDateString()}
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <Button
              variant="outline"
              onClick={handleDownload}
              icon={FiDownload}
            >
              {t('common.download')}
            </Button>
            <Button
              variant="outline"
              onClick={handleRerunAnalysis}
              icon={FiRefreshCw}
            >
              {t('analysis.rerun')}
            </Button>
          </div>
        </motion.div>

        {/* Resume Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <ResumeScore score={analysis?.score} analysis={analysis} />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Skills & Experience */}
          <div className="lg:col-span-2 space-y-8">
            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <SkillTags skills={parsedData?.skills} />
            </motion.div>

            {/* Experience */}
            {parsedData?.experience?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <ExperienceTimeline experience={parsedData.experience} />
              </motion.div>
            )}

            {/* Education */}
            {parsedData?.education?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <EducationList education={parsedData.education} />
              </motion.div>
            )}
          </div>

          {/* Right Column - Analysis & Tips */}
          <div className="space-y-8">
            {/* Strengths & Weaknesses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <StrengthWeakness
                strengths={analysis?.strengths}
                weaknesses={analysis?.weaknesses}
              />
            </motion.div>

            {/* Improvement Tips */}
            {analysis?.feedback?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <ImprovementTips tips={analysis.feedback} />
              </motion.div>
            )}
          </div>
        </div>

        {/* Matched Jobs */}
        {resumeMatches?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('analysis.matchedJobs')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resumeMatches.slice(0, 3).map((match, index) => (
                <JobCard
                  key={index}
                  job={match.jobId}
                  matchDetails={match}
                />
              ))}
            </div>
            {resumeMatches.length > 3 && (
              <div className="text-center mt-4">
                <Button
                  variant="outline"
                  onClick={() => navigate('/jobs')}
                >
                  {t('analysis.viewAllMatches')}
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default ResultsPage;