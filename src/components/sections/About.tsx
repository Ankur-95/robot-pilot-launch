import { GraduationCap, Briefcase, Rocket } from 'lucide-react';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import ScrollReveal from '@/components/ScrollReveal';

const iconMap: Record<string, any> = {
  GraduationCap, Briefcase, Rocket
};

const About = () => {
  const { config } = useSiteConfig();
  if (!config) return null;

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
                






              </ScrollReveal>);

          })}
        </div>
      </div>
    </section>);

};

export default About;