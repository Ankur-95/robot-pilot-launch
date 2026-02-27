import { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const CursorTrail = () => {
  const isMobile = useIsMobile();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const trail: { x: number; y: number; alpha: number; size: number }[] = [];

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const onMove = (e: MouseEvent) => {
      // Add multiple particles per move for density
      for (let i = 0; i < 2; i++) {
        trail.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          alpha: 0.6 + Math.random() * 0.3,
          size: 12 + Math.random() * 20,
        });
      }
      if (trail.length > 50) trail.splice(0, trail.length - 50);
    };

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      trail.forEach((p) => {
        p.alpha -= 0.012;
        if (p.alpha <= 0) return;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, `hsla(270, 85%, 65%, ${p.alpha * 0.25})`);
        gradient.addColorStop(0.4, `hsla(275, 80%, 60%, ${p.alpha * 0.12})`);
        gradient.addColorStop(1, `hsla(280, 75%, 55%, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      while (trail.length > 0 && trail[0].alpha <= 0) trail.shift();
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMove);
    animate();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  );
};

export default CursorTrail;
