import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { LogOut, Menu, X } from 'lucide-react';
import { supabase } from '../utils/supabase/client';

interface AdminLayoutProps {
  children: JSX.Element;
  title: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error.message);
      setLoading(false);
      return;
    }
    navigate('/admin/login', { replace: true });
  };

  const menuItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { label: 'Site Settings', path: '/admin/settings', icon: '⚙️' },
    { label: 'News Articles', path: '/admin/news', icon: '📰' },
    { label: 'Gallery', path: '/admin/gallery', icon: '🖼️' },
    { label: 'Certificates', path: '/admin/certificates', icon: '🏆' },
    { label: 'Banner Slides', path: '/admin/banners', icon: '📸' },
    { label: 'About Content', path: '/admin/about', icon: '📝' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative md:translate-x-0 h-screen bg-gray-900 text-white transition-transform duration-300 z-40 ${
          isMobileMenuOpen ? 'translate-x-0 w-64' : '-translate-x-full md:w-64'
        }`}
      >
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <p className="text-gray-400 text-sm mt-1">Dr. Gupta's Profile</p>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span className="inline-block mr-3">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            {loading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Header */}
        <header className="bg-white shadow sticky top-0 z-20">
          <div className="px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
            <div className="md:ml-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h1>
            </div>
            {/* Mobile Logout - shown only on small screens */}
            <button
              onClick={handleLogout}
              disabled={loading}
              className="md:hidden flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-3 py-2 rounded-lg transition text-sm"
            >
              <LogOut className="w-4 h-4" />
              {loading ? '...' : 'Logout'}
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
