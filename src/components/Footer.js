import React from 'react';

/* Source: html.html L753-818.
 * Structure: brand column (wordmark + © 2026) | vertical dashed divider (lg) |
 * 5-slot grid with only 2 populated columns (Solutions, Company).
 * User overrides: NO theme toggle here (stays in header, left of Join Waitlist);
 * "Built with [brand]" pill dropped (x.ai promo; self-referential if rebranded).
 * Rebrand: links are non-navigating spans (same convention as the rest of the clone). */
function Footer() {
  return (
    <footer>
      <div className="mx-auto w-full px-4 lg:px-6 xl:max-w-7xl border-border border-t pb-16 pt-10 max-lg:px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          {/* Brand column */}
          <div className="flex shrink-0 flex-col lg:w-[280px]">
            <div>
              <img
                src="/assets/araka-logo.png"
                alt="Outlrs Lab"
                style={{height: 32, width: 'auto', display: 'block'}}
              />
              <span className="text-secondary mt-5 block text-[10px] leading-none lg:mt-5">© 2026</span>
            </div>
          </div>

          {/* Vertical dashed divider (desktop only) */}
          <div className="border-primary/[0.1] hidden border-l border-dashed lg:block" />

          {/* Link grid — source: 5 slots, only 2 populated */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-3 md:gap-x-12 lg:ml-auto lg:grid-cols-5 lg:gap-x-14 lg:gap-y-10">
            <div className="flex flex-col gap-10" />
            <div className="flex flex-col gap-10">
              <div>
                <span className="text-primary/70 mb-1.5 block text-[13px] font-medium">Solutions</span>
                <div className="flex flex-col gap-1">
                  <span className="text-primary/50 hover:text-primary text-[13px] leading-relaxed transition-colors cursor-default">Product</span>
                  <span className="text-primary/50 hover:text-primary text-[13px] leading-relaxed transition-colors cursor-default">Integrations</span>
                  <span className="text-primary/50 hover:text-primary text-[13px] leading-relaxed transition-colors cursor-default">Pricing</span>
                  <span className="text-primary/50 hover:text-primary text-[13px] leading-relaxed transition-colors cursor-default">Company</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-10" />
            <div className="flex flex-col gap-10">
              <div>
                <span className="text-primary/70 mb-1.5 block text-[13px] font-medium">Company</span>
                <div className="flex flex-col gap-1">
                  <span className="text-primary/50 hover:text-primary text-[13px] leading-relaxed transition-colors cursor-default">FAQs</span>
                  <span className="text-primary/50 hover:text-primary text-[13px] leading-relaxed transition-colors cursor-default">Privacy Policy</span>
                  <span className="text-primary/50 hover:text-primary text-[13px] leading-relaxed transition-colors cursor-default">Terms Conditions</span>
                  <span className="text-primary/50 hover:text-primary text-[13px] leading-relaxed transition-colors cursor-default">Security</span>
                  <span className="text-primary/50 hover:text-primary text-[13px] leading-relaxed transition-colors cursor-default">Contact Us</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-10" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
