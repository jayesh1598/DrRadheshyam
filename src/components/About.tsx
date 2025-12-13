import { MapPin, Phone, Mail, CreditCard } from 'lucide-react';

export function About() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl text-center mb-12 text-gray-900">
          Personal Information
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-orange-100 p-3 rounded-lg flex-shrink-0">
                <MapPin className="w-6 h-6 text-orange-700" />
              </div>
              <div>
                <h3 className="text-gray-900 mb-2">Residential Address</h3>
                <p className="text-gray-600">
                  5A, Anuradha Satyamurty Residency, N.S. Road No. 11, Plot no. 16,<br />
                  Next To "Amitabh Bachchan Pratiksha Bungalow"<br />
                  JVPD Scheme, Juhu, Mumbai 400049
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-orange-100 p-3 rounded-lg flex-shrink-0">
                <MapPin className="w-6 h-6 text-orange-700" />
              </div>
              <div>
                <h3 className="text-gray-900 mb-2">Office Address</h3>
                <p className="text-gray-600">
                  10, Bonanza Arcade, SV Road,<br />
                  Near Amboli Signal, Andheri (W),<br />
                  Mumbai 400058
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
                <Phone className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <h3 className="text-gray-900 mb-2">Contact Numbers</h3>
                <p className="text-gray-600">
                  <a href="tel:8693022000" className="hover:text-orange-600">8693022000</a>
                  <br />
                  <a href="tel:8419904009" className="hover:text-orange-600">8419904009</a>
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
                <Mail className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <h3 className="text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600">
                  <a href="mailto:rsg1507@gmail.com" className="hover:text-orange-600">
                    rsg1507@gmail.com
                  </a>
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-orange-100 p-3 rounded-lg flex-shrink-0">
                <CreditCard className="w-6 h-6 text-orange-700" />
              </div>
              <div>
                <h3 className="text-gray-900 mb-2">Aadhar Card</h3>
                <p className="text-gray-600">6139 8081 1643</p>
              </div>
            </div>
          </div>
        </div>

      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 Dr. Radheshyam S. Gupta. All rights reserved.</p>
        </div>
      </footer>
      </div>
    </section>
  );
}
