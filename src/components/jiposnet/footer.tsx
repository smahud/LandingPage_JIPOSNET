"use client";

import { Facebook, Instagram, MapPin, Phone, Youtube } from "lucide-react";
import { BRAND, NAV_LINKS, WHATSAPP_URL } from "./constants";
import { JipoLogo } from "./logo";

const SOCIALS = [
  { icon: Facebook, label: "Facebook JIPOSNET (segera)", handle: "@jiposnet" },
  { icon: Instagram, label: "Instagram JIPOSNET (segera)", handle: "@jiposnet.id" },
  { icon: Youtube, label: "YouTube JIPOSNET (segera)", handle: "JIPOSNET Official" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-white/8 bg-jipo-navy-950">
      {/* Top accent line */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-jipo-cyan/50 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 pb-12 pt-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
          {/* Brand */}
          <div>
            <JipoLogo variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              Gerbang digital masyarakat Hargorejo — internet cepat, stabil,
              dan terjangkau untuk rumah, usaha, dan masa depan desa.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href="#beranda"
                  aria-label={social.label}
                  title={`${social.handle} — segera hadir`}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/60 ring-1 ring-inset ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-jipo-blue/20 hover:text-jipo-cyan hover:ring-jipo-cyan/40"
                >
                  <social.icon className="h-4.5 w-4.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Navigasi footer">
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">
              Jelajahi
            </h3>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/65 transition-colors hover:text-jipo-cyan"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">
              Hubungi Kami
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-white/65">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-jipo-cyan" aria-hidden="true" />
                <span>
                  {BRAND.address.village}, {BRAND.address.district},
                  <br />
                  {BRAND.address.regency}, {BRAND.address.province}{" "}
                  {BRAND.address.postalCode}
                </span>
              </li>
              <li>
                <a
                  href="tel:+6281274573558"
                  className="flex items-center gap-3 transition-colors hover:text-jipo-cyan"
                >
                  <Phone className="h-4.5 w-4.5 shrink-0 text-jipo-cyan" aria-hidden="true" />
                  {BRAND.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-jipo-cyan transition-colors hover:text-white"
                >
                  Chat WhatsApp →
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-7 sm:flex-row">
          <p className="text-xs text-white/45">
            © {year} {BRAND.name}. Seluruh hak cipta dilindungi.
          </p>
          <p className="inline-flex items-center gap-2 text-xs text-white/45">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-jipo-green opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-jipo-green" />
            </span>
            Jaringan aktif — melayani Hargorejo &amp; sekitarnya
          </p>
        </div>
      </div>
    </footer>
  );
}
