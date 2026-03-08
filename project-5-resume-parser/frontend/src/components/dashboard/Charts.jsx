import React from 'react';
import { motion } from 'framer-motion';
import Card from '../common/Card';

const Charts = ({ type = 'line', data = {}, title }) => {
  // This is a placeholder component. In production, integrate with a chart library
  // like Chart.js, Recharts, or D3.js

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <div className="relative h-48">
            <svg className="w-full h-full" viewBox="0 0 300 150">
              <polyline
                points="0,120 40,80 80,100 120,40 160,70 200,20 240,50 280,30 300,10"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                className="dark:stroke-primary-400"
              />
              {/* Grid lines */}
              <line x1="0" y1="0" x2="0" y2="150" stroke="#e5e7eb" strokeWidth="1" className="dark:stroke-gray-700" />
              <line x1="50" y1="0" x2="50" y2="150" stroke="#e5e7eb" strokeWidth="1" className="dark:stroke-gray-700" />
              <line x1="100" y1="0" x2="100" y2="150" stroke="#e5e7eb" strokeWidth="1" className="dark:stroke-gray-700" />
              <line x1="150" y1="0" x2="150" y2="150" stroke="#e5e7eb" strokeWidth="1" className="dark:stroke-gray-700" />
              <line x1="200" y1="0" x2="200" y2="150" stroke="#e5e7eb" strokeWidth="1" className="dark:stroke-gray-700" />
              <line x1="250" y1="0" x2="250" y2="150" stroke="#e5e7eb" strokeWidth="1" className="dark:stroke-gray-700" />
              <line x1="300" y1="0" x2="300" y2="150" stroke="#e5e7eb" strokeWidth="1" className="dark:stroke-gray-700" />
              
              {/* Horizontal lines */}
              <line x1="0" y1="0" x2="300" y2="0" stroke="#e5e7eb" strokeWidth="1" className="dark:stroke-gray-700" />
              <line x1="0" y1="30" x2="300" y2="30" stroke="#e5e7eb" strokeWidth="1" className="dark:stroke-gray-700" />
              <line x1="0" y1="60" x2="300" y2="60" stroke="#e5e7eb" strokeWidth="1" className="dark:stroke-gray-700" />
              <line x1="0" y1="90" x2="300" y2="90" stroke="#e5e7eb" strokeWidth="1" className="dark:stroke-gray-700" />
              <line x1="0" y1="120" x2="300" y2="120" stroke="#e5e7eb" strokeWidth="1" className="dark:stroke-gray-700" />
              <line x1="0" y1="150" x2="300" y2="150" stroke="#e5e7eb" strokeWidth="1" className="dark:stroke-gray-700" />
            </svg>
          </div>
        );
      
      case 'bar':
        return (
          <div className="relative h-48 flex items-end justify-around">
            {[65, 45, 80, 55, 70, 40, 85].map((value, index) => (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={{ height: `${value}%` }}
                transition={{ delay: index * 0.1 }}
                className="w-8 bg-primary-500 dark:bg-primary-600 rounded-t-lg"
                style={{ height: `${value}%` }}
              >
                <div className="text-center -mt-6 text-xs text-gray-600 dark:text-gray-400">
                  {value}
                </div>
              </motion.div>
            ))}
          </div>
        );
      
      case 'pie':
        return (
          <div className="relative h-48 flex items-center justify-center">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="32"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="16"
                className="dark:stroke-gray-700"
              />
              <circle
                cx="64"
                cy="64"
                r="32"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="16"
                strokeDasharray={`${2 * Math.PI * 32}`}
                strokeDashoffset={`${2 * Math.PI * 32 * 0.3}`}
                className="dark:stroke-primary-400"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">70%</span>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="h-48 flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">Chart preview</p>
          </div>
        );
    }
  };

  return (
    <Card title={title}>
      {renderChart()}
      {/* Legend */}
      <div className="mt-4 flex items-center justify-center space-x-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-primary-500 rounded-full mr-2" />
          <span className="text-xs text-gray-600 dark:text-gray-400">Current</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full mr-2" />
          <span className="text-xs text-gray-600 dark:text-gray-400">Previous</span>
        </div>
      </div>
    </Card>
  );
};

export default Charts;