'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Check, Play, Pause, Volume2, VolumeX, Share2, Eye, Languages, Sparkles } from 'lucide-react';
import { CustomerAppIcon, SellerAppIcon, RiderAppIcon } from './AppIcons';

export function EcosystemSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hindiAudioRef = useRef<HTMLAudioElement>(null);

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [views, setViews] = useState<number>(0);

  // Audio track state: default English ('en'), with recommended Hindi ('hi')
  const [selectedAudio, setSelectedAudio] = useState<'en' | 'hi'>('en');
  const [showHindiPrompt, setShowHindiPrompt] = useState(true);

  const VIEWS_API_URL = 'https://sucm5unokluy36qm65tm6gfzne0rfrvm.lambda-url.us-east-1.on.aws/';

  // Register genuine view only when video is played by the user (once per session)
  const registerPlayView = async () => {
    try {
      if (typeof window === 'undefined') return;
      if (!sessionStorage.getItem('lezzflow_video_played')) {
        sessionStorage.setItem('lezzflow_video_played', '1');
        const res = await fetch(`${VIEWS_API_URL}?action=view`);
        if (res.ok) {
          const data = await res.json();
          if (typeof data.views === 'number') {
            setViews(data.views);
          }
        }
      }
    } catch {
      // Ignore network errors gracefully
    }
  };

  // Switch between English (video native) and Hindi (separate track)
  const selectAudioTrack = (track: 'en' | 'hi') => {
    setSelectedAudio(track);
    const video = videoRef.current;
    const hindiAudio = hindiAudioRef.current;
    if (!video) return;

    if (track === 'hi') {
      video.muted = true;
      if (hindiAudio) {
        hindiAudio.currentTime = video.currentTime;
        hindiAudio.muted = isMuted;
        if (!video.paused) {
          hindiAudio.play().catch(() => {});
        }
      }
    } else {
      if (hindiAudio) {
        hindiAudio.pause();
      }
      video.muted = isMuted;
    }
  };

  // 1-Click switch to Hindi with automatic unmute and playback sync
  const handleSwitchToHindi = () => {
    setShowHindiPrompt(false);
    setSelectedAudio('hi');
    setIsMuted(false);

    const video = videoRef.current;
    const hindiAudio = hindiAudioRef.current;

    if (video) {
      video.muted = true;
    }
    if (hindiAudio) {
      hindiAudio.muted = false;
      if (video) {
        hindiAudio.currentTime = video.currentTime;
      }
    }

    if (video && video.paused) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            registerPlayView();
            if (hindiAudio) {
              hindiAudio.play().catch(() => {});
            }
          })
          .catch(() => {});
      }
    } else if (hindiAudio) {
      hindiAudio.play().catch(() => {});
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (selectedAudio === 'hi') {
      if (videoRef.current) videoRef.current.muted = true; // Video track stays silent
      if (hindiAudioRef.current) hindiAudioRef.current.muted = nextMuted;
    } else {
      if (videoRef.current) videoRef.current.muted = nextMuted;
      if (hindiAudioRef.current) hindiAudioRef.current.pause();
    }
  };

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    const hindiAudio = hindiAudioRef.current;
    if (!video) return;

    if (video.paused) {
      if (selectedAudio === 'hi') {
        video.muted = true;
        if (hindiAudio) {
          hindiAudio.currentTime = video.currentTime;
          hindiAudio.muted = isMuted;
        }
      } else {
        video.muted = isMuted;
        if (hindiAudio) hindiAudio.pause();
      }

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            registerPlayView();
            if (selectedAudio === 'hi' && hindiAudio) {
              hindiAudio.play().catch(() => {});
            }
          })
          .catch(() => {});
      }
    } else {
      video.pause();
      if (hindiAudio) hindiAudio.pause();
      setIsPlaying(false);
    }
  };

  // Video event handlers for seamless audio sync
  const handleVideoPlay = () => {
    setIsPlaying(true);
    registerPlayView();
    if (selectedAudio === 'hi' && hindiAudioRef.current && videoRef.current) {
      videoRef.current.muted = true;
      hindiAudioRef.current.currentTime = videoRef.current.currentTime;
      hindiAudioRef.current.muted = isMuted;
      hindiAudioRef.current.play().catch(() => {});
    }
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
    if (hindiAudioRef.current) {
      hindiAudioRef.current.pause();
    }
  };

  const handleVideoSeeking = () => {
    if (selectedAudio === 'hi' && hindiAudioRef.current && videoRef.current) {
      hindiAudioRef.current.currentTime = videoRef.current.currentTime;
    }
  };

  const handleVideoTimeUpdate = () => {
    if (selectedAudio === 'hi' && hindiAudioRef.current && videoRef.current) {
      const diff = Math.abs(hindiAudioRef.current.currentTime - videoRef.current.currentTime);
      if (diff > 0.3) {
        hindiAudioRef.current.currentTime = videoRef.current.currentTime;
      }
    }
  };

  const handleVideoEnded = () => {
    if (hindiAudioRef.current) {
      hindiAudioRef.current.currentTime = 0;
      if (selectedAudio === 'hi' && videoRef.current && !videoRef.current.paused) {
        hindiAudioRef.current.play().catch(() => {});
      }
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/#ecosystem` : 'https://info.legezt.in/#ecosystem';
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'LezzFlow — SIH 2026 Presentation',
          text: 'Watch the official LezzFlow presentation video by Team legezt for Smart India Hackathon 2026.',
          url: shareUrl,
        });
        return;
      } catch {
        // Fall through to clipboard
      }
    }

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
      } catch {
        // clipboard failed
      }
    }
  };

  // Fetch current genuine view count on initial load
  useEffect(() => {
    let isMounted = true;
    const fetchGenuineViews = async () => {
      try {
        const res = await fetch(VIEWS_API_URL);
        if (res.ok) {
          const data = await res.json();
          if (isMounted && typeof data.views === 'number') {
            setViews(data.views);
          }
        }
      } catch {
        // Silent catch
      }
    };
    fetchGenuineViews();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

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

    // When scrolled completely out of view, pause if playing (no auto-play on scroll!)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            if (video && !video.paused) {
              video.pause();
            }
            if (hindiAudioRef.current && !hindiAudioRef.current.paused) {
              hindiAudioRef.current.pause();
            }
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.05 }
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
          <div className="ecosystem-video-wrapper">
            <div className="ecosystem-video-frame" onClick={togglePlay}>
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
              poster="/videos/ecosystem-poster.jpg"
              muted={selectedAudio === 'hi' ? true : isMuted}
              loop
              playsInline
              preload="auto"
              onPlay={handleVideoPlay}
              onPause={handleVideoPause}
              onSeeking={handleVideoSeeking}
              onSeeked={handleVideoSeeking}
              onTimeUpdate={handleVideoTimeUpdate}
              onEnded={handleVideoEnded}
              aria-label="LezzFlow 3-App Connected Ecosystem Video"
            />

            {/* Synchronized Hindi Audio Track */}
            <audio
              ref={hindiAudioRef}
              src="/audio/ecosystem-hindi.mp3"
              preload="auto"
              playsInline
            />

            {/* Central Play Button Overlay (Visible ONLY when paused - Zero Subtitle Obstruction!) */}
            {isVideoLoaded && !isPlaying && (
              <button
                type="button"
                className="eco-video-center-play"
                onClick={togglePlay}
                aria-label="Play LezzFlow Presentation Video"
              >
                <div className="eco-center-play-circle">
                  <Play size={28} className="translate-x-0.5 fill-white text-white" />
                </div>
                <span className="eco-center-play-label">Play Presentation (2:47)</span>
              </button>
            )}
          </div>

          {/* Hindi Audio Recommendation Banner */}
          {showHindiPrompt && selectedAudio === 'en' && (
            <div className="eco-hindi-rec-banner" role="status" aria-live="polite">
              <div className="eco-rec-left">
                <div className="eco-rec-icon-glow">
                  <Sparkles size={15} className="text-[#ffd700]" />
                </div>
                <div className="eco-rec-copy">
                  <div className="eco-rec-title-row">
                    <span className="eco-rec-title">Hindi Voiceover Available (हिन्दी)</span>
                    <span className="eco-rec-badge-pill">★ RECOMMENDED FOR SIH 2026</span>
                  </div>
                  <span className="eco-rec-desc">Watch the complete 2m 47s presentation with official Hindi narration</span>
                </div>
              </div>
              <div className="eco-rec-actions">
                <button
                  type="button"
                  onClick={handleSwitchToHindi}
                  className="eco-rec-btn-action"
                >
                  <Volume2 size={13} />
                  <span>Switch to Hindi Track</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowHindiPrompt(false)}
                  className="eco-rec-btn-dismiss"
                  title="Dismiss recommendation"
                  aria-label="Dismiss recommendation"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* Active Hindi Audio Pill Indicator */}
          {selectedAudio === 'hi' && (
            <div className="eco-hindi-active-pill">
              <span className="eco-pulse-ring" />
              <Volume2 size={13} className="text-[#3ddc97]" />
              <span>Playing with <strong>Hindi (हिन्दी) Audio Track</strong> • Synchronized</span>
            </div>
          )}

          {/* Dedicated Media Toolbar Underneath Video (Completely Outside Video Frame) */}
          <div className="ecosystem-video-toolbar">
            <div className="eco-toolbar-actions">
              <button
                type="button"
                onClick={togglePlay}
                className={`eco-toolbar-btn ${!isPlaying ? 'eco-btn-primary' : ''}`}
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                <span>{isPlaying ? 'Pause' : 'Play Video'}</span>
              </button>

              <button
                type="button"
                onClick={toggleMute}
                className={`eco-toolbar-btn ${!isMuted ? 'eco-btn-active' : ''}`}
                aria-label={isMuted ? 'Enable Sound' : 'Mute Sound'}
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                <span>{isMuted ? 'Sound Off' : 'Sound On'}</span>
              </button>
            </div>

            {/* Audio Track Selector (English / Hindi Track) */}
            <div className="eco-toolbar-audio">
              <div className="eco-audio-selector" role="radiogroup" aria-label="Audio Track Language">
                <span className="eco-audio-selector-label">
                  <Languages size={13} className="text-[#8fa3bf]" />
                  <span>Audio:</span>
                </span>
                <button
                  type="button"
                  onClick={() => selectAudioTrack('en')}
                  className={`eco-audio-tab ${selectedAudio === 'en' ? 'is-active' : ''}`}
                  aria-checked={selectedAudio === 'en'}
                  role="radio"
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => selectAudioTrack('hi')}
                  className={`eco-audio-tab is-hindi ${selectedAudio === 'hi' ? 'is-active' : ''}`}
                  aria-checked={selectedAudio === 'hi'}
                  role="radio"
                >
                  <span>हिन्दी</span>
                  <span className="eco-rec-pill">RECOMMENDED</span>
                </button>
              </div>
            </div>

            <div className="eco-toolbar-meta">
              {/* Views Counter */}
              <div className="eco-views-badge" title="Genuine real-time presentation views">
                <span className="eco-views-dot" />
                <Eye size={14} className="text-[#00e5ff]" />
                <span className="eco-views-count">{views.toLocaleString()}</span>
                <span className="eco-views-label">{views === 1 ? 'view' : 'views'}</span>
              </div>

              {/* Share Button */}
              <button
                type="button"
                onClick={handleShare}
                className={`eco-toolbar-btn eco-share-btn ${copied ? 'eco-btn-active' : ''}`}
                title="Share presentation link"
                aria-label="Share video link"
              >
                {copied ? <Check size={14} className="text-[#3ddc97]" /> : <Share2 size={14} />}
                <span>{copied ? 'Link Copied!' : 'Share Video'}</span>
              </button>
            </div>
          </div>
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
