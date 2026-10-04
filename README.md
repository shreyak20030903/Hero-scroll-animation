# Scroll-Driven Hero Animation

Vite + React + Tailwind CSS v4 + GSAP (ScrollTrigger).

## Run locally
```bash
npm install
npm run dev
```

## Deploy to GitHub Pages
```bash
npm run deploy   # builds and pushes dist/ to the gh-pages branch
```
Then in the repo: Settings > Pages > Source: `gh-pages` branch.

## How it works
- **Load animation:** GSAP timeline, headline letters stagger in, then stats one by one.
- **Scroll animation:** one GSAP timeline with ScrollTrigger (`pin`, `scrub: 1`). Car travel, wheel spin, letter reveal and stats parallax are all tied to scroll progress.
- **Performance:** only transforms and opacity are animated; px values are recalculated only on resize (`invalidateOnRefresh`).
- **Accessibility:** respects `prefers-reduced-motion`.
