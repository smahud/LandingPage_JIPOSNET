"use client";

import { ShieldCheck, HeartHandshake, Rocket } from "lucide-react";
import { RevealGroup, RevealItem } from "./reveal";
import { SectionHeader } from "./section-header";
import { cn } from "@/lib/utils";

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Teknologi Terpercaya",
    desc: "Infrastruktur modern dan terawat untuk koneksi yang stabil — dirancang agar tetap andal di segala kondisi, mendukung aktivitas digital Anda tanpa hambatan.",
    dark: false,
  },
  {
    icon: HeartHandshake,
    title: "Pelayanan Dekat",
    desc: "Support cepat dari tim lokal yang mengenal Anda secara pribadi. Tidak perlu menunggu berhari-hari — kami tetangga Anda sendiri di Hargorejo.",
    dark: true,
  },
  {
    icon: Rocket,
    title: "Untuk Masa Depan Digital",
    desc: "Membantu masyarakat tumbuh melalui akses internet — anak-anak bisa belajar lebih luas, usaha kecil naik kelas, dan desa melangkah maju bersama.",
    dark: false,
  },
] as const;

export function WhyChoose() {
  return (
    <section className="relative bg-white py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Keunggulan Kami"
          title="Kenapa Memilih JIPOSNET?"
          description="Tiga alasan sederhana mengapa keluarga, usaha, dan lembaga di Hargorejo mempercayakan konektivitas digitalnya kepada kami."
        />

        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3 lg:gap-7" stagger={0.14}>
          {REASONS.map((reason) => (
            <RevealItem key={reason.title} className="h-full">
              <article
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-3xl p-7 transition-all duration-500 hover:-translate-y-2 sm:p-8",
                  reason.dark
                    ? "bg-jipo-navy text-white shadow-[0_30px_70px_-28px_rgba(11,31,58,0.75)] ring-1 ring-jipo-navy-700 hover:shadow-[0_40px_90px_-30px_rgba(0,102,255,0.5)]"
                    : "bg-jipo-mist text-jipo-navy ring-1 ring-jipo-navy/8 hover:bg-white hover:shadow-[0_30px_60px_-24px_rgba(11,31,58,0.28)] hover:ring-jipo-blue/30"
                )}
              >
                {/* Decorative corner glow */}
                <div
                  className={cn(
                    "absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl transition-opacity duration-500",
                    reason.dark
                      ? "bg-jipo-cyan/20 opacity-70 group-hover:opacity-100"
                      : "bg-jipo-blue/10 opacity-60 group-hover:opacity-100"
                  )}
                  aria-hidden="true"
                />

                <span
                  className={cn(
                    "relative flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6",
                    reason.dark
                      ? "bg-gradient-to-br from-jipo-blue to-jipo-cyan/70 shadow-lg shadow-jipo-blue/40"
                      : "bg-gradient-to-br from-jipo-blue/12 to-jipo-cyan/10 ring-1 ring-inset ring-jipo-blue/25"
                  )}
                >
                  <reason.icon
                    className={cn(
                      "h-7 w-7",
                      reason.dark ? "text-white" : "text-jipo-blue"
                    )}
                    aria-hidden="true"
                  />
                </span>

                <h3
                  className={cn(
                    "font-display mt-6 text-xl font-bold sm:text-[1.35rem]",
                    reason.dark ? "text-white" : "text-jipo-navy"
                  )}
                >
                  {reason.title}
                </h3>

                <p
                  className={cn(
                    "mt-3 flex-1 text-sm leading-relaxed sm:text-[0.95rem]",
                    reason.dark ? "text-white/70" : "text-jipo-slate"
                  )}
                >
                  {reason.desc}
                </p>

                <span
                  className={cn(
                    "mt-7 block h-1 w-14 rounded-full bg-gradient-to-r transition-all duration-500 group-hover:w-24",
                    reason.dark
                      ? "from-jipo-cyan to-jipo-blue"
                      : "from-jipo-blue to-jipo-cyan"
                  )}
                  aria-hidden="true"
                />
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
