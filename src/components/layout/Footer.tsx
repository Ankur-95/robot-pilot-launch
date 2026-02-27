import { Github, Linkedin, Twitter, Download, ArrowUp } from 'lucide-react';
import { useSiteConfig } from '@/hooks/useSiteConfig';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const Footer = () => {
  const { config } = useSiteConfig();

  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <a href="#" className="font-display text-xl font-bold tracking-tight">
              <span className="text-primary">A</span>RU
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-sm font-semibold mb-3 text-foreground">Navigation</h4>
            <div className="space-y-2">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display text-sm font-semibold mb-3 text-foreground">Connect</h4>
            <div className="flex items-center gap-3">
              {config?.social.github && (
                <a href={config.social.github} target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
                  <Github size={18} />
                </a>
              )}
              {config?.social.linkedin && (
                <a href={config.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
                  <Linkedin size={18} />
                </a>
              )}
              {config?.social.twitter && (
                <a href={config.social.twitter} target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
                  <Twitter size={18} />
                </a>
              )}
              <a href="/resume.pdf" download className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Download Resume">
                <Download size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/50 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {config?.personal.name || 'Ankur Rakesh Ujawane'}. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
