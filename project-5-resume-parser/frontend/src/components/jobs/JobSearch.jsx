import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiSearch, FiMapPin, FiBriefcase } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../common/Button';

const JobSearch = ({ onSearch, initialValues = {}, className = '' }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams, setSearchParams] = useState({
    keyword: initialValues.keyword || '',
    location: initialValues.location || '',
    category: initialValues.category || ''
  });

  const [suggestions, setSuggestions] = useState({
    keywords: [],
    locations: []
  });

  // Popular search categories
  const popularCategories = [
    'Technology',
    'Accounting',
    'Marketing',
    'Sales',
    'Engineering',
    'Healthcare'
  ];

  useEffect(() => {
    // Fetch search suggestions based on input
    if (searchParams.keyword.length > 2) {
      // Simulate API call
      setSuggestions(prev => ({
        ...prev,
        keywords: [
          'Software Developer',
          'Accountant',
          'Marketing Manager',
          'Sales Representative',
          'Civil Engineer'
        ].filter(s => s.toLowerCase().includes(searchParams.keyword.toLowerCase()))
      }));
    }
  }, [searchParams.keyword]);

  useEffect(() => {
    if (searchParams.location.length > 2) {
      setSuggestions(prev => ({
        ...prev,
        locations: [
          'Addis Ababa',
          'Adama',
          'Bahir Dar',
          'Gondar',
          'Hawassa',
          'Mekelle'
        ].filter(l => l.toLowerCase().includes(searchParams.location.toLowerCase()))
      }));
    }
  }, [searchParams.location]);

  const handleSearch = (e) => {
    e.preventDefault();
    
    const params = new URLSearchParams(location.search);
    if (searchParams.keyword) params.set('q', searchParams.keyword);
    if (searchParams.location) params.set('location', searchParams.location);
    if (searchParams.category) params.set('category', searchParams.category);
    
    navigate(`/jobs?${params.toString()}`);
    
    if (onSearch) {
      onSearch(searchParams);
    }
  };

  const handleQuickSearch = (category) => {
    setSearchParams(prev => ({ ...prev, category }));
    handleSearch(new Event('submit'));
  };

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Search Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Keyword Search */}
          <div className="relative md:col-span-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchParams.keyword}
              onChange={(e) => setSearchParams({ ...searchParams, keyword: e.target.value })}
              placeholder={t('jobs.searchPlaceholder')}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
            />
            
            {/* Keyword Suggestions */}
            {suggestions.keywords.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
              >
                {suggestions.keywords.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setSearchParams({ ...searchParams, keyword: suggestion });
                      setSuggestions({ ...suggestions, keywords: [] });
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    {suggestion}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Location Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchParams.location}
              onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
              placeholder={t('jobs.locationPlaceholder')}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
            />
            
            {/* Location Suggestions */}
            {suggestions.locations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
              >
                {suggestions.locations.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setSearchParams({ ...searchParams, location: suggestion });
                      setSuggestions({ ...suggestions, locations: [] });
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    {suggestion}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Search Button */}
          <div className="md:col-span-1">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              icon={FiSearch}
            >
              {t('jobs.search')}
            </Button>
          </div>
        </div>
      </form>

      {/* Quick Search Categories */}
      <div className="mt-6">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {t('jobs.popularCategories')}:
        </p>
        <div className="flex flex-wrap gap-2">
          {popularCategories.map((category) => (
            <button
              key={category}
              onClick={() => handleQuickSearch(category)}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg text-sm transition-colors"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Searches (if any) */}
      {initialValues.recent && initialValues.recent.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {t('jobs.recentSearches')}:
          </p>
          <div className="flex flex-wrap gap-2">
            {initialValues.recent.map((search, index) => (
              <button
                key={index}
                onClick={() => {
                  setSearchParams({
                    keyword: search.keyword,
                    location: search.location
                  });
                  handleSearch(new Event('submit'));
                }}
                                className="flex items-center space-x-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 text-gray-600 dark:text-gray-400 rounded-lg text-sm transition-colors"
              >
                <FiSearch className="w-3 h-3" />
                <span>{search.keyword}</span>
                {search.location && (
                  <>
                    <span>•</span>
                    <FiMapPin className="w-3 h-3" />
                    <span>{search.location}</span>
                  </>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobSearch;