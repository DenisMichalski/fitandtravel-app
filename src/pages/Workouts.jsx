import React from "react";
import { useState } from 'react'

const WORKOUTS = [
  { id: 1, name: 'Jumping Jacks', duration: 5, level: 'Easy', equipment: 'None' },
  { id: 2, name: 'Push-Ups', duration: 10, level: 'Medium', equipment: 'None' },
  { id: 3, name: 'Plank', duration: 5, level: 'Easy', equipment: 'None' },
  { id: 4, name: 'Burpees', duration: 10, level: 'Hard', equipment: 'None' },
  { id: 5, name: 'Squats', duration: 5, level: 'Easy', equipment: 'None' },
]

export default function Workouts() {
  const [duration, setDuration] = useState('all')
  const filtered = WORKOUTS.filter(w => duration === 'all' || String(w.duration) === duration)

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Workouts</h1>
        <p className="text-slate-600">Filtere nach Dauer und starte sofort – keine Geräte nötig.</p>
      </header>

      <div className="flex items-center gap-2">
        <label className="text-sm">Dauer:</label>
        <select
          value={duration}
          onChange={e => setDuration(e.target.value)}
          className="rounded-xl border-slate-300"
        >
          <option value="all">Alle</option>
          <option value="5">5 Minuten</option>
          <option value="10">10 Minuten</option>
          <option value="20">20 Minuten</option>
        </select>
        <button className="ml-auto px-4 py-2 rounded-xl bg-slate-900 text-white">KI-Workout (bald)</button>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map(w => (
          <li key={w.id} className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{w.name}</h3>
                <p className="text-sm text-slate-600">{w.duration} Min • {w.level} • {w.equipment}</p>
              </div>
              <button className="px-3 py-1 rounded-lg bg-slate-900 text-white text-sm">Start</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
