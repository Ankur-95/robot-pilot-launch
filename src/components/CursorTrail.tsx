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

    const points: { x: number; y: number }[] = [];
    const MAX_POINTS = 30;

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const onMove = (e: MouseEvent) => {
      points.push({ x: e.clientX, y: e.clientY });
      if (points.length > MAX_POINTS) points.shift();
    };

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (points.length > 1) {
        for (let i = 1; i < points.length; i++) {
          const alpha = (i / points.length) * 0.45;
          ctx.beginPath();
          ctx.moveTo(points[i - 1].x, points[i - 1].y);
          ctx.lineTo(points[i].x, points[i].y);
          ctx.strokeStyle = `hsla(270, 85%, 65%, ${alpha})`;
          ctx.lineWidth = 2;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.shadowColor = 'hsla(270, 85%, 65%, 0.4)';
          ctx.shadowBlur = 4;
          ctx.stroke();
        }
        ctx.shadowBlur = 0;
      }

      // Slowly shrink trail when idle
      if (points.length > 0) {
        points[0].x += 0; // keep reference
      }

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMove);
    animate();

    // Decay trail when mouse stops
    const decay = setInterval(() => {
      if (points.length > 0) points.shift();
    }, 50);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      clearInterval(decay);
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
