import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiCheckCircle } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import axios from 'axios';
import Button from '../common/Button';
import Input from '../common/Input';

const ResetPassword = ({ token }) => {
  const { t } = useLanguage();

  const [step, setStep] = useState(token ? 'reset' : 'request');
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      await axios.post('/api/auth/forgot-password', { email });
      setSuccess(true);
    } catch (error) {
      setErrors({ 
        form: error.response?.data?.error || t('common.error') 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (formData.password.length < 6) {
      newErrors.password = t('validation.passwordTooShort');
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('validation.passwordsDontMatch');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await axios.put(`/api/auth/reset-password/${token}`, {
        password: formData.password
      });
      setSuccess(true);
    } catch (error) {
      setErrors({ 
        form: error.response?.data?.error || t('common.error') 
      });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiCheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {step === 'request' ? t('auth.emailSent') : t('auth.passwordReset')}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {step === 'request' 
            ? t('auth.checkEmail') 
            : t('auth.passwordResetSuccess')}
        </p>
        <Button to="/login">
          {t('auth.backToLogin')}
        </Button>
      </motion.div>
    );
  }

  if (step === 'request') {
    return (
      <form onSubmit={handleRequestSubmit} className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {t('auth.forgotPassword')}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('auth.enterEmail')}
          </p>
        </div>

        <Input
          type="email"
          label={t('auth.email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          icon={FiMail}
          placeholder="you@example.com"
          required
        />

        {errors.form && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg"
          >
            <p className="text-sm text-red-600 dark:text-red-400">{errors.form}</p>
          </motion.div>
        )}

        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={loading}
        >
          {t('auth.sendResetLink')}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleResetSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {t('auth.resetPassword')}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {t('auth.enterNewPassword')}
        </p>
      </div>

      <Input
        type="password"
        label={t('auth.newPassword')}
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        error={errors.password}
        icon={FiLock}
        placeholder="••••••••"
        required
      />

      <Input
        type="password"
        label={t('auth.confirmNewPassword')}
        value={formData.confirmPassword}
        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        error={errors.confirmPassword}
        icon={FiLock}
        placeholder="••••••••"
        required
      />

      {errors.form && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg"
        >
          <p className="text-sm text-red-600 dark:text-red-400">{errors.form}</p>
        </motion.div>
      )}

      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={loading}
      >
        {t('auth.resetPassword')}
      </Button>
    </form>
  );
};

export default ResetPassword;