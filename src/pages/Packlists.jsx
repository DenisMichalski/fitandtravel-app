import React from "react";
import { useMemo, useState } from 'react'

const BASE = ["T-Shirts", "Shorts", "Laufschuhe", "Trinkflasche"]
const FITNESS = ["Fitnessband", "Springseil", "Sporthandtuch"]
const STRAND = ["Badehose", "Sonnencreme", "Sonnenbrille"]

export default function Packlists() {
  const [context, setContext] = useState('city')

  const items = useMemo(() => {
    if (context === 'fitness') return [...BASE, ...FITNESS]
    if (context === 'beach') return [...BASE, ...STRAND]
    return BASE
  }, [context])

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Packlisten</h1>
        <p className="text-slate-600">Wähle den Kontext – Liste wird automatisch generiert.</p>
      </header>

      <div className="flex items-center gap-2">
        <label className="text-sm">Reisekontext:</label>
        <select value={context} onChange={e => setContext(e.target.value)} className="rounded-xl border-slate-300">
          <option value="city">Städtetrip</option>
          <option value="fitness">Fitness-Fokus</option>
          <option value="beach">Strand</option>
        </select>
        <button className="ml-auto px-4 py-2 rounded-xl bg-slate-900 text-white">Affiliate-Boxen (bald)</button>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((it, idx) => (
          <li key={idx} className="rounded-2xl bg-white p-4 ring-1 ring-slate-200 flex items-center justify-between">
            <span>{it}</span>
            <button className="text-sm px-3 py-1 rounded-lg bg-slate-100 ring-1 ring-slate-200">Amazon</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
