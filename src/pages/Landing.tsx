import { Navigation } from '../components/Navigation';
import { BannerSlider } from '../components/BannerSlider';
import { Footer } from '../components/Footer';
import { EnquiryModal } from '../components/Contact';
import { Link } from 'react-router';
import { ArrowRight, Award, Briefcase, Heart, GraduationCap, Newspaper, ImageIcon, Calendar } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase/client';

interface OverviewItem {
  id: string;
  title: string;
  description: string;
  display_order: number;
}

interface NewsArticle {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
}

interface Certificate {
  id: string;
  title: string;
  date: string;
  institution: string;
  image_url: string;
}

interface GalleryImage {
  id: string;
  image_url: string;
  alt_text: string;
}

const defaultOverviewItems: OverviewItem[] = [
  {
    id: '1',
    title: 'Education',
    description: 'Honorary Doctorate & pursuing BA LLB from Dr. Babasaheb Ambedkar University',
    display_order: 1,
  },
  {
    id: '2',
    title: 'Experience',
    description: 'Extensive leadership roles in political, social, and business organizations',
    display_order: 2,
  },
  {
    id: '3',
    title: 'Recognition',
    description: 'Multiple awards and honors for social service and community leadership',
    display_order: 3,
  },
  {
    id: '4',
    title: 'Social Service',
    description: 'Dedicated to helping communities including COVID-19 relief efforts',
    display_order: 4,
  },
];

const defaultNewsPreview: NewsArticle[] = [
  {
    id: '1',
    title: 'Kashimira Hanuman Temple 126th Bhandara Ceremony',
    date: '2025-08-23',
    category: 'Religious Event',
    excerpt: 'The 126th Bhandara ceremony was held at Sankat Mohan Hanuman Temple in Kashimira.',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2F5d6691c825b64befb51b7a9b019749e3?format=webp&width=800',
  },
  {
    id: '2',
    title: 'Educational Event at Girls School',
    date: '2025-08-26',
    category: 'Education',
    excerpt: 'A special educational event was organized at the girls\' school during the month of Shravan.',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2F2baef58d167a45f6b05a2ddeb60a32e8?format=webp&width=800',
  },
  {
    id: '3',
    title: 'Vidyanidhi School Educational Program',
    date: '2025-08-26',
    category: 'Education',
    excerpt: 'Educational and cultural programs were organized at Vidyanidhi School with community participation.',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2F0d683b93ec0f41468fb59c65fe339880?format=webp&width=800',
  },
];

const defaultCertificatesPreview: Certificate[] = [
  {
    id: '1',
    title: 'Honorary Doctorate Degree',
    institution: 'Dr. Babasaheb Ambedkar University, Agra',
    date: '2023',
    image_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
  },
  {
    id: '2',
    title: 'Social Service Excellence Award',
    institution: 'Maharashtra State Government',
    date: '2022',
    image_url: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=80',
  },
  {
    id: '3',
    title: 'Community Leadership Certificate',
    institution: 'Lions Club International',
    date: '2022',
    image_url: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&q=80',
  },
];

const defaultGalleryPreview: GalleryImage[] = [
  {
    id: '1',
    image_url: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2Fe2fe855ce4ea43f9a58f778ca9ea3f20?format=webp&width=800',
    alt_text: 'Office meeting - Professional meeting with team members',
  },
  {
    id: '2',
    image_url: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2F93a4084af2a54c91aeb8a259a8321039?format=webp&width=800',
    alt_text: 'Meal time event - Community gathering and food service',
  },
  {
    id: '3',
    image_url: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2Fa2828de2c8dc46f8b3d9c63f610d9aee?format=webp&width=800',
    alt_text: 'Temple entrance - Exterior view of the sacred temple complex',
  },
  {
    id: '4',
    image_url: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2F1c0efacc7a614653986963e3cd6eafc2?format=webp&width=800',
    alt_text: 'Leadership presentation - Award ceremony and recognition',
  },
  {
    id: '5',
    image_url: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2Fbc595b4994304122a2aabb77b33e636f?format=webp&width=800',
    alt_text: 'Group event - Team members gathered for official photo',
  },
  {
    id: '6',
    image_url: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2Fe622aba7e64d4b82b06c905c16100422?format=webp&width=800',
    alt_text: 'Yoga session - Beach community yoga and wellness event',
  },
];

