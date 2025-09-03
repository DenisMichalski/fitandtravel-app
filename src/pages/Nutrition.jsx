const ITEMS = [
  { id: 1, title: 'Reise-Snack: Nüsse & Beeren', type: 'Snack' },
  { id: 2, title: 'Meal-Prep: Overnight Oats', type: 'Meal-Prep' },
  { id: 3, title: 'Schnelles Rezept: Wrap mit Hähnchen', type: 'Rezept' },
];

export default function Nutrition() {
  return (
    <div className='space-y-6'>
      <header>
        <h1 className='text-2xl font-bold'>Ernährung</h1>
        <p className='text-slate-600'>
          Einfache, reisefreundliche Ideen – ohne viel Aufwand.
        </p>
      </header>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
        {ITEMS.map((i) => (
          <article
            key={i.id}
            className='rounded-2xl bg-white p-4 ring-1 ring-slate-200'
          >
            <h3 className='font-semibold'>{i.title}</h3>
            <p className='text-sm text-slate-600 mt-1'>Kategorie: {i.type}</p>
            <button className='mt-3 px-3 py-1 rounded-lg bg-slate-900 text-white text-sm'>
              Details
            </button>
          </article>
        ))}
      </div>

      <div className='rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200'>
        <h3 className='font-semibold'>Affiliate-Demo</h3>
        <p className='text-sm text-slate-600'>
          Hier platzieren wir später Produkt-Boxen (z. B. Fitnessband, Shaker).
        </p>
      </div>
    </div>
  );
}
