import { ImageWithFallback } from "./figma/ImageWithFallback";

const logoUrl = 'https://cdn.builder.io/api/v1/image/assets%2F2e2e8381dd584ea8a16aee5e50efd1c7%2F930bf2b97f2f4b4f8bf28cb96236cf56?format=webp&width=800';

export function Hero() {
  return (
    <div className="relative text-white overflow-hidden" style={{ backgroundImage: 'linear-gradient(to bottom right, #c55a1b, #a04a16, #c55a1b)' }}>
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1623868677243-fc9f09f14511?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdW1iYWklMjBjaXR5JTIwc2t5bGluZXxlbnwxfHx8fDE3NjQ4NTUxMzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl flex-shrink-0">
            <img
              src={logoUrl}
              alt="Dr. RSG Logo"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-4">
              Dr. RADHESHYAM S. GUPTA
            </h1>
            <p className="text-xl sm:text-2xl mb-6" style={{ color: '#f5e6d3' }}>
             Business Leader | Social Reformer | Doctorate in Social Work
            </p>
          
          </div>
        </div>
      </div>
    </div>
  );
}
