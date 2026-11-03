# Sourabh Ravi — Portfolio

A from-scratch React portfolio built with Vite, GSAP and ScrollTrigger.

## Stack

- React 19 + Vite
- GSAP 3 + ScrollTrigger
- Lucide React
- Responsive CSS with reduced-motion support

## Run locally

```bash
npm install
npm run dev
```

Create a production build:

```bash
npm run build
npm run preview
```

## Before publishing

Open `src/data.js` and update the `profile` object:

- `email`
- `github`
- `linkedin`
- `resume`
- `upwork`

These values are intentionally blank until the real URLs are supplied. Empty social links are not rendered.

Review the experience descriptions and project stack once more before publishing, especially role dates and any metrics you want to include.

## Animation architecture

`src/usePortfolioMotion.js` owns all motion:

1. The hero uses one entrance timeline on initial page load.
2. `[data-reveal]` elements use reversible ScrollTrigger actions (`play reverse play reverse`).
3. `[data-stagger]` groups animate their direct children in a coordinated sequence.
4. `[data-scrub]` elements are dedicated decorative layers tied to scroll progress.
5. GSAP matchMedia respects `prefers-reduced-motion`.
6. A scoped matchMedia context is reverted on unmount, cleaning up tweens and ScrollTriggers.

The design intentionally avoids applying reveal and scrub transforms to the same elements. This reduces transform conflicts, flicker and elements getting stuck in hidden states.
