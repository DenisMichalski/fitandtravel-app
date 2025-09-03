import { useMemo, useState } from 'react';

const BASE = ['T-Shirts', 'Shorts', 'Laufschuhe', 'Trinkflasche'];
const FITNESS = ['Fitnessband', 'Springseil', 'Sporthandtuch'];
const STRAND = ['Badehose', 'Sonnencreme', 'Sonnenbrille'];

// 👉 Hier werden später echte Affiliate-Links eintragen
const AFFILIATE_BY_CONTEXT = {
  city: [
    {
      title: 'Faltbare Trinkflasche',
      img: 'https://via.placeholder.com/120',
      href: 'https://www.amazon.de/dp/DEIN-AFFILIATE-LINK-FLAS',
      note: 'Leicht & auslaufsicher',
    },
    {
      title: 'Ultraleichter Rucksack 20L',
      img: 'https://via.placeholder.com/120',
      href: 'https://www.amazon.de/dp/DEIN-AFFILIATE-LINK-BAG',
      note: 'Handgepäck-tauglich',
    },
  ],
  fitness: [
    {
      title: 'Fitnessband-Set (leicht–stark)',
      img: 'https://via.placeholder.com/120',
      href: 'https://www.amazon.de/dp/DEIN-AFFILIATE-LINK-BAND',
      note: 'Top fürs Hotelzimmer',
    },
    {
      title: 'Springseil (Stahlseil, verstellbar)',
      img: 'https://via.placeholder.com/120',
      href: 'https://www.amazon.de/dp/DEIN-AFFILIATE-LINK-ROPE',
      note: 'Cardio to-go',
    },
  ],
  beach: [
    {
      title: 'Schnelltrocknendes Sporthandtuch',
      img: 'https://via.placeholder.com/120',
      href: 'https://www.amazon.de/dp/DEIN-AFFILIATE-LINK-TOWEL',
      note: 'Kompakt & sandabweisend',
    },
    {
      title: 'Reisefreundliche Sonnencreme',
      img: 'https://via.placeholder.com/120',
      href: 'https://www.amazon.de/dp/DEIN-AFFILIATE-LINK-SPF',
      note: 'Handgepäckgröße',
    },
  ],
};

function AffiliateCard({ title, img, href, note, onClick }) {
  return (
    <article className="flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
      <img src={img} alt={title} className="h-20 w-20 rounded-lg object-cover" />
      <div className="flex-1">
        <h4 className="font-medium">{title}</h4>
        {note && <p className="text-sm text-slate-600">{note}</p>}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
          className="inline-block mt-2 px-3 py-1 rounded-lg bg-slate-900 text-white text-sm"
        >
          Jetzt kaufen →
        </a>
      </div>
    </article>
  );
}

export default function Packlists() {
  const [context, setContext] = useState('city');

  const items = useMemo(() => {
    if (context === 'fitness') return [...BASE, ...FITNESS];
    if (context === 'beach') return [...BASE, ...STRAND];
    return BASE;
  }, [context]);

  const products = AFFILIATE_BY_CONTEXT[context];

  const trackClick = (label) => {
    // TODO: Später durch echtes Tracking ersetzen (Matomo/GA)
    console.log('Affiliate click:', { context, label, ts: Date.now() });
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Packlisten</h1>
        <p className="text-slate-600">Wähle den Kontext – Liste wird automatisch generiert.</p>
      </header>

      <div className="flex items-center gap-2">
        <label className="text-sm">Reisekontext:</label>
        <select
          value={context}
          onChange={(e) => setContext(e.target.value)}
          className="rounded-xl border-slate-300"
        >
          <option value="city">Städtetrip</option>
          <option value="fitness">Fitness-Fokus</option>
          <option value="beach">Strand</option>
        </select>
        <button className="ml-auto px-4 py-2 rounded-xl bg-slate-900 text-white">
          Affiliate-Boxen (bald)
        </button>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((it, idx) => (
          <li
            key={idx}
            className="rounded-2xl bg-white p-4 ring-1 ring-slate-200 flex items-center justify-between"
          >
            <span>{it}</span>
            <button className="text-sm px-3 py-1 rounded-lg bg-slate-100 ring-1 ring-slate-200">
              Amazon
            </button>
          </li>
        ))}
      </ul>

      {/* Kontextabhängige Affiliate-Empfehlungen */}
      <section className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 mt-2">
        <h3 className="font-semibold mb-3">Empfohlenes Gear für: {context === 'city' ? 'Städtetrip' : context === 'fitness' ? 'Fitness' : 'Strand'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {products.map((p) => (
            <AffiliateCard key={p.title} {...p} onClick={() => trackClick(p.title)} />
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Hinweis: Bei einigen Links handelt es sich um Affiliate-Links. Wenn du darüber kaufst, erhalten wir eine kleine Provision – für dich ändert sich der Preis nicht.
        </p>
      </section>
    </div>
  );
}

