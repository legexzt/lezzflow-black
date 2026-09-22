'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ArrowUpRight, ArrowUp } from 'lucide-react';

import { CategoriesMarquee, PreLaunchMarquee } from '@/components/MarqueeStrip';
import { HowItWorksSection } from '@/components/StackingDeck';
import { EcosystemSection } from '@/components/EcosystemSection';
import {
  ShopperSection,
  MerchantSection,
  DeliveryPartnersSection,
} from '@/components/SplitShowcase';
import { StatsBandSection } from '@/components/StatsBand';
import { WaitlistSection } from '@/components/WaitlistSection';
import { TeamSection } from '@/components/CommerceStory';
import { SIHSection } from '@/components/SIHSection';
import { FAQSection } from '@/components/FAQSection';

// Dynamic SSR-safe 3D WebGL scenes with Image fallbacks
const HeroLogoScene = dynamic(() => import('@/components/HeroLogoScene'), {
  ssr: false,
  loading: () => (
    <div className="art-fallback absolute inset-0 w-full h-full flex items-center justify-center">
      <Image
        src="/assets/lezzflow-graphite-poster.png"
        alt="LezzFlow metallic graphite brand sculpture"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        unoptimized
        className="object-contain"
      />
    </div>
  ),
});

const HeroOrbitScene = dynamic(() => import('@/components/HeroOrbitScene'), {
  ssr: false,
  loading: () => (
    <div className="art-fallback absolute inset-0 w-full h-full flex items-center justify-center">
      <Image
        src="/assets/orbit.png"
        alt="Machined orbit sculpture"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        unoptimized
        className="object-contain filter contrast-110 -rotate-12"
      />
    </div>
  ),
});

const ConduitScene = dynamic(() => import('@/components/ConduitScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center">
      <Image
        src="/assets/footer-ribbons.png"
        alt="Footer ribbon sculpture"
        fill
        sizes="100vw"
        unoptimized
        className="object-cover opacity-65"
        style={{ objectPosition: '65% center' }}
      />
    </div>
  ),
});

