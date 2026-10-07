"use client";

import Image from "next/image";
import { BadgeCheck, Quote } from "lucide-react";
import { BRAND, IMAGES } from "./constants";
import { Reveal } from "./reveal";

export function Owner() {
  return (
    <section className="relative overflow-hidden bg-jipo-mist py-24 sm:py-28 lg:py-32">
      <div className="bg-dots absolute inset-0" aria-hidden="true" />
      {/* Soft brand glows */}
      <div
        className="animate-glow-pulse absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-jipo-blue/10 blur-[110px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* ── Portrait ─────────────────────────────────────── */}
          <Reveal className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="relative">
              {/* Offset frame */}
              <div
                className="absolute -inset-3 rounded-[2rem] border-2 border-dashed border-jipo-blue/25"
                aria-hidden="true"
              />
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] shadow-[0_36px_72px_-28px_rgba(11,31,58,0.55)] ring-1 ring-jipo-navy/10">
                <Image
                  src={IMAGES.owner}
                  alt="Widayat, pemilik JIPOSNET, berdiri di area desa Hargorejo"
                  fill
                  sizes="(min-width: 1024px) 40vw, (min-width: 640px) 60vw, 92vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-jipo-navy/55 via-transparent to-transparent" />
              </div>

              {/* Name badge */}
              <div className="glass-light absolute -bottom-6 left-1/2 flex w-[86%] -translate-x-1/2 items-center gap-3.5 rounded-2xl px-5 py-4 shadow-xl">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-jipo-blue to-jipo-cyan/70 text-white">
                  <BadgeCheck className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="flex flex-col">
                  <span className="font-display text-base font-bold text-jipo-navy">
                    {BRAND.owner}
                  </span>
                  <span className="text-xs font-medium text-jipo-slate">
                    Pemilik &amp; Pendiri JIPOSNET
                  </span>
                </span>
              </div>
            </div>
          </Reveal>

          {/* ── Profile & quote ──────────────────────────────── */}
          <div className="pt-6 lg:pt-0">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-jipo-blue/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-jipo-blue ring-1 ring-inset ring-jipo-blue/20">
                <span className="h-1.5 w-1.5 rounded-full bg-jipo-blue" />
                Dari Pemilik Kami
              </span>
            </Reveal>

            <Reveal delay={0.1}>
              <figure className="relative mt-7">
                <Quote
                  className="absolute -left-2 -top-4 h-14 w-14 text-jipo-blue/15 sm:-left-6"
                  aria-hidden="true"
                />
                <blockquote className="font-display relative text-balance text-2xl font-semibold leading-snug text-jipo-navy sm:text-[2rem] sm:leading-[1.3]">
                  &ldquo;Menghubungkan masyarakat dengan teknologi agar setiap
                  orang memiliki kesempatan berkembang di era digital.&rdquo;
                </blockquote>
              </figure>
            </Reveal>

            <Reveal delay={0.2} className="mt-7 space-y-4 text-base leading-relaxed text-jipo-slate">
              <p>
                Widayat membangun JIPOSNET dari sebuah keyakinan sederhana:
                jarak tidak boleh menjadi alasan warga desa tertinggal. Berawal
                dari membantu tetangga mendapat sinyal internet yang layak,
                kini jaringan itu tumbuh menjadi layanan yang dipercaya
                keluarga, warung, sekolah, dan lembaga di Hargorejo dan
                sekitarnya.
              </p>
              <p>
                Baginya, JIPOSNET bukan sekadar bisnis penyedia internet —
                ini gerbang menuju peluang: anak-anak yang bisa belajar lebih
                luas, usaha kecil yang naik kelas, dan desa yang lebih
                terhubung dengan dunia.
              </p>
            </Reveal>

            <Reveal delay={0.3} className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex flex-col">
                <span className="font-display text-2xl font-bold text-jipo-navy">
                  {BRAND.owner}
                </span>
                <span className="mt-1 inline-flex items-center gap-2 text-sm text-jipo-slate">
                  <span className="h-px w-8 bg-jipo-blue/50" aria-hidden="true" />
                  Hargorejo, Tulang Bawang
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
