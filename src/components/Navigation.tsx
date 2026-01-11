import { Link, useLocation } from 'react-router';
import { Home, User, ImageIcon, Newspaper, Award, Menu, X, Play, Facebook, Instagram, Twitter, ChevronDown, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase/client';

const defaultLogoUrl = 'https://cdn.builder.io/api/v1/image/assets%2Fff7e0f6cbece4e34b27d90501cd35dc5%2F3ed9089c1fac4466a4c6f81962785f69?format=webp&width=800';

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


  return (
    <nav className="sticky top-0 z-50 shadow-lg" style={{ backgroundColor: '#e76c2c' }}>
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
                  <div className="absolute top-full left-0 mt-0 w-48 rounded-b-lg shadow-xl py-2 z-40 flex flex-col" style={{ backgroundColor: 'rgb(231, 108, 44)', borderColor: 'rgb(231, 108, 44)' }}>
                    {portfolioLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setHoveredDropdown(null)}
                        className={`block px-4 py-3 text-sm font-bold transition-colors w-full ${
                          isActive(link.path)
                            ? 'text-white'
                            : 'text-white hover:opacity-80'
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
                className="p-2 rounded-lg transition-colors" style={{ color: 'inherit' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.1)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
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
          <div className="pb-4" style={{ borderTopColor: 'rgba(255,255,255,0.2)', borderTopWidth: '1px' }}>
            <div className="flex flex-col gap-2 mt-4">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 rounded text-sm font-bold uppercase transition-colors ${
                    isActive(link.path)
                      ? 'text-white'
                      : 'text-white'
                  }`} style={isActive(link.path) ? { backgroundColor: '#d45a1f' } : { backgroundColor: 'transparent' }} onMouseEnter={(e) => !isActive(link.path) && (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.1)')} onMouseLeave={(e) => !isActive(link.path) && (e.currentTarget.style.backgroundColor = 'transparent')}
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
                  <div className="mt-2 ml-4 flex flex-col gap-1 border-l-2 pl-4" style={{ borderColor: 'rgb(231, 108, 44)' }}>
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
                            ? 'text-white'
                            : 'text-white hover:opacity-80'
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
