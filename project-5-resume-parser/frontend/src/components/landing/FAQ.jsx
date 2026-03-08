import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import Accordion from '../common/Accordion';

const FAQ = ({ items = [], className = '' }) => {
  const { t } = useLanguage();

  const defaultFaqs = [
    {
      title: t('faq.howItWorks.title'),
      subtitle: t('faq.howItWorks.subtitle'),
      content: (
        <div className="space-y-2">
          <p>{t('faq.howItWorks.answer1')}</p>
          <p>{t('faq.howItWorks.answer2')}</p>
          <ol className="list-decimal list-inside space-y-1 mt-2">
            <li>{t('faq.howItWorks.step1')}</li>
            <li>{t('faq.howItWorks.step2')}</li>
            <li>{t('faq.howItWorks.step3')}</li>
            <li>{t('faq.howItWorks.step4')}</li>
          </ol>
        </div>
      )
    },
    {
      title: t('faq.fileFormats.title'),
      subtitle: t('faq.fileFormats.subtitle'),
      content: (
        <div>
          <p>{t('faq.fileFormats.answer')}</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>PDF (.pdf) - {t('faq.fileFormats.recommended')}</li>
            <li>Word (.doc, .docx)</li>
            <li>Text (.txt)</li>
          </ul>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {t('faq.fileFormats.note')}
          </p>
        </div>
      )
    },
    {
      title: t('faq.privacy.title'),
      subtitle: t('faq.privacy.subtitle'),
      content: (
        <div>
          <p>{t('faq.privacy.answer1')}</p>
          <p className="mt-2">{t('faq.privacy.answer2')}</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>{t('faq.privacy.point1')}</li>
            <li>{t('faq.privacy.point2')}</li>
            <li>{t('faq.privacy.point3')}</li>
          </ul>
        </div>
      )
    },
    {
      title: t('faq.accuracy.title'),
      subtitle: t('faq.accuracy.subtitle'),
      content: (
        <div>
          <p>{t('faq.accuracy.answer1')}</p>
          <p className="mt-2">{t('faq.accuracy.answer2')}</p>
          <div className="mt-4 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
            <p className="text-sm text-primary-800 dark:text-primary-200">
              {t('faq.accuracy.tip')}
            </p>
          </div>
        </div>
      )
    },
    {
      title: t('faq.cost.title'),
      subtitle: t('faq.cost.subtitle'),
      content: (
        <div>
          <p>{t('faq.cost.answer1')}</p>
          <p className="mt-2">{t('faq.cost.answer2')}</p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">Free</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Basic Analysis</div>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">Free</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Job Matching</div>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">Free</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Skill Analysis</div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const faqItems = items.length > 0 ? items : defaultFaqs;

  return (
    <section className={`py-16 bg-white dark:bg-gray-900 ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion 
            items={faqItems}
            variant="bordered"
            allowMultiple={false}
          />
        </motion.div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {t('faq.stillHaveQuestions')}
          </p>
          <button
            onClick={() => window.location.href = '/contact'}
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
          >
            {t('faq.contactSupport')} →
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;