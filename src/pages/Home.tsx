import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Education } from '../components/Education';
import { Experience } from '../components/Experience';
import { Awards } from '../components/Awards';
import { SocialService } from '../components/SocialService';
import { Contact } from '../components/Contact';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Hero />
      <About />
      <Education />
      <Experience />
      <Awards />
      <SocialService />
      <Contact />
    </div>
  );
}
