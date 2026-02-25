import { useSiteConfig } from '@/hooks/useSiteConfig';
import ScrollReveal from '@/components/ScrollReveal';

const Experience = () => {
  const { config } = useSiteConfig();
  if (!config) return null;

  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold">Experience</h2>
            <p className="text-muted-foreground mt-2">Internships & work</p>
          </div>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto space-y-6">
          {config.experience.map((exp, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <div className="glass-card p-6 hover:scale-[1.01] transition-transform duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-1">
                  <div>
                    <h3 className="font-display font-semibold text-lg">{exp.role}</h3>
                    <p className="text-sm text-muted-foreground">{exp.company}</p>
                  </div>
                  <span className="text-xs font-mono text-primary shrink-0">{exp.period}</span>
                </div>
                <ul className="space-y-2">
                  {exp.accomplishments.map((a, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary mt-1 shrink-0">▹</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
