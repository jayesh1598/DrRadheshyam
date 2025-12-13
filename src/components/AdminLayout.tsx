import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import {
  LayoutDashboard,
  Settings,
  Newspaper,
  Image,
  Award,
  FileText,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { supabase } from '../utils/supabase/client';

interface AdminLayoutProps {
  children: JSX.Element;
  title: string;
}

const menuItems = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Site Settings', path: '/admin/settings', icon: Settings },
  { label: 'News Articles', path: '/admin/news', icon: Newspaper },
  { label: 'Gallery', path: '/admin/gallery', icon: Image },
  { label: 'Certificates', path: '/admin/certificates', icon: Award },
  { label: 'Banner Slides', path: '/admin/banners', icon: FileText },
  { label: 'About Content', path: '/admin/about', icon: FileText },
];

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-40 h-full w-64 bg-gray-900 text-white transform transition-transform
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Brand */}
        <div className="px-6 py-5 border-b border-gray-800">
          <h2 className="text-lg font-semibold">Admin Panel</h2>
          <p className="text-xs text-gray-400 mt-1">Dr. Gupta</p>
        </div>

        {/* Menu */}
        <nav className="px-3 py-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm transition
                  ${
                    active
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 text-sm bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-white border-b">
          <div className="h-16 px-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden p-2 rounded-md hover:bg-gray-100"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
