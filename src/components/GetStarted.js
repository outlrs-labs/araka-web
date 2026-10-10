import React from 'react';
import ArakaBotMark from './ArakaBotMark';
import { useScrollReveal } from '../hooks/useScrollReveal';

function GetStarted() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="get-started">
      <div ref={ref} className={`mx-auto w-full max-w-[var(--site-content-width)] px-4 pt-24 sm:px-6 sm:pt-32 scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
          <div className="flex flex-col items-center gap-3">
            <h2 className="font-display text-3xl tracking-tight text-balance sm:text-4xl">Meet your first Bot</h2>
            <p className="text-secondary text-sm leading-relaxed text-balance sm:text-base">An AI teammate you can trust to get work done</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <span className="inline-flex items-center justify-center rounded-full transition-colors bg-primary hover:bg-primary-hover text-background h-11 gap-1.5 px-6 text-base font-normal cursor-default">
                Join Waitlist
              </span>
            </div>
          </div>
        </div>
        {/* Source html.html L746-748: giant outline character at full content width
            (.footer-character = outline stroke + mask fade; the footer itself has no character) */}
        <div className="mt-16 sm:mt-20">
          <span className="araka-bot-lazy footer-character">
            <ArakaBotMark clipPathId="_r_getstarted_" />
          </span>
        </div>
      </div>
    </section>
  );
}

export default GetStarted;
