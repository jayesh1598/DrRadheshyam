import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import bannerImage1 from 'figma:asset/c39f91be012f28a930d59ddfef67b01fed26e05d.png';
import bannerImage2 from 'figma:asset/768c2fb46ec73b2e8f9e326258c66a621e4f53da.png';
import bannerImage3 from 'figma:asset/f84c696c6e55bb2f8b05dddc10bd4f496c3dbfa4.png';
import bannerImage4 from 'figma:asset/fabbcc2ddb4dcba8f9559b2c9e3586bccec643a7.png';
import bannerImage5 from 'figma:asset/4b7df9ec1760a04b6038212f3aefebeaa831d329.png';

const bannerImages = [
  {
    id: 1,
    src: bannerImage1,
    alt: 'Social Service - Yoga Event',
  },
  {
    id: 2,
    src: bannerImage2,
    alt: 'Political Leadership Meeting',
  },
  {
    id: 3,
    src: bannerImage3,
    alt: 'BJP Political Event',
  },
  {
    id: 4,
    src: bannerImage4,
    alt: 'India Wins - Beach Celebration',
  },
  {
    id: 5,
    src: bannerImage5,
    alt: 'Lions Club Service Event',
  },
];

export function BannerSlider() {
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