import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import Layout from '../components/layout/Layout';
import Accordion from '../components/common/Accordion';
import Card from '../components/common/Card';
import { FiHelpCircle } from 'react-icons/fi';

const FAQPage = () => {
  const { t } = useLanguage();

  const faqCategories = [
    {
      category: t('faq.categories.general'),
      questions: [
        {
          q: t('faq.general.whatIs.title'),
          a: t('faq.general.whatIs.answer')
        },
        {
          q: t('faq.general.howMuch.title'),
          a: t('faq.general.howMuch.answer')
        },
        {
          q: t('faq.general.whoCanUse.title'),
          a: t('faq.general.whoCanUse.answer')
        }
      ]
    },
    {
      category: t('faq.categories.resume'),
      questions: [
        {
          q: t('faq.resume.formats.title'),
          a: t('faq.resume.formats.answer')
        },
        {
          q: t('faq.resume.size.title'),
          a: t('faq.resume.size.answer')
        },
        {
          q: t('faq.resume.privacy.title'),
          a: t('faq.resume.privacy.answer')
        }
      ]
    },
    {
      category: t('faq.categories.jobs'),
      questions: [
        {
          q: t('faq.jobs.matching.title'),
          a: t('faq.jobs.matching.answer')
        },
        {
          q: t('faq.jobs.apply.title'),
          a: t('faq.jobs.apply.answer')
        },
        {
          q: t('faq.jobs.notifications.title'),
          a: t('faq.jobs.notifications.answer')
        }
      ]
    },
    {
      category: t('faq.categories.account'),
      questions: [
        {
          q: t('faq.account.create.title'),
          a: t('faq.account.create.answer')
        },
        {
          q: t('faq.account.delete.title'),
          a: t('faq.account.delete.answer')
        },
        {
          q: t('faq.account.settings.title'),
          a: t('faq.account.settings.answer')
        }
      ]
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FiHelpCircle className="w-16 h-16 mx-auto mb-4 text-primary-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('faq.title')}
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              {t('faq.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {faqCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {category.category}
                </h2>
                <Card>
                  <Accordion
                    items={category.questions.map(q => ({
                      title: q.q,
                      content: <p className="text-gray-600 dark:text-gray-400">{q.a}</p>
                    }))}
                    variant="bordered"
                  />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('faq.stillNeedHelp')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              {t('faq.contactSupport')}
            </p>
            <button
              onClick={() => window.location.href = '/contact'}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
            >
              {t('faq.contactUs')}
            </button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQPage;