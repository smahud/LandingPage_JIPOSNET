"use client";

import Image from "next/image";
import { MapPin, MessageCircle, Phone, SearchCheck, Wrench, Wifi } from "lucide-react";
import { BRAND, IMAGES, WHATSAPP_URL } from "./constants";
import { Reveal, RevealGroup, RevealItem } from "./reveal";

const STEPS = [
  {
    icon: MessageCircle,
    title: "1. Hubungi Kami",
    desc: "Chat WhatsApp — ceritakan lokasi dan kebutuhan internet Anda.",
  },
  {
    icon: SearchCheck,
    title: "2. Survei Lokasi",
    desc: "Tim kami memeriksa sinyal di titik Anda dan menawarkan paket terbaik.",
  },
  {
    icon: Wrench,
    title: "3. Instalasi & Aktif",
    desc: "Pemasangan rapi oleh teknisi lokal, langsung bisa digunakan.",
  },
] as const;

export function Contact() {
  return (
    <section id="kontak" className="relative overflow-hidden bg-jipo-navy-950 py-24 sm:py-28 lg:py-32">
      {/* Fiber-optic backdrop */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={IMAGES.fiber}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-jipo-navy-950/95 via-jipo-navy-950/80 to-jipo-navy-950/97" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(0,102,255,0.16),transparent_75%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="glass-dark inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-jipo-cyan ring-1 ring-inset ring-jipo-cyan/25">
              <Wifi className="h-3.5 w-3.5" aria-hidden="true" />
              Hubungi Kami
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-display mt-6 text-balance text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.85rem]">
              Siap Terhubung dengan{" "}
              <span className="bg-gradient-to-r from-jipo-cyan to-jipo-blue bg-clip-text text-transparent text-glow-cyan">
                Internet Lebih Baik?
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mx-auto mt-5 max-w-2xl text-balance text-base leading-relaxed text-white/70 sm:text-lg">
              Tim JIPOSNET siap membantu Anda mulai hari ini. Cukup satu chat —
              kami urus survei, instalasi, hingga internet Anda aktif.
            </p>
          </Reveal>
        </div>

        {/* Steps */}
        <RevealGroup className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-3" stagger={0.13}>
          {STEPS.map((step) => (
            <RevealItem key={step.title}>
              <div className="glass-dark group h-full rounded-3xl p-6 text-center transition-all duration-400 hover:-translate-y-1.5 hover:border-jipo-cyan/45">
                <span className="mx-auto flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-jipo-blue/30 to-jipo-cyan/20 ring-1 ring-inset ring-white/15 transition-transform duration-400 group-hover:scale-110">
                  <step.icon className="h-6 w-6 text-jipo-cyan" aria-hidden="true" />
                </span>
                <h3 className="font-display mt-4 text-lg font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  {step.desc}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Conversion panel */}
        <Reveal delay={0.2} className="mx-auto mt-14 max-w-4xl">
          <div className="glass-dark relative overflow-hidden rounded-[2rem] px-6 py-10 text-center shadow-2xl sm:px-12 sm:py-12">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,212,255,0.12),transparent_60%)]"
              aria-hidden="true"
            />

            <div className="relative">
              <div className="font-display text-xl font-bold text-white">
                {BRAND.name}
              </div>
              <p className="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm text-white/75 sm:text-base">
                <MapPin className="h-4.5 w-4.5 shrink-0 text-jipo-cyan" aria-hidden="true" />
                Hargorejo, Rawajitu Selatan,
                <br className="sm:hidden" />
                Tulang Bawang, Lampung 34591
              </p>
              <a
                href="tel:+6281274573558"
                className="mt-4 inline-flex items-center gap-2 text-lg font-semibold text-white transition-colors hover:text-jipo-cyan sm:text-xl"
              >
                <Phone className="h-5 w-5 text-jipo-cyan" aria-hidden="true" />
                {BRAND.phoneDisplay}
              </a>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glow-green inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#1FAF54] to-[#25D366] px-9 py-4 text-lg font-bold text-white sm:w-auto"
                >
                  <MessageCircle className="h-6 w-6" aria-hidden="true" />
                  Chat WhatsApp
                </a>
                <a
                  href="tel:+6281274573558"
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-white/25 bg-white/5 px-8 py-4 text-base font-semibold text-white/90 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-jipo-cyan/60 hover:text-jipo-cyan sm:w-auto"
                >
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  Telepon Langsung
                </a>
              </div>

              <p className="mt-6 text-xs text-white/45">
                Respon cepat setiap hari • Survei lokasi gratis untuk warga Hargorejo dan sekitarnya
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
