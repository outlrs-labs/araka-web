import React, { useState, useRef, useEffect } from 'react';
import ArakaBotMark from './ArakaBotMark';

/* ─── Source-derived data ───────────────────────────────────────────────────
 * Sidebar roster per user override #4: exactly 5 people — Annie (active,
 * matching source), Robin, Araka, Krishna, Ananya. Role titles, times,
 * previews, and transcript content are ported from html.html (desktop
 * capture: Sales Outbound active chat) and mobile-responsive-of-shell/html1.html
 * (full transcript), re-attributed to these five people. Per T-32 (user issue
 * #4), every chat is a full multi-message transcript modeled on the Annie arc
 * — opener, user task, rename, connection check, action card, results,
 * cross-agent relay, user approval, routine/draft pill, status close — with
 * each roster preview verbatim as the closing agent line. Per T-33 (user
 * issue #5), the Talent Scout is renamed Krishna.
 *
 * Source role→person map (html.html): Chief→Akshay Broo · Sales Outbound→
 * Annie Kumari · Inbox Manager→Harsh Yadav · Account Manager→Robin.
 * html1 roster colors: Chief #54b9a6 · Sales Outbound #f19d38 · Inbox Manager
 * #6464ef · Account Manager #885cf5 · Talent Scout #3c82f6 · Expense Manager
 * #ed712e. Sidebar footer account chip (html.html): "AK" / Annie.
 */
