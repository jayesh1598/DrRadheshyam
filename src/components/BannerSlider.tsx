import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../utils/supabase/client';

interface BannerSlide {
  id: string;
  image_url: string;
  alt_text: string;
  display_order: number;
}

const defaultBanners: BannerSlide[] = [
  {
    id: '1',
    image_url: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2F74c2b9fdf65c449da5054b128eae79eb?format=webp&width=800',
    alt_text: 'Community Event',
    display_order: 0,
  },
  {
    id: '2',
    image_url: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2F2571d9bb0e46452eb1370ed4ac4e2039?format=webp&width=800',
    alt_text: 'Public Event',
    display_order: 1,
  },
  {
    id: '3',
    image_url: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2F422d095645af41b6a3607a71b2a084be?format=webp&width=800',
    alt_text: 'Civic Engagement',
    display_order: 2,
  },
  {
    id: '4',
    image_url: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2F7776eae2564d4500a1b8662536b9bdb9?format=webp&width=800',
    alt_text: 'Sports Event',
    display_order: 3,
  },
  {
    id: '5',
    image_url: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2F8689b4f6f116466c99bc69361fd124de?format=webp&width=800',
    alt_text: 'Social Service',
    display_order: 4,
  },
  {
    id: '6',
    image_url: 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2F21288cf083e444b5803d8eff2ef39500?format=webp&width=800',
    alt_text: 'Community Engagement Event',
    display_order: 5,
  },
];

export function BannerSlider() {
  const [bannerImages, setBannerImages] = useState<BannerSlide[]>(defaultBanners);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
  };

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-gray-900">
      {/* Slides */}
      <div className="relative w-full h-full">
        {bannerImages.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={banner.src}
              alt={banner.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-gray-900" />
      </button>

      {/* Next Button */}
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-gray-900" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
