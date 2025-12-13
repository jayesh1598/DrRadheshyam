import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Facebook, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const galleryImages = [
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
  {
    id: 7,
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2Fb5efac8f0c504c39b4f1201c27e17a15?format=webp&width=800',
    alt: 'Team unity - Beach meditation and wellness activity',
  },
  {
    id: 8,
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2Fb651c6d35c594f8ab28214acb2223f84?format=webp&width=800',
    alt: 'Educational outreach - Children program and community engagement',
  },
  {
    id: 9,
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2F2ec9b26630bb4b27af41375680a36c2f?format=webp&width=800',
    alt: 'Stage event - Large public gathering and performance',
  },
  {
    id: 10,
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2Fd61d3cdfeb424e0eab309fd4de570e96?format=webp&width=800',
    alt: 'Wellness class - Group fitness and yoga instruction',
  },
  {
    id: 11,
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2F9aa61d412d204a4f9b9fc69c64e81233?format=webp&width=800',
    alt: 'Formal recognition - Certificate presentation and award ceremony',
  },
  {
    id: 12,
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2Fd1e3ed2ebea64050a59aee117d56c42d?format=webp&width=800',
    alt: 'Team collaboration - Group meeting and professional gathering',
  },
  {
    id: 13,
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2F759382c3cccf43f58aa11020bc4a258b?format=webp&width=800',
    alt: 'Formal assembly - Large group gathering and event',
  },
  {
    id: 14,
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2Ff8cce273bbb24812b957610b6e7609c9?format=webp&width=800',
    alt: 'Official honor - Felicitation and ceremony',
  },
  {
    id: 15,
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2Fdece649a1bdb495aa5d2e7dd66acbaa0?format=webp&width=800',
    alt: 'Community service - Social work and public engagement',
  },
  {
    id: 16,
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2Fb1795f4f76ee49a2879f4b6edd5d003d?format=webp&width=800',
    alt: 'Public event - Large gathering and celebration',
  },
  {
    id: 17,
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2Fced0b4a51c644bfdace22748b73a0d67?format=webp&width=800',
    alt: 'Outdoor activity - Group photo at retreat location',
  },
  {
    id: 18,
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2F9cf8d6e1975f4683a7287348388affb5?format=webp&width=800',
    alt: 'Festival celebration - Traditional event and community gathering',
  },
  {
    id: 19,
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2F1ec5eafb5ded4b65add163703a54a3b8?format=webp&width=800',
    alt: 'Social engagement - Community interaction and outreach',
  },
  {
    id: 20,
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2F20d2387cb8594d37a954502f79662616?format=webp&width=800',
    alt: 'Public event - Festival and celebration with attendees',
  },
  {
    id: 21,
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2Fa4bae841d48b4ef1aa3b029b0b799106?format=webp&width=800',
    alt: 'Outdoor gathering - Park event and community meeting',
  },
  {
    id: 22,
    image: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2Fb8634bfbe1e24884bf61692b610dc40d?format=webp&width=800',
    alt: 'Public address - Speaking engagement and community talk',
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
