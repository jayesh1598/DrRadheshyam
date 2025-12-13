import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../../utils/supabase/client';
import { ArrowLeft, Check } from 'lucide-react';
import { AdminHeader } from '../../components/AdminHeader';

interface SiteSetting {
  id: string;
  setting_key: string;
  setting_value: string;
}

export default function SiteSettingsManager() {
  const navigate = useNavigate();
  const [logo, setLogo] = useState('');
  const [favicon, setFavicon] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .in('setting_key', ['logo', 'favicon']);

      if (error) {
        console.error('Error loading settings:', error);
        return;
      }

      const settings = data || [];
      const logoSetting = settings.find(s => s.setting_key === 'logo');
      const faviconSetting = settings.find(s => s.setting_key === 'favicon');

      if (logoSetting) setLogo(logoSetting.setting_value || '');
      if (faviconSetting) setFavicon(faviconSetting.setting_value || '');
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveSetting = async (key: string, value: string) => {
    setSaving(true);
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
        const { error } = await supabase
          .from('site_settings')
          .insert([{ setting_key: key, setting_value: value }]);

        if (error) throw error;
      }

      setMessage(`${key.charAt(0).toUpperCase() + key.slice(1)} updated successfully!`);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(`Error saving ${key}: ${(err as Error).message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveLogo = async () => {
    if (!logo) {
      alert('Please enter a logo URL');
      return;
    }
    await saveSetting('logo', logo);
  };

  const handleSaveFavicon = async () => {
    if (!favicon) {
      alert('Please enter a favicon URL');
      return;
    }
    await saveSetting('favicon', favicon);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader title="Site Settings" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {message && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-2">
            <Check className="w-5 h-5" />
            {message}
          </div>
        )}

        {loading ? (
          <p className="text-center py-8">Loading settings...</p>
        ) : (
          <div className="space-y-8">
            {/* Logo Section */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Logo</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo URL
                  </label>
                  <input
                    type="url"
                    value={logo}
                    onChange={(e) => setLogo(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                    placeholder="https://example.com/logo.png"
                  />
                  <p className="text-xs text-gray-500 mt-2">Recommended size: 200x60 pixels or larger. Keep aspect ratio 3:1</p>
                </div>

                {logo && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                    <img
                      src={logo}
                      alt="Logo preview"
                      className="max-h-16 object-contain bg-white p-2 rounded"
                    />
                  </div>
                )}

                <button
                  onClick={handleSaveLogo}
                  disabled={saving}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Logo'}
                </button>
              </div>
            </div>

            {/* Favicon Section */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Favicon</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Favicon URL
                  </label>
                  <input
                    type="url"
                    value={favicon}
                    onChange={(e) => setFavicon(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                    placeholder="https://example.com/favicon.ico"
                  />
                  <p className="text-xs text-gray-500 mt-2">Recommended: .ico, .png, or .svg file. Size: 32x32 pixels or 64x64 pixels</p>
                </div>

                {favicon && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                    <img
                      src={favicon}
                      alt="Favicon preview"
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                )}

                <button
                  onClick={handleSaveFavicon}
                  disabled={saving}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Favicon'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