const InfinityLoaderScene = dynamic(() => import('@/components/InfinityLoaderScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 w-full h-full bg-black flex items-center justify-center" />
  ),
});

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isWhiteFlashing, setIsWhiteFlashing] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Customer');
  const paused = false;

  // Autonomous trigger or instant 1-click skip
  const handleLoaderComplete = () => {
    setIsWhiteFlashing(true);
    setTimeout(() => {
      setShowWelcome(false);
      setTimeout(() => {
        setIsWhiteFlashing(false);
      }, 250);
    }, 200);
  };

  // Reduced-motion accessibility check
  useEffect(() => {
    try {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      const checkMotion = () => {
        if (media.matches) {
          setShowWelcome(false);
        }
      };
      const timer = setTimeout(checkMotion, 0);
      media.addEventListener('change', checkMotion);
      return () => {
        clearTimeout(timer);
        media.removeEventListener('change', checkMotion);
      };
    } catch {
      /* Safe browser check */
    }
  }, []);

  // Keyboard shortcuts (Escape, Space, Enter) for instant skip
  useEffect(() => {
    if (!showWelcome) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        handleLoaderComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showWelcome]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Scroll reveal with IntersectionObserver
  useEffect(() => {
    document.body.classList.add('js-motion');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [showWelcome]);

  const scrollToWaitlist = (role?: string) => {
    if (role) setSelectedRole(role);
    const el = document.getElementById('waitlist');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Skip to Content Accessibility Link */}
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      {/* Cinematic Fullscreen White Flash Transition Overlay */}
      <div className={`white-flash-overlay ${isWhiteFlashing ? 'active' : ''}`} />

      {/* 1. Welcome Intro Screen with Compact 3D Steel Infinity Loop (Smooth 60fps) */}
      {showWelcome && (
        <div
          className={`welcome scanlines ${isWhiteFlashing ? 'leaving' : ''}`}
          id="welcome"
          onClick={handleLoaderComplete}
          role="button"
          tabIndex={0}
          aria-label="Welcome screen (Click anywhere to skip)"
        >
          {/* 3D Infinity Steel Flow Engine */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <InfinityLoaderScene paused={paused} onComplete={handleLoaderComplete} />
          </div>

          {/* Clean Rhythmic Kinetic Typography with LezzFlow casing */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl pointer-events-auto">
            <div className="rhythmic-welcome-backdrop">
              <div className="rhythmic-welcome select-none">
                <span className="rhythm-word word-1">Welcome</span>
                <span className="rhythm-word word-2">to</span>
                <span className="rhythm-word word-3">
                  LezzFlow<span className="rhythm-dot">.</span>
                </span>
              </div>
            </div>
          </div>

          {/* Cinematic 3D Metallic L-Logo Sweep & Specular Shine (GPU Accelerated) */}
          <div className="welcome-logo-sweep" aria-hidden="true">
            <div className="logo-sheen-box">
              <Image
                src="/assets/lezzflow-3d-mark.png"
                alt="LezzFlow 3D Brand Mark"
                width={360}
                height={360}
                unoptimized
                priority
                className="welcome-logo-img"
              />
              <div className="logo-chrome-sheen" />
              <div className="logo-energy-bloom" />
            </div>
          </div>

          {/* Subtle Luxury Powered By Legezt Bottom Badge */}
          <div className="welcome-powered-badge select-none" aria-label="Powered by Legezt">
            <span className="powered-label">POWERED BY</span>
            <span className="powered-name">LEGEZT</span>
          </div>
        </div>
      )}

      {/* 2. Top Header Navigation */}
      <header
        className="header"
        style={showWelcome ? { opacity: 0, pointerEvents: 'none', visibility: 'hidden' } : {}}
      >
        <a className="brand" href="#home" aria-label="LezzFlow home">
          <Image
            src="/assets/lezzflow-3d-mark.png"
            alt="LezzFlow 3D Logo"
            width={38}
            height={38}
            unoptimized
            className="brand-logo-img"
          />
          <span className="brand-name">
            <span className="brand-lezz">lezz</span>
            <span className="brand-flow">flow</span>
            <span className="brand-dot">.</span>
          </span>
        </a>

        {/* Desktop Navigation Links (In-page anchor scroll) */}
        <nav className="desktop-nav" aria-label="Main desktop navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#ecosystem">Ecosystem</a>
          <a href="#customers">Shoppers</a>
          <a href="#sellers">Merchants</a>
          <a href="#partners">Fleet</a>
          <a href="#stats">Targets</a>
          <a href="#team">The team</a>
          <a href="#sih">SIH 2026</a>
          <a href="#faq">FAQ</a>
          <a
            href="#waitlist"
            onClick={(e) => {
              e.preventDefault();
              scrollToWaitlist('Customer');
            }}
            className="header-waitlist-btn"
          >
            <span>Join Waitlist</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </nav>

        {/* Mobile Hamburger Toggle Button (>= 44px tap target) */}
        <button
          type="button"
          className="mobile-nav-toggle"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav-drawer"
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Mobile Navigation Overlay & Drawer */}
      <div
        className={`mobile-drawer-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />
      <div
        id="mobile-nav-drawer"
        className={`mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div className="flex items-center justify-between pb-4 mb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0076ff]" />
            <span className="text-[11px] font-sans font-medium tracking-wider text-slate-300 uppercase">Navigation</span>
          </div>
          <button
            type="button"
            className="w-10 h-10 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center text-white/80 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>
        <div className="mobile-drawer-links">
          <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)}>
            01 / How It Works
          </a>
          <a href="#ecosystem" onClick={() => setIsMobileMenuOpen(false)}>
            02 / Ecosystem & Video
          </a>
          <a href="#customers" onClick={() => setIsMobileMenuOpen(false)}>
            03 / For Shoppers
          </a>
          <a href="#sellers" onClick={() => setIsMobileMenuOpen(false)}>
            04 / For Merchants
          </a>
          <a href="#partners" onClick={() => setIsMobileMenuOpen(false)}>
            05 / Delivery Fleet
          </a>
          <a href="#stats" onClick={() => setIsMobileMenuOpen(false)}>
            06 / Architecture Targets
          </a>
          <a href="#team" onClick={() => setIsMobileMenuOpen(false)}>
            07 / The Team
          </a>
          <a href="#sih" onClick={() => setIsMobileMenuOpen(false)}>
            08 / SIH 2026 Showcase
          </a>
          <a href="#faq" onClick={() => setIsMobileMenuOpen(false)}>
            09 / FAQ
          </a>
          <Link href="/privacy" onClick={() => setIsMobileMenuOpen(false)}>
            Privacy Policy
          </Link>
          <Link href="/terms" onClick={() => setIsMobileMenuOpen(false)}>
            Terms of Use
          </Link>
        </div>

        <div className="mobile-drawer-cta">
          <a
            href="#waitlist"
            className="mobile-waitlist-btn"
            onClick={() => {
              setIsMobileMenuOpen(false);
              scrollToWaitlist('Customer');
            }}
          >
            <span>Join the Waitlist</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <p className="text-[11px] text-center text-[#73849c] font-mono">
            TEAM LEGEZT · SIH 2026 CONCEPT
          </p>
        </div>
      </div>

      <main
        id="main-content"
        style={showWelcome ? { opacity: 0, pointerEvents: 'none', visibility: 'hidden' } : {}}
      >
        {/* 3. Hero Section with 3D Brand Mark */}
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />

          <div className="hero-copy">
            <p className="eyebrow">
              <span className="tiny-cross">+</span> HYPERLOCAL COMMERCE, REIMAGINED.
            </p>
            <h1 id="hero-title">
              Your neighbourhood<br />stores.
              <span>Now one tap away.</span>
            </h1>
            <p className="hero-description">
              Discover the shops around you. See what&apos;s available, compare prices and connect
              with your neighbourhood—one local order at a time.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <a
                className="button button-light"
                href="#waitlist"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToWaitlist('Customer');
                }}
              >
                Join the Waitlist <span>↓</span>
              </a>
              <a
                className="button button-outline"
                href="#how-it-works"
              >
                How it works <span>↓</span>
              </a>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <a className="hero-secondary ml-0" href="#sellers">
                For shopkeepers
              </a>
              <span className="text-[#394556] text-xs">/</span>
              <a
                className="hero-secondary ml-0 text-[#68a5f7]"
                href="#waitlist"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToWaitlist('Store Owner');
                }}
              >
                Register seller interest <span>↓</span>
              </a>
            </div>
            <p className="hero-concept-note">
              TEAM LEGEZT <span> / </span> HYPERLOCAL PLATFORM
            </p>
          </div>

          {/* Interactive 3D Metallic L Logo Brand Sculpture Stage (Only renders when active) */}
          <div className="hero-art" id="hero-art">
            <HeroLogoScene paused={showWelcome || paused} />
            <div className="art-cross cross-one" aria-hidden="true">
              +
            </div>
            <div className="art-cross cross-two" aria-hidden="true">
              +
            </div>
            <div className="art-caption">
              <span>BRAND IDENTITY / 001</span>
              <span>ORBITAL CONVERGENCE</span>
            </div>
          </div>

          <div className="hero-bottom">
            <a className="scroll-link" href="#how-it-works">
              <span className="scroll-icon">↓</span> Scroll to explore
            </a>
            <span>CONCEPT / 001</span>
            <span className="hero-location">
              IMAGINED IN INDIA. BUILT FOR POSSIBILITY.
            </span>
          </div>
        </section>

        {/* 4. Marquee Divider: Local Store Categories */}
        <CategoriesMarquee />

        {/* 5. 01 / ARCHITECTURE — How It Works (Sticky Stacking Cards 01-03) */}
        <HowItWorksSection />

        {/* 6. Orbit Sculpture Interlude: Connected Neighbourhood in Motion */}
        <section
          className="orbit-sculpture-section section"
          id="origin-sculpture"
          aria-label="A connected neighbourhood, visualised in motion"
        >
          <div className="section-label reveal">
            <span>THE CONNECTION / IN MOTION</span>
            <span>AN IDEA IN MOTION</span>
          </div>

          <div className="orbit-sculpture-container reveal" id="orbit-sculpture-stage">
            <HeroOrbitScene paused={showWelcome || paused} />
          </div>

          <div className="orbit-sculpture-footer reveal">
            <span>MANY LOCAL STORES. ONE CONNECTED EXPERIENCE.</span>
            <span>CUSTOMER ↔ SHOP ↔ NEIGHBOURHOOD</span>
          </div>
        </section>

        {/* 7. 02 / THE ECOSYSTEM — Three Apps • Video Centerpiece • Flow Strip */}
        <EcosystemSection />

        {/* 8. 03 / FOR SHOPPERS — Split Layout with 3D Tilt Card */}
        <ShopperSection onSelectRole={scrollToWaitlist} />

        {/* 9. 04 / FOR MERCHANTS — Split Layout with 3D Tilt Card */}
        <MerchantSection onSelectRole={scrollToWaitlist} />

        {/* 10. 05 / HYPERLOCAL FLEET — Delivery Partners */}
        <DeliveryPartnersSection onSelectRole={scrollToWaitlist} />

        {/* 11. 06 / STATS BAND — Architectural Engineering Targets with Count-Up Numbers */}
        <StatsBandSection />

        {/* 12. Marquee Divider 2: Pre-Launch Ticker */}
        <PreLaunchMarquee />

        {/* 13. 07 / WAITLIST — Priority Access with Role Pills, Confetti Burst & LocalStorage */}
        <WaitlistSection selectedRole={selectedRole} onRoleChange={setSelectedRole} />

        {/* 14. THE TEAM — Team legezt */}
        <TeamSection />

        {/* 15. SMART INDIA HACKATHON 2026 SHOWCASE */}
        <SIHSection />

        {/* 16. FAQ SECTION */}
        <FAQSection />
      </main>

      {/* 17. Finale Footer with 3D Ribbons and Energy Pulse */}
      <section className="finale scene-ready" id="finale" aria-labelledby="finale-title">
        <div className="finale-atmosphere" aria-hidden="true">
          <div className="finale-glow" />
          <div className="finale-beam" />
        </div>

        <div className="finale-art" aria-hidden="true">
          <ConduitScene paused={showWelcome || paused} />
        </div>

        <div className="finale-grain" aria-hidden="true" />

        <div className="finale-copy">
          <p className="eyebrow">A NEW PERSPECTIVE. A NEW POSSIBILITY.</p>
          <h2 id="finale-title">
            The future isn&apos;t given.
            <br />
            <span>It&apos;s shaped.</span>
          </h2>
          <p className="finale-description">
            For every shop. Every street. Every neighbourhood.
          </p>
          <div className="finale-actions">
            <a
              className="button button-light"
              href="#waitlist"
              onClick={(e) => {
                e.preventDefault();
                scrollToWaitlist('Customer');
              }}
            >
              Join the Waitlist <span>↓</span>
            </a>
            <a className="text-link" href="#home">
              Back to the beginning <span>↑</span>
            </a>
          </div>
        </div>
      </section>

      {/* 18. Site Footer Panel with Giant Monumental Wordmark */}
      <footer
        className="site-footer"
        id="footer"
        role="contentinfo"
        aria-label="Site footer"
        style={showWelcome ? { opacity: 0, pointerEvents: 'none', visibility: 'hidden' } : {}}
      >
        <div className="site-footer-main">
          {/* Brand Info */}
          <div className="site-footer-brand">
            <a href="#home" aria-label="LezzFlow home" className="site-footer-brand-link">
              <Image
                src="/assets/lezzflow-3d-mark.png"
                alt="LezzFlow 3D Logo"
                width={36}
                height={36}
                unoptimized
                className="site-footer-logo"
              />
              <span className="site-footer-wordmark">
                <span className="brand-lezz">lezz</span>
                <span className="brand-flow">flow</span>
                <span className="brand-dot">.</span>
              </span>
            </a>
            <p className="site-footer-tagline">
              Hyperlocal commerce platform connecting customers with verified nearby neighbourhood stores for direct, sub-10-minute delivery.
            </p>
            <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-[11px] font-sans font-medium text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0076ff]" />
              <span>Pre-Launch Beta • SIH 2026</span>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="site-footer-links flex-wrap">
            <div className="site-footer-col">
              <h4 className="site-footer-col-title">Architecture</h4>
              <a href="#how-it-works">How It Works</a>
              <a href="#ecosystem">Ecosystem</a>
              <a href="#customers">For Shoppers</a>
              <a href="#sellers">For Merchants</a>
              <a href="#partners">Delivery Fleet</a>
            </div>

            <div className="site-footer-col">
              <h4 className="site-footer-col-title">Project</h4>
              <a href="#team">Team legezt</a>
              <a href="#sih">SIH 2026 Showcase</a>
              <a href="#stats">Engineering Targets</a>
              <a href="#waitlist">Priority Access</a>
              <span className="text-xs text-[#526074]">Smart India Hackathon 2026</span>
            </div>

            <div className="site-footer-col">
              <h4 className="site-footer-col-title">Honest Notice</h4>
              <p className="text-xs text-[#73849c] max-w-[220px] leading-relaxed">
                LezzFlow is currently in pre-launch — join the waitlist for early access. No dark stores, no predatory commissions.
              </p>
            </div>

            <div className="site-footer-col">
              <h4 className="site-footer-col-title">Legal</h4>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Use</Link>
            </div>
          </div>
        </div>

        {/* Monumental Fluid Wordmark */}
        <div className="footer-monumental-wordmark" aria-hidden="true">
          <span className="monumental-text">
            <span className="text-white">lezz</span>
            <span className="text-[#0076ff]">flow</span>
            <span className="text-[#00e5ff]">.</span>
          </span>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="site-footer-bottom">
          <span>© 2026 LezzFlow. Engineered with craft by Team legezt for Smart India Hackathon (SIH) 2026.</span>
          <button
            type="button"
            className="site-footer-top-link flex items-center gap-1.5 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span>Back to top</span>
            <ArrowUp size={14} aria-hidden="true" />
          </button>
        </div>
      </footer>
    </>
  );
}
