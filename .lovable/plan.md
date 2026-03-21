

# Cursor Trail: Laser-style with Subtle Fading Line

## Problem
Current trail uses scattered, random-offset radial gradient particles creating a dusty/cloudy look. You want a clean, concise laser-like trail (like a PPT laser pointer) -- a smooth connected line that fades out behind the cursor.

## Approach

### File: `src/components/CursorTrail.tsx`

Replace the particle system with a **connected line trail**:

- Store the last ~30 cursor positions (no random offsets -- exact cursor coordinates)
- Draw a single smooth path through all points using `ctx.lineTo()`
- Use a purple gradient stroke (`strokeStyle`) that fades from opaque at the cursor to transparent at the tail
- Line width: thin (2-3px) for a laser look
- Alpha decay: points fade out smoothly so the tail shrinks
- No radial gradients, no scattered particles -- just a clean, thin glowing line
- Add a subtle glow effect using `ctx.shadowBlur` (small value ~4px) for a soft neon edge

### Key differences from current:
| Current (dusty) | New (laser) |
|---|---|
| Random offset particles | Exact cursor positions |
| Large radial gradients (12-32px) | Thin line stroke (2-3px) |
| Multiple particles per move | One point per move |
| Blurry cloud effect | Clean connected line |

