import { Heart, Users, UtensilsCrossed } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function SocialService() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <Heart className="w-8 h-8 text-red-600 fill-red-600" />
          </div>
          <h2 className="text-3xl sm:text-4xl text-gray-900">
            Social Service & Community Work
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1752584157962-8821ce8b732b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwY2hhcml0eSUyMHNlcnZpY2V8ZW58MXx8fHwxNjQ4NTUxNDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Food Distribution Service"
              className="w-full h-80 object-cover"
            />
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
                <UtensilsCrossed className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <h3 className="text-xl text-gray-900 mb-2">Food Distribution to Needy People</h3>
                <p className="text-gray-600">
                  Serving the community with dedication and compassion through regular food distribution programs.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl" style={{ backgroundImage: 'linear-gradient(to bottom right, #ffe6d5, #ffd4b3)' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg" style={{ backgroundColor: '#ffc9a3' }}>
                <Users className="w-5 h-5" style={{ color: '#c55a1b' }} />
              </div>
              <h3 className="text-gray-900">Corona Relief Work</h3>
            </div>
            <p className="text-gray-700">
              During the Corona period, donated school fees for students and served food daily to needy people through Arise Juhu Citizen Foundation at Juhu Area, opposite Kalimata Mandir.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-200 p-2 rounded-lg">
                <UtensilsCrossed className="w-5 h-5 text-green-700" />
              </div>
              <h3 className="text-gray-900">Ongoing Service - Juhu</h3>
            </div>
            <p className="text-gray-700">
              Since 2019, continuing to serve food 4 days a week through Arise Juhu Citizen Foundation, maintaining commitment to community welfare.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-200 p-2 rounded-lg">
                <Heart className="w-5 h-5 text-orange-700" />
              </div>
              <h3 className="text-gray-900">Weekly Distribution</h3>
            </div>
            <p className="text-gray-700">
              Food distribution every Saturday at Sankat Mochan Shri Hanuman Mandir, Miraroad, ensuring regular support to those in need.
            </p>
          </div>
        </div>
        
        <div className="mt-12 text-white p-8 rounded-2xl text-center" style={{ backgroundImage: 'linear-gradient(to right, #c55a1b, #a04a16)' }}>
          <h3 className="text-2xl mb-4">Making a Difference in the Community</h3>
          <p className="max-w-3xl mx-auto" style={{ color: '#f5e6d3' }}>
            Through various initiatives and organizations, Dr. Radheshyam S. Gupta continues to serve society 
            with unwavering dedication, bringing positive change to countless lives in Mumbai.
          </p>
        </div>
      </div>
    </section>
  );
}
