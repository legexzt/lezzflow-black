import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Terms of Use — LezzFlow',
  description: 'Terms of Use for the LezzFlow concept showcase and prototype by Team legezt for SIH 2026.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-[#f3f3f1] flex flex-col font-sans selection:bg-[#ddd] selection:text-[#111]">
      {/* Top Header */}
      <header className="border-b border-white/10 px-[5%] py-6 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-3 text-xl font-bold tracking-tight">
          <Image
            src="/assets/lezzflow-3d-mark.png"
            alt="LezzFlow 3D Logo"
            width={32}
            height={32}
            unoptimized
            className="w-8 h-8 object-contain filter drop-shadow-[0_0_10px_rgba(0,118,255,0.4)]"
          />
          <span className="font-['Space_Grotesk'] tracking-tight">
            <span>Lezz</span>
            <span className="text-[#0076ff]">Flow</span>
          </span>
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#a0a0a0] hover:text-white transition-colors py-2 px-3 border border-white/10 rounded hover:border-white/30"
        >
          <span>←</span> Back to Home
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 md:py-24">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-[#111] text-[11px] font-mono tracking-wider text-[#88a0c4] mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
          <span>CONCEPT STAGE · SIH 2026 · TEAM LEGEZT</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-medium tracking-tight font-['Space_Grotesk'] mb-4 text-white">
          Terms of Use
        </h1>
        <p className="text-sm text-[#949492] mb-12">
          Effective date: September 2026 · Scope: LezzFlow Project Showcase
        </p>

        <div className="space-y-10 text-[15px] leading-relaxed text-[#b5b5b3]">
          <section className="space-y-3">
            <h2 className="text-lg font-medium text-white font-['Space_Grotesk']">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using this website, you agree to comply with and be bound by these Terms
              of Use. LezzFlow is an innovation concept and product demonstration developed by{' '}
              <strong className="text-white">Team legezt</strong> for the{' '}
              <strong className="text-white">Smart India Hackathon (SIH) 2026</strong>. If you do not
              agree with these terms, please do not use this site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-medium text-white font-['Space_Grotesk']">
              2. Demonstration &amp; Concept Prototype
            </h2>
            <p>
              The LezzFlow website and interactive product walkthrough are provided strictly for
              concept demonstration, academic review, and prototype evaluation.
            </p>
            <p>
              All store listings, product prices, stock levels, maps, and order flows shown on this
              website are illustrative mock data. They do not constitute commercial offers, binding
              quotes, merchant agreements, or actual retail sales.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-medium text-white font-['Space_Grotesk']">
              3. Intellectual Property
            </h2>
            <p>
              All 3D models, custom procedural shaders, branding assets, code, designs, and content
              presented on this website are the intellectual property of{' '}
              <strong className="text-white">Team legezt</strong> created for SIH 2026. You may not
              reproduce, duplicate, copy, or exploit any portion of the service or designs without
              express written permission from Team legezt.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-medium text-white font-['Space_Grotesk']">
              4. Waitlist &amp; Pilot Participation
            </h2>
            <p>
              Joining our waitlist or indicating merchant/customer interest does not guarantee enrollment
              in any future pilot program or commercial service launch. Pilot deployment timelines and
              neighbourhood rollout locations remain subject to future project roadmap development.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-medium text-white font-['Space_Grotesk']">
              5. Disclaimer of Warranties &amp; Limitation of Liability
            </h2>
            <p>
              This showcase is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis
              without any representations or warranties, express or implied. Team legezt makes no
              guarantees regarding system uptime, uninterrupted browser compatibility across all legacy
              hardware, or accuracy of simulated data.
            </p>
            <p>
              To the maximum extent permitted by applicable law, Team legezt and its members shall not be
              held liable for any direct, indirect, incidental, or consequential damages resulting from the
              use of or inability to use this demonstration site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-medium text-white font-['Space_Grotesk']">
              6. Governing Law &amp; Inquiries
            </h2>
            <p>
              These terms are governed by the laws of India in the context of academic and hackathon
              initiatives. For any inquiries, please reach out via our waitlist portal at{' '}
              <a
                href="https://lezzflow-app.vercel.app/#waitlist"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#54a3ff] underline hover:text-[#88b9ff]"
              >
                https://lezzflow-app.vercel.app/#waitlist ↗
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 px-[5%] py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777]">
        <div>© 2026 LezzFlow · Team legezt · SIH 2026 Concept</div>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
