import React from 'react';

interface AppIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  includeTile?: boolean;
}

/**
 * LezzFlow Mart (Customer App) Icon
 * Flat minimal line icon, 2px rounded stroke, SF Symbols / Linear style
 * Accent: #4da3ff
 */
export function CustomerAppIcon({ size = 48, includeTile = true, className = '', ...props }: AppIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 96 96"
      width={size}
      height={size}
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {includeTile && (
        <rect
          x="1"
          y="1"
          width="94"
          height="94"
          rx="21"
          fill="#141a26"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />
      )}
      {/* Handle: Single arc handle */}
      <path
        d="M 38 40 V 35 A 10 10 0 0 1 58 35 V 40"
        stroke="#4da3ff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Bag Body: Clean symmetric trapezoid */}
      <path
        d="M 33 40 L 27.5 65 A 3.5 3.5 0 0 0 31 68.5 H 65 A 3.5 3.5 0 0 0 68.5 65 L 63 40 Z"
        stroke="#4da3ff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * LezzFlow Seller (Shopkeeper App) Icon
 * Flat minimal line icon, 2px rounded stroke, SF Symbols / Linear style
 * Accent: #3ddc97
 */
export function SellerAppIcon({ size = 48, includeTile = true, className = '', ...props }: AppIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 96 96"
      width={size}
      height={size}
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {includeTile && (
        <rect
          x="1"
          y="1"
          width="94"
          height="94"
          rx="21"
          fill="#141a26"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />
      )}
      {/* Flat Awning Top Bar */}
      <path
        d="M 24 31 H 72"
        stroke="#3ddc97"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Awning Body with 3 Rounded Scallops */}
      <path
        d="M 27 31 V 40 A 7 5.5 0 0 0 41 40 A 7 5.5 0 0 0 55 40 A 7 5.5 0 0 0 69 40 V 31"
        stroke="#3ddc97"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Store Walls */}
      <path
        d="M 30 46 V 68.5"
        stroke="#3ddc97"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 66 46 V 68.5"
        stroke="#3ddc97"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Door Rectangle */}
      <path
        d="M 41 68.5 V 53 A 1.5 1.5 0 0 1 42.5 51.5 H 53.5 A 1.5 1.5 0 0 1 55 53 V 68.5"
        stroke="#3ddc97"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Ground Baseline */}
      <path
        d="M 24 68.5 H 72"
        stroke="#3ddc97"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * LezzFlow Partner (Rider App) Icon
 * Flat minimal line icon, 2px rounded stroke, SF Symbols / Linear style
 * Accent: #a78bfa
 */
export function RiderAppIcon({ size = 48, includeTile = true, className = '', ...props }: AppIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 96 96"
      width={size}
      height={size}
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {includeTile && (
        <rect
          x="1"
          y="1"
          width="94"
          height="94"
          rx="21"
          fill="#141a26"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />
      )}
      {/* Wheels: Two circles */}
      <circle cx="28" cy="55" r="11" stroke="#a78bfa" strokeWidth="2" />
      <circle cx="68" cy="55" r="11" stroke="#a78bfa" strokeWidth="2" />
      {/* Frame */}
      <path
        d="M 28 55 L 38 39 L 45 55 L 28 55"
        stroke="#a78bfa"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 38 39 H 58 L 45 55"
        stroke="#a78bfa"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 58 39 L 68 55"
        stroke="#a78bfa"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Seat post & Saddle */}
      <path d="M 38 39 V 33" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
      <path d="M 33 33 H 43" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
      {/* Stem & Handlebar */}
      <path d="M 58 39 V 32" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
      <path d="M 54 32 H 62" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
