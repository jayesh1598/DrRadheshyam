import { Phone, Mail, MapPin, Linkedin, Facebook, Twitter } from 'lucide-react';

export function Contact() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl mb-4">Get In Touch</h2>
          <p className="text-gray-300">Feel free to reach out for collaborations or inquiries</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <a 
            href="tel:8693022000"
            className="flex flex-col items-center gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors"
          >
            <div className="bg-blue-500 p-4 rounded-full">
              <Phone className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="mb-2">Phone</h3>
              <p className="text-gray-300">8693022000</p>
              <p className="text-gray-300">8419904009</p>
            </div>
          </a>
          
          <a 
            href="mailto:rsg1507@gmail.com"
            className="flex flex-col items-center gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors"
          >
            <div className="bg-purple-500 p-4 rounded-full">
              <Mail className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="mb-2">Email</h3>
              <p className="text-gray-300 break-all">rsg1507@gmail.com</p>
            </div>
          </a>
          
          <div className="flex flex-col items-center gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-xl">
            <div className="bg-green-500 p-4 rounded-full">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="mb-2">Location</h3>
              <p className="text-gray-300">Mumbai, Maharashtra</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400">
              © 2025 Dr. Radheshyam S. Gupta. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
