import React from "react";
export default function Logo() {
  return (
    <div className="flex items-center gap-2 select-none">
      <svg viewBox="0 0 64 64" className="h-7 w-7" aria-hidden>
        <circle cx="32" cy="32" r="30" fill="currentColor" className="text-slate-900" />
        <path d="M20 38c7-10 17-10 24 0" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M22 26h6m8 0h6" stroke="white" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <span className="font-display font-bold tracking-tight text-xl">Fit & Travel</span>
    </div>
  )
}
