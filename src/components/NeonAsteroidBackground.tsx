import { useRef, useEffect, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const NeonAsteroidBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const isMobile = useIsMobile();

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const count = isMobile ? 50 : 100;

    // Base belt direction: diagonal drift (top-right to bottom-left feel)
    const beltAngle = Math.PI * 0.72; // ~130 degrees
    const beltSpeed = 0.35;

    class Asteroid {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      hue: number;
      tailLen: number;
      alpha: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.8 + 0.8;
        // All move in same general direction with slight variation
        const angleVar = beltAngle + (Math.random() - 0.5) * 0.4;
        const speedVar = beltSpeed + (Math.random() - 0.5) * 0.15;
        this.speedX = Math.cos(angleVar) * speedVar;
        this.speedY = Math.sin(angleVar) * speedVar;
        this.hue = 275 + Math.random() * 45;
        this.tailLen = 8 + Math.random() * 14;
        this.alpha = 0.3 + Math.random() * 0.25;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < -20) this.x = canvas.width + 20;
        if (this.x > canvas.width + 20) this.x = -20;
        if (this.y < -20) this.y = canvas.height + 20;
        if (this.y > canvas.height + 20) this.y = -20;
      }

      draw() {
        const tailX = this.x - this.speedX * this.tailLen;
        const tailY = this.y - this.speedY * this.tailLen;

        // Draw tail (gradient line)
        ctx.save();
        const grad = ctx.createLinearGradient(tailX, tailY, this.x, this.y);
        grad.addColorStop(0, `hsla(${this.hue}, 80%, 60%, 0)`);
        grad.addColorStop(1, `hsla(${this.hue}, 80%, 65%, ${this.alpha * 0.6})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = this.size * 0.6;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.restore();

        // Draw head (glowing dot)
        ctx.save();
        ctx.globalAlpha = this.alpha + Math.sin(Date.now() / 1500 + this.x) * 0.08;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsl(${this.hue}, 85%, 60%)`;
        ctx.fillStyle = `hsl(${this.hue}, 85%, 70%)`;
        ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        ctx.restore();
      }
    }

    const particles = Array.from({ length: count }, () => new Asteroid());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [isMobile]);

  useEffect(() => {
    const cleanup = init();
    return cleanup;
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
};

export default NeonAsteroidBackground;
