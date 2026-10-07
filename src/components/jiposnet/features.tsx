"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  CheckCircle2,
  Cpu,
  Headset,
  MapPin,
  Wallet,
} from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "./reveal";
import { SectionHeader } from "./section-header";
import { WifiWaves } from "./network-canvas";

const FEATURES = [
  {
    icon: Activity,
    title: "Internet Stabil 24 Jam",
    desc: "Pantauan jaringan tanpa henti dan penanganan gangguan secara cepat, siang maupun malam.",
  },
  {
    icon: Cpu,
    title: "Teknologi Jaringan Modern",
    desc: "Kombinasi fiber optik dan wireless terkini agar kualitas koneksi tetap optimal di semua cuaca.",
  },
  {
    icon: Headset,
    title: "Support Lokal Cepat",
    desc: "Teknisi dari Hargorejo sendiri — dilaporkan pagi, ditangani hari itu juga tanpa antre panjang.",
  },
  {
    icon: Wallet,
    title: "Harga Terjangkau",
    desc: "Paket beragam yang disesuaikan kemampuan warga, tanpa biaya tersembunyi.",
  },
  {
    icon: MapPin,
    title: "Coverage Area Lampung",
    desc: "Jangkauan terus meluas dari Hargorejo ke seluruh Rawajitu Selatan, Tulang Bawang, dan sekitarnya.",
  },
] as const;

/** Fluctuating "live" latency value for the network status widget. */
function useLiveLatency() {
  const [ms, setMs] = useState(12);
  useEffect(() => {
    const id = setInterval(() => {
      setMs(9 + Math.round(Math.random() * 6));
    }, 2200);
    return () => clearInterval(id);
  }, []);
  return ms;
}

function NetworkStatusCard() {
  const latency = useLiveLatency();

  return (
    <div className="glass-dark relative overflow-hidden rounded-3xl p-6 shadow-2xl sm:p-7">
      {/* Scanline sheen */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(0,212,255,0.14),transparent_55%)]"
        aria-hidden="true"
      />

      <div className="relative flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
          Status Jaringan
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-jipo-green/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-300 ring-1 ring-inset ring-jipo-green/30">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Live
        </span>
      </div>

      <div className="relative mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <WifiWaves className="h-14 w-14" />
          <div>
            <div className="font-display text-3xl font-bold text-white">
              {latency}
              <span className="ml-1 text-base font-medium text-white/55">ms</span>
            </div>
            <div className="mt-1 text-xs font-medium uppercase tracking-wider text-white/55">
              Latensi Rata-rata
            </div>
          </div>
        </div>

        {/* Signal bars */}
        <div className="flex items-end gap-1.5" aria-hidden="true">
          {[10, 16, 22, 28].map((h, i) => (
            <span
              key={h}
              className="w-2 rounded-sm bg-gradient-to-t from-jipo-blue to-jipo-cyan"
              style={{
                height: h,
                animation: `wifi-arc 2s ease-in-out ${i * 0.18}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Metric bars */}
      <div className="relative mt-6 space-y-4">
        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="font-medium text-white/70">Kualitas Koneksi</span>
            <span className="font-mono font-semibold text-jipo-cyan">99.9%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[99%] rounded-full bg-gradient-to-r from-jipo-blue via-jipo-cyan to-jipo-cyan" />
          </div>
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="font-medium text-white/70">Paket Hilang</span>
            <span className="font-mono font-semibold text-jipo-green">0.0%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[2%] rounded-full bg-jipo-green" />
          </div>
        </div>
      </div>

      <p className="relative mt-6 border-t border-white/10 pt-4 text-[11px] leading-relaxed text-white/45">
        Indikator kualitas jaringan JIPOSNET di area Hargorejo dan sekitarnya.
      </p>
    </div>
  );
}

export function Features() {
  return (
    <section
      id="keunggulan"
      className="relative overflow-hidden bg-jipo-navy-950 py-24 sm:py-28 lg:py-32"
    >
      {/* Backdrop texture */}
      <div className="bg-grid-dark absolute inset-0" aria-hidden="true" />
      <div className="animate-glow-pulse absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-jipo-blue/15 blur-[130px]" aria-hidden="true" />
      <div
        className="animate-glow-pulse absolute -bottom-24 right-1/5 h-80 w-80 rounded-full bg-jipo-cyan/12 blur-[120px]"
        style={{ animationDelay: "3s" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left — heading + status widget */}
          <div>
            <SectionHeader
              dark
              align="left"
              eyebrow="Kenapa JIPOSNET"
              title="Anda Layak Mendapatkan Koneksi Terbaik"
              description="Kami menggabungkan teknologi jaringan modern dengan pelayanan tetangga — cepat saat dipasang, cepat pula saat dibutuhkan bantuan."
              className="max-w-xl"
            />

            <Reveal delay={0.15} className="mt-10">
              <NetworkStatusCard />
            </Reveal>
          </div>

          {/* Right — feature checklist */}
          <RevealGroup className="space-y-4" stagger={0.11}>
            {FEATURES.map((feature, i) => (
              <RevealItem key={feature.title}>
                <div className="group glass-dark flex items-start gap-4 rounded-2xl p-5 transition-all duration-400 hover:-translate-y-1 hover:border-jipo-cyan/45 hover:bg-white/[0.07] sm:p-6">
                  <span className="font-display mt-0.5 hidden text-sm font-bold text-jipo-cyan/50 sm:block">
                    0{i + 1}
                  </span>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-jipo-blue/25 to-jipo-cyan/15 ring-1 ring-inset ring-white/10 transition-transform duration-400 group-hover:scale-110">
                    <feature.icon className="h-5 w-5 text-jipo-cyan" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="flex items-center gap-2 text-base font-semibold text-white sm:text-lg">
                      {feature.title}
                      <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-jipo-green" aria-hidden="true" />
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
