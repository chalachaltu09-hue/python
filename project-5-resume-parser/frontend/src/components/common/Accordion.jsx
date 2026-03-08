import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

const Accordion = ({ 
  items = [], 
  allowMultiple = false,
  defaultExpanded = [],
  variant = 'default' // 'default' or 'bordered'
}) => {
  const [expandedItems, setExpandedItems] = useState(defaultExpanded);

  const toggleItem = (index) => {
    if (allowMultiple) {
      setExpandedItems(prev =>
        prev.includes(index)
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    } else {
      setExpandedItems(prev =>
        prev.includes(index) ? [] : [index]
      );
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'bordered':
        return 'border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden';
      default:
        return 'space-y-2';
    }
  };

  const getItemClasses = (index, isExpanded) => {
    const baseClasses = 'bg-white dark:bg-gray-800';
    
    switch (variant) {
      case 'bordered':
        return `${baseClasses} border-b border-gray-200 dark:border-gray-700 last:border-b-0`;
      default:
        return `${baseClasses} rounded-lg shadow-sm ${isExpanded ? 'shadow-md' : ''}`;
    }
  };

  return (
    <div className={getVariantClasses()}>
      {items.map((item, index) => {
        const isExpanded = expandedItems.includes(index);

        return (
          <div key={index} className={getItemClasses(index, isExpanded)}>
            {/* Header */}
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              aria-expanded={isExpanded}
            >
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {item.subtitle}
                  </p>
                )}
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="ml-4"
              >
                <FiChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </motion.div>
            </button>

            {/* Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;