import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Privacy Policy — LezzFlow',
  description: 'Privacy Policy for the LezzFlow concept and interactive showcase, developed by Team legezt for SIH 2026.',
};

export default function PrivacyPage() {
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
            className="w-8 h-8 object-contain"
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
          Privacy Policy
        </h1>
        <p className="text-sm text-[#949492] mb-12">
          Effective date: September 2026 · Scope: LezzFlow Project Showcase
        </p>

        <div className="space-y-10 text-[15px] leading-relaxed text-[#b5b5b3]">
          <section className="space-y-3">
            <h2 className="text-lg font-medium text-white font-['Space_Grotesk']">
              1. Overview &amp; Concept Status
            </h2>
            <p>
              LezzFlow is an innovation concept and prototype designed and developed by{' '}
              <strong className="text-white">Team legezt</strong> for the{' '}
              <strong className="text-white">Smart India Hackathon (SIH) 2026</strong>. This web landing
              page serves solely to showcase the architectural vision, 3D design identity, and
              interactive concept workflows for hyper-local neighbourhood commerce.
            </p>
            <p>
              LezzFlow is currently at the concept stage and does not operate as an active commercial
              retailer, payment processor, or logistics entity.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-medium text-white font-['Space_Grotesk']">
              2. Information We Collect
            </h2>
            <p>
              On this showcase website, we do not require user account registration, collect personal
              browsing telemetry, or deploy invasive tracking cookies.
            </p>
            <p>
              If you voluntarily choose to submit your interest via our waitlist or seller-interest form
              (hosted at{' '}
              <a
                href="https://lezzflow-app.vercel.app/#waitlist"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#54a3ff] underline hover:text-[#88b9ff]"
              >
                https://lezzflow-app.vercel.app/#waitlist ↗
              </a>
              ), you may provide contact details such as your name, email address, or merchant status.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-medium text-white font-['Space_Grotesk']">
              3. How Information Is Used
            </h2>
            <p>
              Any information submitted via the waitlist is used strictly by Team legezt for:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-[#9c9c9a]">
              <li>Measuring community and merchant interest in local neighbourhood commerce.</li>
              <li>Sending occasional project milestone updates and invitations for upcoming pilot testing.</li>
              <li>Gathering product feedback to refine our SIH 2026 concept.</li>
            </ul>
            <p>
              We do not sell, rent, monetize, or disclose your contact information to third-party advertisers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-medium text-white font-['Space_Grotesk']">
              4. Interactive Walkthrough &amp; Simulated Orders
            </h2>
            <p>
              The interactive product demo on this site is an entirely in-browser simulation. Products,
              prices, inventory levels, and store names are illustrative sample data. No monetary
              transactions, credit card inputs, or legally binding order placements occur through this
              prototype.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-medium text-white font-['Space_Grotesk']">
              5. Third-Party Links
            </h2>
            <p>
              This showcase contains links to external services, including our live project site on
              Vercel and our official Instagram profile (
              <a
                href="https://instagram.com/lezzflow"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#54a3ff] underline hover:text-[#88b9ff]"
              >
                https://instagram.com/lezzflow ↗
              </a>
              ). We do not control and are not responsible for the privacy practices of external platforms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-medium text-white font-['Space_Grotesk']">
              6. Contact Team legezt
            </h2>
            <p>
              Because LezzFlow is currently a student hackathon initiative, we do not maintain a corporate
              call center or public email server. All questions, feedback, or data removal requests can be
              directed through our waitlist and contact channel at{' '}
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
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms of Use
          </Link>
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
