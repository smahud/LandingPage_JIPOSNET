"use client";

import Image from "next/image";
import { HandHeart, MapPinned, Signal, Sprout } from "lucide-react";
import { IMAGES } from "./constants";
import { Reveal, RevealGroup, RevealItem } from "./reveal";
import { SectionHeader } from "./section-header";
import { WifiWaves } from "./network-canvas";

const VALUES = [
  {
    icon: Signal,
    label: "Koneksi Stabil",
  },
  {
    icon: HandHeart,
    label: "Pelayanan Dekat",
  },
  {
    icon: Sprout,
    label: "Tumbuh Bersama Desa",
  },
] as const;

export function About() {
  return (
    <section id="tentang" className="relative overflow-hidden bg-jipo-mist py-24 sm:py-28 lg:py-32">
      <div className="bg-dots absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* ── Copy ─────────────────────────────────────────── */}
          <div>
            <SectionHeader
              align="left"
              eyebrow="Tentang Kami"
              title="ISP Lokal yang Tumbuh dari Desa, untuk Desa"
              className="max-w-xl"
            />

            <Reveal delay={0.12} className="mt-6 space-y-5 text-base leading-relaxed text-jipo-slate sm:text-lg">
              <p>
                <span className="font-semibold text-jipo-navy">JIPOSNET</span>{" "}
                hadir untuk memberikan layanan internet berkualitas dengan
                koneksi stabil dan pelayanan dekat dengan pelanggan. Kami
                membangun jaringan dari Hargorejo — bukan dari kota besar —
                karena kami percaya setiap warga desa berhak menikmati
                internet yang sama baiknya dengan di perkotaan.
              </p>
              <p>
                Berbasis di Hargorejo, Rawajitu Selatan, Kabupaten Tulang
                Bawang, kami memahami kondisi lapangan, kebutuhan warga, dan
                karakter daerah. Itulah mengapa setiap pelanggan kami bukan
                sekadar nomor akun — mereka tetangga kami sendiri. Laporan
                gangguan ditangani langsung oleh tim lokal yang siap datang
                ke lokasi.
              </p>
              <p>
                Dari belajar daring untuk anak-anak, transaksi digital untuk
                warung dan usaha kecil, hingga tetap terhubung dengan keluarga
                di perantauan — JIPOSNET berkomitmen menjadi gerbang digital
                yang andal bagi masyarakat Lampung.
              </p>
            </Reveal>

            <RevealGroup className="mt-8 flex flex-wrap gap-3" stagger={0.12}>
              {VALUES.map((v) => (
                <RevealItem key={v.label}>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-jipo-navy shadow-sm ring-1 ring-inset ring-jipo-navy/8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:ring-jipo-blue/30">
                    <v.icon className="h-4 w-4 text-jipo-blue" aria-hidden="true" />
                    {v.label}
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          {/* ── Image collage ────────────────────────────────── */}
          <Reveal delay={0.15} className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="relative">
              {/* Main image — community education */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_32px_64px_-28px_rgba(11,31,58,0.45)] ring-1 ring-jipo-navy/10">
                <Image
                  src={IMAGES.education}
                  alt="Anak-anak desa belajar dengan laptop berkat internet dari JIPOSNET"
                  fill
                  sizes="(min-width: 1024px) 44vw, (min-width: 640px) 90vw, 100vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-jipo-navy/35 via-transparent to-transparent" />
              </div>

              {/* Overlapping secondary image — village */}
              <div className="absolute -bottom-10 -left-4 hidden w-48 rotate-[-4deg] overflow-hidden rounded-2xl border-4 border-white shadow-xl sm:block md:w-56 lg:-left-10">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={IMAGES.villageHouse}
                    alt="Rumah panggung khas desa di tengah persawahan Hargorejo"
                    fill
                    sizes="224px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Floating live-signal card */}
              <div className="animate-float-y glass-dark absolute -right-3 -top-8 flex items-center gap-3.5 rounded-2xl px-5 py-4 shadow-2xl sm:-right-6">
                <WifiWaves className="h-11 w-11" />
                <span className="flex flex-col text-left">
                  <span className="text-sm font-semibold text-white">
                    Sinyal Kuat
                  </span>
                  <span className="mt-0.5 inline-flex items-center gap-1 text-xs text-white/65">
                    <MapPinned className="h-3 w-3 text-jipo-cyan" aria-hidden="true" />
                    Hargorejo &amp; sekitarnya
                  </span>
                </span>
              </div>

              {/* Corner accent */}
              <div
                className="absolute -bottom-6 -right-6 -z-10 h-40 w-40 rounded-3xl bg-gradient-to-br from-jipo-blue/15 to-jipo-cyan/10"
                aria-hidden="true"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
