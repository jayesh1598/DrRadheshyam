import { Link } from 'react-router';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-12 mb-12">
          {/* About Section */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold text-white mb-4">Dr. RSG</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Dedicated leader committed to social service, community development, and professional excellence.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-colors duration-200 hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-colors duration-200 hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-colors duration-200 hover:scale-110"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-colors duration-200 hover:scale-110"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-orange-500 transition-colors text-sm font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-orange-500 transition-colors text-sm font-medium">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-400 hover:text-orange-500 transition-colors text-sm font-medium">
                  News
                </Link>
              </li>
              <li>
                <Link to="/certificates" className="text-gray-400 hover:text-orange-500 transition-colors text-sm font-medium">
                  Certificates
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-400 hover:text-orange-500 transition-colors text-sm font-medium">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/videos" className="text-gray-400 hover:text-orange-500 transition-colors text-sm font-medium">
                  Videos
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Areas of Focus</h3>
            <ul className="space-y-3">
              <li className="text-gray-400 text-sm font-medium">Education & Development</li>
              <li className="text-gray-400 text-sm font-medium">Social Service</li>
              <li className="text-gray-400 text-sm font-medium">Community Leadership</li>
              <li className="text-gray-400 text-sm font-medium">Business Excellence</li>
              <li className="text-gray-400 text-sm font-medium">Professional Growth</li>
              <li className="text-gray-400 text-sm font-medium">Civic Engagement</li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Mail className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <a href="mailto:contact@example.com" className="text-orange-500 font-medium hover:text-orange-400 transition-colors">
                    contact@example.com
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <a href="tel:+919876543210" className="text-orange-500 font-medium hover:text-orange-400 transition-colors">
                    +91 98765 43210
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="text-orange-500 font-medium">Mumbai, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm text-center sm:text-left">
            &copy; {currentYear} Dr. Radheshyam S. Gupta. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors text-sm font-medium">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors text-sm font-medium">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors text-sm font-medium">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
