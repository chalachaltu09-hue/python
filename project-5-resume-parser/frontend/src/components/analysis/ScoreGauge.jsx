import React, { useEffect, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const ScoreGauge = ({ score = 0, size = 200 }) => {
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = useSpring(circumference - (score / 100) * circumference, {
    stiffness: 100,
    damping: 30
  });

  const getColor = (score) => {
    if (score < 40) return '#ef4444'; // red-500
    if (score < 60) return '#eab308'; // yellow-500
    if (score < 80) return '#3b82f6'; // blue-500
    return '#22c55e'; // green-500
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Background SVG */}
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r="45"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="10"
          className="dark:stroke-gray-700"
        />
        
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r="45"
          fill="none"
          stroke={getColor(score)}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset }}
        />
      </svg>

      {/* Score Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-4xl font-bold text-gray-900 dark:text-white"
        >
          {Math.round(score)}
        </motion.span>
        <span className="text-sm text-gray-500 dark:text-gray-400">/100</span>
      </div>
    </div>
  );
};

export default ScoreGauge;