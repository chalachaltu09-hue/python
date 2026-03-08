import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiUser, 
  FiMail, 
  FiLock, 
  FiPhone, 
  FiMapPin,
  FiSave,
  FiTrash2,
  FiAlertCircle
} from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import Modal from '../common/Modal';
import axios from 'axios';
import toast from 'react-hot-toast';

const Settings = () => {
  const { t } = useLanguage();
  const { user, updateUser } = useAuth();

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateProfile = () => {
    const newErrors = {};
    if (!profileData.name) newErrors.name = t('validation.required');
    if (!profileData.email) newErrors.email = t('validation.required');
    else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = t('validation.invalidEmail');
    }
    return newErrors;
  };

  const validatePassword = () => {
    const newErrors = {};
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = t('validation.required');
    }
    if (!passwordData.newPassword) {
      newErrors.newPassword = t('validation.required');
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = t('validation.passwordTooShort');
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = t('validation.passwordsDontMatch');
    }
    return newErrors;
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    const newErrors = validateProfile();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put('/api/users/profile', profileData);
      updateUser(response.data.data);
      toast.success(t('profile.profileUpdated'));
    } catch (error) {
      toast.error(error.response?.data?.error || t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    const newErrors = validatePassword();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await axios.put('/api/auth/password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      toast.success(t('auth.passwordUpdated'));
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast.error(error.response?.data?.error || t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      await axios.delete('/api/users/account');
      toast.success(t('profile.accountDeleted'));
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.error || t('common.error'));
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        {t('profile.accountSettings')}
      </h2>

      {/* Profile Information */}
      <Card title={t('profile.personalInfo')}>
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <Input
            label={t('auth.name')}
            value={profileData.name}
            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
            error={errors.name}
            icon={FiUser}
          />

          <Input
            label={t('auth.email')}
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
            error={errors.email}
            icon={FiMail}
          />

          <Input
            label={t('profile.phone')}
            type="tel"
            value={profileData.phone}
            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
            icon={FiPhone}
          />

          <Input
            label={t('profile.location')}
            value={profileData.location}
            onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
            icon={FiMapPin}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('profile.bio')}
            </label>
            <textarea
              value={profileData.bio}
              onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
              placeholder={t('profile.bioPlaceholder')}
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              icon={FiSave}
            >
              {t('common.save')}
            </Button>
          </div>
        </form>
      </Card>

      {/* Change Password */}
      <Card title={t('auth.changePassword')}>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <Input
            label={t('auth.currentPassword')}
            type="password"
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
            error={errors.currentPassword}
            icon={FiLock}
          />

          <Input
            label={t('auth.newPassword')}
            type="password"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            error={errors.newPassword}
            icon={FiLock}
          />

          <Input
            label={t('auth.confirmPassword')}
            type="password"
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData({ ...profileData, confirmPassword: e.target.value })}
            error={errors.confirmPassword}
            icon={FiLock}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              icon={FiSave}
            >
              {t('auth.updatePassword')}
            </Button>
          </div>
        </form>
      </Card>

      {/* Danger Zone */}
      <Card title={t('profile.dangerZone')} className="border-red-200 dark:border-red-800">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <FiAlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {t('profile.deleteAccount')}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('profile.deleteWarning')}
                </p>
              </div>
            </div>
            <Button
              variant="danger"
              onClick={() => setShowDeleteModal(true)}
              icon={FiTrash2}
            >
              {t('profile.deleteAccount')}
            </Button>
          </div>
        </div>
      </Card>

      {/* Delete Account Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title={t('profile.confirmDelete')}
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            {t('profile.deleteConfirmation')}
          </p>
          
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
            >
              {t('common.cancel')}
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteAccount}
              loading={loading}
            >
              {t('profile.deleteAccount')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Settings;