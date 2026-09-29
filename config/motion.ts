/**
 * ─────────────────────────────────────────────────────────────
 *  MOTION CONTROL PANEL
 *  Every JavaScript animation on the site reads from this file.
 *  Change a value, save, and the browser updates instantly (npm run dev).
 *
 *  Hover effects and CSS transitions (buttons, underlines, marquee speed)
 *  are controlled at the top of app/globals.css → section "2. MOTION".
 * ─────────────────────────────────────────────────────────────
 */

export type MotionLevel = "subtle" | "balanced" | "bold";

export const motionConfig = {
  /** Master switch. false = no animations anywhere. */
  enabled: true,

  /** Overall intensity. "subtle" = shorter moves, "bold" = bigger + slower. */
  level: "balanced" as MotionLevel,

  /** Easing curve used by every animation. */
  ease: "cubic-bezier(0.22, 1, 0.36, 1)",

  /** Turn single effects on/off. */
  features: {
    headlineReveal: true, // "AI that earns your trust." slides up line by line
    underline: true, // teal hand-drawn line under "your trust."
    portraitReveal: true, // photo wipes in from the bottom
    portraitGrayscaleOnHover: true, // photo turns black & white on hover
    cvGrid: true, // TrustCV split diagram under the photo
    countUp: true, // 10+ / 18 / 5 count up
    magnetic: true, // buttons gently follow the cursor
    projectPreview: true, // floating card that follows the cursor on project rows
    scrollReveal: true, // content rises in as you scroll
    sectionRail: true, // 01–04 side navigation on wide screens
    pageTransition: true, // fade between pages
  },

  /** Durations in milliseconds (before the level multiplier). */
  duration: {
    reveal: 850,
    line: 1200,
    headline: 1100,
    underline: 1200,
    portrait: 1300,
    intro: 850,
    countUp: 1600,
    pageIn: 650,
    tabSwitch: 450,
  },

  /** How far elements travel when revealing, in px. */
  distance: {
    reveal: 26,
    intro: 16,
  },

  /** Hero intro timing: when each piece starts (ms after page load). */
  introDelay: {
    status: 0,
    name: 80,
    headline: 150,
    headlineStagger: 130,
    role: 700,
    description: 780,
    buttons: 880,
    tabs: 1000,
    underline: 950,
    portrait: 250,
    cvCard: 1200,
  },

  magnetic: {
    strength: 0.26, // 0 = no pull, 0.5 = strong pull
    range: 36, // px around the button where the pull starts
  },

  cvGrid: {
    stepMs: 1900, // time per fold
    participants: 8,
    samplesPerParticipant: 3,
  },

  preview: {
    follow: 0.14, // 0.05 = lazy, 0.3 = snappy
  },
};

const LEVELS: Record<MotionLevel, { duration: number; distance: number; magnet: number }> = {
  subtle: { duration: 0.8, distance: 0.55, magnet: 0.55 },
  balanced: { duration: 1, distance: 1, magnet: 1 },
  bold: { duration: 1.15, distance: 1.5, magnet: 1.45 },
};

/** Helper used by components. You normally don't need to edit this. */
export function getMotion() {
  const l = LEVELS[motionConfig.level];
  return {
    ...motionConfig,
    dur: (ms: number) => Math.round(ms * l.duration),
    dist: (px: number) => px * l.distance,
    magnetStrength: motionConfig.magnetic.strength * l.magnet,
  };
}
