import { Navigation } from '../components/Navigation';
import { BannerSlider } from '../components/BannerSlider';
import { Link } from 'react-router';
import { ArrowRight, Award, Briefcase, Heart, GraduationCap, Newspaper, ImageIcon, Calendar } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

// Sample data for previews
const newsPreview = [
  {
    id: 1,
    title: 'Kashimira Hanuman Temple 126th Bhandara Ceremony',
    date: '2025-08-23',
    category: 'Religious Event',
    excerpt: 'The 126th Bhandara ceremony was held at Sankat Mohan Hanuman Temple in Kashimira.',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2F5d6691c825b64befb51b7a9b019749e3?format=webp&width=800',
  },
  {
    id: 2,
    title: 'Educational Event at Girls School',
    date: '2025-08-26',
    category: 'Education',
    excerpt: 'A special educational event was organized at the girls\' school during the month of Shravan.',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2F2baef58d167a45f6b05a2ddeb60a32e8?format=webp&width=800',
  },
  {
    id: 3,
    title: 'Vidyanidhi School Educational Program',
    date: '2025-08-26',
    category: 'Education',
    excerpt: 'Educational and cultural programs were organized at Vidyanidhi School with community participation.',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2F0d683b93ec0f41468fb59c65fe339880?format=webp&width=800',
  },
];

const certificatesPreview = [
  {
    id: 1,
    title: 'Honorary Doctorate Degree',
    issuer: 'Dr. Babasaheb Ambedkar University, Agra',
    date: '2023',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
  },
  {
    id: 2,
    title: 'Social Service Excellence Award',
    issuer: 'Maharashtra State Government',
    date: '2022',
    category: 'Award',
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=80',
  },
  {
    id: 3,
    title: 'Community Leadership Certificate',
    issuer: 'Lions Club International',
    date: '2022',
    category: 'Leadership',
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&q=80',
  },
];

const galleryPreview = [
  {
    id: 1,
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2Fe2fe855ce4ea43f9a58f778ca9ea3f20?format=webp&width=800',
    alt: 'Office meeting - Professional meeting with team members',
  },
  {
    id: 2,
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2F93a4084af2a54c91aeb8a259a8321039?format=webp&width=800',
    alt: 'Meal time event - Community gathering and food service',
  },
  {
    id: 3,
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2Fa2828de2c8dc46f8b3d9c63f610d9aee?format=webp&width=800',
    alt: 'Temple entrance - Exterior view of the sacred temple complex',
  },
  {
    id: 4,
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2F1c0efacc7a614653986963e3cd6eafc2?format=webp&width=800',
    alt: 'Leadership presentation - Award ceremony and recognition',
  },
  {
    id: 5,
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2Fbc595b4994304122a2aabb77b33e636f?format=webp&width=800',
    alt: 'Group event - Team members gathered for official photo',
  },
  {
    id: 6,
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2Fe622aba7e64d4b82b06c905c16100422?format=webp&width=800',
    alt: 'Yoga session - Beach community yoga and wellness event',
  },
];

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
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
              <GraduationCap className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-gray-900 mb-3">Education</h3>
            <p className="text-gray-600 mb-4">
              Honorary Doctorate & pursuing BA LLB from Dr. Babasaheb Ambedkar University
            </p>
            <Link to="/about" className="text-orange-600 hover:text-orange-700 inline-flex items-center gap-1">
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
            <Link to="/about" className="text-orange-600 hover:text-orange-700 inline-flex items-center gap-1">
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
            <Link to="/about" className="text-orange-600 hover:text-orange-700 inline-flex items-center gap-1">
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
            <Link to="/about" className="text-orange-600 hover:text-orange-700 inline-flex items-center gap-1">
              <span>Read more</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Latest News Section */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <Newspaper className="w-8 h-8 text-orange-600" />
              <h2 className="text-gray-900">Latest News & Updates</h2>
            </div>
            <Link
              to="/news"
              className="text-orange-600 hover:text-orange-700 inline-flex items-center gap-1 text-sm sm:text-base"
            >
              <span>View more</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsPreview.map((article) => (
              <div
                key={article.id}
                className="bg-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 sm:h-56 overflow-hidden">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-1 text-gray-500 text-xs sm:text-sm">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>

                  <h3 className="text-gray-900 mb-2 line-clamp-2 text-sm sm:text-base">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-2 text-xs sm:text-sm">
                    {article.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificates & Recognition Section */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-orange-600" />
              <h2 className="text-gray-900">Certificates & Recognition</h2>
            </div>
            <Link
              to="/certificates"
              className="text-orange-600 hover:text-orange-700 inline-flex items-center gap-1 text-sm sm:text-base"
            >
              <span>View more</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificatesPreview.map((cert) => (
              <div
                key={cert.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-40 sm:h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5 sm:p-6">
                  <span className="text-xs sm:text-sm text-orange-600">{cert.date}</span>

                  <h3 className="text-gray-900 mb-2 line-clamp-2 text-sm sm:text-base">
                    {cert.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600">
                    {cert.issuer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Preview Section */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <ImageIcon className="w-8 h-8 text-orange-600" />
              <h2 className="text-gray-900">Social Media Gallery</h2>
            </div>
            <Link
              to="/gallery"
              className="text-orange-600 hover:text-orange-700 inline-flex items-center gap-1 text-sm sm:text-base"
            >
              <span>View more</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {galleryPreview.map((item) => (
              <div
                key={item.id}
                className="bg-gray-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-6">Get in Touch</h2>
          <p className="text-orange-100 text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Connect with me to discuss collaborations, social initiatives, or business opportunities
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 bg-white text-orange-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-orange-50 transition-colors shadow-lg text-sm sm:text-base"
          >
            <span>Contact Information</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
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
