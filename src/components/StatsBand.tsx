'use client';

import React, { useEffect, useRef } from 'react';

interface CounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
  subtext: string;
}

function StatCounterBlock({
  target,
  suffix = '',
  prefix = '',
  decimals = 0,
  label,
  subtext,
}: CounterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const animatedRef = useRef(false);

  const initialText = `${prefix}${decimals > 0 ? target.toFixed(decimals) : target}${suffix}`;

  useEffect(() => {
    const el = containerRef.current;
    const span = spanRef.current;
    if (!el || !span) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          const duration = 1800; // ms
          const startTime = performance.now();

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Cubic ease out
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = target * ease;

            const valStr = decimals > 0 ? current.toFixed(decimals) : Math.floor(current).toString();
            if (spanRef.current) {
              spanRef.current.textContent = `${prefix}${valStr}${suffix}`;
            }

            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              const finalStr = decimals > 0 ? target.toFixed(decimals) : target.toString();
              if (spanRef.current) {
                spanRef.current.textContent = `${prefix}${finalStr}${suffix}`;
              }
            }
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix, prefix, decimals]);

  return (
    <div ref={containerRef} className="stat-counter-block">
      <div className="stat-value-wrap">
        <span ref={spanRef} className="stat-number">
          {initialText}
        </span>
      </div>
      <div className="stat-label">{label}</div>
      <p className="stat-subtext">{subtext}</p>
    </div>
  );
}

export function StatsBandSection() {
  return (
    <section className="section stats-band-section" id="stats" aria-labelledby="stats-heading">
      <div className="section-container">
        <div className="stats-band-box reveal">
          <div className="stats-band-header">
            <p className="section-eyebrow">OUR VISION & ARCHITECTURE TARGETS</p>
            <h2 className="section-title" id="stats-heading">
              Engineering metrics designed for local speed.
            </h2>
            <div className="stats-honest-badge">
              <span className="pulse-dot" />
              <span>LezzFlow is currently in pre-launch — join the waitlist for early access.</span>
            </div>
          </div>

          <div className="stats-counters-grid">
            <StatCounterBlock
              target={10}
              suffix=" min"
              decimals={0}
              label="Target Delivery Window"
              subtext="Built for sub-10-minute direct neighbourhood transit."
            />
            <StatCounterBlock
              target={100}
              suffix="%"
              decimals={0}
              label="Shelf Stock Verification"
              subtext="Direct merchant sync to eliminate phantom inventory."
            />
            <StatCounterBlock
              target={2.5}
              suffix=" km"
              decimals={1}
              label="Hyperlocal Radius Target"
              subtext="Dense neighbourhood cluster radius for instant transit."
            />
            <StatCounterBlock
              target={0}
              suffix=" Dark Stores"
              decimals={0}
              label="Zero Dark Warehouses"
              subtext="100% powered by existing neighbourhood retailers and local runners."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
