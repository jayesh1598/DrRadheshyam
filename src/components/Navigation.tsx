import { Link, useLocation } from 'react-router-dom';
import { Home, User, ImageIcon, Newspaper, Award, Menu, X } from 'lucide-react';
import { useState } from 'react';

const logoUrl =
  'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2F930bf2b97f2f4b4f8bf28cb96236cf56?format=webp&width=800';

export function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About Us', icon: User },
    { path: '/news', label: 'News', icon: Newspaper },
    { path: '/certificates', label: 'Certificates', icon: Award },
    { path: '/gallery', label: 'Gallery', icon: ImageIcon },
  ];

  const NavItem = ({
    path,
    label,
    icon: Icon,
    mobile = false,
  }: {
    path: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    mobile?: boolean;
  }) => (
    <Link
      to={path}
      onClick={() => setIsMenuOpen(false)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
        ${isActive(path) ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}
        ${mobile ? 'w-full' : ''}
      `}
    >
      <Icon className="w-4 h-4" />
      {label}
    </Link>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logoUrl} alt="Logo" className="h-10 w-10 object-contain" />
            <span className="hidden sm:block text-xl font-semibold">Dr. RSG</span>
          </Link>

          {/* Desktop Tabs */}
          <div className="hidden lg:flex gap-2">
            {navLinks.map((link) => (
              <NavItem key={link.path} {...link} />
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t pt-3 pb-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavItem key={link.path} {...link} mobile />
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
