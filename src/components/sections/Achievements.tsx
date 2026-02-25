import { Trophy, Award, Star, Medal, Target } from 'lucide-react';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import ScrollReveal from '@/components/ScrollReveal';

const iconMap: Record<string, any> = { Trophy, Award, Star, Medal, Target };

const Achievements = () => {
  const { config } = useSiteConfig();
  if (!config) return null;

  return (
    <section id="achievements" className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold">Achievements</h2>
            <p className="text-muted-foreground mt-2">Awards & milestones</p>
          </div>
        </ScrollReveal>

        <div className="max-w-2xl mx-auto space-y-3">
          {config.achievements.map((a, i) => {
            const Icon = iconMap[a.icon] || Star;
            return (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="glass-card px-5 py-4 flex items-center gap-4 hover:scale-[1.01] transition-transform duration-200">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-primary" />
                  </div>
                  <span className="text-sm font-medium">{a.title}</span>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
