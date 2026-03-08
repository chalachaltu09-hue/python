import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import Layout from '../components/layout/Layout';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import axios from 'axios';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('/api/contact', formData);
      toast.success(t('contact.success'));
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast.error(error.response?.data?.error || t('contact.error'));
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: FiMail,
      title: t('contact.email'),
      value: 'support@resumeparser.et',
      link: 'mailto:support@resumeparser.et'
    },
    {
      icon: FiPhone,
      title: t('contact.phone'),
      value: '+251 11 123 4567',
      link: 'tel:+251111234567'
    },
    {
      icon: FiMapPin,
      title: t('contact.address'),
      value: 'Addis Ababa, Ethiopia',
      link: 'https://maps.google.com/?q=Addis+Ababa+Ethiopia'
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
            {t('contact.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-100 max-w-2xl mx-auto"
          >
            {t('contact.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                        <info.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {info.title}
                        </h3>
                        <a
                          href={info.link}
                          className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                        >
                          {info.value}
                        </a>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label={t('contact.name')}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      
                      <Input
                        label={t('contact.email')}
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <Input
                      label={t('contact.subject')}
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('contact.message')}
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                        required
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        variant="primary"
                        loading={loading}
                        icon={FiSend}
                      >
                        {t('contact.send')}
                      </Button>
                    </div>
                  </form>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 bg-gray-200 dark:bg-gray-800">
        <iframe
          title="Location Map"
                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126115.102334106!2d38.69607155!3d8.98060345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b2f5a6d5a!2sAddis%20Ababa!5e0!3m2!1sen!2set!4v1620000000000!5m2!1sen!2set"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          className="grayscale contrast-125"
        />
      </section>
    </Layout>
  );
};

export default ContactPage;