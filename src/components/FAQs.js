import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const faqs = [
  {
    question: "How is Araka Bot different from AI assistants?",
    answer: "Bots have their own computer, so they can work inside your apps and tools. They also run in parallel, 24/7, even when your laptop is closed."
  },
  {
    question: "Who is Araka Bot available for today?",
    answer: "Araka Bot is currently in early beta and available to select users. We're gradually expanding access to more people."
  },
  {
    question: "Is Araka Bot available for enterprises?",
    answer: "Yes, Araka Teams includes Araka Bot access with centralized team billing, shared analytics, and enterprise features."
  },
  {
    question: "Where do I talk to Araka Bot?",
    answer: "You can interact with Araka Bot through the desktop app, mobile apps (iOS and Android), or the web interface."
  },
  {
    question: "How much does Araka Bot cost?",
    answer: "Araka Bot is included with Araka Pro ($20/month), SuperAraka ($30/month), and Araka Teams ($40/seat/month) plans."
  },
  {
    question: "Do Bots share one computer?",
    answer: "Each Bot gets its own isolated computer environment. They can work independently or collaborate in the same thread."
  },
  {
    question: "How does Araka Bot handle my data & privacy?",
    answer: "Araka Bot operates in secure, isolated environments. Your data is encrypted in transit and at rest. Bots only access the tools you explicitly authorize."
  }
];

function FAQs() {
  /* Source html.html L704-730: each FAQ row carries its own independent
   * aria-expanded state (first row open by default) — not single-open. */
  const [openSet, setOpenSet] = useState(new Set([0]));
  const { ref, isVisible } = useScrollReveal();

  const toggleFAQ = (index) => {
    setOpenSet(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const isOpen = (index) => openSet.has(index);

  return (
    <section id="faqs">
      <div ref={ref} className={`mx-auto grid w-full max-w-[var(--site-content-width)] gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:gap-16 scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <h2 className="lg:sticky lg:top-8 lg:self-start font-display text-3xl tracking-tight text-balance sm:text-4xl">FAQs</h2>
        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-border border-b">
              <button
                type="button"
                aria-expanded={isOpen(index)}
                className="flex w-full items-center justify-between py-5 text-left hover:bg-white/[0.02] transition-colors rounded-lg -mx-2 px-2"
                onClick={() => toggleFAQ(index)}
              >
                <span className="pr-4 text-sm font-medium">{faq.question}</span>
                <svg
                  className={`text-primary/25 w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen(index) ? 'rotate-45' : ''}`}
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <path d="M10 4v12M4 10h12" />
                </svg>
              </button>
              <div
                className="overflow-hidden"
                style={{
                  height: isOpen(index) ? 'auto' : 0,
                  opacity: isOpen(index) ? 1 : 0,
                }}
              >
                <div className="text-primary/60 flex flex-col gap-3 pb-6 text-sm leading-7">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQs;
