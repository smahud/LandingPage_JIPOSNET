"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  MapPin,
  Phone,
  RadioTower,
  Radar,
  SignalHigh,
} from "lucide-react";
import { IMAGES, WHATSAPP_URL } from "./constants";
import { Reveal } from "./reveal";
import { SectionHeader } from "./section-header";
import { cn } from "@/lib/utils";

/* ── Map data ─────────────────────────────────────────────────────── */

const VB_W = 720;
const VB_H = 560;
const TOWER = { x: 360, y: 252 };

type ConnPoint = {
  id: string;
  name: string;
  kind: string;
  link: string;
  x: number;
  y: number;
  tipBelow?: boolean;
};

const POINTS: ConnPoint[] = [
  { id: "balai", name: "Balai Desa Hargorejo", kind: "Fasilitas Umum", link: "Fiber", x: 262, y: 176 },
  { id: "sekolah", name: "SDN Hargorejo", kind: "Pendidikan", link: "Fiber", x: 452, y: 148, tipBelow: true },
  { id: "masjid", name: "Masjid Baiturrahman", kind: "Ibadah", link: "Wireless", x: 548, y: 262 },
  { id: "pasar", name: "Pasar Desa", kind: "Usaha Warga", link: "Fiber", x: 208, y: 330 },
  { id: "poskesdes", name: "Poskesdes", kind: "Kesehatan", link: "Wireless", x: 318, y: 428 },
  { id: "perumahan", name: "Perumahan Warga", kind: "Permukiman", link: "Fiber", x: 508, y: 420 },
  { id: "relay", name: "Menara Relay Sawah", kind: "Perluasan", link: "Backbone", x: 574, y: 468 },
];

const COVERAGE_LEVELS = [
  { label: "Hargorejo — pusat jaringan", value: 100, note: "Sinyal Kuat" },
  { label: "Rawajitu Selatan — sekitar desa", value: 70, note: "Sinyal Baik" },
  { label: "Tulang Bawang — area pemekaran", value: 38, note: "Sedang Diperluas" },
] as const;

/* ── Interactive map ──────────────────────────────────────────────── */

