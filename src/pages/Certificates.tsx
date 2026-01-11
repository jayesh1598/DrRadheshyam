import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Award } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase/client';

interface Certificate {
  id: string;
  title: string;
  institution: string;
  date: string;
  description: string;
  image_url: string;
}

const defaultCertificates: Certificate[] = [
  {
    id: '1',
    title: 'Honorary Doctorate Degree',
    institution: 'Dr. Babasaheb Ambedkar University, Agra',
    date: '2023',
    description: 'Conferred for outstanding contributions to social service and community development',
    image_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
  },
];

export default function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>(defaultCertificates);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCertificates = async () => {
      try {
        const { data, error } = await supabase
          .from('certificates')
          .select('*')
          .order('date', { ascending: false });

        if (error) {
          console.error('Error loading certificates:', error);
          return;
        }

        if (data && data.length > 0) {
          setCertificates(data);
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCertificates();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Page Header */}
      <div className="text-white py-16" style={{ backgroundImage: 'linear-gradient(to right, #c55a1b, #a04a16)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="w-12 h-12" />
            <h1 className="text-center">Certificates & Recognition</h1>
          </div>
          <p className="text-center text-lg max-w-2xl mx-auto" style={{ color: '#f5e6d3' }}>
            A collection of awards, certificates, and recognitions received for contributions to society, business, and public service
          </p>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <p className="text-center py-12">Loading certificates...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {certificates.map((certificate) => (
              <div
                key={certificate.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-64 overflow-hidden" style={{ backgroundImage: 'linear-gradient(to bottom right, #ffe6d5, #ffd4b3)' }}>
                  <img
                    src={certificate.image_url}
                    alt={certificate.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5">
                  <div className="mb-2">
                    <span className="text-sm" style={{ color: '#e76c2c' }}>{certificate.date}</span>
                  </div>

                  <h3 className="text-gray-900 mb-2 line-clamp-2">
                    {certificate.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-3">
                    {certificate.institution}
                  </p>

                  <p className="text-sm text-gray-500 line-clamp-2">
                    {certificate.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
