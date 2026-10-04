import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Car from './Car'

gsap.registerPlugin(ScrollTrigger)

const WORDS = ['WELCOME', 'ITZ', 'FIZZ']

const STATS = [
  { value: '58%', label: 'Faster order pick-up' },
  { value: '23%', label: 'Fewer customer phone calls' },
  { value: '27%', label: 'More repeat customers' },
  { value: '40%', label: 'Less waiting at the counter' },
]

export default function Hero() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // 1. LOAD ANIMATION: headline letters, then stats one by one
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('.letter', { autoAlpha: 0, y: 40, duration: 0.9, stagger: 0.06 })
        .from('.stat', { autoAlpha: 0, y: 28, duration: 0.8, stagger: 0.18 }, '-=0.3')

      if (reduceMotion) {
        gsap.set('.letter', { color: '#f2eeff' })
        return
      }

      // Wheels are spun with the native SVG transform attribute (not GSAP's
      // transform), so the pivot is always the wheel's own centre.
      const spin = { deg: 0 }
      const wheels = root.current.querySelectorAll('.wheel-spin')

      // 2. SCROLL ANIMATION: one timeline, scrubbed by scroll progress
      gsap
        .timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: '+=300%',
            pin: true,
            scrub: 1, // 1s smoothing = interpolated, fluid motion
            invalidateOnRefresh: true,
          },
        })
        // car drives from off-screen left to off-screen right
        .fromTo(
          '.car',
          { x: () => -root.current.querySelector('.car').getBoundingClientRect().width },
          { x: () => window.innerWidth, duration: 1 },
          0
        )
        // wheels spin in proportion to distance travelled
        .to(
          spin,
          {
            deg: 1080,
            duration: 1,
            onUpdate: () => {
              wheels.forEach((w) => w.setAttribute('transform', `rotate(${spin.deg})`))
            },
          },
          0
        )
        // letters light up as the car passes
        .to('.letter', { color: '#f2eeff', duration: 0.15, stagger: { amount: 0.75 } }, 0.05)
        // stats drift down slightly for parallax
        .to('.stats', { y: 60, duration: 1 }, 0)
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative h-screen overflow-hidden bg-dusk">
      <div className="flex h-full flex-col items-center px-6 pt-[14vh]">
        <h1
          aria-label="Welcome Itz Fizz"
          className="flex flex-wrap justify-center gap-x-[2.2em] gap-y-2 font-display text-[clamp(1.1rem,3.2vw,2.6rem)] font-semibold tracking-[0.45em]"
        >
          {WORDS.map((word) => (
            <span key={word} aria-hidden="true" className="whitespace-nowrap">
              {word.split('').map((ch, i) => (
                <span key={i} className="letter inline-block text-mist/20">
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <dl className="stats mt-[9vh] grid w-full max-w-4xl grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="stat">
              <dd className="font-display text-4xl md:text-5xl">{s.value}</dd>
              <dt className="mt-2 text-sm text-mist/70">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>

      {/* road + car */}
      <div className="absolute inset-x-0 bottom-0 h-[22vh] bg-road" />
      <Car className="car absolute bottom-[calc(22vh-3.5rem)] left-0 w-[min(520px,70vw)] will-change-transform" />
    </section>
  )
}
