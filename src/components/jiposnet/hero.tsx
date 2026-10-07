"use client";

import Image from "next/image";
import { Cpu, MapPin, Phone, Wallet, Wifi, Zap, Headset } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { IMAGES, WHATSAPP_URL } from "./constants";
import { NetworkCanvas } from "./network-canvas";

const HERO_STATS = [
  {
    icon: Wifi,
    title: "Internet Stabil 24 Jam",
    desc: "Koneksi terjaga sepanjang hari",
  },
  {
    icon: Cpu,
    title: "Teknologi Jaringan Modern",
    desc: "Infrastruktur fiber & nirkabel",
  },
  {
    icon: Headset,
    title: "Support Lokal Cepat",
    desc: "Tim Hargorejo siap datang",
  },
  {
    icon: Wallet,
    title: "Harga Terjangkau",
    desc: "Paket sesuai kemampuan warga",
  },
] as const;

export function Hero() {
  const reduce = useReducedMotion();

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.85, delay, ease: [0.21, 0.47, 0.32, 0.98] as const },
        };

  return (
    <section
      id="beranda"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-jipo-navy-950"
    >
      {/* ── Cinematic backdrop ─────────────────────────────── */}
      <div className="absolute inset-0 -z-20">
        <Image
          src={IMAGES.heroVillage}
          alt="Panorama udara desa Hargorejo dengan hamparan sawah dan perkampungan yang terhubung internet"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Navy cinematic overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-jipo-navy-950/88 via-jipo-navy/62 to-jipo-navy-950/96" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_65%_at_50%_36%,transparent_0%,rgba(6,15,31,0.32)_72%,rgba(6,15,31,0.78)_100%)]" />

      {/* Live network mesh with flowing data particles */}
      <NetworkCanvas className="absolute inset-0 -z-10" />

      {/* Ambient glow orbs */}
      <div className="animate-glow-pulse absolute -left-32 top-1/4 -z-10 h-96 w-96 rounded-full bg-jipo-blue/20 blur-[110px]" />
      <div
        className="animate-glow-pulse absolute -right-24 bottom-1/4 -z-10 h-80 w-80 rounded-full bg-jipo-cyan/15 blur-[100px]"
        style={{ animationDelay: "2.4s" }}
      />

      {/* ── Content ────────────────────────────────────────── */}
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 pb-14 pt-32 text-center sm:px-6 lg:px-8">
        {/* Live badge */}
        <motion.div {...enter(0)}>
          <span className="glass-dark inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-xs font-medium text-white/85 sm:text-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-jipo-green opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-jipo-green" />
            </span>
            Jaringan Aktif
            <span className="hidden h-3 w-px bg-white/20 sm:block" />
            <span className="hidden items-center gap-1.5 sm:inline-flex">
              <MapPin className="h-3.5 w-3.5 text-jipo-cyan" aria-hidden="true" />
              Hargorejo, Tulang Bawang — Lampung
            </span>
          </span>
        </motion.div>

        {/* Brand wordmark */}
        <motion.h1
          {...enter(0.12)}
          className="font-display mt-7 text-balance text-[clamp(3.4rem,11vw,8rem)] font-bold leading-[0.95] tracking-tight text-white"
        >
          JIPOS
          <span className="bg-gradient-to-r from-jipo-cyan via-jipo-blue to-jipo-cyan bg-clip-text text-transparent text-glow-cyan">
            NET
          </span>
        </motion.h1>

        {/* Value proposition */}
        <motion.h2
          {...enter(0.24)}
          className="font-display mt-6 max-w-4xl text-balance text-xl font-semibold leading-snug text-white/95 sm:text-3xl lg:text-[2.1rem]"
        >
          Internet{" "}
          <span className="bg-gradient-to-r from-jipo-cyan to-jipo-blue bg-clip-text text-transparent">
            Cepat, Stabil, dan Terjangkau
          </span>{" "}
          untuk Menghubungkan Masyarakat
        </motion.h2>

        <motion.p
          {...enter(0.36)}
          className="mx-auto mt-5 max-w-2xl text-balance text-base leading-relaxed text-white/70 sm:text-lg"
        >
          Solusi internet terpercaya untuk rumah, usaha, pendidikan, dan
          kebutuhan digital masyarakat Hargorejo dan sekitarnya.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...enter(0.48)}
          className="mt-9 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-jipo-blue to-jipo-blue-600 px-8 py-4 text-base font-semibold text-white sm:w-auto"
          >
            <Zap className="h-5 w-5" aria-hidden="true" />
            Pasang Internet Sekarang
          </a>
          <a
            href="#kontak"
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-white/25 bg-white/5 px-8 py-4 text-base font-semibold text-white/90 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-jipo-cyan/60 hover:bg-white/10 hover:text-jipo-cyan sm:w-auto"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            Hubungi Kami
          </a>
        </motion.div>
      </div>

      {/* ── Feature strip ──────────────────────────────────── */}
      <motion.div
        {...enter(0.62)}
        className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 lg:px-8"
      >
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {HERO_STATS.map((stat) => (
            <li
              key={stat.title}
              className="glass-dark group flex items-center gap-3.5 rounded-2xl px-4 py-4 transition-colors duration-300 hover:border-jipo-cyan/40"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-jipo-blue/30 to-jipo-cyan/20 ring-1 ring-inset ring-white/15 transition-transform duration-300 group-hover:scale-110">
                <stat.icon className="h-5 w-5 text-jipo-cyan" aria-hidden="true" />
              </span>
              <span className="flex flex-col text-left">
                <span className="text-sm font-semibold text-white">
                  {stat.title}
                </span>
                <span className="mt-0.5 text-xs text-white/60">{stat.desc}</span>
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
