"use client";

import Image from "next/image";
import { ArrowRight, Home, Network, Store } from "lucide-react";
import { IMAGES, WHATSAPP_URL } from "./constants";
import { RevealGroup, RevealItem } from "./reveal";
import { SectionHeader } from "./section-header";
import { cn } from "@/lib/utils";

const SERVICES = [
  {
    icon: Home,
    image: IMAGES.home,
    imageAlt:
      "Ibu rumah tangga santai berselancar internet dari sofa rumahnya",
    title: "Internet Rumah",
    tagline: "WiFi cepat untuk keluarga",
    description:
      "Koneksi WiFi stabil untuk seluruh anggota keluarga — streaming film, belajar daring, video call sanak keluarga, dan aktivitas digital harian tanpa buffering.",
    points: ["WiFi stabil satu rumah", "Cocok untuk belajar & hiburan", "Instalasi rapi & cepat"],
    accent: "from-jipo-blue/85 to-jipo-cyan/70",
  },
  {
    icon: Store,
    image: IMAGES.business,
    imageAlt: "Pengusaha muda mengelola usahanya menggunakan laptop",
    title: "Internet Bisnis",
    tagline: "Konektivitas andal untuk usaha",
    description:
      "Koneksi andal untuk warung, toko, kafe, dan usaha kecil menengah. Mendukung pembayaran digital, kasir daring, kamera CCTV internet, hingga media sosial bisnis.",
    points: ["Uptime tinggi untuk operasional", "Dukung pembayaran QRIS & digital", "Prioritas penanganan gangguan"],
    accent: "from-jipo-green/80 to-jipo-cyan/60",
  },
  {
    icon: Network,
    image: IMAGES.education,
    imageAlt: "Siswa-siswa menggunakan laptop bersama di ruang belajar",
    title: "Jaringan Komunitas",
    tagline: "Transformasi digital bersama",
    description:
      "Mendukung transformasi digital lingkungan — sekolah, masjid, balai desa, dan posyandu. Internet yang merata agar tidak ada warga yang tertinggal di era digital.",
    points: ["Dukung sekolah & fasilitas umum", "Program literasi digital warga", "Jaringan yang tumbuh bersama"],
    accent: "from-jipo-navy/85 to-jipo-blue/70",
  },
] as const;

export function Services() {
  return (
    <section id="layanan" className="relative bg-white py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Layanan Kami"
          title="Solusi Internet untuk Setiap Kebutuhan"
          description="Rumah, usaha, hingga fasilitas komunitas — JIPOSNET menyiapkan paket konektivitas yang disesuaikan dengan kebutuhan dan kondisi lokasi Anda."
        />

        <RevealGroup
          className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7"
          stagger={0.14}
        >
          {SERVICES.map((service) => (
            <RevealItem key={service.title} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_10px_40px_-18px_rgba(11,31,58,0.22)] ring-1 ring-jipo-navy/8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-20px_rgba(0,102,255,0.35)] hover:ring-jipo-blue/35">
                {/* Photo header */}
                <div className="relative h-52 overflow-hidden sm:h-56">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 92vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-t opacity-90 mix-blend-multiply",
                      service.accent
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-jipo-navy/60 via-transparent to-transparent" />

                  {/* Icon badge */}
                  <span className="absolute bottom-4 left-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/95 shadow-lg shadow-jipo-navy/20 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                    <service.icon className="h-6 w-6 text-jipo-blue" aria-hidden="true" />
                  </span>

                  <span className="absolute right-4 top-4 rounded-full bg-jipo-navy/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
                    {service.tagline}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="font-display text-xl font-bold text-jipo-navy sm:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-jipo-slate sm:text-[0.95rem]">
                    {service.description}
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm text-jipo-navy/85">
                        <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-jipo-green/12">
                          <svg viewBox="0 0 10 8" className="h-2.5 w-2.5 text-jipo-green" fill="none" aria-hidden="true">
                            <path d="M1 4.2 3.4 6.6 9 1.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-jipo-blue transition-all duration-300 hover:gap-3.5 hover:text-jipo-blue-600"
                    aria-label={`Tanyakan layanan ${service.title} via WhatsApp`}
                  >
                    Tanya Paket Ini
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>

                {/* Bottom glow line on hover */}
                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-jipo-blue via-jipo-cyan to-jipo-blue transition-transform duration-500 group-hover:scale-x-100" />
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
