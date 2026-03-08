import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiTarget, FiHeart, FiGlobe } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import Layout from '../components/layout/Layout';
import Card from '../components/common/Card';

const AboutPage = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: FiTarget,
      title: t('about.values.mission'),
      description: t('about.values.missionDesc')
    },
    {
      icon: FiUsers,
      title: t('about.values.team'),
      description: t('about.values.teamDesc')
    },
    {
      icon: FiHeart,
      title: t('about.values.impact'),
      description: t('about.values.impactDesc')
    },
    {
      icon: FiGlobe,
      title: t('about.values.vision'),
      description: t('about.values.visionDesc')
    }
  ];

  const team = [
    {
      name: 'Abebe Kebede',
      role: 'Founder & CEO',
      image: '/images/team/team1.jpg',
      bio: t('about.team.bio1')
    },
    {
      name: 'Sara Hailu',
      role: 'CTO',
      image: '/images/team/team2.jpg',
      bio: t('about.team.bio2')
    },
    {
      name: 'Tekle Berhan',
      role: 'Lead Developer',
      image: '/images/team/team3.jpg',
      bio: t('about.team.bio3')
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
            {t('about.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-100 max-w-2xl mx-auto"
          >
            {t('about.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
            >
              {t('about.mission')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 dark:text-gray-400"
            >
              {t('about.missionText')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            {t('about.values.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full mb-4">
                    <value.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            {t('about.team.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center">
                  <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden bg-gray-200 dark:bg-gray-700">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-2xl font-bold">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {member.bio}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;