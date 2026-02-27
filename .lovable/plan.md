

# Fix Multiple UI Issues

## 1. Name visibility in light mode
The name (`h1`) in Hero uses default `text-foreground` which in light mode is `260 40% 10%` (dark purple) -- should be visible. The issue is likely the name blending with the light background. Add a subtle text shadow or ensure the name explicitly uses a dark color in light mode without changing the overall design.

**File**: `src/components/sections/Hero.tsx`
- Add a `text-shadow` or `drop-shadow` class to the `h1` so it stands out against both light and dark backgrounds

## 2. Mobile header layout fix
Currently on mobile, the hamburger menu is on the right (inside the Actions div) alongside the theme toggle and download button -- all bunched together.

**File**: `src/components/layout/Header.tsx`
- Move the hamburger button OUT of the actions div
- Place it as the first element in the nav (far left) on mobile, hidden on desktop
- Keep download + theme toggle in the right-side actions div
- Use `order` or restructure the flex layout for mobile only

Proposed mobile layout:
```text
[Hamburger]          [Download] [Theme Toggle]
```

Desktop stays unchanged (hamburger hidden, nav links in center, actions on right).

## 3. "Robotics Enthusiast" visibility in dark mode
The subtitle uses `text-primary` class. In dark mode, primary is `270 85% 65%` which may not contrast well. Increase its opacity or brightness slightly, or add a subtle glow/text-shadow so it pops in dark mode.

**File**: `src/components/sections/Hero.tsx`
- Add a `drop-shadow` or slight `text-shadow` with neon glow to the subtitle `<motion.p>` element

## 4. Remove "Get in Touch" and "View Projects" buttons from Hero
**File**: `src/components/sections/Hero.tsx`
- Delete the `<div className="flex flex-wrap justify-center gap-3">` block (lines 64-74) containing the two buttons

## 5. Footer and Contact section updates
Multiple changes across Footer and Contact:

### 5a. Remove "Experience" from footer navigation
**File**: `src/components/layout/Footer.tsx`
- Remove `{ label: 'Experience', href: '#experience' }` from the `navLinks` array

### 5b. Remove email, GitHub, LinkedIn, and location from below "Get in Touch" in Contact
**File**: `src/components/sections/Contact.tsx`
- Remove the entire `ScrollReveal delay={0.2}` block (lines 81-104) that contains MapPin, Mail, GitHub, and LinkedIn links

### 5c. Move location below "ARU" in Footer
**File**: `src/components/layout/Footer.tsx`
- Add a `<p>` with MapPin icon and city text below the "ARU" brand logo

### 5d. Remove Twitter, add Email icon in Footer social section
**File**: `src/components/layout/Footer.tsx`
- Remove the Twitter `<a>` block
- Add a `<a href="mailto:...">` with `Mail` icon from lucide-react

---

## Files to modify
| File | Changes |
|------|---------|
| `src/components/sections/Hero.tsx` | Add text shadow to name + subtitle; remove buttons |
| `src/components/layout/Header.tsx` | Restructure mobile layout (hamburger left, actions right) |
| `src/components/layout/Footer.tsx` | Remove Experience link; remove Twitter, add Email; add location below ARU |
| `src/components/sections/Contact.tsx` | Remove the info/social links block below the form |

