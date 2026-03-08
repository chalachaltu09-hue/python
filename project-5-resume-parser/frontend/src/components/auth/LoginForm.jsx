import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';
import Input from '../common/Input';

const LoginForm = () => {
  const { t } = useLanguage();
  const { login, loading } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = t('validation.required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('validation.invalidEmail');
    }

    if (!formData.password) {
      newErrors.password = t('validation.required');
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field
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

    const result = await login(formData.email, formData.password);
    if (!result.success && result.error) {
      setErrors({ form: result.error });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      {/* Remember me & Forgot password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            {t('auth.rememberMe')}
          </span>
        </label>

        <Link
          to="/forgot-password"
          className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
        >
          {t('auth.forgotPassword')}
        </Link>
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
        {t('auth.login.button')}
      </Button>

      {/* Register link */}
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        {t('auth.noAccount')}{' '}
        <Link
          to="/register"
          className="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
        >
          {t('auth.registerLink')}
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;