const BOTS = [
  {
    name: 'Annie',
    role: 'Sales Outbound',
    color: '#F19D38',
    timestamp: '13:18',
    preview: "Checking what's connected. Hex, Gmail, and LinkedIn are already signed in. Salesforce isn't.",
    messages: [
      { type: 'timestamp', text: '13:18' },
      { type: 'agent', text: 'Hey, good to meet you. What do you want me around for? Anything concrete, or more of a general sidekick?' },
      { type: 'user', text: 'Overnight pipeline generation and outbound.\n\nPick eligible prospects from this Google Sheet, research them on the web, grab context on contacts and accounts from Hex, Sumble, and Salesforce. Draft email and LinkedIn sequences in my voice.' },
      { type: 'system-line', text: 'Renamed to Sales Outbound' },
      { type: 'agent', text: "Checking what's connected. Hex, Gmail, and LinkedIn are already signed in. Salesforce isn't." },
      { type: 'card', title: 'Computer', badge: 'Action needed', badgeTone: 'warning', text: 'Sign in to Salesforce so I can see the accounts you own.', portal: true },
      { type: 'agent', text: 'Salesforce → list pulled · 52 accounts ✓\nHex → 3 lookalike segments pulled ✓' },
      { type: 'system-pill', label: 'Messages from', pillText: 'Account Manager' },
      { type: 'agent', text: 'sent over the Acme + Globex threads and flagged the priority accounts. Both are folded into tonight’s list.' },
      { type: 'agent', text: "The 36 drafts are sitting in the LinkedIn queue on my screen: recipient, opener, and a Draft badge on each. Nothing goes out until you've had a look." },
      { type: 'user', text: 'The top 10 look good. Send it. Run this every week.' },
      { type: 'system-pill', label: 'Created routine', pillText: 'Overnight outbound' },
      { type: 'agent', text: 'Done.' },
    ],
  },
  {
    name: 'Robin',
    role: 'Account Manager',
    color: '#885CF5',
    timestamp: '8:18',
    preview: "invite's out to vicky. globex note held in drafts.",
    messages: [
      { type: 'system-line', text: 'Messages from Robin' },
      { type: 'agent', text: 'Morning. What do you want me on this week?' },
      { type: 'user', text: "Prep this week's account reviews. Pull the renewal list from Salesforce, check what moved with Acme and Globex, and draft follow-up notes in my voice." },
      { type: 'system-line', text: 'Renamed to Account Manager' },
      { type: 'agent', text: "Checking what's connected. Salesforce and Calendar are signed in. Hex isn't." },
      { type: 'card', title: 'Computer', badge: 'Action needed', badgeTone: 'warning', text: 'Connect Hex so I can pull the research on Acme and Globex from the shared space.', portal: true },
      { type: 'agent', text: 'Salesforce → 14 renewal accounts pulled ✓\nCalendar → 3 review slots held ✓\nHex → Acme + Globex research pulled ✓' },
      { type: 'system-pill', label: 'Messages from', pillText: 'Talent Scout' },
      { type: 'agent', text: 'The senior AE role you asked for is live. 3 intros drafted, held for the ok.' },
      { type: 'user', text: "Good. Book Vicky's renewal review and draft the Globex note." },
      { type: 'system-pill', label: 'Drafts ready', pillText: 'Globex follow-up' },
      { type: 'agent', text: "Vicky's booked for Thursday 2pm. The Globex note is drafted — renewal terms, the quiet month, the expansion question — with a Draft badge on it, nothing goes out until you've had a look." },
      { type: 'agent', text: "invite's out to vicky. globex note held in drafts." },
    ],
  },
  {
    name: 'Araka',
    role: 'Inbox Manager',
    color: '#6464EF',
    timestamp: '10:18',
    preview: 'sent. inbox at zero, 5 drafts parked for tomorrow.',
    messages: [
      { type: 'system-line', text: 'Messages from Araka' },
      { type: 'agent', text: 'Hey. What should I take off your plate?' },
      { type: 'user', text: "Run my inbox. Triage what's in there, answer what's routine in my voice, and park anything that needs me." },
      { type: 'system-line', text: 'Renamed to Inbox Manager' },
      { type: 'agent', text: "Checking what's connected. Gmail and Calendar are signed in. Slack isn't." },
      { type: 'card', title: 'Computer', badge: 'Action needed', badgeTone: 'warning', text: 'Connect Slack so I can see the channel pings that never make it to email.', portal: true },
      { type: 'agent', text: 'Gmail → 41 unread triaged ✓\nCalendar → 2 scheduling threads handled ✓\nSlack → 12 pings cleared ✓' },
      { type: 'system-pill', label: 'Messages from', pillText: 'Account Manager' },
      { type: 'agent', text: 'vicky confirmed thursday 2pm. globex is quiet — renewal note still in drafts.' },
      { type: 'user', text: 'Send the routine replies. Park anything strategic for tomorrow.' },
      { type: 'system-pill', label: 'Created routine', pillText: 'Daily inbox sweep' },
      { type: 'agent', text: 'sent. inbox at zero, 5 drafts parked for tomorrow.' },
    ],
  },
  {
    name: 'Krishna',
    role: 'Talent Scout',
    color: '#3C82F6',
    timestamp: 'Yesterday',
    preview: '3 intros drafted in your voice, held for your ok.',
    messages: [
      { type: 'system-line', text: 'Messages from Krishna' },
      { type: 'agent', text: 'Hey, good to meet you. What do you want me around for?' },
      { type: 'user', text: 'Sourcing. Find 3 strong candidates for the senior AE role, research their recent work, and draft intros in my voice.' },
      { type: 'system-line', text: 'Renamed to Talent Scout' },
      { type: 'agent', text: "Checking what's connected. LinkedIn and Gmail are signed in. Greenhouse isn't." },
      { type: 'card', title: 'Computer', badge: 'Action needed', badgeTone: 'warning', text: 'Sign in to Greenhouse so I can see the pipeline and where each candidate sits.', portal: true },
      { type: 'agent', text: 'LinkedIn → 3 candidates pulled ✓\nGreenhouse → pipeline matched, none in process ✓' },
      { type: 'system-pill', label: 'Messages from', pillText: 'Expense Manager' },
      { type: 'agent', text: 'Q3 budget cleared for the senior AE hire. $140k base, fully loaded.' },
      { type: 'user', text: "Don't send anything yet. I'll review tonight." },
      { type: 'system-pill', label: 'Drafts held', pillText: '3 candidate intros' },
      { type: 'agent', text: 'The 3 intros are sitting in the drafts queue: recipient, opener, and a Draft badge on each — every one opens with the specific thing they shipped, not flattery.' },
      { type: 'agent', text: '3 intros drafted in your voice, held for your ok.' },
    ],
  },
  {
    name: 'Ananya',
    role: 'Expense Manager',
    color: '#ED712E',
    timestamp: 'Yesterday',
    preview: 'receipts matched and the Q3 close is drafted.',
    messages: [
      { type: 'system-line', text: 'Messages from Ananya' },
      { type: 'agent', text: 'Hey. What should I look after for you?' },
      { type: 'user', text: "Expenses and the close. Match every receipt from the card feed, chase what's missing, and draft the Q3 close for the accountant." },
      { type: 'system-line', text: 'Renamed to Expense Manager' },
      { type: 'agent', text: "Checking what's connected. Ramp and the card feed are signed in. QuickBooks isn't." },
      { type: 'card', title: 'Computer', badge: 'Action needed', badgeTone: 'warning', text: 'Sign in to QuickBooks so I can pull the ledger for the Q3 close.', portal: true },
      { type: 'agent', text: 'Card feed → 214 receipts matched ✓\nQuickBooks → ledger pulled ✓' },
      { type: 'system-pill', label: 'Messages from', pillText: 'Talent Scout' },
      { type: 'agent', text: 'Sourcing subscriptions renewed for Q3 — LinkedIn and Greenhouse, $1,240 on the card.' },
      { type: 'user', text: "Fold that in and draft the close. I'll look before it goes to the accountant." },
      { type: 'system-pill', label: 'Drafts held', pillText: 'Q3 close' },
      { type: 'agent', text: 'The close is drafted: 214 receipts matched, the $1,240 in sourcing subscriptions folded in, 2 gaps flagged with the vendors chased.' },
      { type: 'agent', text: 'receipts matched and the Q3 close is drafted.' },
    ],
  },
];

