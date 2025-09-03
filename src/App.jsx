import { Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import Workouts from './pages/Workouts'
import Nutrition from './pages/Nutrition'
import Packlists from './pages/Packlists'
import Logo from './components/Logo'
import WorkoutSession from './pages/WorkoutSession'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Logo />
          <nav className="flex items-center gap-2">
            {[
              { to: '/', label: 'Home' },
              { to: '/workouts', label: 'Workouts' },
              { to: '/nutrition', label: 'Ernährung' },
              { to: '/packlists', label: 'Packlisten' },
            ].map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-700 hover:bg-slate-200'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/packlists" element={<Packlists />} />
          <Route path="/session" element={<WorkoutSession />} />
        </Routes>
      </main>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Fit & Travel – Built with React & Tailwind
      </footer>
    </div>
  )
}
