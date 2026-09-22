'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import {
  PackageCheck,
  BadgePercent,
  Clock,
  ScanBarcode,
  TrendingUp,
  ShieldCheck,
  Compass,
  Coins,
  CalendarDays,
  ArrowRight,
} from 'lucide-react';

interface TiltCardProps {
  imageSrc: string;
  imageAlt: string;
  tag: string;
  captionLead: string;
  captionText: string;
}

export function TiltCard({
  imageSrc,
  imageAlt,
  tag,
  captionLead,
  captionText,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    glareX: '50%',
    glareY: '50%',
  });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    const rotX = -normY * 8;
    const rotY = normX * 8;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`,
      glareX: `${((x / rect.width) * 100).toFixed(1)}%`,
      glareY: `${((y / rect.height) * 100).toFixed(1)}%`,
    });
  };

  const handlePointerLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      glareX: '50%',
      glareY: '50%',
    });
  };

  return (
    <div
      ref={cardRef}
      className="tilt-showcase-card group"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div
        className="tilt-glare"
        aria-hidden="true"
        style={
          {
            '--glare-x': style.glareX,
            '--glare-y': style.glareY,
          } as React.CSSProperties
        }
      />
      <div className="tilt-card-inner" style={{ transform: style.transform }}>
        <div className="device-pill-header">
          <span className="device-dot" />
          <span className="device-tag">{tag}</span>
        </div>
        <div className="relative w-full aspect-[16/10.5]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            unoptimized
            className="tilt-image object-cover"
          />
        </div>
        <div className="tilt-caption">
          <span className="caption-lead">{captionLead}</span>
          <span className="caption-text">{captionText}</span>
        </div>
      </div>
    </div>
  );
}

export function ShopperSection({ onSelectRole }: { onSelectRole?: (role: string) => void }) {
  return (
    <section className="section section-split" id="customers" aria-labelledby="customers-heading">
      <div className="section-container">
        <div className="split-layout">
          <div className="split-content reveal">
            <p className="section-eyebrow">FOR SHOPPERS</p>
            <h2 className="section-title" id="customers-heading">
              Your neighbourhood stores, now one tap away.
            </h2>
            <p className="section-subtitle">
              Experience instant commerce with the warmth and trust of your local shopkeepers.
            </p>

            <div className="benefit-list">
              <div className="benefit-item">
                <div className="benefit-icon-box">
                  <PackageCheck size={22} />
                </div>
                <div>
                  <h3 className="benefit-heading">Real-time shelf stock</h3>
                  <p className="benefit-copy">
                    See what is actually on the shelf before you order. Eliminates frustrating cancellations and missing items.
                  </p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon-box">
                  <BadgePercent size={22} />
                </div>
                <div>
                  <h3 className="benefit-heading">Transparent street pricing</h3>
                  <p className="benefit-copy">
                    Fair, honest prices direct from store owners. No inflated product markups or opaque surge fees.
                  </p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon-box">
                  <Clock size={22} />
                </div>
                <div>
                  <h3 className="benefit-heading">Built for 10-minute delivery</h3>
                  <p className="benefit-copy">
                    Because items travel from your own street corner rather than distant warehouses, transit times are measured in minutes.
                  </p>
                </div>
              </div>
            </div>

            <div className="split-cta-row">
              <a
                href="#waitlist"
                className="btn btn-primary"
                onClick={() => onSelectRole?.('Customer')}
              >
                <span>Join Customer Waitlist</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          <div className="split-visual reveal">
            <TiltCard
              imageSrc="/images/showcase/customer-app.webp"
              imageAlt="LezzFlow Customer Mobile App Interface"
              tag="CUSTOMER APPLICATION PREVIEW"
              captionLead="Live Local Feed:"
              captionText="Instant store distance, shelf availability, and checkout."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function MerchantSection({ onSelectRole }: { onSelectRole?: (role: string) => void }) {
  return (
    <section className="section section-split" id="sellers" aria-labelledby="sellers-heading">
      <div className="section-container">
        <div className="split-layout split-reverse">
          <div className="split-content reveal">
            <p className="section-eyebrow">FOR MERCHANTS</p>
            <h2 className="section-title" id="sellers-heading">
              Turn your corner shop into a digital powerhouse.
            </h2>
            <p className="section-subtitle">
              Compete with mega quick-commerce giants without sacrificing independence or margins.
            </p>

            <div className="benefit-list">
              <div className="benefit-item">
                <div className="benefit-icon-box text-[#ffd700] border-[#ffd700]/30 bg-[#ffd700]/10">
                  <ScanBarcode size={22} />
                </div>
                <div>
                  <h3 className="benefit-heading">Zero-tech catalog onboarding</h3>
                  <p className="benefit-copy">
                    List your entire shop in minutes using AI barcode scanning and pre-mapped item databases. No technical skills required.
                  </p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon-box text-[#ffd700] border-[#ffd700]/30 bg-[#ffd700]/10">
                  <TrendingUp size={22} />
                </div>
                <div>
                  <h3 className="benefit-heading">Predictive restock signals</h3>
                  <p className="benefit-copy">
                    Receive proactive notifications before high-demand weekend staples run out, keeping shelves optimized.
                  </p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon-box text-[#ffd700] border-[#ffd700]/30 bg-[#ffd700]/10">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h3 className="benefit-heading">Fair economics & fast settlement</h3>
                  <p className="benefit-copy">
                    Zero commission gouging during pre-launch rollout. Direct daily settlements straight to your UPI account.
                  </p>
                </div>
              </div>
            </div>

            <div className="split-cta-row">
              <a
                href="#waitlist"
                className="btn btn-primary"
                onClick={() => onSelectRole?.('Store Owner')}
              >
                <span>Register Store on Waitlist</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          <div className="split-visual reveal">
            <TiltCard
              imageSrc="/images/showcase/seller-app.webp"
              imageAlt="LezzFlow Merchant Terminal Interface"
              tag="MERCHANT COMMAND CENTER PREVIEW"
              captionLead="Merchant Terminal:"
              captionText="One-touch inventory toggle, instant alerts & restock forecast."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function DeliveryPartnersSection({ onSelectRole }: { onSelectRole?: (role: string) => void }) {
  return (
    <section className="section partners-section" id="partners" aria-labelledby="partners-heading">
      <div className="section-container">
        <div className="partners-banner reveal">
          <div className="partners-header">
            <p className="section-eyebrow">HYPERLOCAL FLEET</p>
            <h2 className="section-title" id="partners-heading">
              Built for neighbourhood delivery runners.
            </h2>
            <p className="section-subtitle">
              Flexible earning opportunities designed around dense local zones instead of exhausting cross-city travel.
            </p>
          </div>

          <div className="partners-grid">
            <div className="partner-card">
              <div className="partner-card-icon" aria-hidden="true">
                <Compass size={22} />
              </div>
              <h3 className="partner-card-title">Short micro-runs</h3>
              <p className="partner-card-copy">
                Deliver within your own neighbourhood cluster. Maximum 2.5km distance per trip, avoiding highway fatigue.
              </p>
            </div>

            <div className="partner-card">
              <div className="partner-card-icon" aria-hidden="true">
                <Coins size={22} />
              </div>
              <h3 className="partner-card-title">Direct trip earnings</h3>
              <p className="partner-card-copy">
                Transparent compensation per completed local run, with earnings settled directly without hidden platform deductions.
              </p>
            </div>

            <div className="partner-card">
              <div className="partner-card-icon" aria-hidden="true">
                <CalendarDays size={22} />
              </div>
              <h3 className="partner-card-title">Flexible schedules</h3>
              <p className="partner-card-copy">
                Log in whenever you are available between studies, work, or free hours. Complete control over your time.
              </p>
            </div>
          </div>

          <div className="partners-action-row">
            <a
              href="#waitlist"
              className="btn btn-secondary"
              onClick={() => onSelectRole?.('Delivery Partner')}
            >
              <span>Apply as Delivery Partner</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
