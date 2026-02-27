import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Send } from 'lucide-react';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import ParticleBackground from '@/components/ParticleBackground';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const { config } = useSiteConfig();
  const [showHero, setShowHero] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = config?.personal.name || 'Ankur Rakesh Ujawane';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) {
        clearInterval(interval);
        setTimeout(() => setShowHero(true), 400);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <ParticleBackground />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          {/* Terminal intro */}
          {!showHero && (
            <div className="font-mono">
              <span className="text-primary">$ </span>
              <span className="text-foreground">{typedText}</span>
              <span className="w-2 h-5 bg-primary animate-blink inline-block ml-1" />
            </div>
          )}

          {/* Hero content */}
          {showHero && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-sm font-mono text-primary mb-2 tracking-widest uppercase"
                >
                  {config?.personal.title || 'Robotics Enthusiast'}
                </motion.p>
                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                  {config?.personal.name || 'Ankur Rakesh Ujawane'}
                </h1>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild className="glow-neon">
                  <a href="#contact">
                    <Send size={16} className="mr-2" />
                    Get in Touch
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="#projects">View Projects</a>
                </Button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Scroll indicator */}
        {showHero && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Scroll to about">
              <ArrowDown size={20} className="animate-float" />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Hero;
