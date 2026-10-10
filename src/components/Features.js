import React, { useState, useEffect } from 'react';
import ArakaBotMark from './ArakaBotMark';
import { useScrollReveal } from '../hooks/useScrollReveal';

function Features() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="features">
      <div ref={ref} className={`mx-auto w-full px-4 lg:px-6 xl:max-w-7xl flex flex-col gap-10 py-20 sm:py-28 lg:gap-14 scroll-reveal ${isVisible ? 'visible' : ''}`}>
        {/* Section header */}
        <div className="mx-auto flex max-w-2xl flex-col gap-4 text-center">
          <h2 className="font-display text-3xl tracking-tight text-balance sm:text-4xl">Work with many Bots at once</h2>
          <p className="text-secondary text-base leading-relaxed text-pretty sm:text-lg sm:leading-relaxed">
            Create a Bot, give it a task, and add another when the work grows—one on a project, one on outbound, one on systems. AI teammates work in parallel, collaborate where it makes sense, and keep working 24/7.
          </p>
        </div>

        {/* Feature cards grid */}
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Card 1: Araka Bot works where you work */}
          <FeatureCard1 />

          {/* Card 2: Show a Bot how it's done */}
          <FeatureCard2 />

          {/* Card 3: Bots get smarter over time */}
          <FeatureCard3 />

          {/* Card 4: Connect the Bots */}
          <article className="bg-card flex flex-col overflow-hidden rounded-3xl p-6 sm:p-8">
            <h3 className="text-primary text-base leading-relaxed font-medium text-pretty">Connect the Bots</h3>
            <p className="text-secondary text-base leading-relaxed text-pretty">Put a few Bots in the same thread and they pass work between themselves. You watch them take action instead of approving every step.</p>
            <figure className="mt-auto pt-8">
              <div className="feature-card-stage">
                <div className="feature-card-snippet">
                  <div className="feature-take flex items-center justify-center py-4">
                    <AvatarRow />
                  </div>
                </div>
              </div>
            </figure>
          </article>
        </div>
      </div>
    </section>
  );
}

