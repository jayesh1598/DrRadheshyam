import { useState, useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Facebook, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { supabase } from '../utils/supabase/client';

interface GalleryImage {
  id: string;
  image_url: string;
  alt_text: string;
}

const defaultGalleryImages: GalleryImage[] = [
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
];

export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(defaultGalleryImages);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const { data, error } = await supabase
          .from('gallery_images')
          .select('*');

        if (error) {
          console.error('Error loading gallery:', error);
          return;
        }

        if (data && data.length > 0) {
          setGalleryImages(data);
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-center">Gallery</h1>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <p className="text-center py-12">Loading gallery images...</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedImage(item.image_url)}
              >
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={item.image_url}
                    alt={item.alt_text}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
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
      <Footer />
    </div>
  );
}
