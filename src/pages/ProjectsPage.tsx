import { useProjects, type ProjectConfig } from '@/hooks/useSiteConfig';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CursorTrail from '@/components/CursorTrail';
import ScrollReveal from '@/components/ScrollReveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Upload, Box, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectsPage = () => {
  const { projects } = useProjects();

  return (
    <>
      <CursorTrail />
      <Header />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
              <ArrowLeft size={14} /> Back to Home
            </Link>
            <h1 className="font-display text-3xl md:text-5xl font-bold">All Projects</h1>
            <p className="text-muted-foreground mt-2">A deeper look at my work</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 0.1}>
                <div className="glass-card overflow-hidden">
                  <div className="aspect-video bg-muted/50 flex items-center justify-center border-b border-border/30 relative">
                    {p.image ? (
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-4">
                        <Upload size={24} className="mx-auto text-muted-foreground/50 mb-2" />
                        <p className="text-xs text-muted-foreground/50">Upload media</p>
                      </div>
                    )}
                    {p.has3DViewer && (
                      <div className="absolute top-2 right-2">
                        <span className="px-2 py-1 text-[10px] rounded bg-primary/20 text-primary font-mono flex items-center gap-1">
                          <Box size={10} /> 3D Viewer
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h2 className="font-display font-semibold text-xl">{p.title}</h2>
                      <Badge variant="outline" className="capitalize shrink-0">{p.type}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-2">{p.summary}</p>
                    <p className="text-sm text-muted-foreground/70 mb-4">Role: {p.role}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {p.tech.map(t => (
                        <span key={t} className="px-2 py-0.5 text-xs rounded bg-primary/10 text-primary font-medium">{t}</span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {p.githubUrl ? (
                        <Button size="sm" variant="outline" asChild>
                          <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"><Github size={14} /> GitHub</a>
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" disabled className="opacity-50"><Github size={14} /> Add GitHub</Button>
                      )}
                      {p.demoUrl ? (
                        <Button size="sm" asChild>
                          <a href={p.demoUrl} target="_blank" rel="noopener noreferrer"><ExternalLink size={14} /> View Demo</a>
                        </Button>
                      ) : (
                        <Button size="sm" variant="secondary" disabled className="opacity-50">Coming Soon</Button>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProjectsPage;
