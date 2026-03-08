import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import Layout from '../components/layout/Layout';
import Card from '../components/common/Card';

const PrivacyPage = () => {
  const { t } = useLanguage();

  const sections = [
    {
      title: t('privacy.information.title'),
      content: t('privacy.information.content')
    },
    {
      title: t('privacy.use.title'),
      content: t('privacy.use.content')
    },
    {
      title: t('privacy.sharing.title'),
      content: t('privacy.sharing.content')
    },
    {
      title: t('privacy.security.title'),
      content: t('privacy.security.content')
    },
    {
      title: t('privacy.rights.title'),
      content: t('privacy.rights.content')
    },
    {
      title: t('privacy.cookies.title'),
      content: t('privacy.cookies.content')
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {t('privacy.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-100 max-w-2xl mx-auto"
          >
            {t('privacy.lastUpdated')}: {new Date().toLocaleDateString()}
          </motion.p>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="p-8">
              <div className="prose dark:prose-invert max-w-none">
                {sections.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="mb-8"
                  >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {section.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {section.content}
                    </p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPage;