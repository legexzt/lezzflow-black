'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { CustomerAppIcon, SellerAppIcon, RiderAppIcon } from './AppIcons';

export function EcosystemSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleLoaded = () => {
      if (video.videoWidth > 0 || video.readyState >= 2) {
        setIsVideoLoaded(true);
      }
    };

    if (video.readyState >= 2) {
      handleLoaded();
    } else {
      video.addEventListener('canplay', handleLoaded, { once: true });
      video.addEventListener('loadeddata', handleLoaded, { once: true });
    }

    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    // IntersectionObserver: play when visible, pause when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {});
            }
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      video.removeEventListener('canplay', handleLoaded);
      video.removeEventListener('loadeddata', handleLoaded);
    };
  }, []);

  return (
    <section className="section ecosystem-section" id="ecosystem" aria-labelledby="ecosystem-heading">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header reveal">
          <p className="section-eyebrow">THE ECOSYSTEM</p>
          <h2 className="section-title" id="ecosystem-heading">
            Three apps. One seamless flow.
          </h2>
          <p className="section-subtitle">
            Customers, local kiranas, and delivery partners synchronized in real time to power instant neighbourhood commerce.
          </p>
        </div>

        {/* Animated Video Showcase (Centerpiece) */}
        <div className="ecosystem-showcase reveal" id="ecosystem-showcase">
          <div className="ecosystem-video-frame">
            {/* Graceful Pure-CSS Animated Fallback Placeholder */}
            <div className="ecosystem-fallback" id="ecosystem-fallback" aria-hidden="true">
              <div className="ecosystem-fallback-bg" />
              <div className="ecosystem-fallback-grid" />

              {/* Live Simulation Header Pill */}
              <div className="ecosystem-fallback-badge">
                <span className="pulse-dot" />
                <span>HYPERLOCAL TRI-SYNC SIMULATION</span>
              </div>

              {/* Path & 3 Pulsing Nodes Visualization */}
              <div className="ecosystem-visual-canvas">
                <svg className="ecosystem-path-svg" viewBox="0 0 900 420" fill="none" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <linearGradient id="ecoPathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0076ff" stopOpacity="0.85" />
                      <stop offset="50%" stopColor="#00e5ff" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#ffd700" stopOpacity="0.85" />
                    </linearGradient>
                    <filter id="ecoGlow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <path
                    d="M 200 280 C 240 160, 360 130, 450 130 C 540 130, 660 160, 700 280 C 630 370, 270 370, 200 280 Z"
                    className="eco-path-track"
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="3"
                  />

                  <path
                    id="ecoFlowPath"
                    d="M 200 280 C 240 160, 360 130, 450 130 C 540 130, 660 160, 700 280 C 630 370, 270 370, 200 280 Z"
                    className="eco-path-active"
                    stroke="url(#ecoPathGrad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="10 12"
                  />

                  {/* Moving dot along path */}
                  <g filter="url(#ecoGlow)">
                    <circle r="7" fill="#ffffff">
                      <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
                        <mpath href="#ecoFlowPath" />
                      </animateMotion>
                    </circle>
                    <circle r="4" fill="#00e5ff">
                      <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
                        <mpath href="#ecoFlowPath" />
                      </animateMotion>
                    </circle>
                  </g>
                </svg>

                {/* 3 Nodes */}
                <div className="eco-node eco-node-customer">
                  <div className="eco-node-pulse" />
                  <div className="eco-node-icon-box">
                    <CustomerAppIcon size={26} includeTile={false} />
                  </div>
                  <div className="eco-node-meta">
                    <span className="eco-node-badge">APP 01</span>
                    <strong className="eco-node-label">LezzFlow Mart</strong>
                    <span className="eco-node-sub">Customer App</span>
                  </div>
                </div>

                <div className="eco-node eco-node-mart">
                  <div className="eco-node-pulse" />
                  <div className="eco-node-icon-box">
                    <SellerAppIcon size={26} includeTile={false} />
                  </div>
                  <div className="eco-node-meta">
                    <span className="eco-node-badge">APP 02</span>
                    <strong className="eco-node-label">LezzFlow Seller</strong>
                    <span className="eco-node-sub">Kirana Stock</span>
                  </div>
                </div>

                <div className="eco-node eco-node-delivery">
                  <div className="eco-node-pulse" />
                  <div className="eco-node-icon-box">
                    <RiderAppIcon size={26} includeTile={false} />
                  </div>
                  <div className="eco-node-meta">
                    <span className="eco-node-badge">APP 03</span>
                    <strong className="eco-node-label">LezzFlow Partner</strong>
                    <span className="eco-node-sub">10-Min Dispatch</span>
                  </div>
                </div>
              </div>

              {/* Simulation Footer Pill */}
              <div className="ecosystem-fallback-status">
                <span className="eco-status-pill">
                  <span className="eco-status-signal" />
                  <span className="eco-status-text">
                    Connected Loop: <strong>LezzFlow Mart</strong> → <strong>LezzFlow Seller</strong> → <strong>LezzFlow Partner</strong>
                  </span>
                </span>
              </div>
            </div>

            {/* Centerpiece Video Element */}
            <video
              ref={videoRef}
              className={`ecosystem-video ${isVideoLoaded ? 'is-loaded' : ''}`}
              src="/videos/ecosystem-flow.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="LezzFlow 3-App Connected Ecosystem Video"
            />
          </div>
        </div>

        {/* Three App Cards */}
        <div className="ecosystem-cards-grid">
          {/* Card 1: Customer */}
          <article className="ecosystem-card reveal">
            <div className="eco-card-header">
              <CustomerAppIcon size={52} includeTile={true} />
              <span className="eco-app-role-pill">CUSTOMER APP</span>
            </div>
            <div className="eco-card-body">
              <h3 className="eco-card-title">LezzFlow Mart</h3>
              <p className="eco-card-tagline">“Your neighbourhood, on demand.”</p>
              <ul className="eco-feature-list" aria-label="Customer App Features">
                {[
                  'Order from nearby stores in minutes',
                  'Live GPS order tracking',
                  'Secure UPI payments',
                  'Ratings & re-order in one tap',
                ].map((feat) => (
                  <li key={feat} className="flex items-center gap-2.5 text-sm text-[#b8c6d8]">
                    <span className="text-[#4da3ff] shrink-0">
                      <Check size={16} strokeWidth={2.2} />
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="eco-card-footer">
              <span className="eco-built-label">Built for:</span>
              <span className="eco-built-target">customers</span>
            </div>
          </article>

          {/* Card 2: Seller */}
          <article className="ecosystem-card reveal" style={{ transitionDelay: '80ms' }}>
            <div className="eco-card-header">
              <SellerAppIcon size={52} includeTile={true} />
              <span className="eco-app-role-pill">SELLER APP</span>
            </div>
            <div className="eco-card-body">
              <h3 className="eco-card-title">LezzFlow Seller</h3>
              <p className="eco-card-tagline">“Your kirana store, gone digital.”</p>
              <ul className="eco-feature-list" aria-label="Seller App Features">
                {[
                  'Go online in 10 minutes, zero commission onboarding',
                  'Instant order alerts & packing flow',
                  'AI demand-vs-availability insights',
                  'Simple inventory & billing',
                ].map((feat) => (
                  <li key={feat} className="flex items-center gap-2.5 text-sm text-[#b8c6d8]">
                    <span className="text-[#3ddc97] shrink-0">
                      <Check size={16} strokeWidth={2.2} />
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="eco-card-footer">
              <span className="eco-built-label">Built for:</span>
              <span className="eco-built-target">local shopkeepers</span>
            </div>
          </article>

          {/* Card 3: Rider */}
          <article className="ecosystem-card reveal" style={{ transitionDelay: '160ms' }}>
            <div className="eco-card-header">
              <RiderAppIcon size={52} includeTile={true} />
              <span className="eco-app-role-pill">RIDER APP</span>
            </div>
            <div className="eco-card-body">
              <h3 className="eco-card-title">LezzFlow Partner</h3>
              <p className="eco-card-tagline">“Earn on every kilometre.”</p>
              <ul className="eco-feature-list" aria-label="Rider App Features">
                {[
                  'Accept nearby pickup tasks',
                  'Smart route optimization',
                  'Live navigation & proof of delivery',
                  'Daily earnings dashboard',
                ].map((feat) => (
                  <li key={feat} className="flex items-center gap-2.5 text-sm text-[#b8c6d8]">
                    <span className="text-[#a78bfa] shrink-0">
                      <Check size={16} strokeWidth={2.2} />
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="eco-card-footer">
              <span className="eco-built-label">Built for:</span>
              <span className="eco-built-target">delivery partners</span>
            </div>
          </article>
        </div>

        {/* Order Journey Flow Strip */}
        <div className="ecosystem-flow-strip reveal" aria-label="Order Journey Flow">
          <div className="eco-flow-header">
            <span className="pulse-dot" />
            <span className="eco-flow-badge-title">ONE ORDER’S JOURNEY</span>
          </div>

          <div className="eco-flow-timeline">
            <div className="eco-flow-line" aria-hidden="true">
              <div className="eco-flow-line-pulse" />
            </div>

            <ol className="eco-flow-steps">
              {[
                { num: '1', text: 'Customer places order' },
                { num: '2', text: 'Mart packs it fresh' },
                { num: '3', text: 'Rider picks up & delivers' },
                { num: '4', text: 'Doorstep in minutes' },
              ].map((step) => (
                <li key={step.num} className="eco-flow-step">
                  <div className="eco-step-num-wrap">
                    <span className="eco-step-num">{step.num}</span>
                  </div>
                  <p className="eco-step-text">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
