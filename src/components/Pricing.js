import React, { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

/* ─── Morph text (source html.html L539+: width-transition clip-path mechanism) ──
 * The source renders 2-3 text variants stacked; the active one is sharp and
 * in-flow (700ms), others are blurred/translated down (300ms). An invisible
 * span sets the container width, which transition-[width] animates.
 * The source cycles variants on hover; we do the same via mouseenter interval. */
function MorphText({ variants, active, className = '' }) {
  const [widths, setWidths] = useState([]);
  const refs = useRef([]);
  const variantsKey = variants.join('|');
  useEffect(() => {
    setWidths(refs.current.map(el => el ? el.getBoundingClientRect().width : 0));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variantsKey]);
  const current = Math.min(active, variants.length - 1);
  const w = widths.length ? widths[current] : undefined;
  return (
    <span
      className={`relative inline-block whitespace-nowrap transition-[width] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${className}`}
      style={{width: w !== undefined ? `${w}px` : undefined}}
    >
      <span aria-hidden="true" className="invisible whitespace-nowrap">
        <span ref={el => refs.current[0] = el}>{variants[0]}</span>
        {variants.slice(1).map((v, i) => <span key={v} ref={el => refs.current[i + 1] = el}>{v}</span>)}
      </span>
      <span className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {variants.map((v, i) => (
          <span
            key={v}
            className="absolute left-0 top-0 whitespace-nowrap transition-[transform,opacity,filter] ease-[cubic-bezier(0.23,1,0.32,1)]"
            style={{
              opacity: i === current ? 1 : 0,
              filter: i === current ? 'blur(0px)' : 'blur(2px)',
              transform: i === current ? 'translateY(0)' : 'translateY(45%)',
              transitionDuration: i === current ? '700ms' : '300ms',
            }}
          >
            {v}
          </span>
        ))}
      </span>
    </span>
  );
}

/* useMorph: hover-driven variant cycler (2.2s per variant, resets on leave) */
function useMorph(variantCount) {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  useEffect(() => {
    if (!hovering || variantCount < 2) return;
    const iv = setInterval(() => setActive(a => (a + 1) % variantCount), 2200);
    return () => clearInterval(iv);
  }, [hovering, variantCount]);
  return {
    active: hovering ? active : 0,
    handlers: {
      onMouseEnter: () => setHovering(true),
      onMouseLeave: () => { setHovering(false); setActive(0); },
    },
  };
}

/* Stacked feature lists — source: grid with col-start-1 row-start-1, one visible per plan variant */
function FeatureLists({ lists, active }) {
  return (
    <div className="grid flex-1">
      {lists.map((list, i) => (
        <ul key={i} className={`col-start-1 row-start-1 mt-3 grid content-start gap-2.5 ${i === active ? '' : 'invisible'}`}>
          {list.map(item => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <CheckIcon />
              <span className="text-secondary">{item}</span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

function Pricing() {
  const { ref, isVisible } = useScrollReveal();

  const araka = useMorph(3);          // Pro → Pro+ → Ultra
  const superAraka = useMorph(3);      // '' → Plus → Heavy
  const teams = useMorph(2);           // Standard → Premium

  return (
    <section id="pricing">
      <div ref={ref} className={`mx-auto flex w-full max-w-[var(--site-content-width)] flex-col gap-10 px-4 py-20 sm:px-6 sm:py-28 scroll-reveal ${isVisible ? 'visible' : ''}`}>
        {/* Section header */}
        <div className="flex flex-col items-center gap-6">
          <h2 className="font-display text-3xl tracking-tight text-balance sm:text-4xl text-center">Pricing</h2>
          <span className="inline-flex items-center justify-center rounded-full transition-colors bg-card text-foreground transition-[filter] hover:brightness-90 h-11 gap-1.5 px-6 text-base font-normal cursor-default">
            Contact sales
          </span>
        </div>

        {/* Pricing cards */}
        <div className="flex w-full flex-col items-center gap-4">
          <div className="grid w-full max-w-5xl gap-4 md:grid-cols-3">

            {/* Araka $20 — source card 1 */}
            <article className="bg-card flex flex-col rounded-3xl p-6 sm:p-8" {...araka.handlers}>
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-secondary text-sm font-medium">Araka</h3>
              </div>
              <p className="mt-3 flex min-w-0 items-baseline gap-1.5">
                <span className="font-display shrink-0 text-4xl font-medium tracking-tight">$20</span>
                <span className="text-secondary min-w-0 truncate text-sm">/ month</span>
              </p>
              <p className="text-secondary mt-1 text-sm">Billed monthly</p>
              <span className="inline-flex items-center justify-center rounded-full transition-colors bg-primary hover:bg-primary-hover text-background h-11 gap-1.5 px-6 text-base mt-6 w-full font-normal cursor-default">
                Get <MorphText variants={['Pro', 'Pro+', 'Ultra']} active={araka.active} />
              </span>
              <p className="text-primary mt-8 text-sm font-medium">Includes:</p>
              <FeatureLists
                active={araka.active}
                lists={[
                  [
                    'Araka Bot’s own computer',
                    'Signs into your tools',
                    'Routines on a schedule',
                    'Work anywhere: desktop, mobile, and more',
                    'Weekly Araka Bot usage included',
                  ],
                  [
                    'Araka Bot’s own computer',
                    'Signs into your tools',
                    'Routines on a schedule',
                    'Work anywhere: desktop, mobile, and more',
                    'Weekly Araka Bot usage included',
                  ],
                  [
                    'Araka Bot’s own computer',
                    'Signs into your tools',
                    'Routines on a schedule',
                    'Work anywhere: desktop, mobile, and more',
                    'Extended limits on AI tokens',
                  ],
                ]}
              />
            </article>

            {/* SuperAraka $30 — source card 2 (heading fixed: was "Araka") */}
            <article className="bg-card flex flex-col rounded-3xl p-6 sm:p-8" {...superAraka.handlers}>
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-secondary text-sm font-medium">SuperAraka</h3>
              </div>
              <p className="mt-3 flex min-w-0 items-baseline gap-1.5">
                <span className="font-display shrink-0 text-4xl font-medium tracking-tight">$30</span>
                <span className="text-secondary min-w-0 truncate text-sm">/ month</span>
              </p>
              <p className="text-secondary mt-1 text-sm">Billed monthly</p>
              <span className="inline-flex items-center justify-center rounded-full transition-colors bg-primary hover:bg-primary-hover text-background h-11 gap-1.5 px-6 text-base mt-6 w-full font-normal cursor-default">
                Get <MorphText variants={['SuperAraka', 'Plus', 'Heavy']} active={superAraka.active === 0 ? 0 : superAraka.active} />
              </span>
              <p className="text-primary mt-8 text-sm font-medium">
                <MorphText
                  variants={['Includes:', 'Everything in SuperAraka, plus:', 'Everything in SuperAraka, plus:']}
                  active={superAraka.active}
                />
              </p>
              <FeatureLists
                active={superAraka.active}
                lists={[
                  [
                    'Araka Bot access',
                    'Araka 4.6 model',
                    'Higher rate limits across all features',
                    'Expert',
                    'Image and video generation',
                    'Connectors',
                  ],
                  [
                    'Create 1080p videos',
                    'Significantly higher usage across Chat, Imagine, Voice & Build',
                    'Lightning-fast replies',
                    'Priority access at peak times',
                    'Early access to new features',
                  ],
                  [
                    'Highest usage at the fastest speed',
                    'Solve extremely hard problems',
                    'Most powerful intelligence',
                    'Dedicated support & early access',
                  ],
                ]}
              />
            </article>

            {/* Araka Teams $40 — source card 3 */}
            <article className="bg-card flex flex-col rounded-3xl p-6 sm:p-8" {...teams.handlers}>
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-secondary text-sm font-medium">Araka Teams</h3>
              </div>
              <p className="mt-3 flex min-w-0 items-baseline gap-1.5">
                <span className="font-display shrink-0 text-4xl font-medium tracking-tight">$40</span>
                <span className="text-secondary min-w-0 truncate text-sm">/ seat / month</span>
              </p>
              <p className="text-secondary mt-1 text-sm">Billed monthly</p>
              <span className="inline-flex items-center justify-center rounded-full transition-colors bg-card text-foreground transition-[filter] hover:brightness-90 h-11 gap-1.5 px-6 text-base font-normal mt-6 w-full cursor-default">
                Get <MorphText variants={['Standard', 'Premium']} active={teams.active} /> Teams
              </span>
              <p className="text-primary mt-8 text-sm font-medium">
                Everything in Araka <MorphText variants={['Pro+,', 'Ultra,']} active={teams.active} /> plus:
              </p>
              <FeatureLists
                active={teams.active}
                lists={[
                  [
                    'Centralized team billing and settings',
                    'Team marketplace for skills and plugins',
                    'Shared usage analytics',
                  ],
                  [
                    'Centralized team billing and settings',
                    'Team marketplace for skills and plugins',
                    'Shared usage analytics',
                    'SAML/OIDC SSO',
                  ],
                ]}
              />
            </article>
          </div>

          {/* Already on a plan banner */}
          <div className="bg-card flex w-full max-w-5xl flex-col items-center gap-4 rounded-3xl px-6 py-5 text-center sm:flex-row sm:flex-wrap sm:justify-between sm:px-8 sm:text-left">
            <span className="flex flex-col items-center gap-3 sm:flex-row">
              <svg width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block text-primary h-5 w-auto shrink-0">
                <path d="M13.374 20.5407L24.4555 12.3506C24.9988 11.9491 25.7753 12.1057 26.0342 12.7294C27.3966 16.0185 26.7879 19.9712 24.0772 22.6851C21.3666 25.3989 17.595 25.9941 14.1477 24.6386L10.3818 26.3843C15.7832 30.0806 22.3422 29.1665 26.4409 25.0601C29.692 21.8051 30.6989 17.3683 29.7574 13.3673L29.7659 13.3758C28.4006 7.49809 30.1016 5.14871 33.5859 0.344576C33.6683 0.230667 33.7508 0.116757 33.8333 0L29.2482 4.59055V4.57631L13.3712 20.5436" fill="currentColor" />
                <path d="M11.0867 22.5312C7.20979 18.8234 7.87821 13.0852 11.1862 9.77618C13.6323 7.3271 17.64 6.32755 21.1385 7.79698L24.8959 6.05986C24.219 5.57005 23.3514 5.04322 22.3559 4.67301C17.8562 2.81914 12.469 3.7418 8.81115 7.40114C5.29271 10.9238 4.18626 16.3402 6.08628 20.9621C7.5056 24.4164 5.17893 26.8597 2.8352 29.3259C2.00465 30.2001 1.17126 31.0744 0.5 31.9999L11.0838 22.534" fill="currentColor" />
              </svg>
              <span className="text-primary text-sm">Already on an eligible Araka, SuperAraka, or Teams plan? <span className="text-secondary">Araka Bot is included.</span></span>
            </span>
            <span className="bg-primary/5 text-primary hover:bg-primary/10 inline-flex shrink-0 items-center rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-default">
              Sign in with your plan
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-secondary mt-0.5 w-4 h-4 shrink-0">
      <path d="m3.5 8.5 3 3 6-6" />
    </svg>
  );
}

export default Pricing;