export default function Landing() {
  const [overviewItems, setOverviewItems] = useState<OverviewItem[]>(defaultOverviewItems);
  const [newsPreview, setNewsPreview] = useState<NewsArticle[]>(defaultNewsPreview);
  const [certificatesPreview, setCertificatesPreview] = useState<Certificate[]>(defaultCertificatesPreview);
  const [galleryPreview, setGalleryPreview] = useState<GalleryImage[]>(defaultGalleryPreview);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [overviewRes, newsRes, certsRes, galleryRes] = await Promise.all([
          supabase
            .from('overview_items')
            .select('id, title, description, display_order')
            .order('display_order', { ascending: true }),
          supabase
            .from('news_articles')
            .select('id, title, date, category, excerpt, image')
            .order('date', { ascending: false })
            .limit(3),
          supabase
            .from('certificates')
            .select('id, title, date, institution, image_url')
            .order('date', { ascending: false })
            .limit(3),
          supabase
            .from('gallery_images')
            .select('id, image_url, alt_text')
            .limit(6),
        ]);

        if (overviewRes.data && overviewRes.data.length > 0) {
          setOverviewItems(overviewRes.data);
        }
        if (newsRes.data && newsRes.data.length > 0) {
          setNewsPreview(newsRes.data);
        }
        if (certsRes.data && certsRes.data.length > 0) {
          setCertificatesPreview(certsRes.data);
        }
        if (galleryRes.data && galleryRes.data.length > 0) {
          setGalleryPreview(galleryRes.data);
        }
      } catch (err) {
        console.error('Error loading landing page data:', err);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Banner Slider */}
      <BannerSlider />

      {/* Quick Highlights Section */}
      <section className="py-16 sm:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4">
              At a Glance
            </h2>
            <p className="text-center text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Explore key areas of expertise and achievements in leadership, education, and community service
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {overviewItems.map((item, index) => {
              const iconColors = ['blue', 'green', 'teal', 'emerald'];
              const colorClass = iconColors[index % iconColors.length];
              const bgColorMap: Record<string, string> = {
                blue: 'bg-blue-100',
                green: 'bg-green-100',
                teal: 'bg-teal-100',
                emerald: 'bg-emerald-100',
              };
              const textColorMap: Record<string, string> = {
                blue: 'text-blue-600',
                green: 'text-green-600',
                teal: 'text-teal-600',
                emerald: 'text-emerald-600',
              };
              const linkColorMap: Record<string, string> = {
                blue: 'text-blue-600 hover:text-blue-700',
                green: 'text-green-600 hover:text-green-700',
                teal: 'text-teal-600 hover:text-teal-700',
                emerald: 'text-emerald-600 hover:text-emerald-700',
              };

              const IconMap: Record<number, React.ComponentType<{ className?: string }>> = {
                0: GraduationCap,
                1: Briefcase,
                2: Award,
                3: Heart,
              };

              const Icon = IconMap[index % 4];

              return (
                <div
                  key={item.id}
                  className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className={`w-16 h-16 ${bgColorMap[colorClass]} rounded-full flex items-center justify-center mb-6`}>
                    <Icon className={`w-8 h-8 ${textColorMap[colorClass]}`} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                    {item.description}
                  </p>
                  <Link to="/about" className={`inline-flex items-center gap-2 font-semibold transition-colors ${linkColorMap[colorClass]}`}>
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 sm:mb-16 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Newspaper className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  Latest News & Updates
                </h2>
              </div>
              <p className="text-gray-600 text-sm sm:text-base ml-11">
                Stay informed about recent events and developments
              </p>
            </div>
            <Link
              to="/news"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg whitespace-nowrap"
            >
              <span>View all News</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {newsPreview.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="h-48 sm:h-56 overflow-hidden bg-gray-200">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-1 text-gray-500 text-xs font-medium">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>

                  <h3 className="text-gray-900 mb-3 line-clamp-2 text-base sm:text-lg font-semibold">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
                    {article.excerpt}
                  </p>

                  <Link
                    to="/news"
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors"
                  >
                    <span>Read more</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates & Recognition Section */}
      <section className="py-16 sm:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 sm:mb-16 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-8 h-8 text-amber-600" />
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  Certificates & Recognition
                </h2>
              </div>
              <p className="text-gray-600 text-sm sm:text-base ml-11">
                Awards and accolades from prestigious institutions
              </p>
            </div>
            <Link
              to="/certificates"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg whitespace-nowrap"
            >
              <span>View all Certificates</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {certificatesPreview.map((cert) => (
              <div
                key={cert.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="h-40 sm:h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
                  <img
                    src={cert.image_url}
                    alt={cert.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-5 sm:p-6">
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{cert.date}</span>

                  <h3 className="text-gray-900 mb-3 line-clamp-2 text-base sm:text-lg font-semibold mt-2">
                    {cert.title}
                  </h3>

                  <p className="text-sm text-gray-600 font-medium">
                    {cert.institution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="py-16 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 sm:mb-16 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <ImageIcon className="w-8 h-8 text-teal-600" />
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  Gallery
                </h2>
              </div>
              <p className="text-gray-600 text-sm sm:text-base ml-11">
                Moments from events, gatherings, and community initiatives
              </p>
            </div>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg whitespace-nowrap"
            >
              <span>View all Images</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {galleryPreview.map((item) => (
              <div
                key={item.id}
                className="bg-gray-100 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={item.image_url}
                    alt={item.alt_text}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Ready to Connect?
          </h2>
          <p className="text-blue-100 text-base sm:text-lg mb-8 sm:mb-12 leading-relaxed max-w-2xl mx-auto">
            Have questions or want to discuss collaborations, social initiatives, or business opportunities? Get in touch today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold text-base sm:text-lg transform hover:scale-105"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-white/10 transition-colors font-semibold text-base sm:text-lg"
            >
              <span>Learn More</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm sm:text-base">&copy; 2025 Dr. Radheshyam S. Gupta. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
