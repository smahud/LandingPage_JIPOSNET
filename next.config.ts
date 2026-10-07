import type { NextConfig } from "next";

/**
 * Konfigurasi Next.js JIPOSNET — mode ganda:
 *
 * 1. `bun run dev` / `bun run build` / Vercel / Netlify
 *    → aplikasi Next.js normal.
 *
 * 2. `STATIC_EXPORT=1 bun run build`
 *    → situs statis murni di folder `out/`, bisa di-hosting di mana saja
 *      (cPanel, nginx, Apache, dsb.) tanpa Node.js di server.
 *
 * 3. `STATIC_EXPORT=1 BASE_PATH=/LandingPage_JIPOSNET bun run build`
 *    → sama dengan no. 2, tetapi semua aset diberi awalan sub-path
 *      (dipakai GitHub Actions untuk GitHub Pages project site).
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.BASE_PATH?.replace(/\/+$/, "") || "";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  devIndicators: false,
  ...(isStaticExport
    ? { output: "export" as const, images: { unoptimized: true } }
    : {}),
  ...(basePath
    ? {
        basePath,
        /** Injeksikan basePath ke klien agar <img src> ikut ber-prefix */
        env: { NEXT_PUBLIC_BASE_PATH: basePath },
      }
    : {}),
};

export default nextConfig;
