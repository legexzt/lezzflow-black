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

function MemberMonogram({ id, highlight }: { id: string; highlight: boolean }) {
  const getGradient = () => {
    switch (id) {
      case 'MJ':
        return 'from-[#0076ff] to-[#0052cc] text-white shadow-lg shadow-[#0076ff]/20';
      case 'SR':
        return 'from-[#1e2433] to-[#10141f] text-[#93c5fd] border border-blue-500/20';
      case 'MB':
        return 'from-[#1e2433] to-[#10141f] text-[#6ee7b7] border border-emerald-500/20';
      case 'SN':
        return 'from-[#1e2433] to-[#10141f] text-[#fda4af] border border-rose-500/20';
      case 'AR':
        return 'from-[#1e2433] to-[#10141f] text-[#fde68a] border border-amber-500/20';
      case 'MT':
      default:
        return 'from-[#1e2433] to-[#10141f] text-[#7dd3fc] border border-sky-500/20';
    }
  };

  return (
    <div className={`w-full h-full rounded-full flex items-center justify-center font-bold text-xl tracking-wider select-none bg-gradient-to-b ${getGradient()}`}>
      <span>{id}</span>
    </div>
  );
}

export function TeamSection() {
  const members = [
    {
      id: 'MJ',
      name: 'Mohd Jibraan',
      role: 'Team Leader',
      specialty: 'Systems Architect',
      highlight: true,
      borderColor: 'border-[#0076ff]/40',
      badgeBg: 'bg-[#0076ff] text-white',
    },
    {
      id: 'SR',
      name: 'Syed Salman Razvi',
      role: 'Member, Team legezt',
      specialty: 'Core Backend',
      highlight: false,
      borderColor: 'border-white/10',
      badgeBg: 'bg-white/5 text-slate-300 border border-white/10',
    },
    {
      id: 'MB',
      name: 'Muskan Begum',
      role: 'Member, Team legezt',
      specialty: 'UI/UX & Product',
      highlight: false,
      borderColor: 'border-white/10',
      badgeBg: 'bg-white/5 text-slate-300 border border-white/10',
    },
    {
      id: 'SN',
      name: 'Shaista Naaz',
      role: 'Member, Team legezt',
      specialty: 'Cloud & Frontend',
      highlight: false,
      borderColor: 'border-white/10',
      badgeBg: 'bg-white/5 text-slate-300 border border-white/10',
    },
    {
      id: 'AR',
      name: 'Abdul Rahman Mohd Ghouse',
      role: 'Member, Team legezt',
      specialty: 'Database & DevOps',
      highlight: false,
      borderColor: 'border-white/10',
      badgeBg: 'bg-white/5 text-slate-300 border border-white/10',
    },
    {
      id: 'MT',
      name: 'Muttahir Talha Habeeb',
      role: 'Member, Team legezt',
      specialty: 'Mobile App & QA',
      highlight: false,
      borderColor: 'border-white/10',
      badgeBg: 'bg-white/5 text-slate-300 border border-white/10',
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
              <span className="team-idx font-sans text-[11px] text-slate-500 font-medium absolute top-3 right-3">
                0{i + 1}
              </span>

              {/* Clean Monogram Portrait */}
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full p-1 transition-transform duration-300 group-hover:scale-105">
                <div className="w-full h-full rounded-full overflow-hidden border border-white/15 shadow-inner">
                  <MemberMonogram id={member.id} highlight={member.highlight} />
                </div>
              </div>

              {/* Tag / Badge */}
              <div className="mt-3 flex items-center justify-center">
                {member.highlight ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold font-sans tracking-wide uppercase bg-[#0076ff] text-white">
                    TEAM LEAD
                  </span>
                ) : (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium font-sans tracking-wide ${member.badgeBg}`}>
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
