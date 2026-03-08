import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

const Dropdown = ({ 
  trigger, 
  children, 
  placement = 'bottom-left',
  offset = 8,
  closeOnClick = true,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPlacementStyles = () => {
    if (!triggerRef.current) return {};

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const styles = { position: 'absolute', zIndex: 50 };

    switch (placement) {
      case 'bottom-left':
        styles.top = triggerRect.bottom + offset;
        styles.left = triggerRect.left;
        break;
      case 'bottom-right':
        styles.top = triggerRect.bottom + offset;
        styles.right = window.innerWidth - triggerRect.right;
        break;
      case 'top-left':
        styles.bottom = window.innerHeight - triggerRect.top + offset;
        styles.left = triggerRect.left;
        break;
      case 'top-right':
        styles.bottom = window.innerHeight - triggerRect.top + offset;
        styles.right = window.innerWidth - triggerRect.right;
        break;
      default:
        styles.top = triggerRect.bottom + offset;
        styles.left = triggerRect.left;
    }

    return styles;
  };

  const handleItemClick = (onClick) => {
    if (closeOnClick) {
      setIsOpen(false);
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="relative inline-block">
      {/* Trigger */}
      <div
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
      >
        {trigger || (
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <span>Menu</span>
            <FiChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            style={getPlacementStyles()}
            className={`min-w-[200px] bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}
          >
            {React.Children.map(children, child => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                  onClick: () => handleItemClick(child.props.onClick)
                });
              }
              return child;
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Dropdown.Item subcomponent
const DropdownItem = ({ children, icon: Icon, onClick, disabled = false, divider = false }) => {
  if (divider) {
    return <hr className="my-1 border-gray-200 dark:border-gray-700" />;
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full px-4 py-2 text-left flex items-center space-x-2
        text-gray-700 dark:text-gray-300
        hover:bg-gray-100 dark:hover:bg-gray-700
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-150
      `}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span className="flex-1">{children}</span>
    </button>
  );
};

Dropdown.Item = DropdownItem;

export default Dropdown;