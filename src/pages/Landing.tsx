import { Navigation } from '../components/Navigation';
import { BannerSlider } from '../components/BannerSlider';
import { Link } from 'react-router';
import { ArrowRight, Award, Briefcase, Heart, GraduationCap } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Banner Slider */}
      <BannerSlider />

      {/* Quick Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h2 className="text-center text-gray-900 mb-12">At a Glance</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <GraduationCap className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-gray-900 mb-3">Education</h3>
            <p className="text-gray-600 mb-4">
              Honorary Doctorate & pursuing BA LLB from Dr. Babasaheb Ambedkar University
            </p>
            <Link to="/about" className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1">
              <span>Learn more</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Briefcase className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-gray-900 mb-3">Experience</h3>
            <p className="text-gray-600 mb-4">
              Extensive leadership roles in political, social, and business organizations
            </p>
            <Link to="/about" className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1">
              <span>View experience</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
              <Award className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-gray-900 mb-3">Recognition</h3>
            <p className="text-gray-600 mb-4">
              Multiple awards and honors for social service and community leadership
            </p>
            <Link to="/about" className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1">
              <span>See awards</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-gray-900 mb-3">Social Service</h3>
            <p className="text-gray-600 mb-4">
              Dedicated to helping communities including COVID-19 relief efforts
            </p>
            <Link to="/about" className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1">
              <span>Read more</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-6">Get in Touch</h2>
          <p className="text-blue-100 text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
            Connect with me to discuss collaborations, social initiatives, or business opportunities
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
          >
            <span className="text-lg">Contact Information</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 Dr. Radheshyam S. Gupta. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}