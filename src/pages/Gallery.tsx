import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Facebook, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const galleryImages = [
  {
    id: 1,
    image: 'figma:asset/2e59774886a10ef6a8eff35dc67de97be1d2f53f.png',
    alt: 'Temple Visit - Dr. Radheshyam S. Gupta with community members',
  },
  {
    id: 2,
    image: 'figma:asset/74c5306cf08d2dc570125917f167e65b2a0cbf96.png',
    alt: 'Community Service - Dr. Radheshyam S. Gupta serving at temple',
  },
  {
    id: 3,
    image: 'figma:asset/0c25104b46225be8f6c90058d814171b8b129dab.png',
    alt: 'Food Distribution - Community service and food distribution event',
  },
  {
    id: 4,
    image: 'figma:asset/a576c49936a9762fc3ce642d8fd4ef5eb0da7a1e.png',
    alt: 'Educational Event - School program with students and teachers',
  },
  {
    id: 5,
    image: 'figma:asset/ca6c720a8effcb157096c63f651968dc671144d9.png',
    alt: 'Educational Program - Blackboard presentation at school event',
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Facebook className="w-12 h-12" />
            <h1 className="text-center">Social Media Gallery</h1>
          </div>
          <p className="text-center text-blue-100 text-lg max-w-2xl mx-auto">
            Latest updates and activities from Dr. Radheshyam S. Gupta
          </p>
          <div className="text-center mt-4">
            <a 
              href="https://www.facebook.com/dr.radheshyamguptaji" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-100 hover:text-white transition-colors"
            >
              <span>Follow on Facebook</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => setSelectedImage(item.image)}
            >
              <div className="aspect-square overflow-hidden bg-gray-100">
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

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl max-h-full">
            <ImageWithFallback
              src={selectedImage}
              alt="Gallery view"
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
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