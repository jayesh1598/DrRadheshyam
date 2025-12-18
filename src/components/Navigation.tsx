import { Link, useLocation } from 'react-router';
import { Home, User, ImageIcon, Newspaper, Award, Menu, X, Play, Facebook, Instagram, Twitter } from 'lucide-react';
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

  const NavLink = ({ path, label, icon: Icon, mobile = false }: { path: string; label: string; icon: React.ComponentType<{ className: string }>; mobile?: boolean }) => (
    <Link
      to={path}
      onClick={() => setIsMenuOpen(false)}
      className={`transition-all duration-200 whitespace-nowrap ${
        mobile
          ? `flex items-center gap-2 w-full px-4 py-3 rounded-lg text-base ${
              isActive(path)
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`
          : `px-4 py-2 text-gray-700 hover:text-blue-600 font-semibold text-sm ${
              isActive(path) ? 'text-blue-600 border-b-3 border-blue-600' : ''
            }`
      }`}
    >
      {mobile && <Icon className="w-4 h-4 flex-shrink-0" />}
      <span>{label}</span>
    </Link>
  );

  const SocialIcon = ({ icon: Icon, href, label }: { icon: React.ComponentType<{ className: string }>; href: string; label: string }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-gray-600 hover:text-blue-600 transition-colors"
    >
      <Icon className="w-5 h-5" />
    </a>
  );

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        {/* Desktop Header */}
        <div className="flex justify-between items-center h-20">
          {/* Logo - Left */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img
              src={logoUrl}
              alt="Dr. RSG Logo"
              className="h-12 w-12 object-contain"
            />
            <span className="text-lg font-semibold text-gray-900 hidden sm:inline">Dr. RSG</span>
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
            {navLinks.map((link) => (
              <NavLink key={link.path} {...link} />
            ))}
          </div>

          {/* Desktop Social Icons - Right */}
          <div className="hidden md:flex items-center gap-4">
            {socialLinks.map((social) => (
              <SocialIcon key={social.label} {...social} />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile & Tablet Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <div className="flex flex-col gap-2 mt-4">
              {navLinks.map((link) => (
                <NavLink key={link.path} {...link} mobile />
              ))}
            </div>
            {/* Mobile Social Icons */}
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200">
              {socialLinks.map((social) => (
                <SocialIcon key={social.label} {...social} />
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