function CoverageMap() {
  const [showCoverage, setShowCoverage] = useState(true);
  const [showPoints, setShowPoints] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);

  const active = POINTS.find((p) => p.id === activeId) ?? null;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-jipo-navy-950 shadow-[0_36px_80px_-32px_rgba(11,31,58,0.65)] ring-1 ring-white/10">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2.5">
          <Radar className="h-4.5 w-4.5 text-jipo-cyan" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">
            Peta Jaringan — Hargorejo
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowCoverage((v) => !v)}
            aria-pressed={showCoverage}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all duration-300",
              showCoverage
                ? "bg-jipo-cyan/15 text-jipo-cyan ring-1 ring-inset ring-jipo-cyan/40"
                : "bg-white/5 text-white/45 ring-1 ring-inset ring-white/10 hover:text-white/70"
            )}
          >
            {showCoverage ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
            Jangkauan
          </button>
          <button
            type="button"
            onClick={() => setShowPoints((v) => !v)}
            aria-pressed={showPoints}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all duration-300",
              showPoints
                ? "bg-jipo-blue/20 text-jipo-cyan ring-1 ring-inset ring-jipo-blue/50"
                : "bg-white/5 text-white/45 ring-1 ring-inset ring-white/10 hover:text-white/70"
            )}
          >
            {showPoints ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
            Titik Koneksi
          </button>
        </div>
      </div>

      {/* Map canvas */}
      <div className="relative">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="block h-auto w-full"
          role="img"
          aria-label="Peta digital jangkauan jaringan JIPOSNET di sekitar Hargorejo dengan titik-titik koneksi"
        >
          <defs>
            <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,212,255,0.07)" strokeWidth="1" />
            </pattern>
            <radialGradient id="coverage-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0066FF" stopOpacity="0.28" />
              <stop offset="55%" stopColor="#0066FF" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.02" />
            </radialGradient>
            <linearGradient id="sweep-grad" x1="360" y1="252" x2="507" y2="166" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Base */}
          <rect width={VB_W} height={VB_H} fill="#081527" />
          <rect width={VB_W} height={VB_H} fill="url(#map-grid)" />

          {/* River */}
          <path
            d="M-20 470 C 120 430, 150 520, 300 500 S 560 540, 740 480"
            fill="none"
            stroke="rgba(0,212,255,0.10)"
            strokeWidth="26"
            strokeLinecap="round"
          />
          <path
            d="M-20 470 C 120 430, 150 520, 300 500 S 560 540, 740 480"
            fill="none"
            stroke="rgba(0,212,255,0.16)"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Roads */}
          <g stroke="rgba(255,255,255,0.09)" fill="none" strokeLinecap="round">
            <path d="M60 60 C 200 120, 260 90, 340 150 S 520 120, 680 70" strokeWidth="7" />
            <path d="M40 380 C 160 360, 240 300, 380 300 S 600 340, 700 300" strokeWidth="9" />
            <path d="M250 540 C 260 430, 300 380, 330 260 S 380 100, 420 30" strokeWidth="6" />
            <path d="M540 540 C 530 470, 520 380, 545 270" strokeWidth="6" />
          </g>

          {/* Coverage zones */}
          {showCoverage && (
            <g>
              <circle cx={TOWER.x} cy={TOWER.y} r="175" fill="url(#coverage-grad)" />
              {[60, 115, 170].map((r, i) => (
                <circle
                  key={r}
                  cx={TOWER.x}
                  cy={TOWER.y}
                  r={r}
                  fill="none"
                  stroke="rgba(0,212,255,0.28)"
                  strokeWidth="1.4"
                  strokeDasharray="5 7"
                />
              ))}
              {/* Breathing pulse rings */}
              <circle
                className="animate-pulse-ring"
                cx={TOWER.x}
                cy={TOWER.y}
                r="120"
                fill="none"
                stroke="rgba(0,212,255,0.5)"
                strokeWidth="1.6"
              />
              <circle
                className="animate-pulse-ring"
                style={{ animationDelay: "1.6s" }}
                cx={TOWER.x}
                cy={TOWER.y}
                r="120"
                fill="none"
                stroke="rgba(0,102,255,0.45)"
                strokeWidth="1.6"
              />
            </g>
          )}

          {/* Radar sweep */}
          <g
            className="animate-spin-slow"
            style={{ transformBox: "view-box", transformOrigin: `${TOWER.x}px ${TOWER.y}px` }}
          >
            <path
              d={`M ${TOWER.x} ${TOWER.y} L ${TOWER.x} ${TOWER.y - 175} A 175 175 0 0 1 ${TOWER.x + 151.6} ${TOWER.y - 87.5} Z`}
              fill="url(#sweep-grad)"
            />
          </g>

          {/* Data links tower → points */}
          {showPoints &&
            POINTS.map((p) => (
              <line
                key={`line-${p.id}`}
                x1={TOWER.x}
                y1={TOWER.y}
                x2={p.x}
                y2={p.y}
                stroke={activeId === p.id ? "rgba(0,212,255,0.85)" : "rgba(0,190,255,0.3)"}
                strokeWidth={activeId === p.id ? 2 : 1.3}
                strokeDasharray="7 9"
                className="animate-dash-flow"
              />
            ))}

          {/* Connection points */}
          {showPoints &&
            POINTS.map((p) => {
              const isActive = activeId === p.id;
              return (
                <g
                  key={p.id}
                  className="cursor-pointer"
                  onMouseEnter={() => setActiveId(p.id)}
                  onMouseLeave={() => setActiveId((cur) => (cur === p.id ? null : cur))}
                  onClick={() => setActiveId(p.id)}
                  role="button"
                  aria-label={`Titik koneksi: ${p.name}`}
                >
                  <circle cx={p.x} cy={p.y} r="18" fill="transparent" />
                  <circle
                    className="animate-pulse-ring"
                    cx={p.x}
                    cy={p.y}
                    r="13"
                    fill="none"
                    stroke={isActive ? "rgba(0,212,255,0.9)" : "rgba(0,212,255,0.45)"}
                    strokeWidth="1.4"
                  />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isActive ? 7 : 5.5}
                    fill={isActive ? "#00D4FF" : "#FFFFFF"}
                    stroke={isActive ? "#FFFFFF" : "#0066FF"}
                    strokeWidth="2"
                    style={{ transition: "r 0.25s ease, fill 0.25s ease" }}
                  />
                  <text
                    x={p.x}
                    y={p.y - 15}
                    textAnchor="middle"
                    fontSize="12.5"
                    fontWeight="600"
                    fill={isActive ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.72)"}
                    stroke="#081527"
                    strokeWidth="3.5"
                    style={{ paintOrder: "stroke", pointerEvents: "none" }}
                  >
                    {p.name}
                  </text>
                </g>
              );
            })}

          {/* Tower marker */}
          <g style={{ pointerEvents: "none" }}>
            <circle cx={TOWER.x} cy={TOWER.y} r="24" fill="rgba(0,102,255,0.22)" />
            <circle cx={TOWER.x} cy={TOWER.y} r="15" fill="#0066FF" stroke="#00D4FF" strokeWidth="2.5" />
            {/* Tiny tower glyph */}
            <path
              d={`M ${TOWER.x - 5} ${TOWER.y + 5.5} L ${TOWER.x + 5} ${TOWER.y + 5.5} M ${TOWER.x - 3.4} ${TOWER.y + 1.5} L ${TOWER.x + 3.4} ${TOWER.y + 1.5} M ${TOWER.x - 1.8} ${TOWER.y - 2.5} L ${TOWER.x + 1.8} ${TOWER.y - 2.5} M ${TOWER.x} ${TOWER.y - 7} L ${TOWER.x} ${TOWER.y + 5.5}`}
              stroke="#FFFFFF"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <text
              x={TOWER.x}
              y={TOWER.y + 42}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill="#FFFFFF"
              stroke="#081527"
              strokeWidth="4"
              style={{ paintOrder: "stroke" }}
            >
              Menara Hargorejo
            </text>
          </g>

          {/* Compass */}
          <g opacity="0.8" style={{ pointerEvents: "none" }} transform="translate(668 52)">
            <circle r="17" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.22)" />
            <path d="M0 -11 L4 4 L0 1 L-4 4 Z" fill="#00D4FF" />
            <text y="-22" textAnchor="middle" fontSize="10" fontWeight="700" fill="rgba(255,255,255,0.75)">
              U
            </text>
          </g>

          {/* Scale bar */}
          <g transform="translate(28 530)" style={{ pointerEvents: "none" }}>
            <rect x="-8" y="-14" width="112" height="26" rx="7" fill="rgba(8,21,39,0.75)" stroke="rgba(255,255,255,0.14)" />
            <path d="M4 6 L4 12 M4 9 L60 9 M60 6 L60 12" stroke="rgba(255,255,255,0.75)" strokeWidth="1.4" />
            <text x="68" y="12.5" fontSize="10.5" fill="rgba(255,255,255,0.8)" fontWeight="600">
              ± 1 km
            </text>
          </g>
        </svg>

        {/* HTML tooltip for the active point */}
        {active && showPoints && (
          <div
            className="pointer-events-none absolute z-10 w-max max-w-[240px] -translate-x-1/2 rounded-xl bg-jipo-navy-800/95 px-4 py-3 shadow-2xl ring-1 ring-jipo-cyan/40 backdrop-blur-sm"
            style={{
              left: `${(active.x / VB_W) * 100}%`,
              top: `${(active.y / VB_H) * 100}%`,
              transform: active.tipBelow
                ? "translate(-50%, 18px)"
                : "translate(-50%, calc(-100% - 18px))",
            }}
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-jipo-green opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-jipo-green" />
              </span>
              <span className="text-sm font-semibold text-white">{active.name}</span>
            </div>
            <div className="mt-1.5 flex items-center gap-2 text-[11px] text-white/65">
              <span className="rounded-md bg-white/10 px-1.5 py-0.5 font-medium">{active.kind}</span>
              <span className="inline-flex items-center gap-1">
                <SignalHigh className="h-3 w-3 text-jipo-cyan" aria-hidden="true" />
                {active.link} — Terhubung
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 bg-white/[0.03] px-4 py-3 text-[11px] font-medium text-white/60 sm:px-5">
        <span className="inline-flex items-center gap-2">
          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-jipo-blue ring-2 ring-jipo-cyan/60">
            <span className="h-1 w-1 rounded-full bg-white" />
          </span>
          Menara Utama
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3.5 w-3.5 rounded-full bg-white ring-2 ring-jipo-blue" />
          Titik Koneksi
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3.5 w-3.5 rounded-full bg-jipo-blue/25 ring-1 ring-jipo-cyan/40" />
          Jangkauan Sinyal
        </span>
        <span className="ml-auto hidden text-white/35 sm:block">
          Arahkan kursor ke titik untuk detail
        </span>
      </div>
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────────────── */

export function Coverage() {
  return (
    <section id="coverage" className="relative overflow-hidden bg-jipo-mist py-24 sm:py-28 lg:py-32">
      <div className="bg-dots absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Coverage Area"
          title="Jangkauan yang Tumbuh dari Hargorejo"
          description="Pusat jaringan kami berada di Hargorejo, Rawajitu Selatan, Tulang Bawang — dan terus meluas ke seluruh penjuru Lampung. Jelajahi peta untuk melihat titik-titik koneksi kami."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-10">
          {/* Map */}
          <Reveal>
            <CoverageMap />
          </Reveal>

          {/* Side panel */}
          <div className="flex flex-col gap-6">
            <Reveal delay={0.1}>
              <div className="rounded-3xl bg-white p-6 shadow-[0_18px_50px_-24px_rgba(11,31,58,0.35)] ring-1 ring-jipo-navy/8 sm:p-7">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-jipo-blue/10 ring-1 ring-inset ring-jipo-blue/20">
                    <MapPin className="h-6 w-6 text-jipo-blue" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-jipo-navy">
                      Kantor &amp; Pusat Jaringan
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-jipo-slate">
                      Hargorejo, Rawajitu Selatan,
                      <br />
                      Tulang Bawang, Lampung 34591
                    </p>
                    <a
                      href="tel:+6281274573558"
                      className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-jipo-blue transition-colors hover:text-jipo-blue-600"
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      +62 812 7457 3558
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="relative h-44 overflow-hidden rounded-3xl shadow-lg ring-1 ring-jipo-navy/10 sm:h-48">
                <Image
                  src={IMAGES.tower}
                  alt="Menara telekomunikasi JIPOSNET dengan latar bukit dan langit"
                  fill
                  sizes="(min-width: 1024px) 33vw, 92vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-jipo-navy/85 via-jipo-navy/25 to-transparent" />
                <div className="absolute bottom-4 left-5 flex items-center gap-2.5">
                  <RadioTower className="h-5 w-5 text-jipo-cyan" aria-hidden="true" />
                  <span className="text-sm font-semibold text-white">
                    Menara jaringan utama — Hargorejo
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="rounded-3xl bg-jipo-navy p-6 shadow-xl sm:p-7">
                <h3 className="font-display text-lg font-bold text-white">
                  Status Perluasan Jangkauan
                </h3>
                <div className="mt-5 space-y-5">
                  {COVERAGE_LEVELS.map((level) => (
                    <div key={level.label}>
                      <div className="mb-2 flex items-center justify-between text-xs">
                        <span className="font-medium text-white/80">{level.label}</span>
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                            level.value === 100
                              ? "bg-jipo-green/20 text-emerald-300"
                              : level.value >= 60
                                ? "bg-jipo-cyan/15 text-jipo-cyan"
                                : "bg-white/10 text-white/60"
                          )}
                        >
                          {level.note}
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            level.value === 100
                              ? "bg-gradient-to-r from-jipo-green to-emerald-300"
                              : level.value >= 60
                                ? "bg-gradient-to-r from-jipo-blue to-jipo-cyan"
                                : "bg-gradient-to-r from-jipo-blue/70 to-jipo-cyan/50"
                          )}
                          style={{ width: `${level.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glow mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-jipo-blue to-jipo-blue-600 px-5 py-3 text-sm font-semibold text-white"
                >
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  Cek Ketersediaan di Lokasi Anda
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
