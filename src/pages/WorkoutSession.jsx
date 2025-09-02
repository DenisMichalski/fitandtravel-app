import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

// sehr simpler Plan-Generator (Demo)
function generatePlan(total = 10) {
  const library = [
    { name: "Jumping Jacks", secs: 30 },
    { name: "Push-Ups", secs: 30 },
    { name: "Bodyweight Squats", secs: 30 },
    { name: "Plank", secs: 30 },
    { name: "High Knees", secs: 30 },
  ];
  const rounds = Math.max(1, Math.round(total / 5));
  const plan = [];
  for (let r = 0; r < rounds; r++) {
    for (const ex of library) plan.push({ ...ex });
  }
  // auf grob total Minuten trimmen
  const limit = Math.ceil((total * 60) / 30); // 30s pro Übung
  return plan.slice(0, limit);
}

export default function WorkoutSession() {
  const q = useQuery();
  const navigate = useNavigate();
  const mins = Number(q.get("mins") || 10);
  const seed = q.get("seed"); // für „KI“-Mock
  const [idx, setIdx] = useState(0);
  const [plan, setPlan] = useState(() => generatePlan(mins));
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(plan[0]?.secs ?? 30);

  // wenn seed vorhanden ist, mischen wir den Plan leicht (Mock „KI“)
  useEffect(() => {
    if (!seed) return;
    const p = generatePlan(mins);
    // simple Shuffle basierend auf seed-Länge
    const n = seed.length % p.length;
    const mixed = [...p.slice(n), ...p.slice(0, n)];
    setPlan(mixed);
    setIdx(0);
    setTime(mixed[0]?.secs ?? 30);
  }, [seed, mins]);

  // Timer
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setTime((s) => {
        if (s > 1) return s - 1;
        // nächste Übung
        setIdx((i) => {
          const next = i + 1;
          if (next >= plan.length) {
            setRunning(false);
            return i;
          }
          setTime(plan[next].secs);
          return next;
        });
        return 0;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [running, plan]);

  const current = plan[idx];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Workout-Session</h1>
          <p className="text-slate-600">{mins} Minuten • {plan.length} Übungen</p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-2 rounded-xl ring-1 ring-slate-300"
        >
          Zurück
        </button>
      </header>

      <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200">
        {current ? (
          <>
            <div className="text-sm text-slate-500 mb-2">
              Übung {idx + 1} / {plan.length}
            </div>
            <h2 className="text-2xl font-semibold">{current.name}</h2>
            <div className="mt-4 text-6xl font-bold tabular-nums">{String(time).padStart(2, "0")}s</div>

            <div className="mt-6 flex gap-2">
              {!running ? (
                <button onClick={() => setRunning(true)} className="px-4 py-2 rounded-xl bg-slate-900 text-white">
                  Start
                </button>
              ) : (
                <button onClick={() => setRunning(false)} className="px-4 py-2 rounded-xl ring-1 ring-slate-300">
                  Pause
                </button>
              )}
              <button
                onClick={() => {
                  if (idx < plan.length - 1) {
                    setIdx(idx + 1);
                    setTime(plan[idx + 1].secs);
                  } else {
                    setRunning(false);
                  }
                }}
                className="px-4 py-2 rounded-xl ring-1 ring-slate-300"
              >
                Nächste Übung
              </button>
              <button
                onClick={() => {
                  const p = generatePlan(mins);
                  setPlan(p);
                  setIdx(0);
                  setTime(p[0].secs);
                  setRunning(false);
                }}
                className="ml-auto px-4 py-2 rounded-xl bg-slate-100 ring-1 ring-slate-200"
              >
                Neu generieren
              </button>
            </div>
          </>
        ) : (
          <div className="text-lg">Geschafft! 🎉</div>
        )}
      </div>
    </div>
  );
}
