import { ImageWithFallback } from "./figma/ImageWithFallback";
import profileImage from "figma:asset/00eb846c080a6aa0484c904a5f5228a8105e5f0a.png";
import logo from "figma:asset/00eb846c080a6aa0484c904a5f5228a8105e5f0a.png";

export function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
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
        {/* Logo at top */}
        <div className="flex justify-center mb-8">
          <img
            src={logo}
            alt="Dr. RSG Logo"
            className="h-20 w-20 object-contain"
            style={{
              mixBlendMode: "multiply",
              backgroundColor: "white",
              borderRadius: "50%",
              padding: "8px",
            }}
          />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl flex-shrink-0">
            <img
              src={profileImage}
              alt="Dr. Radheshyam S. Gupta"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-4">
              Dr. RADHESHYAM S. GUPTA
            </h1>
            <p className="text-xl sm:text-2xl text-blue-200 mb-6">
              Businessman & Social Activist
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <p className="text-sm text-blue-200">Age</p>
                <p className="text-lg">56 Years</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <p className="text-sm text-blue-200">
                  Date of Birth
                </p>
                <p className="text-lg">15-07-1969</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}