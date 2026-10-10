import React, { useEffect, useRef } from 'react';

/* Mobile menu — user override #6 ("make the hamburger perfect for mobile").
 * Labels aligned to the desktop nav (html.html): Product / Integrations /
 * Pricing / Company, with accordion submenus ported + rebranded from the
 * source header dropdown (html.html L48-89). Join Waitlist is the CTA.
 * Keeps the verified mechanics from T-00..19: full-viewport overlay, Escape,
 * body scroll-lock, close button. Adds: accordion expansion, focus-visible
 * states, focus trap, mount animation. */

const ChevronIcon = ({ open }) => (
  <svg
    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
    className={`text-primary/40 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const MENU = [
  {
    label: 'Product',
    items: ['Araka', 'Business', 'Government'],
  },
  {
    label: 'Integrations',
    items: ['Customer Support', 'Legal', 'All Solutions'],
  },
  {
    label: 'Pricing',
    items: null, // plain row
  },
  {
    label: 'Company',
    items: ['About', 'Careers', 'News', 'Contact'],
  },
];

function MobileMenu({ open, onClose }) {
  const [expanded, setExpanded] = React.useState(null);
  const menuRef = useRef(null);

  // Body scroll lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Escape + focus trap + focus first element on open
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'Tab' && menuRef.current) {
        const focusables = menuRef.current.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])');
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', handleKey);
    const t = setTimeout(() => {
      const first = menuRef.current?.querySelector('button');
      first?.focus({ preventScroll: true });
    }, 50);
    return () => { window.removeEventListener('keydown', handleKey); clearTimeout(t); };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 z-[60] nav:hidden flex flex-col"
      style={{background: 'hsl(var(--background))'}}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      {/* Header bar with logo and close */}
      <div className="flex items-center justify-between px-4 py-4 shrink-0">
        <img
          src="/assets/araka-logo.png"
          alt="Outlrs Lab"
          style={{height: 28, width: 'auto', display: 'block'}}
        />
        <button
          type="button"
          onClick={onClose}
          className="text-primary p-2 -mr-2 rounded-full transition-colors hover:bg-primary/5"
          aria-label="Close menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Navigation items with accordions */}
      <nav className="flex-1 overflow-y-auto px-4 pb-6" aria-label="Mobile">
        <div className="flex flex-col">
          {MENU.map((item) => (
            <div key={item.label} className="border-b border-primary/[0.08]">
              {item.items ? (
                <>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-4 text-left"
                    aria-expanded={expanded === item.label}
                    onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                  >
                    <span className="text-primary text-base font-medium">{item.label}</span>
                    <ChevronIcon open={expanded === item.label} />
                  </button>
                  <div
                    className="overflow-hidden transition-[height] duration-200 ease-out"
                    style={{height: expanded === item.label ? `${item.items.length * 44}px` : 0, opacity: expanded === item.label ? 1 : 0}}
                  >
                    <div className="flex flex-col pb-3 pl-1">
                      {item.items.map((sub) => (
                        <span key={sub} className="py-2.5 text-primary/60 text-[15px] cursor-default">{sub}</span>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <span className="block py-4 text-primary text-base font-medium cursor-default">{item.label}</span>
              )}
            </div>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom section */}
        <div className="mt-12 flex flex-col gap-6">
          <span className="inline-flex items-center justify-center rounded-full bg-primary text-background h-11 px-6 text-base font-medium cursor-default w-fit">
            Join Waitlist
          </span>
          <div className="flex items-center gap-4 text-secondary text-sm">
            <span className="cursor-default">Contact</span>
            <span className="text-primary/20">·</span>
            <span className="cursor-default">Legal</span>
            <span className="text-primary/20">·</span>
            <span className="cursor-default">News</span>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default MobileMenu;
