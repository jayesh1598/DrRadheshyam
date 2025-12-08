import { Navigation } from '../components/Navigation';
import { Calendar } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const newsArticles = [
  {
    id: 1,
    title: 'North Indian Conference Organized in Vidhan Sabha - उत्तर भारतीय सम्मेलन',
    date: '2025-11-18',
    category: 'Political Event',
    excerpt: 'North Indian Conference organized successfully in Vidhan Sabha with the support of North Indian Forum. Mumbai BJP President and MLA Amit Satam along with North-West District President Gyan Moti Sharma were the chief guests.',
    image: 'figma:asset/f46cf8132aa06ba90a78f10bf40f233920a66b60.png',
    source: 'Navbharat ePaper, Mumbai',
  },
  {
    id: 2,
    title: 'Chhath Puja Concludes with Arghya to Rising Sun - Dr. Radheshyam Gupta Organizes Grand Event',
    date: '2025-10-22',
    category: 'Social Service',
    excerpt: 'Dr. Radheshyam Gupta organized a grand Chhath Puja celebration at the village ghat in Vikroli. After 66 hours of fasting, devotees offered Arghya to the rising sun, concluding the sacred festival with traditional rituals and community participation.',
    image: 'figma:asset/b74248734c89fc30b177ddd12a3139cc100e35e2.png',
    source: 'Lokmanya Bharat News, Vikroli',
  },
  {
    id: 3,
    title: 'Chhath Mahaparvा Concludes with Traditional Rituals in Mirajpur',
    date: '2025-10-22',
    category: 'Religious Event',
    excerpt: 'The grand Chhath festival concluded with devotees offering Arghya to the rising sun. Women devotees completed their fast after performing traditional rituals. The event witnessed massive participation from the community.',
    image: 'figma:asset/6f0b4657432398977b1ff8e63e88fdd6c82d2b0a.png',
    source: 'Aaj Mirajpur, Varanasi',
  },
  {
    id: 4,
    title: 'Educational Event at Girls School - विधानिधी विद्यालयात श्रावण महिन्याच्या परिपाठाचे आयोजन',
    date: '2025-08-26',
    category: 'Education',
    excerpt: 'A special educational event was organized at the girls\' school during the month of Shravan. The event featured cultural programs, competitions, and educational activities for students, promoting learning through creative expression.',
    image: 'figma:asset/65aeb3f625463161c87c547aab331a9ab4a5d82e.png',
    source: 'Rashtramudra, Mumbai',
  },
  {
    id: 5,
    title: 'Educational Materials Distribution at Juhu School - विधानिधी शाळेत परिपाठाचे आयोजन',
    date: '2025-08-24',
    category: 'Education',
    excerpt: 'Educational materials and prizes were distributed to students at Juhu Yethil Upnagar Shikshan Mandal. The event was organized by Vidhanidhi Vrjalal Parekh High School with participation from honored guests and students.',
    image: 'figma:asset/266f83345b5407372661358259f08602f9877410.png',
    source: 'Lokmat, Mumbai',
  },
  {
    id: 6,
    title: 'Educational Support for Tribal Children - आदिवासी विद्यार्थियों को शैक्षणिक सामग्री वितरित',
    date: '2025-08-25',
    category: 'Social Service',
    excerpt: 'On August 24th, educational materials were distributed to 110 tribal children from colonies near Mumbai as part of a special social service initiative. The event aimed to support underprivileged students with necessary learning resources.',
    image: 'figma:asset/e4919ab478ae10e52c6ae5877047f88b58f5dabe.png',
    source: 'Darphar ka Samna Hindi Samna, Mumbai',
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