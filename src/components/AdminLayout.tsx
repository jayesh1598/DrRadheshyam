import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { LogOut, Menu, X, LayoutDashboard, Settings, FileText, Images, Award, Image, BookOpen, Play } from 'lucide-react';
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
    { label: 'News Articles', path: '/admin/news', icon: FileText },
    { label: 'Gallery', path: '/admin/gallery', icon: Images },
    { label: 'Videos', path: '/admin/videos', icon: Play },
    { label: 'Certificates', path: '/admin/certificates', icon: Award },
    { label: 'Banner Slides', path: '/admin/banners', icon: Image },
    { label: 'About Content', path: '/admin/about', icon: BookOpen },
    { label: 'Logout', path: '/logout', icon: LogOut, action: 'logout' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40 shadow-sm">
        {/* Top Bar */}
        <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-foreground truncate">{title}</h1>
          
          {/* Desktop Logout Button */}
          <Button
            onClick={handleLogout}
            disabled={loading}
            variant="destructive"
            size="sm"
            className="hidden sm:flex gap-2"
          >
            <LogOut className="w-4 h-4" />
            {loading ? 'Logging out...' : 'Logout'}
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sm:hidden p-2 hover:bg-accent rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Tabs Navigation */}
        <div className={`border-t border-border overflow-x-auto scrollbar-hide ${isMobileMenuOpen ? 'block' : 'hidden sm:block'}`}>
          <nav className="flex gap-1 px-4 sm:px-6 lg:px-8 py-0 min-w-max sm:min-w-0">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <div key={item.path} className="relative group">
                  <button
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                    title={item.label}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-3 border-b-2 transition-all whitespace-nowrap text-sm sm:text-base ${
                      active
                        ? 'border-primary text-primary font-semibold'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-accent'
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </button>

                  {/* Tooltip - visible on mobile only */}
                  <div className="sm:hidden absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-foreground text-background text-xs font-medium rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                    {item.label}
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Mobile Logout Button */}
          <div className="sm:hidden px-4 py-2 border-t border-border">
            <Button
              onClick={handleLogout}
              disabled={loading}
              variant="destructive"
              size="sm"
              className="w-full gap-2"
            >
              <LogOut className="w-4 h-4" />
              {loading ? 'Logging out...' : 'Logout'}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
