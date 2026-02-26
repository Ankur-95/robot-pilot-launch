import { useState } from 'react';
import { GraduationCap, Briefcase, Rocket } from 'lucide-react';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import ScrollReveal from '@/components/ScrollReveal';
import { AnimatePresence, motion } from 'framer-motion';

const iconMap: Record<string, any> = {
  GraduationCap, Briefcase, Rocket
};

const About = () => {
  const { config } = useSiteConfig();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  if (!config) return null;

  const activeHighlight = activeIndex !== null ? config.about.highlights[activeIndex] : null;
  const ActiveIcon = activeHighlight ? (iconMap[activeHighlight.icon] || Rocket) : null;

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">About Me</h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {config.about.highlights.map((h, i) => {
            const Icon = iconMap[h.icon] || Rocket;
            return (
              <ScrollReveal key={h.title} delay={i * 0.15}>
                <div
                  onClick={() => setActiveIndex(i)}
                  className="glass-card p-6 h-full hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg">{h.title}</h3>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Glassmorphism popup overlay */}
      <AnimatePresence>
        {activeHighlight && ActiveIcon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={() => setActiveIndex(null)}
          >
            {/* Glassy backdrop */}
            <div className="absolute inset-0 bg-background/60 backdrop-blur-md" />

            {/* Popup card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 glass-card p-8 md:p-10 max-w-md w-[90%] mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <ActiveIcon size={24} className="text-primary" />
              </div>
              <h3 className="font-display font-bold text-xl mb-3">{activeHighlight.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{activeHighlight.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default About;