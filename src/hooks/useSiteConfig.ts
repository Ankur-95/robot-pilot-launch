import { useState, useEffect } from 'react';

interface SiteConfig {
  personal: {
    name: string;
    initials: string;
    title: string;
    persona: string;
    tagline: string;
    city: string;
    email: string;
    resumeUrl: string;
  };
  about: {
    statement: string;
    highlights: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  timeline: Array<{
    year: string;
    title: string;
    institution: string;
    description: string;
  }>;
  skills: Array<{
    category: string;
    icon: string;
    note: string;
    items: string[];
  }>;
  experience: Array<{
    role: string;
    company: string;
    period: string;
    accomplishments: string[];
  }>;
  achievements: Array<{
    icon: string;
    title: string;
  }>;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    email: string;
  };
  formspreeId: string;
}

interface ProjectConfig {
  id: string;
  title: string;
  summary: string;
  tech: string[];
  type: string;
  role: string;
  image: string;
  video: string;
  githubUrl: string;
  demoUrl: string;
  has3DViewer: boolean;
  featured: boolean;
}

export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/content/siteConfig.json')
      .then(res => res.json())
      .then(data => { setConfig(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return { config, loading };
}

export function useProjects() {
  const [projects, setProjects] = useState<ProjectConfig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const projectFiles = ['autonomous-rover', 'drone-controller', 'robotic-arm'];
    Promise.all(
      projectFiles.map(f =>
        fetch(`/content/projects/${f}.json`).then(r => r.json()).catch(() => null)
      )
    ).then(results => {
      setProjects(results.filter(Boolean));
      setLoading(false);
    });
  }, []);

  return { projects, loading };
}

export type { SiteConfig, ProjectConfig };
