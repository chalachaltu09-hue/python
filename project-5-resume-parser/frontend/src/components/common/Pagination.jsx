import React from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  size = 'md' // 'sm', 'md', 'lg'
}) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const totalNumbers = siblingCount * 2 + 3; // siblings + current + first + last
    const totalBlocks = totalNumbers + 2; // +2 for ellipsis

    if (totalPages <= totalBlocks) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, '...', totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [1, '...', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [1, '...', ...middleRange, '...', totalPages];
    }

    return pageNumbers;
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8 text-sm';
      case 'lg':
        return 'w-12 h-12 text-lg';
      default:
        return 'w-10 h-10 text-base';
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="flex items-center justify-center space-x-2">
      {/* First Page */}
      {showFirstLast && currentPage > 1 && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(1)}
          className={`${getSizeClasses()} flex items-center justify-center rounded-lg text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}
        >
          <FiChevronLeft className="w-4 h-4" />
          <FiChevronLeft className="w-4 h-4 -ml-2" />
        </motion.button>
      )}

      {/* Previous Page */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${getSizeClasses()} flex items-center justify-center rounded-lg text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
      >
        <FiChevronLeft className="w-4 h-4" />
      </motion.button>

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className={`${getSizeClasses()} flex items-center justify-center text-gray-500 dark:text-gray-400`}>
              ...
            </span>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPageChange(page)}
              className={`
                ${getSizeClasses()} flex items-center justify-center rounded-lg font-medium transition-all
                ${currentPage === page
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                }
              `}
            >
              {page}
            </motion.button>
          )}
        </React.Fragment>
      ))}

      {/* Next Page */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${getSizeClasses()} flex items-center justify-center rounded-lg text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
      >
        <FiChevronRight className="w-4 h-4" />
      </motion.button>

      {/* Last Page */}
      {showFirstLast && currentPage < totalPages && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(totalPages)}
          className={`${getSizeClasses()} flex items-center justify-center rounded-lg text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}
        >
          <FiChevronRight className="w-4 h-4" />
          <FiChevronRight className="w-4 h-4 -ml-2" />
        </motion.button>
      )}
    </nav>
  );
};

export default Pagination;