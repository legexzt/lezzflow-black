'use client';

import React from 'react';

const CATEGORIES = [
  'KIRANA & PROVISIONS',
  'SPECIALTY PHARMACY',
  'ARTISAN BAKERY',
  'FRESH HARVEST',
  'LOCAL DAIRY & POULTRY',
  'STATIONERY & BOOKS',
  'PET CARE SUPPLIES',
  'NEIGHBOURHOOD SPECIALTIES',
];

const PRE_LAUNCH_TICKER = [
  'EARLY ACCESS PRE-LAUNCH',
  'SMART INDIA HACKATHON 2026',
  'HYPERLOCAL COMMERCE ENGINE',
  'SUPPORT YOUR LOCAL STORES',
  'ZERO DARK STORES',
  'TEAM LEGEZT INNOVATION',
];

export function CategoriesMarquee() {
  return (
    <section className="marquee-strip" aria-label="Local Store Categories">
      <div className="marquee-track">
        <div className="marquee-group">
          {CATEGORIES.map((item) => (
            <React.Fragment key={item}>
              <span>{item}</span>
              <span className="marquee-bullet" aria-hidden="true">✦</span>
            </React.Fragment>
          ))}
        </div>
        <div className="marquee-group" aria-hidden="true">
          {CATEGORIES.map((item, idx) => (
            <React.Fragment key={`${item}-dup-${idx}`}>
              <span>{item}</span>
              <span className="marquee-bullet" aria-hidden="true">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PreLaunchMarquee() {
  return (
    <section className="marquee-strip marquee-subtle" aria-label="Pre-Launch Marquee">
      <div className="marquee-track">
        <div className="marquee-group">
          {PRE_LAUNCH_TICKER.map((item) => (
            <React.Fragment key={item}>
              <span>{item}</span>
              <span className="marquee-bullet" aria-hidden="true">✦</span>
            </React.Fragment>
          ))}
        </div>
        <div className="marquee-group" aria-hidden="true">
          {PRE_LAUNCH_TICKER.map((item, idx) => (
            <React.Fragment key={`${item}-dup-${idx}`}>
              <span>{item}</span>
              <span className="marquee-bullet" aria-hidden="true">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
