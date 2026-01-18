import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { LogOut, Menu, X, LayoutDashboard, Settings, FileText, Images, Award, Image, BookOpen, Play, ChevronRight } from 'lucide-react';
import { supabase } from '../utils/supabase/client';
import { Button } from './ui/button';

interface AdminLayoutProps {
  children: JSX.Element;
  title: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Site Settings', path: '/admin/settings', icon: Settings },
    { label: 'News Articles', path: '/admin/news', icon: FileText },
    { label: 'Gallery', path: '/admin/gallery', icon: Images },
    { label: 'Videos', path: '/admin/videos', icon: Play },
    { label: 'Certificates', path: '/admin/certificates', icon: Award },
    { label: 'Banner Slides', path: '/admin/banners', icon: Image },
    { label: 'About Content', path: '/admin/about', icon: BookOpen },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-primary text-primary-foreground p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative md:translate-x-0 h-screen bg-card border-r border-border transition-all duration-300 z-40 flex flex-col shadow-lg ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${sidebarCollapsed ? 'md:w-20' : 'md:w-64'} w-64 sm:w-72`}
      >
        {/* Sidebar Header */}
        <div className="px-4 py-6 border-b border-border flex items-center justify-between flex-shrink-0">
          {!sidebarCollapsed && (
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-foreground">Dr. Gupta</h2>
              <p className="text-muted-foreground text-xs mt-1">Admin Panel</p>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden md:flex p-1 hover:bg-accent rounded-lg transition-colors flex-shrink-0"
            aria-label="Toggle sidebar"
          >
            <ChevronRight className={`w-5 h-5 text-foreground transition-transform duration-300 ${sidebarCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setIsMobileMenuOpen(false);
                }}
                title={sidebarCollapsed ? item.label : ''}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
                  active
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-muted-foreground hover:bg-accent/50'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <span className="font-medium text-sm truncate">{item.label}</span>
                )}
                
                {/* Tooltip for collapsed state */}
                {sidebarCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-background rounded text-xs font-medium opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-2 border-t border-border flex-shrink-0 space-y-2">
          <button
            onClick={handleLogout}
            disabled={loading}
            title={sidebarCollapsed ? 'Logout' : ''}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && (
              <span className="font-medium text-sm">
                {loading ? 'Logging out...' : 'Logout'}
              </span>
            )}
            
            {/* Tooltip for collapsed state */}
            {sidebarCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-background rounded text-xs font-medium opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                Logout
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-20 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex justify-between items-center gap-3">
            <div className="flex-1 min-w-0">
              <h1 className="text-base sm:text-2xl md:text-3xl font-bold text-foreground truncate">{title}</h1>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 pt-12 md:pt-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
