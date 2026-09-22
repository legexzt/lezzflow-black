'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  MapPin,
  PackageCheck,
  Bike,
  Sparkles,
  HeartHandshake,
  Store,
  Check,
  RotateCcw,
  ArrowRight,
  Search,
} from 'lucide-react';

const features = [
  [MapPin, 'Nearby discovery', 'Start with your neighbourhood. Find the shops already around you.'],
  [PackageCheck, 'Stock you can see', 'Check availability and prices before you make the trip.'],
  [Bike, 'A shorter journey', 'Order locally and follow your delivery from shop to doorstep.'],
  [Store, 'Your store, digitised', 'A simple place to manage your catalogue, stock and incoming orders.'],
  [Sparkles, 'Insights that help', 'Understand demand and availability to decide what to stock next.'],
  [HeartHandshake, 'Growth stays local', 'Make convenience work for the neighbourhood, and the people in it.'],
] as const;

export function ProductFeatures() {
  return (
    <section className="section commerce-features" id="features" aria-labelledby="features-title">
      <div className="section-label reveal">
        <span>03 / THE PLATFORM</span>
        <span>DESIGNED AROUND YOUR NEIGHBOURHOOD</span>
      </div>
      <div className="commerce-heading reveal">
        <h2 id="features-title">
          One platform.<br />
          <span>Two sides thriving.</span>
        </h2>
        <p>
          A connected experience for the person looking for something and the shopkeeper who has it.
        </p>
      </div>
      <div className="feature-matrix">
        {features.map(([Icon, title, copy], i) => (
          <article className="commerce-feature reveal" key={title} style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
            <div className="feature-top">
              <Icon size={24} strokeWidth={1.4} />
              <span>0{i + 1}</span>
            </div>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const journeys = {
  customer: {
    label: 'For customers',
    title: 'Find it nearby.',
    accent: 'Keep your day moving.',
    image: '/images/customers/customer-shopping-india.webp',
    alt: 'Customers visiting a neighbourhood shop in Tamil Nadu',
    steps: [
      ['Search', 'Find the everyday things you need, close to home.'],
      ['Compare', 'See nearby stores, availability, prices and distance.'],
      ['Receive', 'Place your order and follow its journey to your door.'],
    ],
  },
  seller: {
    label: 'For sellers',
    title: 'Your shop. More possibilities.',
    accent: 'Built around your day.',
    image: '/images/sellers/seller-inventory.webp',
    alt: 'Shopkeeper standing among stocked shelves in an Indian store',
    steps: [
      ['List', 'Bring your store and its products online.'],
      ['Manage', 'Update stock and organise incoming orders from your phone.'],
      ['Grow', 'Use demand insights to make your next stocking decision.'],
    ],
  },
};

export function CustomerJourneys() {
  const [audience, setAudience] = useState<'customer' | 'seller'>('customer');
  const selected = journeys[audience];

  return (
    <>
      <section className="section commerce-journeys" id="how-it-works" aria-labelledby="journeys-title">
        <div className="section-label reveal">
          <span>04 / HOW IT WORKS</span>
          <span>LESS FRICTION. MORE CONNECTION.</span>
        </div>
        <div className="commerce-heading reveal">
          <h2 id="journeys-title">
            Three steps.<br />
            <span>That&apos;s it.</span>
          </h2>
          <div className="journey-switch" aria-label="Choose your journey">
            {(['customer', 'seller'] as const).map((key) => (
              <button
                key={key}
                aria-pressed={audience === key}
                aria-controls="journey-content"
                onClick={() => setAudience(key)}
              >
                {journeys[key].label}
              </button>
            ))}
          </div>
        </div>
        <div className="journey-layout reveal" id="journey-content">
          <figure className="journey-photo">
            <Image
              src={selected.image}
              alt={selected.alt}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <figcaption>
              <span>THE PEOPLE AT THE CENTRE</span>
              <strong>{selected.accent}</strong>
            </figcaption>
          </figure>
          <div className="journey-content" aria-live="polite">
            <p className="eyebrow">{selected.label}</p>
            <h3>{selected.title}</h3>
            <ol>
              {selected.steps.map(([title, copy], i) => (
                <li key={title}>
                  <span>0{i + 1}</span>
                  <div>
                    <h4>{title}</h4>
                    <p>{copy}</p>
                  </div>
                </li>
              ))}
            </ol>
            <a className="text-link" href="#prototype">
              Explore the concept
            </a>
          </div>
        </div>
      </section>

      <section className="seller-manifesto section" aria-labelledby="seller-title">
        <div className="seller-photo">
          <Image
            src="/images/market/hyperlocal-market.webp"
            alt="Fresh produce stalls in an Indian neighbourhood market"
            fill
            sizes="100vw"
          />
        </div>
        <div className="seller-message reveal">
          <p className="eyebrow">FOR THE SHOPS THAT KNOW YOUR NAME</p>
          <h2 id="seller-title">
            Your dukaan,<br />
            <span>supercharged.</span>
          </h2>
          <p>
            Your shelves. Your customers. Your neighbourhood.<br />
            A digital storefront that helps bring them together.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-7">
            <a
              className="button button-light"
              href="https://lezzflow-app.vercel.app/#waitlist"
              target="_blank"
              rel="noopener noreferrer"
            >
              Register Seller Interest <span>↗</span>
            </a>
            <a className="hero-secondary" href="#how-it-works">
              Discover the journeys
            </a>
          </div>
        </div>
        <span className="seller-footnote">HAR GALI KI DUKAAN, HAR PHONE MEIN.</span>
      </section>
    </>
  );
}

const demoProducts = ['Coffee', 'Milk', 'Rice'] as const;
const demoStores = [
  { name: 'Corner Kirana', distance: '250 m', prices: [120, 30, 65], initial: [6, 12, 8] },
  { name: 'Everyday Mart', distance: '450 m', prices: [115, 32, 62], initial: [0, 9, 15] },
  { name: 'Neighbourhood Pantry', distance: '700 m', prices: [125, 29, 68], initial: [4, 0, 7] },
];

export function ConceptPreview() {
  const [view, setView] = useState<'customer' | 'seller'>('customer');
  const [query, setQuery] = useState('Coffee');
  const [store, setStore] = useState(0);
  const [stock, setStock] = useState(() => demoStores.map((s) => [...s.initial]));
  const [order, setOrder] = useState<{ store: number; product: number } | null>(null);
  const [notice, setNotice] = useState('');
  const product = demoProducts.findIndex((p) => p.toLowerCase() === query.trim().toLowerCase());
  const selected = demoStores[store];

  const reserve = () => {
    if (product < 0 || stock[store][product] <= 0 || order) return;
    setStock((current) =>
      current.map((row, i) => row.map((count, j) => (i === store && j === product ? count - 1 : count)))
    );
    setOrder({ store, product });
    setNotice('Demo order created. Switch to Seller dashboard to see the same order and updated stock.');
  };

  const reset = () => {
    setStock(demoStores.map((s) => [...s.initial]));
    setOrder(null);
    setStore(0);
    setQuery('Coffee');
    setView('customer');
    setNotice('Demo reset. Try another product or store.');
  };

  return (
    <div className="live-demo reveal">
      <div className="demo-topbar">
        <div className="demo-brand">
          Lezz<span>Flow</span>
          <small>INTERACTIVE WALKTHROUGH</small>
        </div>
        <button className="demo-reset" onClick={reset}>
          <RotateCcw size={14} /> Reset
        </button>
      </div>
      <div className="demo-disclosure">
        Sample products, prices and fictional stores. No payment or real order is placed.
      </div>
      <div className="demo-tabs" aria-label="Demo perspective">
        {(['customer', 'seller'] as const).map((side) => (
          <button
            key={side}
            aria-pressed={view === side}
            aria-controls="demo-workspace"
            onClick={() => setView(side)}
          >
            {side === 'customer' ? <Search size={17} /> : <Store size={17} />}
            {side === 'customer' ? 'Customer app' : 'Seller dashboard'}
            {side === 'seller' && order && <span className="order-dot" aria-label="One demo order" />}
          </button>
        ))}
      </div>
      <div id="demo-workspace" className="demo-workspace">
        {view === 'customer' ? (
          <>
            <div className="demo-discovery">
              <p className="eyebrow">01 / FIND IT NEARBY</p>
              <h3>
                Something you need.<br />
                <span>Closer than you think.</span>
              </h3>
              <label className="demo-search">
                <Search size={18} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Try Coffee, Milk or Rice"
                  aria-label="Search sample products"
                />
              </label>
              <div className="demo-product-pills">
                {demoProducts.map((p) => (
                  <button
                    key={p}
                    aria-pressed={query.trim().toLowerCase() === p.toLowerCase()}
                    onClick={() => setQuery(p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <div className="demo-map" aria-label="Illustrative neighbourhood map, not actual geography">
                <div className="map-road road-one" />
                <div className="map-road road-two" />
                <div className="map-road road-three" />
                <span className="demo-you">You</span>
                {demoStores.map((s, i) => (
                  <button
                    className={`store-pin pin-${i}`}
                    key={s.name}
                    aria-pressed={store === i}
                    aria-label={`Select ${s.name}`}
                    onClick={() => setStore(i)}
                  >
                    <Store size={16} />
                    <span>{s.name}</span>
                  </button>
                ))}
                <small>Illustrative map</small>
              </div>
            </div>
            <div className="demo-results">
              <p className="eyebrow">02 / COMPARE YOUR OPTIONS</p>
              <h3>{product >= 0 ? `${demoProducts[product]} around you` : 'Try one of the sample products'}</h3>
              <p className="demo-unit">
                {product >= 0
                  ? ['100 g pack', '500 ml pack', '1 kg pack'][product]
                  : 'This walkthrough includes Coffee, Milk and Rice.'}
              </p>
              {product >= 0 && (
                <>
                  <div className="store-results">
                    {demoStores.map((s, i) => (
                      <button
                        key={s.name}
                        className="store-result"
                        aria-pressed={store === i}
                        onClick={() => setStore(i)}
                      >
                        <span className="store-avatar">
                          <Store size={20} />
                        </span>
                        <span>
                          <strong>{s.name}</strong>
                          <small>
                            {s.distance} ·{' '}
                            <span className={stock[i][product] > 0 ? 'in-stock' : 'out-stock'}>
                              {stock[i][product] > 0 ? 'In stock' : 'Unavailable'}
                            </span>
                          </small>
                        </span>
                        <b>₹{s.prices[product]}</b>
                      </button>
                    ))}
                  </div>
                  <div className="store-detail">
                    <span>SELECTED STORE</span>
                    <h4>{selected.name}</h4>
                    <p>
                      {stock[store][product]} units available · ₹{selected.prices[product]} per pack
                    </p>
                    <button
                      className="demo-primary"
                      disabled={stock[store][product] <= 0 || !!order}
                      onClick={reserve}
                    >
                      {order
                        ? 'Demo order created'
                        : stock[store][product] <= 0
                        ? 'Choose an in-stock store'
                        : 'Place a demo order'}
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="demo-discovery">
              <p className="eyebrow">03 / THE SELLER SEES IT TOO</p>
              <h3>
                Your shelves.<br />
                <span>A clearer picture.</span>
              </h3>
              <label className="demo-store-select">
                Store
                <select value={store} onChange={(e) => setStore(Number(e.target.value))}>
                  {demoStores.map((s, i) => (
                    <option value={i} key={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </label>
              <div className="seller-demo-order">
                <PackageCheck size={22} />
                <h4>{order && order.store === store ? 'New demo order' : 'No demo orders for this store'}</h4>
                <p>
                  {order && order.store === store
                    ? `1 × ${demoProducts[order.product]} · ₹${selected.prices[order.product]}. Inventory has decreased by one.`
                    : 'Place an order from the customer view to see it arrive here.'}
                </p>
                {order && order.store !== store && (
                  <button className="text-link" onClick={() => setStore(order.store)}>
                    View the store with the order →
                  </button>
                )}
              </div>
              <div className="demo-insight">
                <Sparkles size={19} />
                <strong>What should I stock next?</strong>
                <p>
                  {stock[store][0] === 0
                    ? 'Coffee is unavailable here, while other sample stores have stock. Review local demand before replenishing.'
                    : 'Compare product demand with available stock to spot your next opportunity.'}
                </p>
                <small>Illustrative insight, not a live AI prediction.</small>
              </div>
            </div>
            <div className="demo-results">
              <p className="eyebrow">INVENTORY / {selected.name}</p>
              <h3>Small updates. Real clarity.</h3>
              <div className="inventory-table">
                <table>
                  <caption className="sr-only">Editable sample stock for {selected.name}</caption>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {demoProducts.map((p, i) => (
                      <tr key={p}>
                        <th scope="row">{p}</th>
                        <td>₹{selected.prices[i]}</td>
                        <td>{stock[store][i]}</td>
                        <td>
                          <button
                            aria-label={`Add one unit of ${p}`}
                            onClick={() => {
                              setStock((current) =>
                                current.map((row, s) =>
                                  row.map((count, j) => (s === store && j === i ? count + 1 : count))
                                )
                              );
                              setNotice(
                                `Added one unit of ${p} at ${selected.name}. Customer availability is updated too.`
                              );
                            }}
                          >
                            +1
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="demo-sync">
                <Check size={18} />
                <div>
                  <strong>One connected experience</strong>
                  <p>Switch back to the customer app. The stock you update here is reflected there.</p>
                </div>
              </div>
              <button className="demo-primary" onClick={() => setView('customer')}>
                Back to customer app <ArrowRight size={16} />
              </button>
            </div>
          </>
        )}
      </div>
      <div className="demo-notice" role="status">
        {notice || 'Try it: choose a product → select a store → place a demo order → open the seller dashboard.'}
      </div>
    </div>
  );
}

function MemberAvatarSvg({ id }: { id: string }) {
  switch (id) {
    case 'MJ': // Mohd Jibraan - Lead
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <defs>
            <linearGradient id="bg-mj" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#082f49" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="skin-mj" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fbd5b5" />
              <stop offset="100%" stopColor="#e5a97e" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="46" fill="url(#bg-mj)" />
          {/* Collar/Hoodie */}
          <path d="M22 92 C26 72, 40 68, 50 68 C60 68, 74 72, 78 92 Z" fill="#0f172a" />
          <path d="M42 69 L50 82 L58 69 Z" fill="#0284c7" />
          {/* Neck */}
          <rect x="44" y="60" width="12" height="12" rx="3" fill="#e5a97e" />
          {/* Head & Face */}
          <ellipse cx="50" cy="46" rx="17" ry="19" fill="url(#skin-mj)" />
          {/* Modern Hair */}
          <path d="M31 43 C31 28, 42 24, 56 24 C68 24, 70 32, 69 41 C66 34, 58 32, 46 33 C37 34, 33 38, 31 43 Z" fill="#18181b" />
          {/* Cyber Glasses */}
          <rect x="36" y="42" width="11" height="7" rx="2" stroke="#00e5ff" strokeWidth="1.8" fill="#00e5ff22" />
          <rect x="53" y="42" width="11" height="7" rx="2" stroke="#00e5ff" strokeWidth="1.8" fill="#00e5ff22" />
          <line x1="47" y1="45" x2="53" y2="45" stroke="#00e5ff" strokeWidth="1.8" />
          {/* Tech Headset */}
          <path d="M30 44 C27 44, 27 50, 30 50 L32 50 L32 44 Z" fill="#00e5ff" />
          <path d="M30 49 Q34 60 42 60" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="43" cy="60" r="2" fill="#00e5ff" />
          {/* Smile */}
          <path d="M45 56 Q50 60 55 56" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'SR': // Syed Salman Razvi - Core Systems
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <defs>
            <linearGradient id="bg-sr" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2e1065" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
            <linearGradient id="skin-sr" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#fba973" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="46" fill="url(#bg-sr)" />
          {/* Hoodie */}
          <path d="M22 92 C26 72, 40 68, 50 68 C60 68, 74 72, 78 92 Z" fill="#1e1b4b" />
          <path d="M43 69 L50 80 L57 69 Z" fill="#818cf8" />
          {/* Neck */}
          <rect x="44" y="60" width="12" height="12" rx="3" fill="#fba973" />
          {/* Face */}
          <ellipse cx="50" cy="46" rx="17" ry="19" fill="url(#skin-sr)" />
          {/* Hair Crop */}
          <path d="M31 42 C30 28, 43 25, 52 25 C64 25, 69 31, 69 40 C65 33, 56 31, 46 32 C38 33, 33 37, 31 42 Z" fill="#09090b" />
          {/* Eyes & Eyebrows */}
          <path d="M38 41 Q42 39 46 41" stroke="#27272a" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M54 41 Q58 39 62 41" stroke="#27272a" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="42" cy="45" r="2.2" fill="#18181b" />
          <circle cx="58" cy="45" r="2.2" fill="#18181b" />
          {/* Smile */}
          <path d="M45 56 Q50 59 55 56" stroke="#c2410c" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'MB': // Muskan Begum - UI/UX
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <defs>
            <linearGradient id="bg-mb" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#064e3b" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <linearGradient id="skin-mb" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffedd5" />
              <stop offset="100%" stopColor="#fed7aa" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="46" fill="url(#bg-mb)" />
          {/* Hijab / Designer Drape */}
          <path d="M22 92 C25 70, 40 66, 50 66 C60 66, 75 70, 78 92 Z" fill="#042f2e" />
          <path d="M30 45 C30 26, 42 24, 50 24 C58 24, 70 26, 70 45 C70 64, 60 70, 50 70 C40 70, 30 64, 30 45 Z" fill="#0f766e" />
          {/* Inner Face Oval */}
          <ellipse cx="50" cy="47" rx="14" ry="16" fill="url(#skin-mb)" />
          {/* Expressive Eyes */}
          <ellipse cx="43" cy="45" rx="2" ry="2.2" fill="#134e4a" />
          <ellipse cx="57" cy="45" rx="2" ry="2.2" fill="#134e4a" />
          <path d="M39 41 Q43 38 47 40" stroke="#042f2e" strokeWidth="1.2" />
          <path d="M53 40 Q57 38 61 41" stroke="#042f2e" strokeWidth="1.2" />
          {/* Cheerful Smile */}
          <path d="M46 54 Q50 58 54 54" stroke="#f43f5e" strokeWidth="1.6" strokeLinecap="round" />
          {/* Designer Pearl Earring highlight */}
          <circle cx="34" cy="52" r="2.2" fill="#6ee7b7" />
        </svg>
      );
    case 'SN': // Shaista Naaz - Cloud & Frontend
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <defs>
            <linearGradient id="bg-sn" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4c0519" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
            <linearGradient id="skin-sn" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffedd5" />
              <stop offset="100%" stopColor="#fbcfe8" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="46" fill="url(#bg-sn)" />
          {/* Attire */}
          <path d="M22 92 C25 70, 40 66, 50 66 C60 66, 75 70, 78 92 Z" fill="#881337" />
          <path d="M30 45 C30 26, 42 24, 50 24 C58 24, 70 26, 70 45 C70 64, 60 70, 50 70 C40 70, 30 64, 30 45 Z" fill="#be123c" />
          {/* Face Oval */}
          <ellipse cx="50" cy="47" rx="14" ry="16" fill="url(#skin-sn)" />
          {/* Eyes */}
          <ellipse cx="43" cy="45" rx="2" ry="2.2" fill="#4c0519" />
          <ellipse cx="57" cy="45" rx="2" ry="2.2" fill="#4c0519" />
          <path d="M40 41 Q43 39 47 41" stroke="#4c0519" strokeWidth="1.2" />
          <path d="M53 41 Q57 39 60 41" stroke="#4c0519" strokeWidth="1.2" />
          {/* Smile */}
          <path d="M46 54 Q50 57 54 54" stroke="#fb7185" strokeWidth="1.6" strokeLinecap="round" />
          {/* Glowing tech pin */}
          <circle cx="66" cy="52" r="2.2" fill="#fda4af" />
        </svg>
      );
    case 'AR': // Abdul Rahman Mohd Ghouse - Database
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <defs>
            <linearGradient id="bg-ar" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#451a03" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="skin-ar" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#fba973" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="46" fill="url(#bg-ar)" />
          {/* Jacket */}
          <path d="M22 92 C26 72, 40 68, 50 68 C60 68, 74 72, 78 92 Z" fill="#292524" />
          <path d="M43 69 L50 82 L57 69 Z" fill="#f59e0b" />
          {/* Neck */}
          <rect x="44" y="60" width="12" height="12" rx="3" fill="#fba973" />
          {/* Face */}
          <ellipse cx="50" cy="46" rx="17" ry="19" fill="url(#skin-ar)" />
          {/* Hair */}
          <path d="M31 40 C31 27, 43 25, 52 25 C64 25, 69 31, 69 39 C64 34, 56 31, 46 32 C38 33, 33 36, 31 40 Z" fill="#1c1917" />
          {/* Glasses */}
          <rect x="36" y="42" width="11" height="7" rx="2" stroke="#fef08a" strokeWidth="1.5" fill="#fef08a18" />
          <rect x="53" y="42" width="11" height="7" rx="2" stroke="#fef08a" strokeWidth="1.5" fill="#fef08a18" />
          <line x1="47" y1="45" x2="53" y2="45" stroke="#fef08a" strokeWidth="1.5" />
          {/* Smile */}
          <path d="M46 56 Q50 59 54 56" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'MT': // Muttahir Talha Habeeb - Mobile & QA
    default:
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <defs>
            <linearGradient id="bg-mt" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0c4a6e" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
            <linearGradient id="skin-mt" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fbd5b5" />
              <stop offset="100%" stopColor="#fba973" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="46" fill="url(#bg-mt)" />
          {/* Hoodie */}
          <path d="M22 92 C26 72, 40 68, 50 68 C60 68, 74 72, 78 92 Z" fill="#0f172a" />
          <path d="M43 69 L50 82 L57 69 Z" fill="#38bdf8" />
          {/* Neck */}
          <rect x="44" y="60" width="12" height="12" rx="3" fill="#fba973" />
          {/* Face */}
          <ellipse cx="50" cy="46" rx="17" ry="19" fill="url(#skin-mt)" />
          {/* Modern Hair cut */}
          <path d="M31 41 C31 27, 43 24, 52 24 C64 24, 69 29, 69 38 C64 33, 56 31, 46 32 C38 33, 33 36, 31 41 Z" fill="#18181b" />
          {/* Eyes */}
          <circle cx="42" cy="45" r="2.2" fill="#0f172a" />
          <circle cx="58" cy="45" r="2.2" fill="#0f172a" />
          {/* Smile */}
          <path d="M45 56 Q50 59 55 56" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
  }
}

export function TeamSection() {
  const members = [
    {
      id: 'MJ',
      name: 'Mohd Jibraan',
      role: 'Team Leader',
      specialty: 'Systems Architect',
      highlight: true,
      glowColor: 'rgba(0, 229, 255, 0.28)',
      borderColor: 'border-[#00e5ff]/40',
      badgeBg: 'bg-[#0076ff] text-white',
    },
    {
      id: 'SR',
      name: 'Syed Salman Razvi',
      role: 'Member, Team legezt',
      specialty: 'Core Backend',
      highlight: false,
      glowColor: 'rgba(99, 102, 241, 0.22)',
      borderColor: 'border-[#818cf8]/30',
      badgeBg: 'bg-[#4f46e5]/20 text-[#a5b4fc]',
    },
    {
      id: 'MB',
      name: 'Muskan Begum',
      role: 'Member, Team legezt',
      specialty: 'UI/UX & Product',
      highlight: false,
      glowColor: 'rgba(16, 185, 129, 0.22)',
      borderColor: 'border-[#34d399]/30',
      badgeBg: 'bg-[#059669]/20 text-[#6ee7b7]',
    },
    {
      id: 'SN',
      name: 'Shaista Naaz',
      role: 'Member, Team legezt',
      specialty: 'Cloud & Frontend',
      highlight: false,
      glowColor: 'rgba(244, 63, 94, 0.22)',
      borderColor: 'border-[#fb7185]/30',
      badgeBg: 'bg-[#e11d48]/20 text-[#fda4af]',
    },
    {
      id: 'AR',
      name: 'Abdul Rahman Mohd Ghouse',
      role: 'Member, Team legezt',
      specialty: 'Database & DevOps',
      highlight: false,
      glowColor: 'rgba(245, 158, 11, 0.22)',
      borderColor: 'border-[#fbbf24]/30',
      badgeBg: 'bg-[#d97706]/20 text-[#fde68a]',
    },
    {
      id: 'MT',
      name: 'Muttahir Talha Habeeb',
      role: 'Member, Team legezt',
      specialty: 'Mobile App & QA',
      highlight: false,
      glowColor: 'rgba(56, 189, 248, 0.22)',
      borderColor: 'border-[#38bdf8]/30',
      badgeBg: 'bg-[#0284c7]/20 text-[#7dd3fc]',
    },
  ];

  return (
    <section className="section commerce-team" id="team" aria-labelledby="team-title">
      <div className="section-label reveal">
        <span>THE TEAM</span>
        <span>SIX BUILDERS · ONE MISSION</span>
      </div>
      <div className="commerce-heading reveal">
        <h2 id="team-title">
          Built by <span className="text-white">legezt<span className="text-[#0076ff]">.</span></span>
        </h2>
        <p>Six passionate builders bringing India&apos;s neighbourhood commerce online.</p>
      </div>
      <div className="team-lineup">
        {members.map((member, i) => (
          <article
            className="team-member reveal group"
            key={member.name}
            style={{ transitionDelay: `${i * 55}ms` }}
          >
            <div
              className={`team-initials relative flex flex-col items-center justify-center p-4 transition-all duration-300 group-hover:scale-[1.02] ${member.borderColor}`}
              style={{
                boxShadow: `0 10px 30px rgba(0,0,0,0.5)`,
              }}
            >
              <span className="team-idx font-mono text-[11px] text-[#5d7596] absolute top-3 right-3">
                0{i + 1}
              </span>

              {/* Glowing Avatar Portrait */}
              <div
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 transition-transform duration-300 group-hover:scale-105"
                style={{
                  boxShadow: `0 0 25px ${member.glowColor}`,
                }}
              >
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/20 shadow-inner">
                  <MemberAvatarSvg id={member.id} />
                </div>
              </div>

              {/* Tag / Badge */}
              <div className="mt-3 flex items-center justify-center">
                {member.highlight ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold font-mono tracking-wider uppercase bg-[#0076ff] text-white shadow-md shadow-[#0076ff]/40">
                    TEAM LEAD
                  </span>
                ) : (
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium font-mono tracking-wider uppercase ${member.badgeBg}`}>
                    {member.specialty}
                  </span>
                )}
              </div>
            </div>

            <h3 className="text-sm font-semibold text-white mt-4 mb-1 group-hover:text-[#54a3ff] transition-colors">
              {member.name}
            </h3>
            <p className={member.highlight ? 'text-xs text-[#54a3ff] font-medium' : 'text-xs text-[#73849c]'}>
              {member.role}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
