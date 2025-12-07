import { Navigation } from '../components/Navigation';
import { Calendar, ExternalLink } from 'lucide-react';

const newsArticles = [
  {
    id: 1,
    title: 'Dr. Radheshyam Gupta Leads Major Social Welfare Initiative in Mumbai',
    date: '2024-11-15',
    category: 'Social Service',
    excerpt: 'Dr. Radheshyam S. Gupta spearheaded a comprehensive social welfare program reaching over 5,000 families in Mumbai, providing essential supplies and medical assistance to underprivileged communities.',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80',
  },
  {
    id: 2,
    title: 'BJP Leader Participates in State-Level Policy Discussion',
    date: '2024-10-28',
    category: 'Politics',
    excerpt: 'As a prominent BJP leader, Dr. Gupta contributed to important policy discussions focusing on economic development and social welfare initiatives for Maharashtra.',
    image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&q=80',
  },
  {
    id: 3,
    title: 'Community Food Distribution Program Reaches New Milestone',
    date: '2024-10-10',
    category: 'Social Service',
    excerpt: 'The ongoing food distribution initiative led by Dr. Gupta has successfully served over 50,000 meals to those in need, continuing the legacy of service started during the COVID-19 pandemic.',
    image: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=800&q=80',
  },
  {
    id: 4,
    title: 'International Yoga Day Celebration Organized at Juhu Beach',
    date: '2024-06-21',
    category: 'Events',
    excerpt: 'Dr. Radheshyam Gupta organized a massive International Yoga Day celebration at Juhu Beach, bringing together thousands of participants to promote health and wellness.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
  },
  {
    id: 5,
    title: 'Educational Scholarship Program Launched for Underprivileged Students',
    date: '2024-05-15',
    category: 'Education',
    excerpt: 'A new scholarship program was announced to support deserving students from economically disadvantaged backgrounds, covering tuition and educational materials.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
  },
  {
    id: 6,
    title: 'Lions Club Recognizes Outstanding Community Service',
    date: '2024-04-22',
    category: 'Awards',
    excerpt: 'Dr. Gupta received special recognition from the Lions Club for exemplary service and dedication to community development initiatives.',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80',
  },
];

export default function News() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-center mb-4">Latest News & Updates</h1>
          <p className="text-center text-blue-100 text-lg max-w-2xl mx-auto">
            Stay informed about recent activities, initiatives, and achievements
          </p>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.map((article) => (
            <div 
              key={article.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
                
                <h3 className="text-gray-900 mb-3 line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <button className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1">
                  <span>Read More</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 Dr. Radheshyam S. Gupta. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
