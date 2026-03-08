import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';
import Input from '../common/Input';

const RegisterForm = () => {
  const { t } = useLanguage();
  const { register, loading } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = t('validation.required');
    } else if (formData.name.length < 2) {
      newErrors.name = t('validation.nameTooShort');
    }

    if (!formData.email) {
      newErrors.email = t('validation.required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('validation.invalidEmail');
    }

    if (!formData.password) {
      newErrors.password = t('validation.required');
    } else if (formData.password.length < 6) {
      newErrors.password = t('validation.passwordTooShort');
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('validation.passwordsDontMatch');
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = t('validation.acceptTerms');
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });

    if (!result.success && result.error) {
      setErrors({ form: result.error });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <Input
        type="text"
        name="name"
        label={t('auth.name')}
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        icon={FiUser}
        placeholder="John Doe"
        required
      />

      {/* Email */}
      <Input
        type="email"
        name="email"
        label={t('auth.email')}
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        icon={FiMail}
        placeholder="you@example.com"
        required
      />

      {/* Password */}
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          name="password"
          label={t('auth.password')}
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          icon={FiLock}
          placeholder="••••••••"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <Input
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          label={t('auth.confirmPassword')}
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          icon={FiLock}
          placeholder="••••••••"
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </button>
      </div>

      {/* Terms acceptance */}
      <div>
        <label className="flex items-start">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            {t('auth.acceptTerms')}{' '}
            <Link to="/terms" className="text-primary-600 hover:text-primary-700">
              {t('auth.termsOfService')}
            </Link>{' '}
            {t('auth.and')}{' '}
            <Link to="/privacy" className="text-primary-600 hover:text-primary-700">
              {t('auth.privacyPolicy')}
            </Link>
          </span>
        </label>
        {errors.acceptTerms && (
          <p className="mt-1 text-sm text-red-600">{errors.acceptTerms}</p>
        )}
      </div>

      {/* Form error */}
      {errors.form && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
        >
          <p className="text-sm text-red-600 dark:text-red-400">{errors.form}</p>
        </motion.div>
      )}

      {/* Submit button */}
      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={loading}
      >
        {t('auth.register.button')}
      </Button>

      {/* Login link */}
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        {t('auth.hasAccount')}{' '}
        <Link
          to="/login"
          className="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
        >
          {t('auth.loginLink')}
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;