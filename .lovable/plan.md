

## Subtle Neon Asteroid Background Fix

### Problems
1. Particles move erratically — random speed changes every frame cause jittery, chaotic motion
2. Particles are too bright and too large — high alpha, strong glow, and large sizes make them distracting

### Plan

**File: `src/components/NeonAsteroidBackground.tsx`**

- **Reduce particle count**: 80 desktop / 40 mobile (down from 120/60)
- **Smaller particles**: size range `0.5–2.0` (down from `1.2–4.7`)
- **Steady drift**: Remove the random speed perturbation (`+= (Math.random() - 0.5) * 0.06`) so particles float in consistent directions at constant slow speed (`0.15–0.35` range, down from `0.7`)
- **Much dimmer glow**: Reduce `shadowBlur` from 18 to 6, lower `globalAlpha` to `0.2–0.35` range (down from `0.5–1.0`), use lower lightness values (`60%` instead of `88%`)
- **Softer trail fade**: Change background overlay alpha from `0.15` to `0.08` for smoother, calmer fading

Result: gentle, barely-noticeable floating specks that drift smoothly in one direction — like distant stars, not chaotic asteroids.

