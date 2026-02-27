import { useState, useCallback } from 'react';
import Preloader from '@/components/Preloader';
import CursorTrail from '@/components/CursorTrail';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RobotModel from '@/components/RobotModel';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Timeline from '@/components/sections/Timeline';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Achievements from '@/components/sections/Achievements';
import Contact from '@/components/sections/Contact';

const Index = () => {
  const [ready, setReady] = useState(false);
  const onComplete = useCallback(() => setReady(true), []);

  return (
    <>
      <Preloader onComplete={onComplete} />
      {ready && (
        <>
          <RobotModel />
          <CursorTrail />
          <div className="relative" style={{ zIndex: 1 }}>
            <Header />
            <main>
              <Hero />
              <About />
              <Timeline />
              <Skills />
              <Experience />
              <Projects />
              <Achievements />
              <Contact />
            </main>
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default Index;
