# Abdolamir Karbalaie: portfolio (Next.js, animated)

## Run it

You need Node.js 20 or newer (https://nodejs.org).

```bash
cd nextjs-portfolio
npm install
npm run dev
```

Open http://localhost:3000. Keep `npm run dev` running: every time you save a file, the browser updates by itself.

## Where to change things

- **Animations (timing, strength, on/off):** `config/motion.ts`. There's a master switch and a `level` setting ("subtle" | "balanced" | "bold"). Each effect has its own `true` / `false` switch.
- **Hover speeds, marquee speed, row slide distance:** the `2. MOTION` section at the top of `app/globals.css`.
- **Colours for the dark and light themes:** the `1. COLORS` section at the top of `app/globals.css`.
- **Name, email, links, CV, default theme:** `config/site.ts`.
- **Projects, expertise, stats, marquee names, hero tabs:** `lib/content.ts`.
- **Page text and layout:** `app/page.tsx` (home), `app/work/page.tsx`, `app/expertise/page.tsx`, `app/work/[slug]/page.tsx` (project pages).
- **Photo and CV files:** `public/images/profile.webp` and `public/cv/abdolamir-karbalaie-cv.pdf`. Replace a file but keep its name.

### Common edits

- **Turn off the floating project card:** in `config/motion.ts`, set `features.projectPreview: false`.
- **Make the marquee slower:** in `globals.css`, set `--marquee-duration: 80s`.
- **Make buttons pull harder:** in `config/motion.ts`, set `magnetic.strength: 0.4`.
- **Make everything calmer:** in `config/motion.ts`, set `level: "subtle"`.
- **Turn off every animation:** in `config/motion.ts`, set `enabled: false`.
- **Swap the black-and-white photo hover:** set `features.portraitGrayscaleOnHover: false`. To reverse it (black and white first, colour on hover), change `.portrait.bw-hover:hover` in `globals.css`.

## Where each animation lives

| Effect | File |
|---|---|
| Headline reveal, underline, photo wipe, hero tabs | `components/Hero.tsx` |
| TrustCV split diagram | `components/CVGrid.tsx` |
| Count-up stats | `components/CountUp.tsx` |
| Magnetic buttons | `components/Magnetic.tsx` |
| Project hover and floating preview | `components/ProjectList.tsx` + section 8 of `globals.css` |
| Scroll reveals (use `<Reveal>` anywhere) | `components/Reveal.tsx` |
| Scrolling institutions strip | `components/Marquee.tsx` + section 7 of `globals.css` |
| 01–04 side rail | `components/SectionRail.tsx` |
| Expertise accordion | `components/ExpertiseList.tsx` |
| Page transition | `app/template.tsx` |
| Theme toggle, mobile menu | `components/Header.tsx` |

To animate any new block as it scrolls into view:

```tsx
import Reveal from "@/components/Reveal";
<Reveal delay={100}>Your content</Reveal>
```

No animation libraries are used. Everything runs on built-in browser features (Web Animations API, IntersectionObserver and CSS transitions), so there's nothing extra to install. Visitors who turn on "Reduce motion" in their system settings get a still version automatically.

## Publish

- **Vercel (easiest):** push this folder to GitHub, then import it at vercel.com.
- **GitHub Pages or any static host:** in `next.config.mjs`, uncomment `output: "export"`, then run `npm run build`. Upload the `out/` folder.

## Merging into your existing repo (abdkar/MyProfilio)

This project is standalone, so it runs next to your current site without touching it. To replace the old design, copy `app/`, `components/`, `config/` and `lib/content.ts` into your repo. Keep your existing `public/` files, SEO metadata and tests. Your repo uses Tailwind, but this design uses plain CSS, and the two can run side by side.
