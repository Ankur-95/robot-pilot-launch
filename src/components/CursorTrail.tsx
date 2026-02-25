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

    const trail: { x: number; y: number; alpha: number }[] = [];

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const onMove = (e: MouseEvent) => {
      trail.push({ x: e.clientX, y: e.clientY, alpha: 1 });
      if (trail.length > 20) trail.shift();
    };

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      trail.forEach((p, i) => {
        p.alpha -= 0.04;
        if (p.alpha <= 0) return;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3 + i * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(192, 80%, 55%, ${p.alpha * 0.4})`;
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
