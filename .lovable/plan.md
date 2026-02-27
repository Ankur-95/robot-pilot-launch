# Updated Plan: Purple Neon Theme + Spline Robot + Cursor Trail + Cleanup

## Clarifications Addressed

1. **Spline Robot stays fixed**: The 3D robot will be a **fixed-position background** middle(`position: fixed`) so it stays in place while page content scrolls over it. Content sections will have opaque/semi-transparent backgrounds so text remains readable as it passes over the robot.
2. **Remove the persona tagline**: The text "Future Robotics Engineer . Robotics Research Enthusiast . AI + Robotics Integrator" is the `personal.persona` field rendered in the Footer. This will be removed from the Footer entirely.

---

## Changes

### 1. Spline 3D Robot as Fixed Background

- Install `@splinetool/react-spline`
- `link :` :**[https://prod.spline.design/qSj32lp8DhyJ6Hoe/scene.splinecode](https://prod.spline.design/qSj32lp8DhyJ6Hoe/scene.splinecode)**
- Create a new component (or repurpose `RobotModel.tsx`) that renders the Spline scene with `position: fixed; inset: 0; z-index: 0` so it sits behind all content and does not scroll
- Place it at the top level in `Index.tsx` (outside `<main>`) so it persists across all sections
- Remove the robot from the Hero grid layout; hero text will overlay the background
- Add semi-opaque backgrounds to content sections (About, Skills, etc.) so they're readable over the robot

### 2. Purple Neon Theme (replace all cyan/blue)

- Update all CSS variables in `src/index.css` (both `:root` and `.dark`):
  - Primary/accent: cyan (192) to neon purple (~270-280)
  - Glow variables: purple neon
  - Gradients: purple-based
  - Glass effects: purple-tinted
- Update `tailwind.config.ts` glow keyframe colors
- Update `ParticleBackground.tsx` particle colors to purple
- The terminal prompt color, glow-cyan class, and all `text-primary` references will automatically update via CSS variables

### 3. Cursor Trail Redesign (Sophisticated, Dusty, Cloudy)

- Rewrite `CursorTrail.tsx`:
  - Use `ctx.createRadialGradient()` for soft, blurred particle edges
  - Increase trail length (40 points) with slower alpha decay (0.015)
  - Larger, low-opacity particles for a cloudy/dusty feel
  - Varying particle sizes for organic effect
  - Purple color palette

### 4. Remove Persona Tagline from Footer

- Remove the `<p>` tag showing `config?.personal.persona` from `Footer.tsx` (line 24-26)
- Keep the brand logo, social links, copyright, and back-to-top button

### 5. Hero Layout Update

- Remove the two-column grid (no more robot column)
- Center hero text content with proper z-index to overlay the fixed Spline background

---

## Files Modified


| File                                    | Change                                    |
| --------------------------------------- | ----------------------------------------- |
| `src/index.css`                         | All color variables to purple/black/white |
| `src/components/CursorTrail.tsx`        | New dusty/cloudy particle trail           |
| `src/components/RobotModel.tsx`         | Replace with fixed-position Spline embed  |
| `src/components/sections/Hero.tsx`      | Remove robot column, center content       |
| `src/components/layout/Footer.tsx`      | Remove persona tagline line               |
| `src/pages/Index.tsx`                   | Move Spline background to top level       |
| `src/components/ParticleBackground.tsx` | Update particle colors to purple          |
| `tailwind.config.ts`                    | Update glow keyframe colors               |


## New Dependency

- `@splinetool/react-spline`