import { Link, useLocation } from 'react-router';
import { Home, User, ImageIcon, Newspaper, Award } from 'lucide-react';
import logo from 'figma:asset/00eb846c080a6aa0484c904a5f5228a8105e5f0a.png';

export function Navigation() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src={logo} 
                alt="Dr. RSG Logo" 
                className="h-12 w-12 object-contain"
                style={{ mixBlendMode: 'multiply' }}
              />
              <span className="text-xl text-gray-900">Dr. RSG</span>
            </Link>
          </div>
          
          <div className="flex gap-2">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/') 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            
            <Link
              to="/about"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/about') 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <User className="w-4 h-4" />
              <span>About Us</span>
            </Link>
            
            <Link
              to="/news"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/news') 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>News</span>
            </Link>
            
            <Link
              to="/certificates"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/certificates') 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Certificates</span>
            </Link>
            
            <Link
              to="/gallery"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/gallery') 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Gallery</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}