import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import {
  LayoutDashboard,
  Settings,
  Newspaper,
  Image,
  Award,
  PanelsTopLeft,
  FileText,
  LogOut,
  Menu,
} from 'lucide-react';
import { supabase } from '../utils/supabase/client';

interface AdminLayoutProps {
  children: JSX.Element;
  title: string;
}

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

  const menuItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Site Settings', path: '/admin/settings', icon: Settings },
    { label: 'News', path: '/admin/news', icon: Newspaper },
    { label: 'Gallery', path: '/admin/gallery', icon: Image },
    { label: 'Certificates', path: '/admin/certificates', icon: Award },
    { label: 'Banner Slides', path: '/admin/banners', icon: PanelsTopLeft },
    { label: 'About Content', path: '/admin/about', icon: FileText },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed md:static z-40 w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        transition-transform duration-300`}
      >
        {/* Brand */}
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <h2 className="text-lg font-semibold tracking-wide">
            Admin Panel
          </h2>
        </div>

        {/* Menu */}
        <nav className="px-4 py-6 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
                  ${
                    isActive(item.path)
                      ? 'bg-blue-600 shadow-lg'
                      : 'text-gray-300 hover:bg-white/10'
                  }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 w-full p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 rounded-xl py-2 text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay (mobile) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <h1 className="text-xl font-semibold text-gray-800">
            {title}
          </h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
