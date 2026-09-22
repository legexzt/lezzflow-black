'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mail, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';

interface WaitlistSectionProps {
  selectedRole?: string;
  onRoleChange?: (role: string) => void;
}

export function WaitlistSection({
  selectedRole = 'Customer',
  onRoleChange,
}: WaitlistSectionProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [savedData, setSavedData] = useState<{ email: string; role: string } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Safely check LocalStorage without triggering synchronous render warning
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lezzflow_waitlist');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.email) {
          setTimeout(() => {
            setSavedData(parsed);
          }, 0);
        }
      }
    } catch {
      /* Safe browser check */
    }
  }, []);

  const handleRoleSelect = (newRole: string) => {
    onRoleChange?.(newRole);
  };

  const triggerConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const colors = ['#00e5ff', '#54a3ff', '#ffd700', '#ffffff', '#38bdf8'];
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      gravity: number;
      drag: number;
      opacity: number;
      rotation: number;
      rotSpeed: number;
    }> = [];

    const originX = width / 2;
    const originY = height * 0.55;

    for (let i = 0; i < 75; i++) {
      particles.push({
        x: originX,
        y: originY,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 1.25) * 18 - 4,
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        gravity: 0.42,
        drag: 0.965,
        opacity: 1,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 14,
      });
    }

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      let alive = 0;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.opacity -= 0.012;
        p.rotation += p.rotSpeed;

        if (p.opacity > 0) {
          alive++;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillRect(-p.size, -p.size, p.size * 2, p.size * 2);
          ctx.restore();
        }
      });

      if (alive > 0) {
        animId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
        cancelAnimationFrame(animId);
      }
    };

    render();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = email.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);

    if (!isValidEmail) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    const friendlyRole =
      selectedRole === 'Customer' ? 'Shopper' : selectedRole === 'Store Owner' ? 'Store Owner' : 'Delivery Partner';

    const entry = {
      email: trimmed,
      role: friendlyRole,
      joinedAt: new Date().toISOString(),
    };

    setTimeout(() => {
      try {
        localStorage.setItem('lezzflow_waitlist', JSON.stringify(entry));
      } catch {
        /* LocalStorage safe */
      }

      setIsSubmitting(false);
      setSavedData(entry);
      triggerConfetti();
    }, 500);
  };

  const handleReset = () => {
    try {
      localStorage.removeItem('lezzflow_waitlist');
    } catch {
      /* LocalStorage safe */
    }
    setSavedData(null);
    setEmail('');
    setErrorMsg('');
  };

  return (
    <section className="section waitlist-section" id="waitlist" aria-labelledby="waitlist-heading">
      {/* High-Performance Confetti Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-[9999]"
        aria-hidden="true"
      />

      <div className="section-container">
        <div className="waitlist-card reveal">
          <div className="waitlist-header">
            <div className="waitlist-badge">
              <span className="pulse-dot" />
              <span>Priority Access</span>
            </div>
            <h2 className="section-title" id="waitlist-heading">
              Be the first to experience <span className="gradient-text">lezzflow.</span>
            </h2>
            <p className="waitlist-copy">
              We are onboarding local merchants and clusters city by city. Reserve your priority spot on the waitlist today.
            </p>
            <p className="waitlist-honest-note">
              LezzFlow is currently in pre-launch — join the waitlist for early access.
            </p>
          </div>

          {!savedData ? (
            <form className="waitlist-form" onSubmit={handleSubmit} noValidate>
              {/* Role Toggle Pills */}
              <div className="role-selector-wrap" role="group" aria-label="Select your role">
                {[
                  { id: 'Customer', label: 'Shopper' },
                  { id: 'Store Owner', label: 'Store Owner' },
                  { id: 'Delivery Partner', label: 'Delivery Partner' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`role-pill ${selectedRole === item.id ? 'active' : ''}`}
                    aria-pressed={selectedRole === item.id}
                    onClick={() => handleRoleSelect(item.id)}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Email Field + Submit Button */}
              <div className="input-action-group">
                <label htmlFor="waitlist-email-input" className="sr-only">
                  Email address
                </label>
                <div className="input-shell">
                  <Mail className="input-icon" />
                  <input
                    type="email"
                    id="waitlist-email-input"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    autoComplete="email"
                    className="waitlist-input"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-submit"
                  id="waitlist-submit-btn"
                >
                  <span className="btn-text">
                    {isSubmitting ? 'Securing spot...' : 'Get Early Access'}
                  </span>
                  <ArrowRight size={16} />
                </button>
              </div>

              {errorMsg && (
                <div className="form-feedback error" role="alert" aria-live="polite">
                  {errorMsg}
                </div>
              )}
            </form>
          ) : (
            /* Success State Box */
            <div className="waitlist-success is-visible" aria-hidden="false">
              <div className="success-icon-wrap">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="success-title">You are on the priority list!</h3>
              <p className="success-desc">
                We have registered your invitation request. We will notify you the moment LezzFlow launches in your neighbourhood.
              </p>
              <div className="success-badge-row flex items-center justify-center gap-3 mb-6">
                <span className="success-queue-chip px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-[#00e5ff]/15 text-[#00e5ff] border border-[#00e5ff]/30">
                  Spot reserved
                </span>
                <span className="success-role-chip px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-white/10 text-white border border-white/15">
                  Role: {savedData.role}
                </span>
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-reset flex items-center gap-2 text-xs"
                onClick={handleReset}
              >
                <RotateCcw size={14} />
                <span>Register another email</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
