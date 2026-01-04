import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../../utils/supabase/client';
import {
  FileText,
  Images,
  Award,
  Image,
  Play,
  Settings,
  Zap,
  BookOpen,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';

interface StatCard {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  count: number;
  color: string;
  path: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const counts: Record<string, number> = {};

      const tables = [
        'news_articles',
        'gallery_images',
        'certificates',
        'videos',
        'banner_slides',
      ];

      for (const table of tables) {
        const { count } = await supabase
          .from(table)
          .select('id', { count: 'exact', head: true });
        counts[table] = count || 0;
      }

      setStats(counts);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards: StatCard[] = [
    {
      icon: FileText,
      label: 'News Articles',
      count: stats['news_articles'] || 0,
      color: 'blue',
      path: '/admin/news',
    },
    {
      icon: Images,
      label: 'Gallery Images',
      count: stats['gallery_images'] || 0,
      color: 'purple',
      path: '/admin/gallery',
    },
    {
      icon: Award,
      label: 'Certificates',
      count: stats['certificates'] || 0,
      color: 'green',
      path: '/admin/certificates',
    },
    {
      icon: Play,
      label: 'Videos',
      count: stats['videos'] || 0,
      color: 'red',
      path: '/admin/videos',
    },
    {
      icon: Image,
      label: 'Banner Slides',
      count: stats['banner_slides'] || 0,
      color: 'orange',
      path: '/admin/banners',
    },
  ];

  const menuItems = [
    {
      icon: Settings,
      label: 'Site Settings',
      description: 'Configure site logo, theme, and settings',
      path: '/admin/settings',
      color: 'indigo',
    },
    {
      icon: Zap,
      label: 'Services',
      description: 'Manage services and offerings',
      path: '/admin/services',
      color: 'yellow',
    },
    {
      icon: BookOpen,
      label: 'About Content',
      description: 'Edit about page content',
      path: '/admin/about',
      color: 'red',
    },
  ];

  const colorClasses = {
    indigo: 'bg-indigo-50 border-indigo-100 text-indigo-600',
    blue: 'bg-blue-50 border-blue-100 text-blue-600',
    purple: 'bg-purple-50 border-purple-100 text-purple-600',
    green: 'bg-green-50 border-green-100 text-green-600',
    orange: 'bg-orange-50 border-orange-100 text-orange-600',
    red: 'bg-red-50 border-red-100 text-red-600',
    yellow: 'bg-yellow-50 border-yellow-100 text-yellow-600',
  };

  const lightColorClasses = {
    indigo: 'bg-indigo-100',
    blue: 'bg-blue-100',
    purple: 'bg-purple-100',
    green: 'bg-green-100',
    orange: 'bg-orange-100',
    red: 'bg-red-100',
    yellow: 'bg-yellow-100',
  };

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-8">
        {/* Overview Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 sm:p-8 text-white shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Welcome Back!</h2>
              <p className="text-blue-100 max-w-2xl text-sm sm:text-base">
                Here's an overview of your site content and management options.
              </p>
            </div>
            <TrendingUp className="w-10 sm:w-12 h-10 sm:h-12 text-blue-200 opacity-50 flex-shrink-0" />
          </div>
        </div>

        {/* Statistics Cards */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Statistics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {statCards.map((card) => {
              const Icon = card.icon;
              const cardColor = colorClasses[card.color as keyof typeof colorClasses];
              const lightColor =
                lightColorClasses[card.color as keyof typeof lightColorClasses];

              return (
                <button
                  key={card.path}
                  onClick={() => navigate(card.path)}
                  className={`border-2 rounded-xl p-4 sm:p-6 transition-all hover:shadow-lg hover:scale-105 cursor-pointer ${cardColor}`}
                >
                  <div className={`w-10 sm:w-12 h-10 sm:h-12 ${lightColor} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="w-5 sm:w-6 h-5 sm:h-6" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">{card.label}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {loading ? '-' : card.count}
                  </p>
                  <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 mt-4">
                    <span>Manage</span>
                    <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const cardColor = colorClasses[item.color as keyof typeof colorClasses];
              const lightColor =
                lightColorClasses[item.color as keyof typeof lightColorClasses];

              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`border-2 rounded-xl p-4 sm:p-6 text-left transition-all hover:shadow-lg hover:scale-105 cursor-pointer ${cardColor}`}
                >
                  <div className={`w-10 sm:w-12 h-10 sm:h-12 ${lightColor} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="w-5 sm:w-6 h-5 sm:h-6" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{item.label}</h4>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4">{item.description}</p>
                  <div className="flex items-center gap-1 text-xs sm:text-sm font-medium">
                    <span>Access</span>
                    <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Getting Started</h3>
          <ul className="space-y-3">
            <li className="flex gap-3 items-start">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-600 flex-shrink-0"></div>
              <span className="text-gray-700">
                Start by adding your first news article from the{' '}
                <button
                  onClick={() => navigate('/admin/news')}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  News Articles
                </button>{' '}
                section
              </span>
            </li>
            <li className="flex gap-3 items-start">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-600 flex-shrink-0"></div>
              <span className="text-gray-700">
                Upload gallery images from the{' '}
                <button
                  onClick={() => navigate('/admin/gallery')}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Gallery
                </button>{' '}
                section
              </span>
            </li>
            <li className="flex gap-3 items-start">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-600 flex-shrink-0"></div>
              <span className="text-gray-700">
                Configure your site from{' '}
                <button
                  onClick={() => navigate('/admin/settings')}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Site Settings
                </button>
              </span>
            </li>
            <li className="flex gap-3 items-start">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-600 flex-shrink-0"></div>
              <span className="text-gray-700">
                All changes are automatically saved to your database
              </span>
            </li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
