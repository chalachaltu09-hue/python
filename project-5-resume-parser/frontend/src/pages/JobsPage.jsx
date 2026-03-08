import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useJobs } from '../context/JobContext';
import Layout from '../components/layout/Layout';
import JobSearch from '../components/jobs/JobSearch';
import JobFilters from '../components/jobs/JobFilters';
import JobList from '../components/jobs/JobList';
import Spinner from '../components/common/Spinner';
import { FiFilter } from 'react-icons/fi';

const JobsPage = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    jobs,
    loading,
    pagination,
    filters,
    fetchJobs,
    searchJobs,
    updateFilters,
    clearFilters
  } = useJobs();

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  useEffect(() => {
    // Initialize filters from URL params
    const initialFilters = {};
    searchParams.forEach((value, key) => {
      if (key !== 'page') {
        initialFilters[key] = value;
      }
    });
    
    const page = parseInt(searchParams.get('page')) || 1;
    
    updateFilters(initialFilters);
    fetchJobs(page, initialFilters);
  }, []);

  useEffect(() => {
    // Update URL when filters change
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });
    if (pagination.page > 1) {
      params.set('page', pagination.page);
    }
    setSearchParams(params);
  }, [filters, pagination.page]);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      await searchJobs(query);
    } else {
      await fetchJobs(1, filters);
    }
  };

  const handleFilterChange = (newFilters) => {
    updateFilters(newFilters);
    fetchJobs(1, newFilters);
  };

  const handlePageChange = (page) => {
    fetchJobs(page, filters);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('jobs.title')}
          </h1>
          <JobSearch
            onSearch={handleSearch}
            initialValues={{ keyword: searchQuery }}
          />
        </motion.div>

        {/* Mobile Filter Button */}
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="lg:hidden flex items-center justify-center w-full mb-4 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
        >
          <FiFilter className="mr-2" />
          {t('jobs.filters')}
        </button>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`
            lg:w-64 flex-shrink-0
            ${showMobileFilters ? 'block' : 'hidden lg:block'}
          `}>
            <JobFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClear={clearFilters}
            />
          </div>

          {/* Job Listings */}
          <div className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Spinner size="lg" text={t('common.loading')} />
              </div>
            ) : (
              <JobList
                jobs={jobs}
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobsPage;