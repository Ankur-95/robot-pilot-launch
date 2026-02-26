import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Download } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const navLinks = [
{ label: 'About', href: '#about' },
{ label: 'Skills', href: '#skills' },
{ label: 'Experience', href: '#experience' },
{ label: 'Projects', href: '#projects' },
{ label: 'Contact', href: '#contact' }];


const Header = () => {
  const [open, setOpen] = useState(false);
  const { isDark, toggle } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-xl bg-background/80 border-b border-border/50">
      <nav className="w-full px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        



        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
          <a
            key={link.href}
            href={link.href}
            className="text-sm font-semibold tracking-wide uppercase text-muted-foreground hover:text-foreground transition-colors relative group">

              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover:w-full" />
            </a>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            href="/resume.pdf"
            download
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Download Resume"
            title="Download Resume">

            <Download size={16} />
          </a>
          <button
            onClick={toggle}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle theme">

            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            aria-label="Toggle menu">

            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open &&
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl overflow-hidden">

            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) =>
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-2">

                  {link.label}
                </a>
            )}
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </header>);

};

export default Header;