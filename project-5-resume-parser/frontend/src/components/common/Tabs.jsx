import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Tabs = ({ 
  tabs = [], 
  defaultTab = 0,
  onChange,
  variant = 'underline', // 'underline', 'pills', 'buttons'
  orientation = 'horizontal', // 'horizontal', 'vertical'
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = (index) => {
    setActiveTab(index);
    if (onChange) {
      onChange(index, tabs[index]);
    }
  };

  const getTabClasses = (index) => {
    const baseClasses = 'font-medium transition-all duration-200 cursor-pointer';
    
    if (orientation === 'vertical') {
      switch (variant) {
        case 'pills':
          return `
            ${baseClasses} px-4 py-2 rounded-lg text-left
            ${activeTab === index 
              ? 'bg-primary-600 text-white' 
              : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
            }
          `;
        case 'buttons':
          return `
            ${baseClasses} px-4 py-2 border rounded-lg text-left
            ${activeTab === index 
              ? 'bg-primary-600 text-white border-primary-600' 
              : 'border-gray-300 dark:border-gray-600 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
            }
          `;
        default:
          return `
            ${baseClasses} px-4 py-2 border-l-2
            ${activeTab === index 
              ? 'border-primary-600 text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' 
              : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600'
            }
          `;
      }
    }

    // Horizontal orientation
    switch (variant) {
      case 'pills':
        return `
          ${baseClasses} px-4 py-2 rounded-lg text-center
          ${activeTab === index 
            ? 'bg-primary-600 text-white' 
            : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
          }
        `;
      case 'buttons':
        return `
          ${baseClasses} px-4 py-2 border rounded-lg text-center
          ${activeTab === index 
            ? 'bg-primary-600 text-white border-primary-600' 
            : 'border-gray-300 dark:border-gray-600 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
          }
        `;
      default:
        return `
          ${baseClasses} px-4 py-2 border-b-2 text-center
          ${activeTab === index 
            ? 'border-primary-600 text-primary-600 dark:text-primary-400' 
            : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600'
          }
        `;
    }
  };

  return (
    <div className={`${orientation === 'vertical' ? 'flex gap-6' : ''} ${className}`}>
      {/* Tab Headers */}
      <div className={orientation === 'vertical' ? 'w-48 flex-shrink-0' : ''}>
        <div className={`
          ${orientation === 'vertical' 
            ? 'flex flex-col space-y-1' 
            : 'flex space-x-1 border-b border-gray-200 dark:border-gray-700'
          }
        `}>
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => handleTabChange(index)}
              className={getTabClasses(index)}
            >
              <div className="flex items-center space-x-2">
                {tab.icon && <tab.icon className="w-4 h-4" />}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded-full">
                    {tab.badge}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className={orientation === 'vertical' ? 'flex-1' : 'mt-4'}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {tabs[activeTab]?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Tabs;