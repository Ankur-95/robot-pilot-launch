import { useSiteConfig } from '@/hooks/useSiteConfig';
import ScrollReveal from '@/components/ScrollReveal';

const Timeline = () => {
  const { config } = useSiteConfig();
  if (!config) return null;

  return (
    <section id="timeline" className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold">Journey</h2>
            <p className="text-muted-foreground mt-2">Education & milestones</p>
          </div>
        </ScrollReveal>

        <div className="max-w-2xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-border" />

          {config.timeline.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className={`relative flex items-start gap-6 mb-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Dot */}
                <div className="absolute left-[15px] md:left-1/2 md:-translate-x-1/2 w-[9px] h-[9px] rounded-full bg-primary border-2 border-background z-10 mt-2" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-[calc(50%-30px)] ${i % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8 md:ml-auto'}`}>
                  <span className="font-mono text-xs text-primary font-semibold">{item.year}</span>
                  <h3 className="font-display font-semibold mt-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.institution}</p>
                  <p className="text-sm text-muted-foreground/70 mt-1">{item.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
