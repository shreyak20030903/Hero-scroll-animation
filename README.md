# Scroll-Driven Hero Section Animation

A hero section where a car drives across the screen as you scroll. Built for the "Scroll-Driven Hero Section Animation" assignment, inspired by the reference demo.

- **Live demo:** https://shreyak20030903.github.io/Hero-scroll-animation/
- **Repository:** https://github.com/shreyak20030903/Hero-scroll-animation

## Tech stack

- HTML, CSS, JavaScript
- React (Vite)
- Tailwind CSS v4
- GSAP + ScrollTrigger

## Features

- Letter-spaced headline and four impact stats in the first screen.
- **Load animation:** headline letters stagger in, then the stats appear one by one.
- **Scroll animation:** the hero is pinned and a single GSAP timeline is scrubbed by scroll progress. The car travels across the screen, the wheels spin, the headline letters light up as the car passes, and the stats drift down slightly.
- `scrub: 1` adds one second of smoothing so the motion follows the scroll fluidly.
- Respects `prefers-reduced-motion`.

## Performance notes

- Movement uses `transform` (the car and stats) and `opacity` (the intro). The headline letters also animate `color`, which triggers repaint but no layout reflow.
- Wheel rotation is applied through the SVG `transform` attribute so each wheel spins around its own centre.
- Pixel values are recalculated only on resize (`invalidateOnRefresh`), not on every scroll event.

## Run locally

```bash
npm install
npm run dev
```

## Build and deploy to GitHub Pages

```bash
npm run deploy
```

This builds the project and pushes `dist/` to the `gh-pages` branch. Then open the repo's Settings > Pages and set the source to the `gh-pages` branch.

## Project structure

```
src/
  App.jsx               page wrapper
  index.css             Tailwind import and theme colours/fonts
  components/
    Hero.jsx            layout, load animation, scroll timeline
    Car.jsx             inline SVG car and wheels
```
