import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import {
  LayoutDashboard,
  Settings,
  Newspaper,
  Image,
  Award,
  Layers,
  FileText,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { supabase } from '../utils/supabase/client';

export function AdminLayout({ children, title }: any) {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Site Settings', path: '/admin/settings', icon: Settings },
    { label: 'News', path: '/admin/news', icon: Newspaper },
    { label: 'Gallery', path: '/admin/gallery', icon: Image },
    { label: 'Certificates', path: '/admin/certificates', icon: Award },
    { label: 'Banners', path: '/admin/banners', icon: Layers },
    { label: 'About', path: '/admin/about', icon: FileText },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* SIDEBAR */}
      <aside
        className={`${
          collapsed ? 'w-20' : 'w-64'
        } transition-all duration-300 bg-gradient-to-b from-indigo-700 to-purple-700 text-white flex flex-col`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4">
          {!collapsed && <span className="font-bold text-lg">Admin</span>}
          <button onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 mt-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-4 px-4 py-3 w-full transition
                ${active ? 'bg-white/20' : 'hover:bg-white/10'}`}
              >
                <Icon className="w-5 h-5" />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
