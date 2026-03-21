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

    const points: { x: number; y: number; time: number }[] = [];
    const MAX_POINTS = 20;
    const TRAIL_LIFETIME = 300; // ms - how long each point lives
    const MAX_HEAD_WIDTH = 3;
    const MIN_TAIL_WIDTH = 0.3;

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const onMove = (e: MouseEvent) => {
      const now = Date.now();
      // Limit point density: skip if too close to last point
      if (points.length > 0) {
        const last = points[points.length - 1];
        const dx = e.clientX - last.x;
        const dy = e.clientY - last.y;
        if (dx * dx + dy * dy < 16) return; // min 4px apart
      }
      points.push({ x: e.clientX, y: e.clientY, time: now });
      if (points.length > MAX_POINTS) points.shift();
    };

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();

      // Remove expired points
      while (points.length > 0 && now - points[0].time > TRAIL_LIFETIME) {
        points.shift();
      }

      if (points.length > 1) {
        for (let i = 1; i < points.length; i++) {
          const t = i / (points.length - 1); // 0 = tail, 1 = head
          const age = now - points[i].time;
          const lifeFraction = 1 - age / TRAIL_LIFETIME;
          const alpha = Math.max(0, lifeFraction * t * 0.5);
          const width = MIN_TAIL_WIDTH + (MAX_HEAD_WIDTH - MIN_TAIL_WIDTH) * t;

          ctx.beginPath();
          ctx.moveTo(points[i - 1].x, points[i - 1].y);
          ctx.lineTo(points[i].x, points[i].y);
          ctx.strokeStyle = `hsla(270, 85%, 65%, ${alpha})`;
          ctx.lineWidth = width;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.shadowColor = `hsla(270, 85%, 65%, ${alpha * 0.6})`;
          ctx.shadowBlur = 3;
          ctx.stroke();
        }
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMove);
    animate();

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
