import { Link } from 'react-router';
import { Mail, MapPin, Facebook, Instagram, Twitter, Linkedin, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Top Section - Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12">
          {/* About Section */}
          <div className="flex flex-col">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Dr. RSG</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-grow">
              Dedicated leader committed to social service, community development, and professional excellence.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-all duration-200 hover:scale-110 p-2"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-all duration-200 hover:scale-110 p-2"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-all duration-200 hover:scale-110 p-2"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-all duration-200 hover:scale-110 p-2"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-6">Quick Links</h3>
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-400 hover:text-orange-500 transition-colors text-sm font-medium">
                Home
              </Link>
              <Link to="/about" className="text-gray-400 hover:text-orange-500 transition-colors text-sm font-medium">
                About Us
              </Link>
              <Link to="/news" className="text-gray-400 hover:text-orange-500 transition-colors text-sm font-medium">
                News
              </Link>
              <Link to="/certificates" className="text-gray-400 hover:text-orange-500 transition-colors text-sm font-medium">
                Certificates
              </Link>
              <Link to="/gallery" className="text-gray-400 hover:text-orange-500 transition-colors text-sm font-medium">
                Gallery
              </Link>
              <Link to="/videos" className="text-gray-400 hover:text-orange-500 transition-colors text-sm font-medium">
                Videos
              </Link>
            </nav>
          </div>

          {/* Areas of Focus */}
          <div className="flex flex-col">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-6">Areas of Focus</h3>
            <ul className="flex flex-col space-y-3">
              <li>
                <span className="text-gray-400 text-sm font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                  Education & Development
                </span>
              </li>
              <li>
                <span className="text-gray-400 text-sm font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                  Social Service
                </span>
              </li>
              <li>
                <span className="text-gray-400 text-sm font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                  Community Leadership
                </span>
              </li>
              <li>
                <span className="text-gray-400 text-sm font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                  Business Excellence
                </span>
              </li>
              <li>
                <span className="text-gray-400 text-sm font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                  Professional Growth
                </span>
              </li>
              <li>
                <span className="text-gray-400 text-sm font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                  Civic Engagement
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-6">Get in Touch</h3>
            <div className="flex flex-col space-y-5">
              {/* Email */}
              <div className="flex gap-3 group">
                <div className="flex-shrink-0 pt-0.5">
                  <Mail className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-grow">
                  <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">Email</p>
                  <a href="mailto:info@radheshyamgupta.com" className="text-orange-500 text-sm font-bold hover:text-orange-400 transition-colors block">
                    info@radheshyamgupta.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-3 group">
                <div className="flex-shrink-0 pt-0.5">
                  <MapPin className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-grow">
                  <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">Location</p>
                  <p className="text-orange-500 text-sm font-bold">Mumbai, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8 sm:my-12"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-8">
          {/* Copyright */}
          <div className="text-center sm:text-left">
            <p className="text-gray-400 text-sm flex items-center justify-center sm:justify-start gap-2">
              &copy; {currentYear} Dr. Radheshyam S. Gupta
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">All rights reserved</span>
            </p>
            <p className="text-gray-500 text-xs mt-2 sm:mt-1">
              Made with <Heart className="w-3 h-3 inline text-orange-500" /> for community excellence
            </p>
          </div>

          {/* Footer Links */}
          <nav className="flex gap-6 sm:gap-8 flex-wrap justify-center">
            <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors text-sm font-medium">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors text-sm font-medium">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors text-sm font-medium">
              Sitemap
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
