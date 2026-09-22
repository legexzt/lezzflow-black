'use client';

import React from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';

const CARDS = [
  {
    index: '01',
    pill: 'LOCAL RADAR',
    title: 'Discover verified nearby stores',
    desc: 'Scan your immediate neighbourhood perimeter for verified kirana, pharmacies, and specialty retailers. Browse digital shelves synced directly with store inventory.',
    features: [
      'Sub-2.5km local radius scan',
      'Real-time shelf stock confirmation',
      'Zero artificial platform markup',
    ],
    image: '/images/showcase/how-1.webp',
    alt: 'Discover verified local stores interface preview',
  },
  {
    index: '02',
    pill: 'DIRECT DISPATCH',
    title: 'Order directly from the shopkeeper',
    desc: 'Place your basket in one tap. Your order routes instantly to the merchant’s terminal, where it is hand-picked and verified by the merchant who knows the products best.',
    features: [
      'Instant merchant screen notification',
      'Digital substitutions with customer approval',
      'Secure escrow payment flow',
    ],
    image: '/images/showcase/how-2.webp',
    alt: 'One-tap order routing preview',
  },
  {
    index: '03',
    pill: 'HYPERLOCAL TRANSIT',
    title: 'Doorstep arrival in minutes',
    desc: 'A dedicated neighbourhood courier collects your order straight from the shop counter and delivers it directly to your door without warehousing or middle-mile delays.',
    features: [
      'Built for 10-minute neighbourhood delivery',
      'Point-to-point direct dispatch routes',
      'Zero dark stores, supporting real communities',
    ],
    image: '/images/showcase/how-3.webp',
    alt: 'Doorstep delivery preview',
  },
];

export function HowItWorksSection() {
  return (
    <section className="section how-section" id="how-it-works" aria-labelledby="how-heading">
      <div className="section-container">
        <div className="section-header reveal">
          <p className="section-eyebrow">01 / ARCHITECTURE</p>
          <h2 className="section-title" id="how-heading">
            How LezzFlow connects your street.
          </h2>
          <p className="section-subtitle">
            Three streamlined, transform-only engineering layers bridging local corner stores directly to your hands.
          </p>
        </div>

        {/* Sticky Stacking Cards Deck */}
        <div className="stacking-deck" id="stacking-deck">
          {CARDS.map((card, i) => (
            <article
              key={card.index}
              className="stack-card reveal"
              data-index={i}
              style={{
                zIndex: i + 1,
              }}
            >
              <div className="stack-card-grid">
                <div className="stack-card-info">
                  <div className="stack-card-meta">
                    <span className="stack-number">{card.index}</span>
                    <span className="stack-pill">{card.pill}</span>
                  </div>
                  <h3 className="stack-title">{card.title}</h3>
                  <p className="stack-desc">{card.desc}</p>
                  <ul className="stack-features" aria-label={`Step ${card.index} Key Highlights`}>
                    {card.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-[#b8c6d8]">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#00e5ff]/15 text-[#00e5ff] shrink-0 border border-[#00e5ff]/30">
                          <Check size={12} strokeWidth={2.5} />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="stack-card-visual">
                  <div className="stack-image-frame relative aspect-[16/10.5] w-full overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      sizes="(max-width: 900px) 100vw, 50vw"
                      unoptimized
                      className="stack-media-img object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
