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

    const maxLength = 30;
    const points: { x: number; y: number }[] = [];

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const onMove = (e: MouseEvent) => {
      points.push({ x: e.clientX, y: e.clientY });
      if (points.length > maxLength) points.shift();
    };

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (points.length > 1) {
        for (let i = 1; i < points.length; i++) {
          const t = i / points.length; // 0→1 (tail→head)
          const alpha = t * 0.6;
          const width = t * 4 + 0.5;

          ctx.beginPath();
          ctx.moveTo(points[i - 1].x, points[i - 1].y);
          ctx.lineTo(points[i].x, points[i].y);
          ctx.strokeStyle = `hsla(270, 85%, 65%, ${alpha})`;
          ctx.lineWidth = width;
          ctx.lineCap = 'round';
          ctx.stroke();
        }

        // Glowing head dot
        const head = points[points.length - 1];
        const glow = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 12);
        glow.addColorStop(0, 'hsla(270, 85%, 75%, 0.5)');
        glow.addColorStop(1, 'hsla(270, 85%, 65%, 0)');
        ctx.beginPath();
        ctx.arc(head.x, head.y, 12, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      }

      // Gradually shrink trail when idle
      if (points.length > 0) {
        points[0].x += (points[1]?.x ?? points[0].x - points[0].x) * 0.01;
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
