import { useState } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../../utils/supabase/client';
import { LogOut, FileText, Images, Award, Newspaper, Home, Settings } from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    localStorage.removeItem('admin_user');
    navigate('/admin/login');
  };

  const menuItems = [
    {
      icon: Settings,
      label: 'Site Settings',
      path: '/admin/settings',
      color: 'indigo',
    },
    {
      icon: Newspaper,
      label: 'News Articles',
      path: '/admin/news',
      color: 'blue',
    },
    {
      icon: Images,
      label: 'Gallery',
      path: '/admin/gallery',
      color: 'purple',
    },
    {
      icon: Award,
      label: 'Certificates',
      path: '/admin/certificates',
      color: 'green',
    },
    {
      icon: FileText,
      label: 'Banner Slides',
      path: '/admin/banners',
      color: 'orange',
    },
    {
      icon: Home,
      label: 'About Content',
      path: '/admin/about',
      color: 'red',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <button
            onClick={handleLogout}
            disabled={loading}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            {loading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const colorClasses = {
              indigo: 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100',
              blue: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
              purple: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
              green: 'bg-green-50 border-green-200 hover:bg-green-100',
              orange: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
              red: 'bg-red-50 border-red-200 hover:bg-red-100',
            };
            const iconColorClasses = {
              indigo: 'text-indigo-600',
              blue: 'text-blue-600',
              purple: 'text-purple-600',
              green: 'text-green-600',
              orange: 'text-orange-600',
              red: 'text-red-600',
            };

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`border-2 rounded-lg p-8 text-center transition-all hover:shadow-lg ${colorClasses[item.color as keyof typeof colorClasses]}`}
              >
                <Icon className={`w-12 h-12 mx-auto mb-4 ${iconColorClasses[item.color as keyof typeof iconColorClasses]}`} />
                <h2 className="text-xl font-semibold text-gray-900">{item.label}</h2>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
