import { Github, ExternalLink, Upload, Box } from 'lucide-react';
import { useProjects, type ProjectConfig } from '@/hooks/useSiteConfig';
import ScrollReveal from '@/components/ScrollReveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ProjectCard = ({ project }: { project: ProjectConfig }) => {
  const hasMedia = project.image || project.video;

  return (
    <div className="glass-card overflow-hidden hover:scale-[1.02] transition-transform duration-300 flex flex-col">
      {/* Media area */}
      <div className="aspect-video bg-muted/50 flex items-center justify-center border-b border-border/30 relative">
        {hasMedia ? (
          project.video ? (
            <video src={project.video} className="w-full h-full object-cover" muted />
          ) : (
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          )
        ) : (
          <div className="text-center p-4">
            <Upload size={24} className="mx-auto text-muted-foreground/50 mb-2" />
            <p className="text-xs text-muted-foreground/50">Upload media</p>
          </div>
        )}
        {project.has3DViewer && (
          <div className="absolute top-2 right-2">
            <span className="px-2 py-1 text-[10px] rounded bg-primary/20 text-primary font-mono flex items-center gap-1">
              <Box size={10} /> 3D
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-semibold">{project.title}</h3>
          <Badge variant="outline" className="text-[10px] shrink-0 capitalize">
            {project.type}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-1">{project.summary}</p>
        <p className="text-xs text-muted-foreground/70 mb-3">Role: {project.role}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map(t => (
            <span key={t} className="px-2 py-0.5 text-[10px] rounded bg-primary/10 text-primary font-medium">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto flex gap-2">
          {project.githubUrl ? (
            <Button size="sm" variant="outline" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github size={14} /> GitHub
              </a>
            </Button>
          ) : (
            <Button size="sm" variant="outline" disabled className="opacity-50">
              <Github size={14} /> Add GitHub
            </Button>
          )}
          {project.demoUrl ? (
            <Button size="sm" asChild>
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={14} /> Demo
              </a>
            </Button>
          ) : (
            <Button size="sm" variant="secondary" disabled className="opacity-50">
              Coming Soon
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const { projects } = useProjects();

  return (
    <section id="projects" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold">Projects</h2>
            <p className="text-muted-foreground mt-2">Research, builds & simulations</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projects.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 0.1}>
              <ProjectCard project={p} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
