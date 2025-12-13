import { Link, useLocation } from 'react-router';
import { Home, User, ImageIcon, Newspaper, Award, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase/client';

const defaultLogoUrl = 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2F930bf2b97f2f4b4f8bf28cb96236cf56?format=webp&width=800';

export function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState(defaultLogoUrl);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About Us', icon: User },
    { path: '/news', label: 'News', icon: Newspaper },
    { path: '/certificates', label: 'Certificates', icon: Award },
    { path: '/gallery', label: 'Gallery', icon: ImageIcon },
  ];

  const NavLink = ({ path, label, icon: Icon, mobile = false }: { path: string; label: string; icon: React.ComponentType<{ className: string }>; mobile?: boolean }) => (
    <Link
      to={path}
      onClick={() => setIsMenuOpen(false)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        isActive(path)
          ? 'bg-blue-600 text-white'
          : 'text-gray-700 hover:bg-gray-100'
      } ${mobile ? 'w-full justify-start' : ''}`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </Link>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 sm:gap-3">
              <img
                src={logoUrl}
                alt="Dr. RSG Logo"
                className="h-10 sm:h-12 w-10 sm:w-12 object-contain"
              />
              <span className="text-lg sm:text-xl text-gray-900 hidden sm:inline">Dr. RSG</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-2">
            {navLinks.map((link) => (
              <NavLink key={link.path} {...link} />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
          <div className="lg:hidden pb-4 border-t border-gray-200">
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
