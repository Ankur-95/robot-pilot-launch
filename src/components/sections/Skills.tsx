import { Code, Bot, Cpu, Brain } from 'lucide-react';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import ScrollReveal from '@/components/ScrollReveal';
import TerminalConsole from '@/components/TerminalConsole';

const iconMap: Record<string, any> = { Code, Bot, Cpu, Brain };

const Skills = () => {
  const { config } = useSiteConfig();
  if (!config) return null;

  return (
    <section id="skills" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold">Skills</h2>
            <p className="text-muted-foreground mt-2 mb-6">Core competencies & tools</p>
            <TerminalConsole />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {config.skills.map((skill, i) => {
            const Icon = iconMap[skill.icon] || Code;
            return (
              <ScrollReveal key={skill.category} delay={i * 0.1}>
                <div className="glass-card p-6 hover:scale-[1.02] transition-transform duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <h3 className="font-display font-semibold">{skill.category}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{skill.note}</p>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map(item => (
                      <span
                        key={item}
                        className="px-2.5 py-1 text-xs rounded-md bg-primary/10 text-primary font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
