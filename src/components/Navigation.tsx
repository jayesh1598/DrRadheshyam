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
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);

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
    // Close dropdown when not on desktop (mobile/tablet)
    if (!isDesktop && isPortfolioOpen) {
      const handleClickOutside = () => {
        setIsPortfolioOpen(false);
      };

      window.addEventListener('click', handleClickOutside);
      return () => window.removeEventListener('click', handleClickOutside);
    }
  }, [isPortfolioOpen, isDesktop]);

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
              isActive(path) ? 'text-orange-600 bg-orange-50 rounded-lg border-b-3 border-orange-600' : 'hover:bg-orange-100 hover:text-orange-600'
            }`
      }`}
    >
      {mobile && <Icon className="w-4 h-4 flex-shrink-0" />}
      <span>{label}</span>
    </Link>
  );

  const PortfolioButton = () => (
    <div
      className="relative group"
      onMouseEnter={() => isDesktop && setIsPortfolioOpen(true)}
      onMouseLeave={() => isDesktop && setIsPortfolioOpen(false)}
    >
      <button
        onClick={(e) => {
          if (!isDesktop) {
            e.stopPropagation();
            setIsPortfolioOpen(!isPortfolioOpen);
          }
        }}
        className={`flex items-center gap-1 px-3 py-2 text-gray-700 font-bold text-sm transition-all ${
          isPortfolioOpen
            ? 'text-orange-600 bg-orange-50 rounded-lg border-b-3 border-orange-600'
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
    <nav className="bg-blue-600 sticky top-0 z-50 shadow-lg">
      <div className="max-w-full px-6 lg:px-12">
        <div className="flex justify-between items-center h-24">
          {/* Logo - Left */}
          <Link to="/" className="flex items-center flex-shrink-0 hover:opacity-90 transition-opacity">
            <img
              src={logoUrl}
              alt="Dr. RSG Logo"
              className="h-20 w-20 object-contain"
              style={{ maxWidth: '150px', maxHeight: '150px' }}
            />
          </Link>

          {/* Desktop Navigation - Center */}
          {isDesktop && (
            <div className="flex items-center justify-center gap-8 flex-1 ml-8">
              {mainNavLinks.map((link) => (
                <div key={link.path} className="relative group">
                  <Link
                    to={link.path}
                    className={`text-sm font-bold uppercase tracking-wide transition-colors duration-200 ${
                      isActive(link.path)
                        ? 'text-white bg-orange-500 px-4 py-2 rounded'
                        : 'text-white hover:text-orange-300'
                    }`}
                  >
                    {link.label}
                  </Link>
                </div>
              ))}

              {/* Portfolio Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setHoveredDropdown('portfolio')}
                onMouseLeave={() => setHoveredDropdown(null)}
              >
                <button
                  className={`flex items-center gap-1 text-sm font-bold uppercase tracking-wide transition-colors duration-200 ${
                    hoveredDropdown === 'portfolio'
                      ? 'text-white bg-orange-500 px-4 py-2 rounded'
                      : 'text-white hover:text-orange-300'
                  }`}
                >
                  <span>Portfolio</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      hoveredDropdown === 'portfolio' ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {hoveredDropdown === 'portfolio' && (
                  <div className="absolute top-full left-0 mt-0 w-48 bg-white rounded-b-lg shadow-xl border border-gray-200 py-2 z-40">
                    {portfolioLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setHoveredDropdown(null)}
                        className={`block px-4 py-3 text-sm font-bold transition-colors ${
                          isActive(link.path)
                            ? 'bg-orange-100 text-orange-600'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Button - Right */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <button className="hidden sm:block px-6 py-2 bg-orange-500 text-white text-sm font-bold uppercase rounded hover:bg-orange-600 transition-colors">
              Book a Table
            </button>

            {/* Mobile Menu Button */}
            {!isDesktop && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Mobile & Tablet Navigation */}
        {isMenuOpen && !isDesktop && (
          <div className="pb-4 border-t border-blue-500">
            <div className="flex flex-col gap-2 mt-4">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 rounded text-sm font-bold uppercase transition-colors ${
                    isActive(link.path)
                      ? 'bg-orange-500 text-white'
                      : 'text-white hover:bg-blue-700'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Portfolio */}
              <div className="relative">
                <button
                  onClick={() => setIsPortfolioOpen(!isPortfolioOpen)}
                  className="w-full flex items-center gap-2 px-4 py-2 rounded text-sm font-bold uppercase text-white hover:bg-blue-700 transition-colors"
                >
                  <span>Portfolio</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isPortfolioOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isPortfolioOpen && (
                  <div className="mt-2 ml-4 flex flex-col gap-1 border-l-2 border-orange-500 pl-4">
                    {portfolioLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsPortfolioOpen(false);
                        }}
                        className={`block px-3 py-2 text-sm font-bold transition-colors ${
                          isActive(link.path)
                            ? 'text-orange-300'
                            : 'text-white hover:text-orange-300'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
