import { useEffect, useState } from 'react';

const items = ['ROS', 'Gazebo', 'RViz', 'C++', 'Python', 'SLAM', 'OpenCV'];

const TerminalConsole = () => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = items[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text.length < target.length) {
      timeout = setTimeout(() => setText(target.slice(0, text.length + 1)), 80);
    } else if (!deleting && text.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 1500);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), 40);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setIndex((index + 1) % items.length);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, index]);

  return (
    <div className="glass-card px-4 py-3 font-mono text-sm inline-flex items-center gap-2">
      <span className="text-primary">$</span>
      <span className="text-muted-foreground">loading_module</span>
      <span className="text-primary font-semibold">{text}</span>
      <span className="w-2 h-4 bg-primary animate-blink inline-block" />
    </div>
  );
};

export default TerminalConsole;
