import { Navigation } from '../components/Navigation';
import { Award, Eye } from 'lucide-react';
import { useState } from 'react';

const certificates = [
  {
    id: 1,
    title: 'Honorary Doctorate Degree',
    issuer: 'Dr. Babasaheb Ambedkar University, Agra',
    date: '2023',
    category: 'Education',
    description: 'Conferred for outstanding contributions to social service and community development',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
  },
  {
    id: 2,
    title: 'Social Service Excellence Award',
    issuer: 'Maharashtra State Government',
    date: '2022',
    category: 'Award',
    description: 'Recognition for exemplary social service during COVID-19 pandemic',
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=80',
  },
  {
    id: 3,
    title: 'Community Leadership Certificate',
    issuer: 'Lions Club International',
    date: '2022',
    category: 'Leadership',
    description: 'Awarded for outstanding leadership in community service initiatives',
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&q=80',
  },
  {
    id: 4,
    title: 'Political Achievement Award',
    issuer: 'Bharatiya Janata Party (BJP)',
    date: '2021',
    category: 'Politics',
    description: 'Recognition for dedicated service and contribution to party activities',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
  },
  {
    id: 5,
    title: 'COVID-19 Relief Warrior Certificate',
    issuer: 'Mumbai Municipal Corporation',
    date: '2020',
    category: 'Social Service',
    description: 'Honored for tireless efforts in food distribution and relief work during pandemic',
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80',
  },
  {
    id: 6,
    title: 'Business Excellence Award',
    issuer: 'Maharashtra Chamber of Commerce',
    date: '2020',
    category: 'Business',
    description: 'Recognition for business leadership and entrepreneurial excellence',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80',
  },
  {
    id: 7,
    title: 'Youth Empowerment Certificate',
    issuer: 'Yuva Bharti Foundation',
    date: '2019',
    category: 'Social Work',
    description: 'Awarded for initiatives supporting youth development and skill training',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
  },
  {
    id: 8,
    title: 'Humanitarian Service Award',
    issuer: 'Rotary Club of Mumbai',
    date: '2019',
    category: 'Award',
    description: 'Recognition for humanitarian efforts and charitable contributions',
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&q=80',
  },
];

export default function Certificates() {
  const [selectedCertificate, setSelectedCertificate] = useState<typeof certificates[0] | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="w-12 h-12" />
            <h1 className="text-center">Certificates & Recognition</h1>
          </div>
          <p className="text-center text-orange-100 text-lg max-w-2xl mx-auto">
            A collection of awards, certificates, and recognitions received for contributions to society, business, and public service
          </p>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {certificates.map((certificate) => (
            <div 
              key={certificate.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span className="inline-block px-3 py-1 bg-white/90 text-orange-800 text-sm rounded-full">
                    {certificate.category}
                  </span>
                </div>
              </div>
              
              <div className="p-5">
                <div className="mb-2">
                  <span className="text-sm text-orange-600">{certificate.date}</span>
                </div>
                
                <h3 className="text-gray-900 mb-2 line-clamp-2">
                  {certificate.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-3">
                  {certificate.issuer}
                </p>
                
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {certificate.description}
                </p>
                
                <button
                  onClick={() => setSelectedCertificate(certificate)}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
                >
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <div 
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCertificate(null)}
        >
          <div 
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-gray-900 mb-2">{selectedCertificate.title}</h2>
                  <p className="text-gray-600">{selectedCertificate.issuer}</p>
                  <p className="text-orange-600 mt-1">{selectedCertificate.date}</p>
                </div>
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="mb-4">
                <img
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                  className="w-full rounded-lg"
                />
              </div>
              
              <p className="text-gray-700 mb-6">
                {selectedCertificate.description}
              </p>
              
              <button
                onClick={() => setSelectedCertificate(null)}
                className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 Dr. Radheshyam S. Gupta. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
