import { Link, useLocation } from 'react-router';
import { Home, User, ImageIcon, Newspaper, Award, Menu, X, Play, Facebook, Instagram, Twitter, ChevronDown, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase/client';

const defaultLogoUrl = 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2F930bf2b97f2f4b4f8bf28cb96236cf56?format=webp&width=800';

export function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState(defaultLogoUrl);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

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

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setIsPortfolioOpen(false);
    };

    if (isPortfolioOpen) {
      window.addEventListener('click', handleClickOutside);
      return () => window.removeEventListener('click', handleClickOutside);
    }
  }, [isPortfolioOpen]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const mainNavLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About Us', icon: User },
    { path: '/news', label: 'News', icon: Newspaper },
    { path: '/certificates', label: 'Certificates', icon: Award },
  ];

  const portfolioLinks = [
    { path: '/gallery', label: 'Gallery', icon: ImageIcon },
    { path: '/videos', label: 'Videos', icon: Play },
  ];

  const NavLink = ({ path, label, icon: Icon, mobile = false }: { path: string; label: string; icon: React.ComponentType<{ className: string }>; mobile?: boolean }) => (
    <Link
      to={path}
      onClick={() => {
        setIsMenuOpen(false);
        setIsPortfolioOpen(false);
      }}
      className={`transition-all duration-200 whitespace-nowrap ${
        mobile
          ? `flex items-center gap-3 w-full px-4 py-3 rounded-lg text-base font-bold ${
              isActive(path)
                ? 'bg-orange-500 text-white'
                : 'text-gray-700 hover:bg-orange-100 hover:text-orange-600'
            }`
          : `px-3 py-2 text-gray-700 font-bold text-sm transition-all ${
              isActive(path) ? 'bg-orange-500 text-white rounded-lg' : 'hover:bg-orange-100 hover:text-orange-600'
            }`
      }`}
    >
      {mobile && <Icon className="w-4 h-4 flex-shrink-0" />}
      <span>{label}</span>
    </Link>
  );

  const PortfolioButton = () => (
    <div className="relative group">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsPortfolioOpen(!isPortfolioOpen);
        }}
        className={`flex items-center gap-1 px-3 py-2 text-gray-700 font-bold text-sm transition-all ${
          isPortfolioOpen
            ? 'bg-orange-500 text-white rounded-lg'
            : 'hover:bg-orange-100 hover:text-orange-600'
        }`}
      >
        <span>Portfolio</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isPortfolioOpen ? 'rotate-180' : ''}`} />
      </button>

      {isPortfolioOpen && (
        <div className="absolute top-full left-0 mt-0 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-40">
          {portfolioLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => {
                setIsPortfolioOpen(false);
              }}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-bold transition-colors ${
                isActive(link.path)
                  ? 'bg-orange-100 text-orange-600'
                  : 'text-gray-700 hover:bg-orange-100 hover:text-orange-600'
              }`}
            >
              <link.icon className="w-4 h-4" />
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  const SocialIcon = ({ icon: Icon, href, label }: { icon: React.ComponentType<{ className: string }>; href: string; label: string }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-gray-500 hover:text-orange-600 transition-colors duration-200 hover:scale-110"
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
    <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center h-20 gap-4">
          {/* Logo - Left */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity">
            <img
              src={logoUrl}
              alt="Dr. RSG Logo"
              className="h-12 w-12 object-contain"
            />
            <span className="text-lg font-bold text-gray-900 hidden sm:inline bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">Dr. RSG</span>
          </Link>

          {/* Desktop Navigation - Center (visible on medium screens and up) */}
          {isDesktop && (
            <div className="flex items-center justify-center gap-1 flex-1">
              {mainNavLinks.map((link) => (
                <NavLink key={link.path} {...link} />
              ))}
              <PortfolioButton />
            </div>
          )}

          {/* Desktop Social Icons - Right (visible on medium screens and up) */}
          {isDesktop && (
            <div className="flex items-center gap-6 flex-shrink-0">
              {socialLinks.map((social) => (
                <SocialIcon key={social.label} {...social} />
              ))}
            </div>
          )}

          {/* Mobile Menu Button */}
          {!isDesktop && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-blue-50 rounded-lg transition-colors ml-auto"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          )}
        </div>

        {/* Mobile & Tablet Navigation */}
        {isMenuOpen && (
          <div className="pb-4 border-t border-gray-100">
            <div className="flex flex-col gap-1 mt-4">
              {mainNavLinks.map((link) => (
                <NavLink key={link.path} {...link} mobile />
              ))}
              <div className="relative">
                <button
                  onClick={() => setIsPortfolioOpen(!isPortfolioOpen)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-base font-bold transition-colors ${
                    isPortfolioOpen
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-700 hover:bg-orange-100 hover:text-orange-600'
                  }`}
                >
                  <Newspaper className="w-4 h-4 flex-shrink-0" />
                  <span>Portfolio</span>
                  <ChevronDown className={`w-4 h-4 ml-auto transition-transform duration-200 ${isPortfolioOpen ? 'rotate-180' : ''}`} />
                </button>
                {isPortfolioOpen && (
                  <div className="mt-2 ml-4 flex flex-col gap-1 border-l-2 border-orange-600 pl-4">
                    {portfolioLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsPortfolioOpen(false);
                        }}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-bold transition-colors ${
                          isActive(link.path)
                            ? 'bg-orange-100 text-orange-600'
                            : 'text-gray-600 hover:bg-orange-100 hover:text-orange-600'
                        }`}
                      >
                        <link.icon className="w-4 h-4" />
                        <span>{link.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* Mobile Social Icons */}
            <div className="flex items-center gap-6 mt-6 pt-4 border-t border-gray-100">
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
