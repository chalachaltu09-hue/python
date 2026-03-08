import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';

const SearchBar = ({ 
  onSearch,
  placeholder = 'Search...',
  value = '',
  suggestions = [],
  loading = false,
  debounceMs = 300,
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState(value);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const debounceTimer = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      if (searchTerm !== value) {
        onSearch(searchTerm);
      }
    }, debounceMs);

    return () => clearTimeout(debounceTimer.current);
  }, [searchTerm, debounceMs, onSearch, value]);

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        if (selectedIndex >= 0) {
          setSearchTerm(suggestions[selectedIndex]);
          setShowSuggestions(false);
          onSearch(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
      default:
        break;
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
    inputRef.current?.focus();
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSuggestions(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white transition-colors"
        />
        
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <FiX className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Suggestions dropdown */}
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto"
          >
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => {
                  setSearchTerm(suggestion);
                  setShowSuggestions(false);
                  onSearch(suggestion);
                }}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`
                  w-full text-left px-4 py-2 text-sm
                  ${index === selectedIndex 
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                  transition-colors
                `}
              >
                {suggestion}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;