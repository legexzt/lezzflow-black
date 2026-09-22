'use client';

import React, { useState } from 'react';
import { ChevronDown, ArrowUpRight } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    id: 'what-is-lezzflow',
    question: 'What is LezzFlow?',
    answer: (
      <p>
        LezzFlow is a hyper-local market intelligence and commerce platform created to connect
        neighbourhood shoppers with nearby independent retail and kirana stores. Rather than replacing
        local shops with centralized dark warehouses, LezzFlow empowers existing neighbourhood merchants
        by digitizing their shelves, bringing real-time inventory online, and enabling fast, local order
        fulfillment.
      </p>
    ),
  },
  {
    id: 'three-apps',
    question: 'What are the three apps in the LezzFlow ecosystem?',
    answer: (
      <div className="space-y-4">
        <p>
          The LezzFlow platform is architected around three dedicated applications tailored for each
          stakeholder in the hyper-local commerce loop:
        </p>
        <div className="grid gap-3 sm:grid-cols-3 pt-1">
          <div className="p-3.5 rounded-lg border border-white/10 bg-[#0c121c]">
            <h4 className="font-medium text-white text-sm flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#54a3ff]" />
              LezzFlow Mart
            </h4>
            <p className="text-xs text-[#98a6b9] leading-relaxed">
              For customers: search everyday essentials, verify real-time stock availability across nearby
              stores, compare local prices, and place neighbourhood orders.
            </p>
          </div>
          <div className="p-3.5 rounded-lg border border-white/10 bg-[#0c121c]">
            <h4 className="font-medium text-white text-sm flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00e5ff]" />
              LezzFlow Seller
            </h4>
            <p className="text-xs text-[#98a6b9] leading-relaxed">
              For shopkeepers: an easy mobile dashboard to manage digital product catalogues, update live
              inventory, process incoming orders, and view demand insights.
            </p>
          </div>
          <div className="p-3.5 rounded-lg border border-white/10 bg-[#0c121c]">
            <h4 className="font-medium text-white text-sm flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#9baec8]" />
              LezzFlow Partner
            </h4>
            <p className="text-xs text-[#98a6b9] leading-relaxed">
              For delivery partners: dedicated neighbourhood dispatch routing, rapid order pickup
              handoffs from local counters, and transparent doorstep fulfillment.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'sih-concept-status',
    question: 'What is the current status of LezzFlow and SIH 2026?',
    answer: (
      <p>
        LezzFlow is an active innovation concept and working prototype created by{' '}
        <strong className="text-white font-medium">Team legezt</strong> for the{' '}
        <strong className="text-white font-medium">Smart India Hackathon (SIH) 2026</strong>. The
        underlying data models, 3D interactive user experience, multi-role app architecture, and
        inventory synchronisation workflows have been designed and prototyped for the hackathon
        evaluation.
      </p>
    ),
  },
  {
    id: 'pilot-plans',
    question: 'What are the upcoming pilot plans?',
    answer: (
      <p>
        Following the SIH 2026 concept milestone, Team legezt is planning localized neighbourhood pilot
        testing. These pilots will focus on onboarding a select group of local shopkeepers to validate
        simple cataloguing, test live stock reconciliation, and observe neighbourhood customer ordering
        patterns in real-world conditions.
      </p>
    ),
  },
  {
    id: 'how-to-join',
    question: 'How can shoppers and store owners get involved?',
    answer: (
      <p>
        Early interest registration is open through our centralized waitlist. Whether you are a resident
        eager for visibility into your local stores or a merchant interested in participating in the
        upcoming pilot, submitting your details on our waitlist ensures you receive early access updates
        as pilots roll out.
      </p>
    ),
  },
];

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>('what-is-lezzflow');

  const toggle = (id: string) => {
    setOpenId((curr) => (curr === id ? null : id));
  };

  return (
    <section className="section faq-section" id="faq" aria-labelledby="faq-title">
      <div className="section-label reveal">
        <span>07 / FREQUENTLY ASKED QUESTIONS</span>
        <span>TRANSPARENT CONCEPT FACTS</span>
      </div>

      <div className="commerce-heading reveal">
        <h2 id="faq-title">
          Everything you need<br />
          <span>to know about LezzFlow.</span>
        </h2>
        <p>
          Clear answers regarding our SIH 2026 concept, the three core applications, and our upcoming
          neighbourhood pilot plans.
        </p>
      </div>

      {/* Accordion List */}
      <div className="max-w-4xl mx-auto divide-y divide-white/10 border-y border-white/10 reveal">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div key={faq.id} className="group">
              <button
                type="button"
                className="w-full py-6 flex items-center justify-between gap-4 text-left transition-colors hover:text-white min-h-[44px] focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                onClick={() => toggle(faq.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${faq.id}`}
                id={`faq-btn-${faq.id}`}
              >
                <span className="text-base sm:text-lg font-medium text-white tracking-tight font-['Space_Grotesk']">
                  {faq.question}
                </span>
                <span
                  className={`w-8 h-8 rounded-full border border-white/15 flex items-center justify-center shrink-0 text-[#9c9c9a] transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-white/10 text-white' : 'group-hover:border-white/30'
                  }`}
                  aria-hidden="true"
                >
                  <ChevronDown size={16} />
                </span>
              </button>

              {isOpen && (
                <div
                  id={`faq-answer-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-btn-${faq.id}`}
                  className="pb-6 text-sm sm:text-[15px] leading-relaxed text-[#a3a8b1]"
                >
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Conversion Banner below FAQ */}
      <div className="max-w-4xl mx-auto mt-12 p-8 rounded-xl border border-white/10 bg-gradient-to-r from-[#0d1420] via-[#090d14] to-[#0d1420] flex flex-col sm:flex-row items-center justify-between gap-6 reveal">
        <div>
          <h3 className="text-lg font-medium text-white font-['Space_Grotesk'] mb-1">
            Want to see LezzFlow in your neighbourhood?
          </h3>
          <p className="text-xs sm:text-sm text-[#8c9cb0]">
            Register your interest as a customer or shopkeeper on our waitlist.
          </p>
        </div>
        <a
          href="https://lezzflow-app.vercel.app/#waitlist"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded bg-[#eeeeeb] text-[#111] font-medium text-sm hover:bg-white transition-all transform hover:-translate-y-0.5 min-h-[44px] shrink-0"
        >
          <span>Join the Waitlist</span>
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
