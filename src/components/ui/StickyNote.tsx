// components/ui/StickyNote.tsx
"use client";
import React from "react";

type StickyProps = {
  children: React.ReactNode;
  /** #FFE16A = kuning post‑it */
  color?: string;
  /** cara ditempel: pin / tape / plain */
  variant?: "pin" | "tape" | "plain";
  /** derajat kemiringan */
  tilt?: number;
  /** ukuran: sm | md | lg */
  size?: "sm" | "md" | "lg";
  className?: string;
};

export default function StickyNote({
  children,
  color = "#FFE16A",
  variant = "pin",
  tilt = 4,
  size = "md",
  className = "",
}: StickyProps) {
  const sizeCls =
    size === "sm" ? "w-40 p-3" : size === "lg" ? "w-72 p-6" : "w-56 p-4";

  return (
    <div className={`relative inline-block ${className}`} style={{ rotate: `${tilt}deg` }}>
      {/* kertas */}
      <div
        className={`rounded-md ${sizeCls} shadow-[0_10px_25px_rgba(0,0,0,0.15)] text-slate-800 leading-snug`}
        style={{
          background: `linear-gradient(180deg, ${color} 0%, ${color} 82%, rgba(0,0,0,0.06) 100%)`,
        }}
      >
        {children}
      </div>

      {/* lipatan pojok (kecil) */}
      <div
        className="absolute right-0 top-0 h-5 w-5"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%)",
          background: "rgba(255,255,255,0.35)",
          mixBlendMode: "soft-light",
        }}
      />

      {/* cara nempel */}
      {variant === "pin" && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <div className="w-3 h-3 rounded-full bg-slate-800 border border-white shadow" />
          <div className="w-0.5 h-4 bg-slate-800 mx-auto -mt-0.5" />
        </div>
      )}
      {variant === "tape" && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 -rotate-6 w-20 h-5 bg-amber-200/85 shadow-sm" />
      )}
    </div>
  );
}
    