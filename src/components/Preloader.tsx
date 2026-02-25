import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const lines = [
  '> System initializing...',
  '> Loading core modules...',
  '> ROS | Gazebo | Python',
  '> Calibrating sensors...',
  '> Neural networks online',
  '> Ready.',
];

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Check if already shown this session
    if (sessionStorage.getItem('preloader_shown')) {
      setVisible(false);
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setCurrentLine(prev => {
        if (prev >= lines.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            sessionStorage.setItem('preloader_shown', 'true');
            setVisible(false);
            onComplete();
          }, 600);
          return prev;
        }
        return prev + 1;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [onComplete]);

  const skip = () => {
    sessionStorage.setItem('preloader_shown', 'true');
    setVisible(false);
    onComplete();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-lg w-full px-6">
            <div className="glass-card p-6 font-mono text-sm space-y-1">
              {lines.slice(0, currentLine + 1).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={i === currentLine ? 'text-primary' : 'text-muted-foreground'}
                >
                  {line}
                </motion.div>
              ))}
              <span className="inline-block w-2 h-4 bg-primary animate-blink mt-1" />
            </div>
            <button
              onClick={skip}
              className="mt-4 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip →
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
