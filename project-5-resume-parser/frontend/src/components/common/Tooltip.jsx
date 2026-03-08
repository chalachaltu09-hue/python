import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Tooltip = ({ 
  children, 
  content, 
  position = 'top', // 'top', 'bottom', 'left', 'right'
  delay = 200,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);
  const tooltipRef = useRef(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const getPositionStyles = () => {
    if (!tooltipRef.current) return {};

    const rect = tooltipRef.current.getBoundingClientRect();
    const styles = { position: 'fixed', zIndex: 9999 };

    switch (position) {
      case 'top':
        styles.top = rect.top - 8;
        styles.left = rect.left + rect.width / 2;
        styles.transform = 'translate(-50%, -100%)';
        break;
      case 'bottom':
        styles.top = rect.bottom + 8;
        styles.left = rect.left + rect.width / 2;
        styles.transform = 'translate(-50%, 0)';
        break;
      case 'left':
        styles.top = rect.top + rect.height / 2;
        styles.left = rect.left - 8;
        styles.transform = 'translate(-100%, -50%)';
        break;
      case 'right':
        styles.top = rect.top + rect.height / 2;
        styles.left = rect.right + 8;
        styles.transform = 'translate(0, -50%)';
        break;
      default:
        break;
    }

    return styles;
  };

  const getArrowStyles = () => {
    const baseStyles = 'absolute w-2 h-2 bg-gray-900 dark:bg-gray-700 transform rotate-45';
    
    switch (position) {
      case 'top':
        return `${baseStyles} bottom-[-4px] left-1/2 -translate-x-1/2`;
      case 'bottom':
        return `${baseStyles} top-[-4px] left-1/2 -translate-x-1/2`;
      case 'left':
        return `${baseStyles} right-[-4px] top-1/2 -translate-y-1/2`;
      case 'right':
        return `${baseStyles} left-[-4px] top-1/2 -translate-y-1/2`;
      default:
        return baseStyles;
    }
  };

  return (
    <div
      ref={tooltipRef}
      className="inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            style={getPositionStyles()}
            className={`pointer-events-none ${className}`}
          >
            <div className="relative">
              <div className="bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg px-3 py-2 max-w-xs">
                {content}
              </div>
              <div className={getArrowStyles()} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;