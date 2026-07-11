# Portfolio - Surya Dwi Saputra (Next.js + R3F Edition)

Rebuild of the intro/"Enter" screen using a real 3D stack instead of CSS
fake-3D, plus the full portfolio ported to React components.

## Stack

| Tool                    | What it's used for in this project                              |
|--------------------------|------------------------------------------------------------------|
| **Next.js 16** (App Router) | Project structure, routing, font optimization                |
| **React 19**             | Components                                                       |
| **Tailwind CSS v4**       | All layout/utility styling                                       |
| **Framer Motion**         | Hint-text breathing fade, mask-reveal transition, mobile menu, section scroll-reveals, count-up numbers |
| **GSAP**                  | The mechanical keycap's hover-lift and click/press timeline       |
| **React Three Fiber**     | Renders the actual WebGL 3D scene (base plate, switch, keycap)    |
| **Drei**                  | `RoundedBox`, `MeshTransmissionMaterial` (glass/acrylic look), `Sparkles`, `ContactShadows`, `Environment`/`Lightformer`, `Text` |
| **Lenis**                 | Smooth scroll on the portfolio, once the intro is dismissed       |

## Why this split

- **useFrame (R3F)** drives anything continuous every frame: the idle
  floating/breathing motion and the mouse-follow 3D tilt.
- **GSAP** drives anything discrete and triggered: hover lift and the
  multi-step mechanical press sequence (plunge → ripple → rebound → settle).
- **Framer Motion** owns everything at the DOM/overlay level: the hint text,
  the circular mask-reveal that wipes the intro away, the blur→sharp
  entrance of the portfolio, the mobile menu, and scroll-triggered reveals.
- **Lenis** takes over native scrolling only after the intro is dismissed,
  synced to GSAP's ticker so nothing fights over the animation frame.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm start
```

> Note: `next/font/google` fetches Space Grotesk & Playfair Display at
> build time, so an internet connection is required during `npm run build`
> (this is normal for any Next.js project using next/font/google).

## Where to look

```
src/
├─ app/
│  ├─ page.tsx                 # Orchestrates intro -> reveal -> portfolio
│  ├─ layout.tsx                # Fonts
│  └─ globals.css
├─ components/
│  ├─ intro/
│  │  ├─ IntroScreen.tsx        # Canvas + hint text + mask-reveal (Framer Motion)
│  │  └─ EnterKeycap3D.tsx      # The 3D keycap itself (R3F + Drei + GSAP)
│  ├─ SmoothScroll.tsx          # Lenis, driven by gsap.ticker
│  ├─ Navbar.tsx, Hero.tsx, About.tsx, Skills.tsx, Experience.tsx,
│  │  Projects.tsx, Certificates.tsx, Contact.tsx, Footer.tsx, ...
│  └─ SocialIcons.tsx           # Instagram/LinkedIn/TikTok/WhatsApp (hand-rolled SVG,
│                                 lucide-react no longer ships brand icons)
└─ lib/
   ├─ data.ts                   # All portfolio content in one place
   └─ icon-map.ts
```

## Customizing the keycap

Open `src/components/intro/EnterKeycap3D.tsx`:

- **Material / look**: tweak the `MeshTransmissionMaterial` props
  (`roughness`, `transmission`, `ior`, `color`, `attenuationColor`) for a
  more frosted or more glassy result.
- **Press feel**: the GSAP timeline in `handleClick` — adjust durations/
  eases per step, or add more steps.
- **Idle motion**: the `useFrame` block — amplitude/speed of the float and
  the mouse-tilt sensitivity (`* 0.18`, `* 0.22`, lerp factor `0.06`).
- **Lighting**: the `Lightformer`s inside `<Environment>` — no external HDR
  is fetched, so colors/positions are fully under your control.

## Deploying

This is a standard Next.js app - deploy to Vercel, Netlify, or any Node
host. It is **not** a static site anymore (unlike the previous plain
HTML/CSS/JS version), since Next.js + next/font + the app router expect a
Node runtime (or `next export` if you want a fully static build and are
okay losing next/font's build-time optimization).
