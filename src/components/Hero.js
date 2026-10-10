import React, { useState, useEffect } from 'react';
import ArakaBotMark from './ArakaBotMark';
import BabyArakaBotShell from './BabyArakaBotShell';

/* ─── Hero entry animation — LIVE-CAPTURED from x.ai/bot (T-25) ────────────
 * Two-phase choreography (measured 2026-09-03, samples @ ~110ms):
 *
 * Phase 1 — H1 spans (~0.2s → ~1.5s): each span starts at
 *   rotateX(50deg) translateY(27px) opacity 0 (perspective from h1) and
 *   settles flat + opaque with a fast-start/slow-settle curve
 *   (ease-out-quart feel: op 0.34@0.76s → 0.91@0.98s → 0.98@1.09s for
 *   span 1). Stagger ≈ 0.11s per span (span 2 trails by one step,
 *   visible at 0.87s: 0.74/0.56/0.28/0.0 across spans).
 *
 * Phase 2 — badge + subtitle + CTA (~1.05s → ~2.25s): all three animate
 *   TOGETHER (identical computed values at every sample): blur 12px→0,
 *   translateY +10→0 (badge/CTA) / −10→0 (subtitle), opacity 0→1,
 *   smooth ease-out ≈ 1.2s.
 *
 * The shell has NO entry animation (mount-fade only) — matches source.
 * Implementation: JS-driven per-element transitions (source mechanism);
 * spans use transition-delay, phase-2 uses a delayed class flip. */
function Hero() {
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setEntered(true); // reduced motion: render settled state immediately
      return;
    }
    const t = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(t);
  }, []);

  // Phase-1 per-span styles: settled vs start
  const spanStyle = (i, enteredState) => ({
    display: 'inline-block',
    position: 'relative',
    opacity: enteredState ? 1 : 0,
    transform: enteredState ? 'none' : 'rotateX(50deg) translateY(27px)',
    transformOrigin: '50% 100%',
    transition: `opacity 1.3s cubic-bezier(0.25, 1, 0.5, 1) ${i * 0.11}s, transform 1.3s cubic-bezier(0.25, 1, 0.5, 1) ${i * 0.11}s`,
  });

  // Phase-2 shared style: badge/sub/CTA animate together from ~1.05s
  const phase2Style = (fromY, enteredState) => ({
    opacity: enteredState ? 1 : 0,
    filter: enteredState ? 'blur(0px)' : 'blur(12px)',
    transform: enteredState ? 'translateY(0)' : `translateY(${fromY}px)`,
    transition: 'opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1) 1.05s, filter 1.2s cubic-bezier(0.22, 1, 0.36, 1) 1.05s, transform 1.2s cubic-bezier(0.22, 1, 0.36, 1) 1.05s',
  });

  return (
    <section id="hero">
      {/* Container width follows the header row (mx-auto w-full px-4 lg:px-6 xl:max-w-7xl) so the
          bot shell frame aligns edge-to-edge with the header content (user ask #2). All text items
          in this column are content-sized + centered, so they render exactly as before — only the
          w-full shell stretches. Source caps this container at --site-content-width; wider shell is
          the user's explicit override. */}
      <div className="mx-auto flex w-full flex-col items-center gap-12 px-4 pt-32 pb-20 text-center sm:gap-16 lg:px-6 sm:pt-[148px] sm:pb-28 xl:max-w-7xl">
        {/* Badge — phase 2 (own style; NOT a wrapper, so phase-1 spans animate independently) */}
        <div className="flex flex-col items-center">
          <span style={phase2Style(10, entered)} className="group/launch mx-auto inline-flex max-w-full items-center gap-1 rounded-full py-1.5 pe-1 ps-2 sm:gap-2.5 sm:pe-1.5 sm:ps-2.5 border-primary/[0.08] dark:bg-card/60 border backdrop-blur-sm hover:border-primary/15 dark:hover:bg-card transition-colors mb-4 sm:mb-5 cursor-default">
            <span className="border-sunset/45 text-sunset inline-flex shrink-0 items-center whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase leading-none tracking-wide">Early beta</span>
            <span className="text-[13px] tracking-tight whitespace-nowrap">
              <span className="text-primary font-semibold">Araka Bot is here</span>
              <span className="hidden sm:inline">
                <span className="text-primary/30"> • </span>
                <span className="text-primary/55 transition-colors">Read the launch post</span>
              </span>
            </span>
            <span className="bg-primary/[0.06] text-primary/60 flex w-6 h-6 shrink-0 items-center justify-center rounded-full transition-colors">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-3 h-3">
                <path d="M5 11 11 5M6.5 5H11v4.5" />
              </svg>
            </span>
          </span>

          {/* Heading — phase 1: per-span rotateX entrance (live-captured) */}
          <h1 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl" style={{perspective: '1200px'}}>
            <span style={spanStyle(0, entered)}>Meet</span>{' '}
            <span style={{...spanStyle(1, entered), verticalAlign: 'bottom'}}>
              <span aria-hidden="true" className="ml-[-0.04em] mr-[-0.14em] inline-block w-[1em] h-[1em] translate-y-[0.12em] align-baseline" style={{'--fg': 'hsl(var(--primary))', '--bg': 'hsl(var(--background))'}}>
                <span className="araka-bot-lazy">
                  <ArakaBotMark clipPathId="_r_hero_" />
                </span>
              </span>
            </span>{' '}
            <span style={spanStyle(2, entered)}>Araka</span>{' '}
            <span style={spanStyle(3, entered)}>Bot</span>
          </h1>

          {/* Subtitle — phase 2 (enters from above, per live capture) */}
          <p className="text-secondary mt-4 max-w-xl text-base leading-relaxed text-pretty sm:mt-5 sm:max-w-2xl sm:text-lg sm:leading-relaxed" style={phase2Style(-10, entered)}>
            AI teammates you can give real work to. Bots can sign in to your tools, use them just like you do, and come back with finished work.
          </p>

          {/* CTA — phase 2 */}
          <div className="mt-6 sm:mt-7" style={phase2Style(10, entered)}>
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center justify-center gap-2 md:gap-3">
                <span className="inline-flex items-center justify-center rounded-full transition-colors bg-primary hover:bg-primary-hover text-background h-9 px-4 text-sm font-normal md:h-11 md:px-6 md:text-base cursor-default">
                  Join Waitlist
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Shell — NO entry animation beyond mount-fade (live-verified).
            Full-bleed w-full inside the header-width container → frame edges match the header. */}
        <div className="w-full overflow-hidden">
          <div className="w-full rounded-3xl text-left media-border-container overflow-hidden hero-frame-edge">
            <div className="relative w-full h-[500px] sm:h-[560px] md:h-[660px]">
              <div className="relative h-full w-full">
                <div className="baby-araka-bot-mount-fade relative w-full overflow-hidden h-full">
                  <BabyArakaBotShell />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
