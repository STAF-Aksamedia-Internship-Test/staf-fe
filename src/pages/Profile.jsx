import { useState, useEffect } from 'react';
import api from '../api';
import { useAuth } from '../contexts/AuthContext';
import icProfile from '../images/ic_profile.png';

import Alert from '../components/Alert';
import Button from '../components/Button';
import FormField from '../components/FormField';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await api.getProfile();
      if (response.status === 'success') {
        const userData = response.data.user || response.data;
        setFormData({
          name: userData.name || '',
          phone: userData.phone || '',
          email: userData.email || '',
          image: null,
        });
        setImagePreview(userData.image || null);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  // Image editing removed for admin profile — profile photo is view-only here.

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('phone', formData.phone);
      form.append('email', formData.email);

      const response = await api.updateProfile(form);

      if (response.status === 'success') {
        setSuccess('Profil berhasil diperbarui');
        // Update auth context with new user data
        updateUser({
          ...user,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
        });
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pengaturan Profil</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Kelola informasi profil Anda</p>
      </div>

      {error && <Alert type="error" onDismiss={() => setError('')}>{error}</Alert>}
      {success && <Alert type="success" onDismiss={() => setSuccess('')}>{success}</Alert>}

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="h-32 bg-indigo-600" />
        
        <form onSubmit={handleSubmit}>
          <div className="px-8 pb-8">
            <div className="relative -mt-16 mb-6">
              <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-700 shadow-xl ring-4 ring-white dark:ring-gray-800 flex items-center justify-center">
                <img src={imagePreview || icProfile} alt="Profile" className="w-full h-full object-cover" />
              </div>
              {/* Image edit removed — view-only avatar for admin profile */}
            </div>

            <div className="space-y-5">
              <FormField label="Nama Lengkap" required>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200"
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </FormField>

              <FormField label="No Telepon" required>
                <input
                  type="text"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200"
                  placeholder="Masukkan no telepon"
                  required
                />
              </FormField>

              <FormField label="Email" required>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200"
                  placeholder="Masukkan email"
                  required
                />
              </FormField>
            </div>

            <div className="mt-8 flex justify-end">
              <Button type="submit" loading={saving}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Simpan Perubahan
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
