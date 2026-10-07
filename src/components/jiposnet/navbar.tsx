"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, Zap } from "lucide-react";
import { NAV_LINKS, WHATSAPP_URL } from "./constants";
import { JipoLogo } from "./logo";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("beranda");
  const [open, setOpen] = useState(false);

  /* Glass background after scrolling past the hero top edge */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Track the section currently in view for nav highlighting */
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "glass-light shadow-[0_8px_40px_-12px_rgba(11,31,58,0.25)]"
          : "bg-transparent"
      )}
    >
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <a href="#beranda" aria-label="JIPOSNET — kembali ke atas" className="rounded-lg focus-visible:outline-2 focus-visible:outline-jipo-blue">
          <JipoLogo variant={scrolled ? "dark" : "light"} />
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                  scrolled
                    ? active === link.href.slice(1)
                      ? "text-jipo-blue"
                      : "text-jipo-navy/75 hover:text-jipo-blue"
                    : active === link.href.slice(1)
                      ? "text-jipo-cyan"
                      : "text-white/80 hover:text-white"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-jipo-blue to-jipo-cyan transition-all duration-300",
                    active === link.href.slice(1)
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 opacity-0"
                  )}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:+6281274573558`}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              scrolled
                ? "text-jipo-navy hover:text-jipo-blue"
                : "text-white/85 hover:text-jipo-cyan"
            )}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            +62 812 7457 3558
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-jipo-blue to-jipo-blue-600 px-5 py-2.5 text-sm font-semibold text-white"
          >
            <Zap className="h-4 w-4" aria-hidden="true" />
            Pasang Sekarang
          </a>
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-xl lg:hidden",
              scrolled
                ? "text-jipo-navy hover:bg-jipo-navy/5"
                : "text-white hover:bg-white/10"
            )}
            aria-label="Buka menu navigasi"
          >
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[86vw] max-w-sm border-jipo-navy-700 bg-jipo-navy text-white"
          >
            <SheetHeader className="border-b border-white/10 pb-5 text-left">
              <SheetTitle asChild>
                <div>
                  <JipoLogo variant="light" />
                </div>
              </SheetTitle>
              <SheetDescription className="sr-only">
                Menu navigasi seluler JIPOSNET — jelajahi halaman dan hubungi
                kami untuk pemasangan internet.
              </SheetDescription>
            </SheetHeader>

            <nav aria-label="Navigasi seluler" className="mt-2 flex flex-col">
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-white/5 py-4 text-base font-medium text-white/85 transition-colors hover:text-jipo-cyan"
                >
                  {link.label}
                  <span className="font-mono text-xs text-white/35">
                    0{i + 1}
                  </span>
                </a>
              ))}
            </nav>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-jipo-blue to-jipo-blue-600 px-5 py-3.5 text-sm font-semibold text-white"
              >
                <Zap className="h-4 w-4" aria-hidden="true" />
                Pasang Internet Sekarang
              </a>
              <a
                href="tel:+6281274573558"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3.5 text-sm font-semibold text-white/90 transition-colors hover:border-jipo-cyan/40 hover:text-jipo-cyan"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                +62 812 7457 3558
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