/* SVG icons (replacing source's CursorIcons16 font glyphs — brand purged per T-28) */
const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5 14 14" />
  </svg>
);
const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <path d="M8 3v10M3 8h10" />
  </svg>
);
const PaperclipIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11.5 7.06 6.9 11.65a2.6 2.6 0 0 1-3.67-3.67l5.3-5.3a1.73 1.73 0 0 1 2.45 2.45l-5.3 5.3a.87.87 0 0 1-1.22-1.22l4.59-4.59" />
  </svg>
);
const SendIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M13.5 2.5 2.5 7l4.5 2 2 4.5 4.5-11Z" /><path d="M7 9l3-3" />
  </svg>
);
const MonitorIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="3" width="12" height="8" rx="1.5" /><path d="M6 13.5h4M8 11v2.5" />
  </svg>
);
const SpinnerIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M8 1.5A6.5 6.5 0 1 1 1.5 8" />
  </svg>
);

function BabyArakaBotShell() {
  const [activeIndex, setActiveIndex] = useState(0);
  const messagesContainerRef = useRef(null);
  const activeBot = BOTS[activeIndex];

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [activeIndex]);

  const handleBotSelect = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="absolute inset-0 z-10 overflow-hidden rounded-3xl">
      <div
        className="baby-araka-bot h-full w-full overflow-hidden rounded-3xl"
        data-theme="araka-dark"
        style={{
          '--araka-bot-current-agent-tint': `light-dark(var(--color-brand-yellow-350), var(--color-brand-yellow-450))`,
          '--araka-bot-current-agent-bubble': `light-dark(var(--color-brand-yellow-450), var(--color-brand-yellow-350))`,
          '--araka-bot-current-agent-bubble-ink': '#FFFFFF',
          '--araka-bot-current-agent-accent': `light-dark(var(--color-brand-yellow-450), var(--color-brand-yellow-350))`,
          '--araka-bot-current-agent-coat': activeBot.color,
        }}
      >
        <div className="baby-araka-bot-shell">
          {/* Traffic Lights */}
          <div className="baby-araka-bot-traffic-lights" aria-hidden="true">
            <span className="relative h-3 w-[52px] shrink-0">
              <span className="absolute inset-y-0 left-0 w-3 rounded-full bg-[#ff5f57] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.2)]" />
              <span className="absolute inset-y-0 left-1/2 w-3 -translate-x-1/2 rounded-full bg-[#febc2e] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.2)]" />
              <span className="absolute inset-y-0 right-0 w-3 rounded-full bg-[#28c840] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.2)]" />
            </span>
          </div>

          {/* Sidebar - single slot, conditional content */}
          <div className="baby-araka-bot-sidebar-slot">
            {/* Desktop sidebar */}
            <aside className="baby-araka-bot-sidebar hidden md:flex">
              <SidebarContent bots={BOTS} activeIndex={activeIndex} onSelect={handleBotSelect} collapsed={false} />
            </aside>
            {/* Mobile sidebar - collapsed avatars only */}
            <aside className="baby-araka-bot-sidebar md:hidden" data-collapsed>
              <SidebarContent bots={BOTS} activeIndex={activeIndex} onSelect={handleBotSelect} collapsed />
            </aside>
          </div>

          {/* Chat Area */}
          <div className="baby-araka-bot-chat">
            {/* Chat header — source: two-layer with Open-computer button (44px) */}
            <div className="relative shrink-0" style={{height: 'var(--araka-bot-toolbar-height)'}}>
              <header className="relative z-[3] flex shrink-0 items-center justify-between gap-2 px-2" style={{height: 'var(--araka-bot-toolbar-height)', color: 'var(--araka-bot-text-primary)', borderBottom: '0.5px solid var(--araka-bot-border-default)'}}>
                <div className="flex min-w-0 items-center gap-1.5">
                  <button
                    type="button"
                    aria-label={`Open ${activeBot.role}'s computer`}
                    className="flex min-w-0 items-center gap-1.5 rounded-md px-1 py-0.5 transition-colors hover:bg-[color-mix(in_srgb,var(--araka-bot-text-primary)_4%,transparent)]"
                  >
                    <div className="relative shrink-0" style={{width: 18, height: 18}}>
                      <div className="flex h-full w-full items-center justify-center overflow-visible" style={{'--fg': activeBot.color, '--bg': 'var(--araka-bot-bg-editor, #ffffff)'}}>
                        <span className="araka-bot-lazy araka-bot-mark--fill">
                          <ArakaBotMark showEyes={false} clipPathId="_r_header_" />
                        </span>
                      </div>
                    </div>
                    <span className="relative min-w-0">
                      <span className="block truncate text-[13px] leading-[18px] tracking-[-0.08px]" style={{color: 'var(--araka-bot-text-primary)'}}>
                        {activeBot.name}
                      </span>
                    </span>
                  </button>
                </div>
                <div className="flex items-center gap-0.5">
                  <button
                    type="button"
                    aria-label="Open computer"
                    aria-pressed="false"
                    className="flex size-6 items-center justify-center rounded-md transition-colors hover:bg-[var(--araka-bot-bg-hover)]"
                    style={{color: 'var(--araka-bot-text-secondary)'}}
                  >
                    <MonitorIcon />
                  </button>
                </div>
              </header>
            </div>

            {/* Messages — source: px-5 pt-2 pb-12, gap-1 */}
            <div ref={messagesContainerRef} className="baby-araka-bot-transcript flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pt-2 pb-12">
              <div className="flex flex-col gap-1">
                {activeBot.messages.map((msg, i) => (
                  <MessageBubble key={`${activeBot.name}-${i}`} message={msg} bot={activeBot} />
                ))}
              </div>
            </div>

            {/* Composer — source: <form> wrapper, z-[1], px-5 pb-3, contenteditable field */}
            <div className="shrink-0">
              <form className="relative z-[1] px-5 pb-3" onSubmit={(e) => e.preventDefault()}>
                <div aria-hidden="true" className="baby-araka-bot-composer-fade pointer-events-none absolute inset-x-0 bottom-full h-12" />
                <div className="baby-araka-bot-composer flex items-center gap-2 rounded-full px-2 py-2" data-demo-target="composer-field">
                  {/* Attachment */}
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full" style={{background: 'var(--araka-bot-fill-secondary)', color: 'var(--araka-bot-text-secondary)'}}>
                    <PaperclipIcon />
                  </span>
                  {/* Input — contenteditable div as in source */}
                  <div className="relative min-w-0 flex-1">
                    <div aria-multiline="true" className="baby-araka-bot-composer-field-input" contentEditable="false" suppressContentEditableWarning data-empty data-placeholder={`Message ${activeBot.name}`} role="textbox" />
                  </div>
                  {/* Send/voice */}
                  <button type="button" aria-label="Voice message" data-demo-target="composer-send" className="flex size-7 shrink-0 items-center justify-center rounded-full" tabIndex={-1} style={{background: 'var(--araka-bot-fill-emphasis)', color: 'var(--araka-bot-bubble-user-ink)'}}>
                    <SendIcon />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message, bot }) {
  switch (message.type) {
    case 'timestamp':
      return (
        <div className="baby-araka-bot-entry-enter mt-2 first:mt-0">
          <div className="mb-2">
            <div className="flex items-center justify-center py-1 text-[12px] leading-4" style={{color: 'var(--araka-bot-text-secondary)'}}>
              {message.text}
            </div>
          </div>
        </div>
      );
    case 'system-line':
      return (
        <div className="baby-araka-bot-entry-enter mt-3 first:mt-0">
          <div className="flex min-w-0 items-center justify-center gap-1.5 overflow-hidden py-1 text-[13px] leading-4" style={{color: 'var(--araka-bot-text-secondary)'}}>
            <span className="truncate">{message.text}</span>
          </div>
        </div>
      );
    case 'system-pill':
      return (
        <div className="baby-araka-bot-entry-enter mt-3 first:mt-0">
          <div className="flex min-w-0 items-center justify-center gap-1.5 overflow-hidden py-1 text-[13px] leading-4" style={{color: 'var(--araka-bot-text-secondary)'}}>
            <span className="shrink-0">{message.label}</span>
            <span className="baby-araka-bot-system-pill" style={{background: `light-dark(color-mix(in srgb, ${bot.color} 14%, rgb(255, 255, 255)), color-mix(in srgb, ${bot.color} 22%, rgb(22, 22, 26)))`, color: `light-dark(color-mix(in srgb, ${bot.color} 62%, rgb(16, 16, 20)), color-mix(in srgb, ${bot.color} 82%, rgb(255, 255, 255)))`}}>
              <span className="relative shrink-0" style={{width: 12, height: 12, display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}>
                <ArakaBotMark showEyes={false} clipPathId={`_r_pill_${bot.name}_`} />
              </span>
              <span className="truncate">{message.pillText}</span>
            </span>
          </div>
        </div>
      );
    case 'user':
      return (
        <div className="baby-araka-bot-entry-enter mt-3 first:mt-0">
          <div className="flex justify-end">
            <div className="relative max-w-[min(420px,85%)]">
              <div className="px-3 py-2 text-[14px] leading-5 tracking-[-0.15px] whitespace-pre-wrap" style={{background: 'var(--araka-bot-bubble-user)', color: 'var(--araka-bot-bubble-user-ink)', borderRadius: 16}}>
                {message.text}
              </div>
            </div>
          </div>
        </div>
      );
    case 'agent':
      return (
        <div className="baby-araka-bot-entry-enter mt-2 first:mt-0">
          <div className="flex max-w-[min(560px,92%)] flex-col items-start">
            <div className="relative">
              <div className="baby-araka-bot-md px-3 py-2 text-[14px] leading-5 tracking-[-0.15px] whitespace-pre-wrap" style={{background: 'var(--araka-bot-bubble-agent)', color: 'var(--araka-bot-text-primary)', borderRadius: 16}}>
                <span>{message.text}</span>
              </div>
            </div>
          </div>
        </div>
      );
    case 'card':
      return (
        <div className="baby-araka-bot-entry-enter">
          <div className="max-w-[min(420px,92%)]">
            <div className="baby-araka-bot-card">
              <div className="flex items-start gap-2">
                <button className="baby-araka-bot-card-title" type="button">{message.title}</button>
                <span className="flex-1" />
                <span className="baby-araka-bot-card-badge" data-tone={message.badgeTone}>
                  <span className="baby-araka-bot-card-badge__dot" aria-hidden="true" />
                  {message.badge}
                </span>
              </div>
              <p className="mt-0.5">{message.text}</p>
              {message.portal && <ComputerPortal />}
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}

/* Salesforce-style login portal — source html.html L246-278 (portal-email /
 * portal-password / portal-submit fields, 12px Sign in button) */
function ComputerPortal() {
  return (
    <div className="mt-2.5">
      <div className="overflow-hidden" style={{borderRadius: 10, opacity: 1}}>
        <div className="group/desktop relative max-h-full w-full overflow-hidden rounded-md aspect-[16/10] !rounded-none" style={{'--rd-base-width': '360px', '--rd-base-height': '225px', '--rd-content-scale': '1.1'}}>
          <img alt="" className="absolute inset-0 h-full w-full object-cover remote-desktop-wallpaper remote-desktop-wallpaper--light" draggable="false" src="assets/Cloud Agents 1.webp" />
          <img alt="" className="remote-desktop-wallpaper remote-desktop-wallpaper--dark absolute inset-0 h-full w-full object-cover" draggable="false" src="assets/Cloud Agents 4.webp" />
          <div className="rd-interactive absolute touch-none overflow-hidden rounded-[5px] !overflow-visible" style={{top: '11%', left: '25%', width: '50%', height: '72%', zIndex: 4, boxShadow: 'rgba(0, 0, 0, 0.14) 0px 3px 12px, rgba(0, 0, 0, 0.1) 0px 0px 0px 0.5px', background: 'var(--color-theme-bg)'}}>
            <div className="flex origin-top-left flex-col" style={{width: 'calc(var(--rd-base-width, 100%) * 0.5)', height: 'calc(var(--rd-base-height, 100%) * 0.72)', transform: 'scale(var(--rd-content-scale, 1))'}}>
              <div className="flex h-full w-full flex-col">
                <div className="flex h-[11px] shrink-0 items-center gap-[2px] px-[4px]" style={{borderBottom: '0.5px solid color-mix(in srgb, var(--color-theme-fg) 8%, transparent)'}}>
                  <div className="h-[3px] w-[3px] rounded-full" style={{backgroundColor: 'var(--color-theme-fg)', opacity: 0.15}} />
                  <div className="h-[3px] w-[3px] rounded-full" style={{backgroundColor: 'var(--color-theme-fg)', opacity: 0.15}} />
                  <div className="h-[3px] w-[3px] rounded-full" style={{backgroundColor: 'var(--color-theme-fg)', opacity: 0.15}} />
                </div>
                <div aria-hidden="true" className="flex h-[9px] shrink-0 items-center justify-center" style={{borderBottom: '0.5px solid color-mix(in srgb, var(--color-theme-fg) 8%, transparent)'}}>
                  <div className="h-[4px] w-[36%] rounded-full" style={{backgroundColor: 'color-mix(in srgb, var(--color-theme-fg) 5%, transparent)'}} />
                </div>
                <div className="flex flex-1 flex-col items-center justify-center gap-[7px] px-[22%] pb-[10%]">
                  <span aria-hidden="true" className="mb-[3px] h-[14px] w-[14px] shrink-0 rounded-full" style={{backgroundColor: 'var(--color-theme-fg)', opacity: 0.12}} />
                  <div className="flex w-full flex-col gap-[4px]">
                    <div className="flex h-[12px] w-full items-center rounded-[3px] px-[5px] text-[5px] leading-none" style={{border: '0.5px solid color-mix(in srgb, var(--color-theme-fg) 8%, transparent)', backgroundColor: 'color-mix(in srgb, var(--color-theme-fg) 3%, transparent)'}}>
                      <span style={{color: 'var(--color-theme-fg)', opacity: 0.3}}>Email</span>
                    </div>
                    <div className="flex h-[12px] w-full items-center rounded-[3px] px-[5px] text-[5px] leading-none" style={{border: '0.5px solid color-mix(in srgb, var(--color-theme-fg) 8%, transparent)', backgroundColor: 'color-mix(in srgb, var(--color-theme-fg) 3%, transparent)'}}>
                      <span style={{color: 'var(--color-theme-fg)', opacity: 0.3}}>Password</span>
                    </div>
                  </div>
                  <button type="button" tabIndex={-1} className="h-[12px] w-full rounded-[3px] text-[5px] leading-none" style={{backgroundColor: 'var(--color-theme-fg)', color: 'var(--color-theme-bg)', opacity: 0.85}}>
                    Sign in
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 z-[25]" role="button" tabIndex={0} aria-label="Open screen" />
        </div>
      </div>
      {/* Source card actions — css.css:3793-3829 variants */}
      <div className="mt-2.5 flex items-center gap-2">
        <button className="baby-araka-bot-card-action" data-variant="primary" type="button">Take over</button>
        <button className="baby-araka-bot-card-action" data-variant="secondary" type="button">I’m done</button>
      </div>
    </div>
  );
}

function SidebarContent({ bots, activeIndex, onSelect, collapsed }) {
  const activeBot = bots[activeIndex];
  return (
    <>
      {/* Header - empty when collapsed */}
      <div className="baby-araka-bot-sidebar-header">
        {!collapsed && (
          <>
            <div className="baby-araka-bot-sidebar-header__lead">
              <div className="baby-araka-bot-traffic-lights-spacer" aria-hidden="true" />
            </div>
            <div className="baby-araka-bot-sidebar-header__actions">
              <button type="button" aria-label="New agent" className="baby-araka-bot-sidebar-header__action">
                <PlusIcon />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Search - hidden when collapsed */}
      {!collapsed && (
        <label className="baby-araka-bot-chat-search">
          <SearchIcon />
          <input aria-label="Search chats" className="baby-araka-bot-chat-search__input" placeholder="Search" type="search" value="" readOnly />
        </label>
      )}

      {/* Agent list — source: display name + role pattern from html.html rows */}
      <div className="baby-araka-bot-sidebar-list flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden pb-2">
        <div className="flex flex-col gap-0.5">
          {bots.map((bot, i) => (
            <button
              key={bot.name}
              type="button"
              className="baby-araka-bot-agent-row"
              data-active={i === activeIndex ? '' : undefined}
              title={bot.role}
              onClick={() => onSelect(i)}
            >
              <span className="baby-araka-bot-agent-row__avatar">
                <div className="relative shrink-0" style={{width: 32, height: 32}}>
                  <div className="flex h-full w-full items-center justify-center overflow-visible" style={{'--fg': bot.color, '--bg': 'var(--araka-bot-bg-editor, #ffffff)'}}>
                    <span className="araka-bot-lazy araka-bot-mark--fill">
                      <ArakaBotMark clipPathId={`_r_agent_${bot.name}_${collapsed ? 'c' : 'e'}_`} />
                    </span>
                  </div>
                </div>
              </span>
              {!collapsed && (
                <div className="baby-araka-bot-agent-row__body min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="relative min-w-0 flex-1">
                      <span className="block truncate text-[14px] leading-5 tracking-[-0.15px]" style={{color: 'var(--araka-bot-sidebar-text-primary)'}}>
                        {bot.name}
                      </span>
                    </span>
                    <span className="baby-araka-bot-agent-row__time shrink-0 text-[12px] leading-4" style={{color: 'var(--araka-bot-sidebar-text-tertiary)'}}>
                      {bot.timestamp}
                    </span>
                  </div>
                  <div className="mt-px flex h-4 items-center gap-1.5">
                    <span className="min-w-0 flex-1 truncate text-[12px] leading-4" style={{color: 'var(--araka-bot-sidebar-text-secondary)'}}>
                      {bot.preview}
                    </span>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Sidebar footer — source html.html L179-182: account chip "AK" + name.
          Rebrand: keeps the account-owner chip pattern with the active user. */}
      {!collapsed && (
        <div className="baby-araka-bot-sidebar-footer">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-medium" style={{background: 'var(--araka-bot-sidebar-selected)', color: 'var(--araka-bot-sidebar-text-secondary)'}}>
            AK
          </div>
          <span className="baby-araka-bot-sidebar-footer__name text-[13px] leading-[18px] tracking-[-0.08px]" style={{color: 'var(--araka-bot-sidebar-text-primary)'}}>
            Annie
          </span>
        </div>
      )}
      {/* Resize separator — source html.html L184 */}
      <div aria-label="Resize sidebar" aria-orientation="vertical" className="absolute inset-y-0 -right-1.5 z-10 w-3" role="separator" />
    </>
  );
}

export default BabyArakaBotShell;
