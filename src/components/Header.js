import React, { useState, useEffect } from 'react';

const HamburgerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-[2]">
    <path fill="currentColor" d="M20 7H4V5H20V7ZM20 13H4V11H20V13ZM20 19H4V17H20V19Z" />
  </svg>
);

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

function Header({ mobileOpen, setMobileOpen, darkMode, setDarkMode }) {
  // Source (live-verified): header hairline is opacity 0 at top, fades to 1 on scroll
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="group fixed inset-x-0 top-0 z-50 duration-200">
      <div aria-hidden="true" className="bg-background/85 pointer-events-none absolute inset-0 -z-10" style={{WebkitBackdropFilter: 'blur(12px)', backdropFilter: 'blur(12px)'}} />
      <div className="mx-auto w-full px-4 lg:px-6 xl:max-w-7xl relative">
        {/* Hairline — live-verified source behavior: opacity 0 at top → 1 on scroll (200ms) */}
        <div
          aria-hidden="true"
          className="bg-border/50 pointer-events-none absolute inset-x-0 bottom-0 h-px transition-opacity duration-200"
          style={{opacity: scrolled ? 1 : 0}}
        />
        <nav className="flex items-center justify-between gap-4 py-4 nav:h-16">
          {/* Logo — araka logo in the source wordmark slot (32px height; nav rhythm per html.html).
              The source pulls its nav zone wider with inline margin-inline-end: -122px; the clone
              instead trims the zone so the ul's justify-center lands the nav at the true viewport
              center (user issue #1): offset = (logo + marginIE + zone ml-6 − right cluster) / 2,
              right cluster ≈ 36px toggle + 8px gap + ~115px unified pill. Measured + tuned in T-29. */}
          <span className="shrink-0 -translate-y-[1px]" style={{marginInlineEnd: '82px'}}>
            <span style={{WebkitTouchCallout: 'none'}} aria-label="Outlrs Lab Logo" className="-m-1 inline-flex cursor-pointer items-center justify-center p-1 outline-none">
              <img
                src="/assets/araka-logo.png"
                alt="Outlrs Lab"
                style={{height: 32, width: 'auto', display: 'block'}}
              />
            </span>
          </span>

          {/* Desktop Nav — html.html labels. Zone gets ml-6 + flex-grow per source; the ul centers
              within the zone and gaps at 1rem per css.css .ppclass (overrides .gap-10 later in the
              cascade). Links: text-sm (14px/20px per css.css L1993) + inline weight 900 per
              html.html L35-38 — ticket-13's "13px / 400" table row was a misread, corrected here. */}
          <div className="relative ml-6 hidden flex-grow nav:block">
            <ul className="flex items-center justify-center gap-4">
              <li><span className="text-primary/50 hover:text-primary flex items-center gap-1 px-3 py-1.5 text-sm font-medium transition-colors cursor-default" style={{fontWeight: 900}}>Product</span></li>
              <li><span className="text-primary/50 hover:text-primary flex items-center gap-1 px-3 py-1.5 text-sm font-medium transition-colors cursor-default" style={{fontWeight: 900}}>Integrations</span></li>
              <li><span className="text-primary/50 hover:text-primary flex items-center gap-1 px-3 py-1.5 text-sm font-medium transition-colors cursor-default" style={{fontWeight: 900}}>Pricing</span></li>
              <li><span className="text-primary/50 hover:text-primary flex items-center gap-1 px-3 py-1.5 text-sm font-medium transition-colors cursor-default" style={{fontWeight: 900}}>Company</span></li>
            </ul>
          </div>

          {/* Right side — user override: theme toggle sits immediately LEFT of the Join Waitlist pill */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="relative inline-flex shrink-0 items-center justify-center text-primary/60 hover:text-primary w-9 h-9 rounded-full transition-colors"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Unified pill CTA — user override #2 (T-30): the source's split pill
                (text half + divider + chevron half) collapses to a single pill. */}
            <div className="relative hidden nav:block">
              <span className="bg-primary text-background inline-flex items-center rounded-full py-2 pl-4 pr-3 text-sm font-medium transition-colors hover:bg-white/10 cursor-default">
                Join Waitlist
              </span>
            </div>

            {/* Mobile hamburger */}
            <div>
              <button
                type="button"
                className="relative isolate inline-flex shrink-0 items-center justify-center border-0 text-sm font-medium transition-colors duration-150 aspect-square gap-x-3 px-4 py-2 rounded-full bg-transparent text-primary ring-1 ring-primary/15 hover:bg-primary/5 visible nav:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                <HamburgerIcon />
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
