import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { Overview } from '../components/Overview';
import { Education } from '../components/Education';
import { Experience } from '../components/Experience';
import { Awards } from '../components/Awards';
import { SocialService } from '../components/SocialService';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Hero />
      <Overview />
      <Education />
      <Experience />
      <Awards />
      <SocialService />
    </div>
  );
}
