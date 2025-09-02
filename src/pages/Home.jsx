import React from "react";
import { Link } from 'react-router-dom'

const Tile = ({ to, title, emoji, desc }) => (
  <Link
    to={to}
    className="group rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 hover:shadow-md transition flex flex-col"
  >
    <div className="text-4xl mb-2">{emoji}</div>
    <h3 className="text-lg font-semibold mb-1">{title}</h3>
    <p className="text-sm text-slate-600">{desc}</p>
    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-slate-700 group-hover:gap-2 transition">
      Los geht’s →
    </span>
  </Link>
)

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Dein Personal Trainer im Koffer</h1>
        <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
          Workouts ohne Geräte, schnelle Meal-Ideen und smarte Packlisten – optimiert für unterwegs.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/workouts" className="px-5 py-2 rounded-xl bg-slate-900 text-white font-medium">Schnell starten</Link>
          <Link to="/packlists" className="px-5 py-2 rounded-xl ring-1 ring-slate-300 font-medium bg-white">Packliste erstellen</Link>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Tile to="/workouts" title="Workouts" emoji="🏋️" desc="5/10/20-Minuten-Pläne für Hotel & Outdoor." />
        <Tile to="/nutrition" title="Ernährung" emoji="🍏" desc="Snacks & Meal-Prep für Reisen." />
        <Tile to="/packlists" title="Packlisten" emoji="🎒" desc="Automatisch generiert – inkl. Fitness-Gear." />
      </section>

      <section className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-700 text-white p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">KI-Plan erstellen (Demo)</h3>
            <p className="text-white/80">Bald: personalisierte Pläne nach Zeit, Ziel & Equipment.</p>
          </div>
          <button className="px-4 py-2 rounded-xl bg-white text-slate-900 font-semibold">In Kürze</button>
        </div>
      </section>
    </div>
  )
}
