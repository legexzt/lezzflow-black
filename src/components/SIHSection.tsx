'use client';

import React from 'react';
import Image from 'next/image';
import { Award, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export function SIHSection() {
  return (
    <section className="section sih-section relative overflow-hidden" id="sih" aria-labelledby="sih-title">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#ff9933]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#138808]/10 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        {/* Section Label */}
        <div className="section-label reveal">
          <span>NATIONAL INNOVATION</span>
          <span>SMART INDIA HACKATHON 2026</span>
        </div>

        {/* Grand Showcase Card */}
        <div className="mt-8 p-6 sm:p-10 md:p-12 rounded-2xl border border-white/10 bg-gradient-to-b from-[#0e1626] via-[#090e18] to-[#070b12] shadow-[0_20px_70px_rgba(0,0,0,0.85),0_0_40px_rgba(0,118,255,0.12)] reveal">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: SIH Official Logo Card with Animated Glow */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
              <div className="relative group">
                {/* Glow ring */}
                <div className="absolute -inset-2 bg-gradient-to-r from-[#ff9933]/15 via-white/10 to-[#138808]/15 rounded-3xl blur-lg opacity-60" />
                
                {/* Logo Frame */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 p-6 rounded-2xl bg-[#060a12] border border-white/15 flex items-center justify-center shadow-xl">
                  <Image
                    src="/images/sih-logo.png"
                    alt="Smart India Hackathon 2026 Official Logo"
                    width={220}
                    height={220}
                    className="w-full h-full object-contain"
                    priority
                    unoptimized
                  />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-sans text-slate-300">
                <Sparkles size={13} className="text-[#38bdf8]" />
                <span>Smart India Hackathon 2026</span>
              </div>
            </div>

            {/* Right: Big Bold Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0076ff]/10 border border-[#0076ff]/25 text-xs font-sans font-medium text-[#54a3ff]">
                <Award size={14} />
                <span>OFFICIAL HACKATHON ENTRY</span>
              </div>

              <h2 id="sih-title" className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-snug">
                Engineered for <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9933] via-white to-[#138808]">
                  Smart India Hackathon 2026
                </span>
              </h2>

              <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
                LezzFlow is conceived, architected, and built by <strong className="text-white">Team legezt</strong> to solve one of India’s most pressing economic challenges: empowering traditional neighbourhood kirana stores and independent retailers to compete with monopolistic quick-commerce giants.
              </p>

              {/* 3 Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#00e5ff]/10 text-[#00e5ff] shrink-0">
                    <Zap size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Sub-10 Min Hyperlocal</h4>
                    <p className="text-[11px] text-[#73849c] mt-0.5">Instant delivery powered by real local stores without predatory dark stores.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#10b981]/10 text-[#10b981] shrink-0">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Zero Exploitation</h4>
                    <p className="text-[11px] text-[#73849c] mt-0.5">Fair margins for shopkeepers and transparent per-km payouts for delivery riders.</p>
                  </div>
                </div>
              </div>

              {/* Hackathon Authority Badges */}
              <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-4 text-[11px] font-sans text-slate-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff9933]" />
                  MoE&apos;s Innovation Cell
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  AICTE Recognized
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#138808]" />
                  Government of India
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
