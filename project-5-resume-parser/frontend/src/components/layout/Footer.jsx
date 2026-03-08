import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiGithub, 
  FiLinkedin, 
  FiTwitter, 
  FiMail,
  FiMapPin,
  FiPhone 
} from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: t('nav.home'), href: '/' },
      { label: t('nav.jobs'), href: '/jobs' },
      { label: t('nav.about'), href: '/about' },
      { label: t('nav.contact'), href: '/contact' }
    ],
    resources: [
      { label: t('footer.faq'), href: '/faq' },
      { label: t('footer.help'), href: '/help' },
      { label: t('footer.support'), href: '/support' },
      { label: t('footer.blog'), href: '/blog' }
    ],
    legal: [
      { label: t('footer.privacy'), href: '/privacy' },
      { label: t('footer.terms'), href: '/terms' },
      { label: t('footer.cookies'), href: '/cookies' },
      { label: t('footer.disclaimer'), href: '/disclaimer' }
    ]
  };

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FiMail, href: 'mailto:support@example.com', label: 'Email' }
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <img 
                src="/logo.svg" 
                alt="Resume Parser" 
                className="h-8 w-auto"
              />
            </Link>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              {t('footer.description')}
            </p>

            <div className="space-y-2">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <FiMapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="text-sm">Addis Ababa, Ethiopia</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <FiPhone className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="text-sm">+251 11 123 4567</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <FiMail className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="text-sm">support@resumeparser.et</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              {t('footer.product')}
            </h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              {t('footer.resources')}
            </h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              {t('footer.legal')}
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
              © {currentYear} Resume Parser. {t('footer.rights')}
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;