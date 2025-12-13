import { Navigation } from '../components/Navigation';
import { Calendar } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase/client';

interface NewsArticle {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  source: string;
}

const defaultArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'Kashimira Hanuman Temple 126th Bhandara Ceremony',
    date: '2025-08-23',
    category: 'Religious Event',
    excerpt: 'The 126th Bhandara ceremony was held at Sankat Mohan Hanuman Temple in Kashimira. Dr. Radheshyam S. Gupta and community members participated in the traditional food distribution and religious rituals.',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2F5d6691c825b64befb51b7a9b019749e3?format=webp&width=800',
    source: 'Hindi Samana, Mumbai',
  },
];

export default function News() {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>(defaultArticles);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const { data, error } = await supabase
          .from('news_articles')
          .select('*')
          .order('date', { ascending: false });

        if (error) {
          console.error('Error loading news:', error);
          return;
        }

        if (data && data.length > 0) {
          setNewsArticles(data);
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

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
              <div className="h-64 overflow-hidden">
                <ImageWithFallback
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
                
                <p className="text-gray-600 mb-3 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <p className="text-sm text-gray-500 italic">
                  Source: {article.source}
                </p>
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
