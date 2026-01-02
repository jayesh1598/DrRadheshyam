import { Briefcase, Calendar } from 'lucide-react';

export function Experience() {
  const experiences = [
    {
      year: '2025',
      role: 'Vice President - Uttar Bhartiya Morcha Uttar Paschim Jila',
      organization: 'Bhartiya Janta Party Mumbai'
    },
    {
      year: '2024',
      role: 'Upadhyaksh',
      organization: 'Vishva Hindu Parishad - Bhayander Jilha'
    },
    {
      year: '2023',
      role: 'President',
      organization: 'Sankat Mochan Shri Hanuman Mandir - Miraroad'
    },
    {
      year: '2023',
      role: 'President',
      organization: 'Arise Juhu Citizen Foundation - Mumbai'
    },
    {
      year: '2019',
      role: 'Working Present',
      organization: 'Arise Juhu Citizen Foundation - Mumbai'
    },
    {
      year: '2020',
      role: 'Joined BJP by MLA Shri Ameet Satam Ji',
      organization: 'Andheri Vidhan Sabha'
    },
    {
      year: '2006',
      role: 'President',
      organization: 'Samaj Samaj Trust Mumbai'
    },
    {
      year: '2005',
      role: 'Founder President',
      organization: 'Sahu Savera Times Hindi News Paper Fortnightly'
    },
    {
      year: '2003',
      role: 'Sanrakshak',
      organization: 'Apna Teli Samaj Mumbai'
    },
    {
      year: '2001',
      role: 'President',
      organization: 'Laxmi Foundation Charitable Trust'
    },
    {
      year: '2001',
      role: 'Life Membership',
      organization: 'Raheja Classique Club Andheri Mumbai'
    },
    {
      year: '1998',
      role: 'Life Membership',
      organization: 'ISKCON (Hare Rama - Hare Krishna)'
    },
    {
      year: '1998',
      role: 'Working Vice President',
      organization: 'Sahu Rathore Chetana Mahasangh Lucknow'
    },
    {
      year: '1993',
      role: 'Youth Vice President',
      organization: 'Tailik Sahu Samaj Mumbai'
    },
    {
      year: '1991',
      role: 'President',
      organization: 'Adarsh Gupta Mitra Mandal - Khar Santacruz Mumbai'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl text-center mb-12 text-gray-900">
          Work Experience
        </h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200" />
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className={`relative flex items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-2 mb-2 justify-start md:justify-end">
                      <Calendar className="w-4 h-4" style={{ color: '#e76c2c' }} />
                      <span style={{ color: '#e76c2c' }}>{exp.year}</span>
                    </div>
                    <h3 className="text-gray-900 mb-2">{exp.role}</h3>
                    <p className="text-gray-600">{exp.organization}</p>
                  </div>
                </div>
                
                {/* Center dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white shadow" style={{ backgroundColor: '#e76c2c' }} />
                
                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Mobile view without timeline */}
        <div className="md:hidden space-y-4">
          {experiences.map((exp, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4" style={{ color: '#e76c2c' }} />
                <span style={{ color: '#e76c2c' }}>{exp.year}</span>
              </div>
              <h3 className="text-gray-900 mb-2">{exp.role}</h3>
              <p className="text-gray-600">{exp.organization}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
