import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import Card from '../common/Card';

const Testimonials = ({ testimonials = [], className = '' }) => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const defaultTestimonials = [
    {
      name: 'Abebe Kebede',
      role: t('testimonials.role1'),
      company: 'AAU Graduate',
      content: t('testimonials.content1'),
      rating: 5,
      image: '/images/avatars/avatar1.jpg'
    },
    {
      name: 'Sara Hailu',
      role: t('testimonials.role2'),
      company: 'Software Engineer',
      content: t('testimonials.content2'),
      rating: 5,
      image: '/images/avatars/avatar2.jpg'
    },
    {
      name: 'Tekle Berhan',
      role: t('testimonials.role3'),
      company: 'Marketing Specialist',
      content: t('testimonials.content3'),
      rating: 5,
      image: '/images/avatars/avatar3.jpg'
    },
    {
      name: 'Meron Assefa',
      role: t('testimonials.role4'),
      company: 'Recent Graduate',
      content: t('testimonials.content4'),
      rating: 5,
      image: '/images/avatars/avatar4.jpg'
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length);
  };

  return (
    <section className={`py-16 bg-gray-50 dark:bg-gray-800/50 ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="text-center p-8">
                {/* Quote mark */}
                <div className="text-6xl text-primary-200 dark:text-primary-800 font-serif mb-4">"</div>

                {/* Rating */}
                <div className="flex justify-center mb-4">
                  {[...Array(displayTestimonials[currentIndex].rating)].map((_, i) => (
                    <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 italic">
                  {displayTestimonials[currentIndex].content}
                </p>

                {/* Author */}
                <div className="flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mr-4">
                    {displayTestimonials[currentIndex].image ? (
                      <img 
                        src={displayTestimonials[currentIndex].image} 
                        alt={displayTestimonials[currentIndex].name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-xl font-bold">
                        {displayTestimonials[currentIndex].name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {displayTestimonials[currentIndex].name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {displayTestimonials[currentIndex].role}
                    </p>
                    <p className="text-xs text-primary-600 dark:text-primary-400">
                      {displayTestimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 lg:-translate-x-16 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <FiChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 lg:translate-x-16 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <FiChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {displayTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'w-6 bg-primary-600 dark:bg-primary-400' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Company Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
            {t('testimonials.trustedBy')}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            <img src="/images/companies/company1.svg" alt="Company 1" className="h-8" />
            <img src="/images/companies/company2.svg" alt="Company 2" className="h-8" />
            <img src="/images/companies/company3.svg" alt="Company 3" className="h-8" />
            <img src="/images/companies/company4.svg" alt="Company 4" className="h-8" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;