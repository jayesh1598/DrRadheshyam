import { Navigation } from '../components/Navigation';
import { Calendar } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const newsArticles = [
  {
    id: 1,
    title: 'Kashimira Hanuman Temple 126th Bhandara Ceremony',
    date: '2025-08-23',
    category: 'Religious Event',
    excerpt: 'The 126th Bhandara ceremony was held at Sankat Mohan Hanuman Temple in Kashimira. Dr. Radheshyam S. Gupta and community members participated in the traditional food distribution and religious rituals.',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2F5d6691c825b64befb51b7a9b019749e3?format=webp&width=800',
    source: 'Hindi Samana, Mumbai',
  },
  {
    id: 2,
    title: 'Educational Event at Girls School - विधानिधी विद्यालयात श्रावण महिन्याच्या परिपाठाचे आयोजन',
    date: '2025-08-26',
    category: 'Education',
    excerpt: 'A special educational event was organized at the girls\' school during the month of Shravan. The event featured cultural programs, competitions, and educational activities for students, promoting learning through creative expression.',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2F2baef58d167a45f6b05a2ddeb60a32e8?format=webp&width=800',
    source: 'Lokmat, Mumbai',
  },
  {
    id: 3,
    title: 'Vidyanidhi School Educational Program - विद्यानिधी विद्यालय श्रावण महिन्याच्या परिपाठ',
    date: '2025-08-26',
    category: 'Education',
    excerpt: 'Educational and cultural programs were organized at Vidyanidhi School with the participation of students, teachers, and community members. The event promoted learning and cultural awareness.',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2F0d683b93ec0f41468fb59c65fe339880?format=webp&width=800',
    source: 'Rashtramudra, Mumbai',
  },
  {
    id: 4,
    title: 'Educational Support for Tribal Children - आदिवासी विद्यार्थियों को शैक्षणिक सामग्री वितरित',
    date: '2025-08-24',
    category: 'Social Service',
    excerpt: 'Educational materials and books were distributed to tribal children in special programs organized for underprivileged students. The initiative aimed to promote education and provide learning resources.',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2F9e612863807041abbee932f70c98eec1?format=webp&width=800',
    source: 'Hindi Samana, Mumbai',
  },
  {
    id: 5,
    title: 'Tribal Students Learning Program - आदिवासी बच्चों के लिए शिक्षा कार्यक्रम',
    date: '2025-08-24',
    category: 'Social Service',
    excerpt: 'A comprehensive educational program was conducted for tribal students with distribution of books and learning materials. Community members participated in the initiative to support underprivileged education.',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2F1343235c9696402aa62eb4ffea609da1?format=webp&width=800',
    source: 'Hindi Samana, Mumbai',
  },
  {
    id: 6,
    title: 'Chhath Puja Celebration - Village Chhath Puja Ceremony',
    date: '2025-10-28',
    category: 'Religious Event',
    excerpt: 'A grand Chhath Puja celebration was organized in the village with community members gathering to observe the sacred festival. The event featured traditional rituals, fasting, and offering prayers to the Sun God.',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2F187844e8a5eb405785ef3798100bec03?format=webp&width=800',
    source: 'Lokmanya News, Mumbai',
  },
  {
    id: 7,
    title: 'Chhath Festival Grand Celebration - खोलकर छठ की पूजा का आयोजन',
    date: '2025-10-28',
    category: 'Religious Event',
    excerpt: 'The Chhath festival was celebrated with grand ceremonies and rituals. Devotees gathered at the venue to participate in the sacred celebration with traditional practices and community engagement.',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2Fb9ffa8dc1666447f8c0f558140c176d6?format=webp&width=800',
    source: 'Navbharat News, Mumbai',
  },
  {
    id: 8,
    title: 'Chhath Puja in Mirzapur - छठ पूजा का भव्य आयोजन',
    date: '2025-10-28',
    category: 'Religious Event',
    excerpt: 'Dr. Radheshyam Gupta organized a magnificent Chhath Puja celebration in Mirzapur with participation from community members. Traditional rituals were performed with devotion and cultural significance.',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2Fc0b113b4c32a4cecadac421591205c25?format=webp&width=800',
    source: 'Aaj Mirzapur, Varanasi',
  },
  {
    id: 9,
    title: 'Hanuman Temple Bhandara Event - हनुमान मंदिर भंडारा समारोह',
    date: '2025-08-23',
    category: 'Religious Event',
    excerpt: 'The sacred Bhandara ceremony at Sankat Mohan Hanuman Temple in Kashimira witnessed the participation of many devotees and community members. Traditional food distribution and religious rituals were performed.',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2Fb474ef9552af48699dcae144437656b5?format=webp&width=800',
    source: 'Hindi Samana, Mumbai',
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