/* Feature 1: Remote Desktop — source-faithful with badge swap + cursor swap */
function FeatureCard1() {
  const [swapState, setSwapState] = useState(0); // 0=Working+bot cursor, 1=You're in control+You cursor

  useEffect(() => {
    const interval = setInterval(() => {
      setSwapState(prev => (prev + 1) % 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const isWorking = swapState === 0;

  return (
    <article className="bg-card flex flex-col overflow-hidden rounded-3xl p-6 sm:p-8">
      <h3 className="text-primary text-base leading-relaxed font-medium text-pretty">Araka Bot works where you work</h3>
      <p className="text-secondary text-base leading-relaxed text-pretty">Log Araka Bot in once. It uses your apps and websites just like you would, including the tools that are harder to navigate.</p>
      <figure className="mt-auto pt-8">
        <div className="feature-card-stage">
          <div className="feature-card-snippet">
            <div className="baby-araka-bot transition-opacity duration-300 ease-out" data-theme="araka-dark" style={{
              '--araka-bot-current-agent-tint': 'light-dark(var(--color-brand-magenta-350), var(--color-brand-magenta-450))',
              '--araka-bot-current-agent-bubble': 'light-dark(var(--color-brand-magenta-450), var(--color-brand-magenta-350))',
              '--araka-bot-current-agent-bubble-ink': '#FFFFFF',
              '--araka-bot-current-agent-accent': 'light-dark(var(--color-brand-magenta-450), var(--color-brand-magenta-350))',
              '--araka-bot-current-agent-coat': '#EB4699',
            }}>
              <div className="baby-araka-bot-card">
                <div className="flex items-start gap-2">
                  <span className="baby-araka-bot-card-title">Computer</span>
                  <span className="flex-1" />
                  {/* Badge swap — matches source feature-swap feature-badge-swap structure */}
                  <span className="feature-swap feature-badge-swap" style={{justifyItems: 'end'}}>
                    <span data-hidden={isWorking ? '' : undefined} style={{opacity: isWorking ? 0 : 1, transition: 'opacity 0.26s', gridArea: '1/1'}}>
                      <span className="baby-araka-bot-card-badge" data-tone="warning">
                        <span className="baby-araka-bot-card-badge__dot" />
                        You're in control
                      </span>
                    </span>
                    <span data-hidden={!isWorking ? '' : undefined} style={{opacity: isWorking ? 1 : 0, transition: 'opacity 0.26s', gridArea: '1/1'}}>
                      <span className="baby-araka-bot-card-badge" data-tone="warning">
                        <span className="baby-araka-bot-spinner" style={{display: 'inline-flex', width: 12, height: 12}}>
                          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                            <path d="M8 1.5A6.5 6.5 0 1 1 1.5 8" />
                          </svg>
                        </span>
                        Working
                      </span>
                    </span>
                  </span>
                </div>
                <p className="mt-0.5">Sign in to Zendesk so I can work the support queue.</p>
                <div className="feature-handover__screen mt-2.5">
                  <div className="feature-take">
                    <div className="group/desktop relative max-h-full w-full overflow-hidden rounded-md" style={{aspectRatio: '16/10', '--rd-base-width': '360px', '--rd-base-height': '225px', '--rd-content-scale': '1.4333333333333333'}}>
                      {/* Wallpaper — source: cloud-agents-1 (light) + cloud-agents-4 (dark) */}
                      <img alt="" className="absolute inset-0 h-full w-full object-cover remote-desktop-wallpaper remote-desktop-wallpaper--light" draggable="false" src="assets/Cloud Agents 1.webp" />
                      <img alt="" className="remote-desktop-wallpaper remote-desktop-wallpaper--dark absolute inset-0 h-full w-full object-cover" draggable="false" src="assets/Cloud Agents 4.webp" />
                      {/* Inner app window */}
                      <div className="rd-interactive absolute touch-none overflow-hidden rounded-[5px] !overflow-visible" style={{top: '7%', left: '18%', width: '64%', height: '60%', zIndex: 4, boxShadow: 'rgba(0, 0, 0, 0.14) 0px 3px 12px, rgba(0, 0, 0, 0.1) 0px 0px 0px 0.5px', background: 'var(--color-theme-bg)'}}>
                        <div className="flex origin-top-left flex-col" style={{width: 'calc(var(--rd-base-width, 100%) * 0.64)', height: 'calc(var(--rd-base-height, 100%) * 0.6)', transform: 'scale(var(--rd-content-scale, 1))'}}>
                          <div className="flex h-full w-full flex-col">
                            {/* Window chrome — 3 dots */}
                            <div className="flex h-[11px] shrink-0 items-center gap-[2px] px-[4px]" style={{borderBottom: '0.5px solid color-mix(in srgb, var(--color-theme-fg) 8%, transparent)'}}>
                              <div className="h-[3px] w-[3px] rounded-full" style={{backgroundColor: 'var(--color-theme-fg)', opacity: 0.15}} />
                              <div className="h-[3px] w-[3px] rounded-full" style={{backgroundColor: 'var(--color-theme-fg)', opacity: 0.15}} />
                              <div className="h-[3px] w-[3px] rounded-full" style={{backgroundColor: 'var(--color-theme-fg)', opacity: 0.15}} />
                            </div>
                            {/* Search bar */}
                            <div className="flex h-[9px] shrink-0 items-center justify-center" style={{borderBottom: '0.5px solid color-mix(in srgb, var(--color-theme-fg) 8%, transparent)'}}>
                              <div className="h-[4px] w-[36%] rounded-full" style={{backgroundColor: 'color-mix(in srgb, var(--color-theme-fg) 5%, transparent)'}} />
                            </div>
                            {/* Content area — left sidebar + main + right panel */}
                            <div className="flex min-h-0 flex-1">
                              {/* Left sidebar */}
                              <div className="flex w-[17%] shrink-0 flex-col gap-[7px] px-[5px] py-[7px]" style={{borderRight: '0.5px solid color-mix(in srgb, var(--color-theme-fg) 8%, transparent)', backgroundColor: 'color-mix(in srgb, var(--color-theme-fg) 2%, transparent)'}}>
                                <div className="flex flex-col gap-[5px]">
                                  <div className="h-[3px] shrink-0 rounded-full" style={{width: '64%', backgroundColor: 'var(--color-theme-fg)', opacity: 0.09}} />
                                  <div className="h-[3px] shrink-0 rounded-full" style={{width: '46%', backgroundColor: 'var(--color-theme-fg)', opacity: 0.09}} />
                                  <div className="h-[3px] shrink-0 rounded-full" style={{width: '72%', backgroundColor: 'var(--color-theme-fg)', opacity: 0.09}} />
                                </div>
                                <div className="flex flex-col gap-[5px]">
                                  <div className="h-[3px] shrink-0 rounded-full" style={{width: '52%', backgroundColor: 'var(--color-theme-fg)', opacity: 0.09}} />
                                  <div className="h-[3px] shrink-0 rounded-full" style={{width: '68%', backgroundColor: 'var(--color-theme-fg)', opacity: 0.09}} />
                                </div>
                              </div>
                              {/* Main content area */}
                              <div className="flex min-w-0 flex-1 flex-col px-[7px] py-[7px]">
                                {/* Search + filter row */}
                                <div className="relative flex items-center gap-[5px] pb-[6px]">
                                  <div className="flex h-[8px] min-w-0 flex-1 items-center gap-[3px] rounded-full px-[4px]" style={{border: '0.5px solid color-mix(in srgb, var(--color-theme-fg) 8%, transparent)', backgroundColor: 'color-mix(in srgb, var(--color-theme-fg) 3%, transparent)'}}>
                                    <span className="h-[3px] w-[3px] shrink-0 rounded-full" style={{border: '0.5px solid var(--color-theme-fg)', opacity: 0.3}} />
                                    <div className="h-[3px] shrink-0 rounded-full" style={{width: '30%', backgroundColor: 'var(--color-theme-fg)', opacity: 0.08}} />
                                  </div>
                                  <div className="relative shrink-0">
                                    <div data-desk="view" className="flex h-[8px] items-center gap-[3px] rounded-full px-[4px]" style={{border: '0.5px solid color-mix(in srgb, var(--color-theme-fg) 8%, transparent)', backgroundColor: 'color-mix(in srgb, var(--color-theme-fg) 4%, transparent)'}}>
                                      <div className="h-[3px] shrink-0 rounded-full" style={{width: 20, backgroundColor: 'var(--color-theme-fg)', opacity: 0.18}} />
                                      <span className="h-[2px] w-[2px] rotate-45" style={{borderRight: '0.5px solid var(--color-theme-fg)', borderBottom: '0.5px solid var(--color-theme-fg)', opacity: 0.35}} />
                                    </div>
                                  </div>
                                </div>
                                {/* List + right panel */}
                                <div className="flex min-h-0 flex-1">
                                  {/* List rows */}
                                  <div className="flex min-w-0 flex-1 flex-col gap-[1px]">
                                    {[
                                      /* Source html.html rows: 5 rows; row 2 = data-desk="ticket" active (line opacity 0.2);
                                         search row above = data-desk="view"; macro toggle = data-desk="macro" */
                                      {w: '38%', op: 0.32, lineOp: 0.12, bgOp: 11},
                                      {w: '55%', op: 0.32, lineOp: 0.2, bgOp: 11, active: true, desk: 'ticket'},
                                      {w: '31%', op: 0.12, lineOp: 0.12, bgOp: 5},
                                      {w: '47%', op: 0.12, lineOp: 0.12, bgOp: 5},
                                      {w: '26%', op: 0.32, lineOp: 0.12, bgOp: 11},
                                    ].map((row, i) => (
                                      <div key={i} data-desk={row.desk} className="flex items-center gap-[5px] rounded-[2px] px-[3px] py-[3px] transition-colors duration-200" style={row.active ? {backgroundColor: 'color-mix(in srgb, var(--color-theme-fg) 7%, transparent)'} : {}}>
                                        <span className="h-[4px] w-[4px] shrink-0 rounded-full" style={{backgroundColor: 'var(--color-theme-fg)', opacity: row.op}} />
                                        <div className="h-[3px] shrink-0 rounded-full" style={{width: row.w, backgroundColor: 'var(--color-theme-fg)', opacity: row.lineOp}} />
                                        <span className="ml-auto h-[6px] w-[14px] shrink-0 rounded-full" style={{backgroundColor: `color-mix(in srgb, var(--color-theme-fg) ${row.bgOp}%, transparent)`}} />
                                      </div>
                                    ))}
                                  </div>
                                  {/* Right panel (40%) — matches source */}
                                  <div className="flex w-[40%] shrink-0 flex-col gap-[5px] px-[6px] py-[5px]" style={{borderLeft: '0.5px solid color-mix(in srgb, var(--color-theme-fg) 8%, transparent)'}}>
                                    <div className="h-[3px] shrink-0 rounded-full" style={{width: '62%', backgroundColor: 'var(--color-theme-fg)', opacity: 0.18}} />
                                    <div className="flex flex-col gap-[3px]">
                                      <div className="h-[3px] shrink-0 rounded-full" style={{width: '94%', backgroundColor: 'var(--color-theme-fg)', opacity: 0.08}} />
                                      <div className="h-[3px] shrink-0 rounded-full" style={{width: '78%', backgroundColor: 'var(--color-theme-fg)', opacity: 0.08}} />
                                    </div>
                                    {/* Macro toggle — source data-desk="macro" */}
                                    <div className="flex items-center gap-[4px]">
                                      <div data-desk="macro" className="flex h-[8px] items-center rounded-full px-[4px] transition-colors duration-300" style={{backgroundColor: 'var(--color-theme-fg)', opacity: 0.85}}>
                                        <div className="h-[3px] w-[18px] rounded-full" style={{backgroundColor: 'var(--color-theme-bg)', opacity: 0.9}} />
                                      </div>
                                      <span className="ml-auto h-[8px] w-[20px] rounded-full" style={{backgroundColor: 'color-mix(in srgb, var(--color-theme-fg) 6%, transparent)'}} />
                                    </div>
                                    {/* Bordered content block */}
                                    <div className="flex flex-col gap-[3px] rounded-[3px] px-[5px] py-[5px]" style={{border: '0.5px solid color-mix(in srgb, var(--color-theme-fg) 8%, transparent)', backgroundColor: 'color-mix(in srgb, var(--color-theme-fg) 2%, transparent)'}}>
                                      <div className="h-[3px] shrink-0 rounded-full" style={{width: '92%', backgroundColor: 'var(--color-theme-fg)', opacity: 0.16}} />
                                      <div className="h-[3px] shrink-0 rounded-full" style={{width: '84%', backgroundColor: 'var(--color-theme-fg)', opacity: 0.16}} />
                                      <div className="h-[3px] shrink-0 rounded-full" style={{width: '61%', backgroundColor: 'var(--color-theme-fg)', opacity: 0.16}} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Cursor — swaps between bot avatar cursor and "You" cursor */}
                    <div className="feature-pointer pointer-events-none absolute z-30 origin-top-left" style={{left: '65.9%', top: '39%', transform: 'translateX(-1.3px) translateY(-2px) scale(0.75)'}}>
                      <span className="feature-swap">
                        {/* State 1: Bot avatar cursor (visible when Working) */}
                        <span style={{opacity: isWorking ? 1 : 0, transition: 'opacity 0.2s', gridArea: '1/1'}}>
                          <div className="relative h-[18px] w-[18px]">
                            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="-scale-x-100 drop-shadow-[0_0.5px_1px_rgba(0,0,0,0.3)] shrink-0 transition-opacity duration-200">
                              <path fillRule="evenodd" clipRule="evenodd" d="M14.4775 2.375C15.1508 2.37522 15.5719 3.10428 15.2353 3.6875L8.63861 15.1143C8.19099 15.8892 7.00618 15.5716 7.00579 14.6768V7.56348L0.845638 4.00781C0.0708241 3.56015 0.388339 2.37535 1.28314 2.375H14.4775ZM7.69329 6.51758C8.04109 6.7186 8.25579 7.09044 8.25579 7.49219V13.2764L13.8271 3.625H2.68353L7.69329 6.51758Z" fill="white" />
                              <path d="M7.69329 6.51758C8.04109 6.7186 8.25579 7.09044 8.25579 7.49219V13.2764L13.8271 3.625H2.68353L7.69329 6.51758Z" fill="var(--araka-bot-current-agent-coat, #885cf5)" />
                            </svg>
                            {/* Bot avatar circle */}
                            <span className="absolute top-[12px] left-[11px] flex size-[16px] items-center justify-center overflow-hidden rounded-full border-[1.5px] border-white drop-shadow-[0_0.5px_1px_rgba(0,0,0,0.3)]" style={{'--fg': 'var(--araka-bot-current-agent-coat, #885cf5)', '--bg': '#fff'}}>
                              <ArakaBotMark showEyes={false} clipPathId="_r_avatar_" />
                            </span>
                          </div>
                        </span>
                        {/* State 2: Regular cursor with "You" tag (visible when You're in control) */}
                        <span data-hidden={isWorking ? '' : undefined} style={{opacity: isWorking ? 0 : 1, transition: 'opacity 0.2s', gridArea: '1/1'}}>
                          <div className="flex items-start gap-0">
                            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="-scale-x-100 drop-shadow-[0_0.5px_1px_rgba(0,0,0,0.3)] shrink-0 transition-opacity duration-200">
                              <path fillRule="evenodd" clipRule="evenodd" d="M14.4775 2.375C15.1508 2.37522 15.5719 3.10428 15.2353 3.6875L8.63861 15.1143C8.19099 15.8892 7.00618 15.5716 7.00579 14.6768V7.56348L0.845638 4.00781C0.0708241 3.56015 0.388339 2.37535 1.28314 2.375H14.4775ZM7.69329 6.51758C8.04109 6.7186 8.25579 7.09044 8.25579 7.49219V13.2764L13.8271 3.625H2.68353L7.69329 6.51758Z" fill="white" />
                              <path d="M7.69329 6.51758C8.04109 6.7186 8.25579 7.09044 8.25579 7.49219V13.2764L13.8271 3.625H2.68353L7.69329 6.51758Z" fill="#1a1a1a" />
                            </svg>
                            <span className="feature-pointer__tag">You</span>
                          </div>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </figure>
    </article>
  );
}

/* Feature 2: Recording — source-faithful with inner app, bar chart, toolbar, cards */
function FeatureCard2() {
  return (
    <article className="bg-card flex flex-col overflow-hidden rounded-3xl p-6 sm:p-8">
      <h3 className="text-primary text-base leading-relaxed font-medium text-pretty">Show a Bot how it's done</h3>
      <p className="text-secondary text-base leading-relaxed text-pretty">Ask a Bot to follow along as you complete a workflow once. It saves it as a routine and runs it on its own next time.</p>
      <figure className="mt-auto pt-8">
        <div className="feature-card-stage">
          <div className="feature-card-snippet">
            <div className="feature-recording" data-recording>
              {/* Recording bar — grid overlay with two states */}
              <div className="feature-recording__bar">
                {/* State 1: Active recording */}
                <div>
                  <span className="feature-recording__label">Weekly Reporting is watching and learning</span>
                  <span className="feature-recording__timer">
                    <span className="feature-recording__dot" aria-hidden="true" />
                    0:04
                  </span>
                  <span className="feature-recording__close" aria-hidden="true">
                    <span className="shrink-0 inline-flex items-center justify-center" style={{fontSize: 8, lineHeight: 1, width: 8, height: 8}}>
                      <svg width="8" height="8" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                    </span>
                  </span>
                </div>
                {/* State 2: Teach a task (hidden by default) */}
                <div data-hidden>
                  <span className="feature-recording__label" />
                  <span className="feature-recording__teach">
                    <span className="feature-recording__record" aria-hidden="true" />
                    Teach a task
                  </span>
                </div>
              </div>

              {/* Recording screen with red glow */}
              <div className="feature-recording__screen">
                <div className="feature-take">
                  <div className="group/desktop relative max-h-full w-full overflow-hidden rounded-md" style={{aspectRatio: '16/10', '--rd-base-width': '360px', '--rd-base-height': '225px', '--rd-content-scale': '1.5'}}>
                    {/* Wallpaper — source: cloud-agents-2 (light) + cloud-agents-3 (dark; local substitute: 1920x1280 dark starfield) */}
                    <img alt="" className="absolute inset-0 h-full w-full object-cover remote-desktop-wallpaper remote-desktop-wallpaper--light" draggable="false" src="assets/Cloud Agents 2.webp" />
                    <img alt="" className="remote-desktop-wallpaper remote-desktop-wallpaper--dark absolute inset-0 h-full w-full object-cover" draggable="false" src="assets/Cloud Agents 1920x1280.webp" />

                    {/* Inner app window */}
                    <div className="rd-interactive absolute touch-none overflow-hidden rounded-[5px] !overflow-visible" style={{top: '9%', left: '16%', width: '68%', height: '80%', zIndex: 4, boxShadow: 'rgba(0,0,0,0.14) 0px 3px 12px, rgba(0,0,0,0.1) 0px 0px 0px 0.5px', background: 'var(--color-theme-bg)'}}>
                      <div className="flex origin-top-left flex-col" style={{width: 'calc(var(--rd-base-width, 100%) * 0.68)', height: 'calc(var(--rd-base-height, 100%) * 0.8)', transform: 'scale(var(--rd-content-scale, 1))'}}>
                        <div className="flex h-full w-full flex-col">
                          {/* Window chrome — 3 dots */}
                          <div className="flex h-[11px] shrink-0 items-center gap-[2px] px-[4px]" style={{borderBottom: '0.5px solid color-mix(in srgb, var(--color-theme-fg) 8%, transparent)'}}>
                            <div className="h-[3px] w-[3px] rounded-full" style={{backgroundColor: 'var(--color-theme-fg)', opacity: 0.15}} />
                            <div className="h-[3px] w-[3px] rounded-full" style={{backgroundColor: 'var(--color-theme-fg)', opacity: 0.15}} />
                            <div className="h-[3px] w-[3px] rounded-full" style={{backgroundColor: 'var(--color-theme-fg)', opacity: 0.15}} />
                          </div>

                          {/* Title bar */}
                          <div className="flex h-[9px] shrink-0 items-center justify-center" style={{borderBottom: '0.5px solid color-mix(in srgb, var(--color-theme-fg) 8%, transparent)'}}>
                            <div className="h-[4px] w-[36%] rounded-full" style={{backgroundColor: 'color-mix(in srgb, var(--color-theme-fg) 5%, transparent)'}} />
                          </div>

                          {/* Content area */}
                          <div className="relative flex min-h-0 flex-1">
                            {/* Sidebar */}
                            <div className="flex w-[18%] shrink-0 flex-col gap-[7px] px-[5px] py-[7px]" style={{borderRight: '0.5px solid color-mix(in srgb, var(--color-theme-fg) 8%, transparent)', backgroundColor: 'color-mix(in srgb, var(--color-theme-fg) 2%, transparent)'}}>
                              <div className="flex flex-col gap-[5px]">
                                {[62, 48, 70].map((w, i) => <div key={i} className="h-[3px] shrink-0 rounded-full" style={{width: `${w}%`, backgroundColor: 'var(--color-theme-fg)', opacity: 0.09}} />)}
                              </div>
                              <div className="flex flex-col gap-[5px]">
                                {[54, 66, 44].map((w, i) => <div key={i} className="h-[3px] shrink-0 rounded-full" style={{width: `${w}%`, backgroundColor: 'var(--color-theme-fg)', opacity: 0.09}} />)}
                              </div>
                            </div>

                            {/* Main content */}
                            <div className="flex min-w-0 flex-1 flex-col gap-[7px] px-[8px] py-[7px]">
                              {/* Toolbar row */}
                              <div className="relative flex items-center gap-[5px]">
                                <div className="h-[3px] shrink-0 rounded-full" style={{width: '26%', backgroundColor: 'var(--color-theme-fg)', opacity: 0.16}} />
                                <div className="relative ml-auto">
                                  <div className="flex h-[8px] items-center gap-[3px] rounded-full px-[4px]" style={{border: '0.5px solid color-mix(in srgb, var(--color-theme-fg) 8%, transparent)', backgroundColor: 'color-mix(in srgb, var(--color-theme-fg) 4%, transparent)'}}>
                                    <div className="h-[3px] shrink-0 rounded-full" style={{width: 18, backgroundColor: 'var(--color-theme-fg)', opacity: 0.18}} />
                                    <span className="h-[2px] w-[2px] rotate-45" style={{borderRight: '0.5px solid var(--color-theme-fg)', borderBottom: '0.5px solid var(--color-theme-fg)', opacity: 0.35}} />
                                  </div>
                                </div>
                                <div className="flex h-[8px] items-center gap-[2px] rounded-full px-[4px] transition-colors duration-300" style={{backgroundColor: 'var(--color-theme-fg)', opacity: 0.85}}>
                                  <div className="h-[3px] w-[16px] rounded-full" style={{backgroundColor: 'var(--color-theme-bg)', opacity: 0.9}} />
                                </div>
                              </div>

                              {/* 3-card grid */}
                              <div className="flex gap-[5px]">
                                {/* Source prompt.txt: card line pairs (46,62) (38,50) (52,44) */}
                                {[[46, 62], [38, 50], [52, 44]].map(([w1, w2], i) => (
                                  <div key={i} className="flex flex-1 flex-col gap-[4px] rounded-[3px] px-[5px] py-[5px]" style={{border: '0.5px solid color-mix(in srgb, var(--color-theme-fg) 8%, transparent)', backgroundColor: 'color-mix(in srgb, var(--color-theme-fg) 2%, transparent)'}}>
                                    <div className="h-[3px] shrink-0 rounded-full" style={{width: `${w1}%`, backgroundColor: 'var(--color-theme-fg)', opacity: 0.09}} />
                                    <div className="h-[3px] shrink-0 rounded-full" style={{width: `${w2}%`, backgroundColor: 'var(--color-theme-fg)', opacity: 0.2}} />
                                  </div>
                                ))}
                              </div>

                              {/* Bar chart */}
                              <div className="flex min-h-0 flex-1 items-end gap-[4px] pb-[5px]" style={{borderBottom: '0.5px solid color-mix(in srgb, var(--color-theme-fg) 10%, transparent)'}}>
                                {[64, 47, 78, 55, 86, 62, 94, 71, 83, 99].map((h, i) => (
                                  <div key={i} className="flex-1 rounded-t-[1px] transition-[height] duration-500 ease-out" style={{height: `${h}%`, backgroundColor: 'var(--color-theme-fg)', opacity: 0.14 + (i % 3) * 0.03}} />
                                ))}
                              </div>

                              {/* Footer dots */}
                              <div className="flex items-center gap-[6px]">
                                {[32, 26, 22].map((w, i) => (
                                  <div key={i} className="flex items-center gap-[3px]">
                                    <span className="h-[3px] w-[3px] rounded-full" style={{backgroundColor: 'var(--color-theme-fg)', opacity: 0.2}} />
                                    <div className="h-[3px] shrink-0 rounded-full" style={{width: w, backgroundColor: 'var(--color-theme-fg)', opacity: 0.08}} />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cursor with "You" tag — static, no swap */}
              <div aria-hidden="true" className="feature-pointer pointer-events-none absolute z-30 origin-top-left" style={{left: '78.2%', top: '29.7%', transform: 'translateX(-1.3px) translateY(-2px) scale(0.75)'}}>
                <div className="flex items-start gap-0">
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="-scale-x-100 drop-shadow-[0_0.5px_1px_rgba(0,0,0,0.3)] shrink-0 transition-opacity duration-200">
                    <path fillRule="evenodd" clipRule="evenodd" d="M14.4775 2.375C15.1508 2.37522 15.5719 3.10428 15.2353 3.6875L8.63861 15.1143C8.19099 15.8892 7.00618 15.5716 7.00579 14.6768V7.56348L0.845638 4.00781C0.0708241 3.56015 0.388339 2.37535 1.28314 2.375H14.4775ZM7.69329 6.51758C8.04109 6.7186 8.25579 7.09044 8.25579 7.49219V13.2764L13.8271 3.625H2.68353L7.69329 6.51758Z" fill="white" />
                    <path d="M7.69329 6.51758C8.04109 6.7186 8.25579 7.09044 8.25579 7.49219V13.2764L13.8271 3.625H2.68353L7.69329 6.51758Z" fill="#1a1a1a" />
                  </svg>
                </div>
                <span className="feature-pointer__tag">You</span>
              </div>
            </div>
          </div>
        </div>
      </figure>
    </article>
  );
}

/* Feature 3: Multi-message conversation transcript — source-faithful */
function FeatureCard3() {
  /* Source messages: plain agent bubbles (baby-araka-bot-md), system pills, user bubbles */
  const messages = [
    { type: 'agent', text: 'Acme replied on pricing, same thread as last quarter. I already had the context, so I answered without waiting on you.' },
    { type: 'agent', text: 'Noted for next time: they only sign annual, and Dana is the one who approves.' },
    { type: 'system-pill', label: 'Updated memory for', pillText: 'Account Manager', pillColor: '#885CF5' },
    { type: 'agent', text: 'The 36 drafts are sitting in the LinkedIn queue on my screen: recipient, opener, and a Draft badge on each. Nothing goes out until you\'ve had a look.' },
    { type: 'system-pill', label: 'Messages from', pillText: 'Chief', pillColor: '#885CF5' },
    { type: 'agent', text: 'Sent over the Acme + Globex threads and flagged the priority accounts. Both are folded into tonight\'s list.' },
  ];

  return (
    <article className="bg-card flex flex-col overflow-hidden rounded-3xl p-6 sm:p-8">
      <h3 className="text-primary text-base leading-relaxed font-medium text-pretty">Bots get smarter over time</h3>
      <p className="text-secondary text-base leading-relaxed text-pretty">Bots keep context and learn from each other. Show one a workflow today, hand off the project by Friday.</p>
      <figure className="mt-auto pt-8">
        <div className="feature-card-stage">
          <div className="feature-card-snippet">
            <div className="baby-araka-bot transition-opacity duration-300 ease-out motion-reduce:transition-none" data-theme="araka-dark" inert="" style={{
              '--araka-bot-current-agent-tint': 'light-dark(var(--color-brand-yellow-350), var(--color-brand-yellow-450))',
              '--araka-bot-current-agent-bubble': 'light-dark(var(--color-brand-yellow-450), var(--color-brand-yellow-350))',
              '--araka-bot-current-agent-bubble-ink': '#FFFFFF',
              '--araka-bot-current-agent-accent': 'light-dark(var(--color-brand-yellow-450), var(--color-brand-yellow-350))',
              '--araka-bot-current-agent-coat': '#F19D38',
            }}>
              <div className="feature-take flex h-[212px] flex-col justify-center overflow-hidden">
                <div style={{transform: 'none', transformOrigin: '50% 50% 0px'}}>
                  <div className="baby-araka-bot-transcript flex min-h-0 flex-1 flex-col overflow-y-auto justify-center px-3 py-2">
                    <div className="flex flex-col gap-1">
                      {messages.map((msg, i) => (
                        <div key={i} className="baby-araka-bot-entry-enter" style={{animationDelay: `${i * 0.08}s`, marginTop: i > 0 ? 12 : 0}}>
                          {msg.type === 'agent' && (
                            <div className="flex max-w-[min(560px,92%)] flex-col items-start">
                              <div className="relative">
                                <div className="baby-araka-bot-md px-3 py-2 text-[14px] leading-5 whitespace-pre-wrap" style={{background: 'var(--araka-bot-bubble-agent)', color: 'var(--araka-bot-text-primary)', borderRadius: 16, letterSpacing: '-0.15px'}}>
                                  <span>{msg.text}</span>
                                </div>
                              </div>
                            </div>
                          )}
                          {msg.type === 'system-pill' && (
                            <div className="flex min-w-0 items-center justify-center gap-1.5 overflow-hidden py-1 text-[13px] leading-4" style={{color: 'var(--araka-bot-text-secondary)'}}>
                              <span className="shrink-0">{msg.label}</span>
                              {/* Source: light-dark(color-mix(14%/62%, white/near-black), color-mix(22%/82%, dark/white)) */}
                              <span className="baby-araka-bot-system-pill" style={{background: `light-dark(color-mix(in srgb, ${msg.pillColor} 14%, rgb(255, 255, 255)), color-mix(in srgb, ${msg.pillColor} 22%, rgb(22, 22, 26)))`, color: `light-dark(color-mix(in srgb, ${msg.pillColor} 62%, rgb(16, 16, 20)), color-mix(in srgb, ${msg.pillColor} 82%, rgb(255, 255, 255)))`}}>
                                <span className="relative shrink-0" style={{width: 12, height: 12, display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}>
                                  <ArakaBotMark showEyes={false} clipPathId={`_r_feat3_pill_${i}_`} />
                                </span>
                                <span className="truncate">{msg.pillText}</span>
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </figure>
    </article>
  );
}

/* Avatar Row with expansion animation — source-faithful */
const AVATAR_ROW_AGENTS = [
  { name: 'Research', color: '#54B9A6', label: 'Asking Research…', bgColor: 'color-mix(in srgb, var(--color-brand-cyan-550) 32%, var(--color-theme-bg))', textColor: 'var(--color-brand-cyan-300)' },
  { name: 'Comms', color: '#885CF5', label: 'Looping in Comms…', bgColor: 'color-mix(in srgb, var(--color-brand-violet-550) 32%, var(--color-theme-bg))', textColor: 'var(--color-brand-violet-300)' },
  { name: 'Chief', color: '#EA4045', label: 'Sending to Chief…', bgColor: 'color-mix(in srgb, var(--color-brand-red-550) 32%, var(--color-theme-bg))', textColor: 'var(--color-brand-red-300)' },
  { name: 'Travel', color: '#F19D38', label: 'Pinging Travel…', bgColor: 'color-mix(in srgb, var(--color-brand-yellow-550) 32%, var(--color-theme-bg))', textColor: 'var(--color-brand-yellow-300)' },
];

function AvatarRow() {
  const [activeIdx, setActiveIdx] = useState(0); // Source: first pill (Research) is data-open="true"
  const agents = AVATAR_ROW_AGENTS;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % agents.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [agents.length]);

  return (
    <ul className="avatar-row" aria-hidden="true" style={{'--avatar-row-size': '2rem', '--avatar-row-morph': '400ms'}}>
      {agents.map((agent, i) => (
        <li
          key={agent.name}
          className="avatar-row__pill"
          data-open={i === activeIdx ? 'true' : undefined}
          style={{
            background: agent.bgColor,
            color: agent.textColor,
            boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${agent.textColor} 28%, var(--color-theme-bg))`,
            opacity: 1,
            /* Source html.html: z-index 4/3/2/1 (Research highest, first-open), falsifies ticket-15D's [2,3,4,3] */
            zIndex: [4, 3, 2, 1][i],
            transform: 'none',
          }}
        >
          <span className="avatar-row__chip" style={{'--fg': agent.color, '--bg': agent.bgColor, transform: 'none'}}>
            <ArakaBotMark showEyes={false} clipPathId={`_r_avatar_${agent.name}_`} state={agent.name === 'Chief' ? 'thinking' : 'idle'} />
          </span>
          <div className="avatar-row__spread" style={{width: i === activeIdx ? 131 : 0, transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)'}}>
            <span className="avatar-row__label" style={{opacity: i === activeIdx ? 1 : 0, transform: i === activeIdx ? 'none' : 'translateX(-6px)', transition: 'opacity 0.3s, transform 0.3s'}}>
              {agent.label}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Features;
