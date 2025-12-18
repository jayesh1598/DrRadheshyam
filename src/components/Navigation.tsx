import { Link, useLocation } from 'react-router';
import { Home, User, ImageIcon, Newspaper, Award, Menu, X, Play } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase/client';

const defaultLogoUrl = 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2F930bf2b97f2f4b4f8bf28cb96236cf56?format=webp&width=800';

export function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState(defaultLogoUrl);

  useEffect(() => {
    const loadLogo = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('setting_value')
          .eq('setting_key', 'logo')
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error loading logo:', error.message || error);
          return;
        }

        if (data?.setting_value) {
          setLogoUrl(data.setting_value);
        }
      } catch (err) {
        console.error('Error:', err);
      }
    };

    loadLogo();
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About Us', icon: User },
    { path: '/news', label: 'News', icon: Newspaper },
    { path: '/certificates', label: 'Certificates', icon: Award },
    { path: '/gallery', label: 'Gallery', icon: ImageIcon },
    { path: '/videos', label: 'Videos', icon: Play },
  ];

  const NavLink = ({ path, label, icon: Icon, mobile = false, isDesktopTab = false }: { path: string; label: string; icon: React.ComponentType<{ className: string }>; mobile?: boolean; isDesktopTab?: boolean }) => (
    <Link
      to={path}
      onClick={() => setIsMenuOpen(false)}
      className={`flex items-center gap-2 transition-all duration-200 ${
        isDesktopTab
          ? `px-4 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap ${
              isActive(path)
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-700 hover:text-gray-900'
            }`
          : `px-4 py-2 rounded-lg ${
              isActive(path)
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`
      } ${mobile ? 'w-full justify-start' : ''}`}
    >
      {!isDesktopTab && <Icon className="w-4 h-4" />}
      <span>{label}</span>
    </Link>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 sm:h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <img
              src={logoUrl}
              alt="Dr. RSG Logo"
              className="h-12 sm:h-14 w-12 sm:w-14 object-contain"
            />
            <span className="text-lg sm:text-xl font-semibold text-gray-900 hidden sm:inline">Dr. RSG</span>
          </Link>

          {/* Desktop Navigation - Tab Style */}
          <div className="hidden sm:flex items-center flex-1 justify-center bg-gradient-to-r from-orange-500 to-orange-600 rounded-full p-1.5 gap-0.5 mx-4">
            {navLinks.map((link) => (
              <NavLink key={link.path} {...link} isDesktopTab />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="sm:hidden pb-4 border-t border-gray-200">
            <div className="flex flex-col gap-2 mt-2">
              {navLinks.map((link) => (
                <NavLink key={link.path} {...link} mobile />
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
