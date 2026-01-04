import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase/client';
import { AdminLayout } from '../../components/AdminLayout';
import { Save, AlertCircle, CheckCircle } from 'lucide-react';

interface SiteSetting {
  id: string;
  setting_key: string;
  setting_value: string;
}

export default function SiteSettingsManager() {
  const [logo, setLogo] = useState('');
  const [favicon, setFavicon] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .in('setting_key', ['logo', 'favicon']);

      if (error) throw error;

      const settings = data || [];
      const logoSetting = settings.find((s) => s.setting_key === 'logo');
      const faviconSetting = settings.find((s) => s.setting_key === 'favicon');

      if (logoSetting) setLogo(logoSetting.setting_value || '');
      if (faviconSetting) setFavicon(faviconSetting.setting_value || '');
    } catch (error) {
      console.error('Error loading settings:', error);
      setMessage('Error loading settings');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const saveSetting = async (key: string, value: string) => {
    try {
      const { data: existing, error: fetchError } = await supabase
        .from('site_settings')
        .select('id')
        .eq('setting_key', key)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      if (existing) {
        const { error } = await supabase
          .from('site_settings')
          .update({ setting_value: value })
          .eq('setting_key', key);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('site_settings').insert([
          {
            setting_key: key,
            setting_value: value,
          },
        ]);

        if (error) throw error;
      }
    } catch (error) {
      throw error;
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await Promise.all([saveSetting('logo', logo), saveSetting('favicon', favicon)]);

      setMessage('Settings saved successfully!');
      setMessageType('success');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage('Error saving settings');
      setMessageType('error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Site Settings">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Site Settings">
      <div className="max-w-4xl">
        {/* Message Alert */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
              messageType === 'success'
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}
          >
            {messageType === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            )}
            <span
              className={messageType === 'success' ? 'text-green-800' : 'text-red-800'}
            >
              {message}
            </span>
          </div>
        )}

        {/* Logo Setting */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Logo</h3>
          <p className="text-sm text-gray-600 mb-4">
            Upload your site logo. This will be displayed in the navigation header.
          </p>

          <div className="space-y-4">
            {logo && (
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Current Logo:</p>
                <img
                  src={logo}
                  alt="Logo"
                  className="h-20 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://via.placeholder.com/150x60?text=Logo+Error';
                  }}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo URL
              </label>
              <input
                type="url"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                placeholder="https://example.com/logo.png"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter the full URL to your logo image
              </p>
            </div>
          </div>
        </div>

        {/* Favicon Setting */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Favicon</h3>
          <p className="text-sm text-gray-600 mb-4">
            Upload your site favicon (the small icon shown in browser tabs).
          </p>

          <div className="space-y-4">
            {favicon && (
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Current Favicon:</p>
                <img
                  src={favicon}
                  alt="Favicon"
                  className="h-8 w-8 object-contain"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://via.placeholder.com/32x32?text=Favicon';
                  }}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Favicon URL
              </label>
              <input
                type="url"
                value={favicon}
                onChange={(e) => setFavicon(e.target.value)}
                placeholder="https://example.com/favicon.ico"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
              <p className="text-xs text-gray-500 mt-1">
                Use .ico, .png, or .jpg format. Recommended size: 32x32 or 64x64 pixels
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
