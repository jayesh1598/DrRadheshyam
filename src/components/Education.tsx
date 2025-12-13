import { GraduationCap, Award } from 'lucide-react';

export function Education() {
  const education = [
    {
      degree: 'SSC',
      institution: 'Maharashtra State Board',
      icon: GraduationCap
    },
    {
      degree: 'HSC',
      institution: 'Maharashtra State Board',
      icon: GraduationCap
    },
    {
      degree: 'Honorary Doctorate Award',
      institution: 'Received On 17-06-2024',
      icon: Award,
      highlight: true
    },
    {
      degree: 'BA LLB - PURSUING',
      institution: 'Chhatrapati Shivaji Maharaj University',
      icon: GraduationCap
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl text-center mb-12 text-gray-900">
          Education
        </h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {education.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className={`p-6 rounded-xl shadow-md ${
                  item.highlight 
                    ? 'bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-300' 
                    : 'bg-white'
                }`}
              >
                <div className={`inline-flex p-3 rounded-lg mb-4 ${
                  item.highlight ? 'bg-amber-200' : 'bg-blue-100'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    item.highlight ? 'text-amber-700' : 'text-blue-700'
                  }`} />
                </div>
                <h3 className="text-gray-900 mb-2">{item.degree}</h3>
                <p className="text-gray-600 text-sm">{item.institution}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
