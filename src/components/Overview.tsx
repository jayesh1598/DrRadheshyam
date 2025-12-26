import { Eye, Target, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export function Overview() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Biography Section */}
        <div className="mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">
            About Dr. Radheshyam Gupta
          </h2>

          <div className="max-w-4xl mx-auto space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                Business Leader | Social Reformer | Doctorate in Social Work
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Dr. Radheshyam Gupta is a distinguished businessman, social reformer, and community leader, known for his unwavering commitment to social welfare, ethical leadership, and inclusive development. With a Doctorate in Social Work, he has dedicated his life to serving society while maintaining excellence in business and professional endeavors.
              </p>
            </div>

            {isExpanded && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <p className="text-gray-600 leading-relaxed">
                    With extensive experience in property, finance, and entrepreneurship, Dr. Gupta is respected for his strategic vision, integrity, and people-oriented approach. His professional journey reflects a rare balance of commercial success and social responsibility.
                  </p>
                </div>

                <div>
                  <p className="text-gray-600 leading-relaxed">
                    Dr. Gupta holds several prominent leadership positions. He is the President of Arise Juhu Citizen Foundation and President of World Social Work, actively working towards civic engagement, community empowerment, and social justice. As a Trustee of Sankat Mochan Shri Hanuman Temple, he promotes spiritual values, cultural harmony, and service to humanity. He is also associated with the media as the Managing Editor of SAHU SAVERA, using journalism as a tool for awareness and positive social transformation.
                  </p>
                </div>

                <div>
                  <p className="text-gray-600 leading-relaxed">
                    A strong believer in discipline, fitness, and spirituality, Dr. Gupta actively participates in yoga and wellness initiatives, encouraging a healthy and balanced lifestyle. His life philosophy is rooted in positivity, hard work, and selfless service.
                  </p>
                </div>

                <div>
                  <p className="text-gray-600 leading-relaxed">
                    Dr. Radheshyam Gupta continues to inspire and lead by example, striving to build a society based on values, unity, and sustainable progress.
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mt-4 transition-colors"
            >
              {isExpanded ? (
                <>
                  <span>Read less</span>
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Read more</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Vision and Mission Section */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Vision */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 sm:p-10 rounded-xl shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Vision</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              To create a socially conscious, empowered, and value-driven society through service, leadership, and ethical action.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 sm:p-10 rounded-xl shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-600 p-3 rounded-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Mission</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              To bridge business excellence with social responsibility and contribute meaningfully to community development, education, and well-being.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
