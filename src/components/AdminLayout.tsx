import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { LogOut, Menu, X, LayoutDashboard, Settings, FileText, Images, Award, Image, BookOpen, Sparkles, Play, Zap } from 'lucide-react';
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
    { label: 'Overview', path: '/admin/overview', icon: Sparkles },
    { label: 'Services', path: '/admin/services', icon: Zap },
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
        className="md:hidden fixed top-3 sm:top-4 left-3 sm:left-4 z-50 bg-card p-2 rounded-lg shadow hover:shadow-md transition-shadow"
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
        className={`fixed md:relative md:translate-x-0 h-screen bg-card border-r transition-transform duration-300 z-40 w-72 flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="px-6 py-6 border-b">
          <h2 className="text-xl font-bold text-foreground">Admin Panel</h2>
          <p className="text-muted-foreground text-sm mt-1">Dr. Gupta's Profile</p>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
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
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-3 ${
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <Button
            onClick={handleLogout}
            disabled={loading}
            variant="destructive"
            className="w-full"
            size="sm"
          >
            <LogOut className="w-4 h-4" />
            {loading ? 'Logging out...' : 'Logout'}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-card border-b sticky top-0 z-20">
          <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-6 flex justify-between items-center min-h-fit gap-3">
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-foreground truncate">{title}</h1>
            </div>
            {/* Mobile Logout - shown only on small screens */}
            <Button
              onClick={handleLogout}
              disabled={loading}
              variant="destructive"
              size="sm"
              className="md:hidden whitespace-nowrap flex-shrink-0"
            >
              <LogOut className="w-3 sm:w-4 h-3 sm:h-4" />
              <span className="hidden xs:inline ml-1">{loading ? '...' : 'Logout'}</span>
            </Button>
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
