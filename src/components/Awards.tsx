import { Trophy, Star } from 'lucide-react';

export function Awards() {
  const awards = [
    {
      title: 'Best Dealer and Showroom',
      organization: 'Maruti Udyog Limited',
      category: 'Car Dealership'
    },
    {
      title: 'Yug Shree Samman',
      organization: 'Laxmi Group Associate',
      year: '2004'
    },
    {
      title: 'Safal Vyavasayik Pratibha',
      organization: 'Paraj News',
      year: '2001'
    },
    {
      title: 'No. 2 Dealer India',
      organization: 'TVS Dealer',
      year: '2001'
    },
    {
      title: 'No. 1 Dealer India',
      organization: 'Bajaj Tempo',
      year: '2000'
    },
    {
      title: 'No. 1 Kinetic Dealer Mumbai',
      organization: 'Kinetic',
      year: '1999'
    },
    {
      title: 'Best Co-op Credit Society in Mumbai',
      organization: 'Co-operative Society',
      year: '2004'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-200 rounded-full mb-4">
            <Trophy className="w-8 h-8 text-orange-700" />
          </div>
          <h2 className="text-3xl sm:text-4xl text-gray-900">
            Awards & Recognition
          </h2>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((award, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-lg flex-shrink-0">
                  <Star className="w-6 h-6 text-orange-600 fill-orange-600" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-2">{award.title}</h3>
                  <p className="text-gray-600 text-sm mb-1">{award.organization}</p>
                  {(award.year || award.category) && (
                    <p className="text-orange-600 text-sm">
                      {award.category || award.year}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
