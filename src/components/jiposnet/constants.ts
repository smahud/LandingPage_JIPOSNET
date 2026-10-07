/**
 * JIPOSNET — shared brand constants
 * Single source of truth for contact info, links, and verified imagery.
 */

export const BRAND = {
  name: "JIPOSNET",
  tagline: "Internet Cepat, Stabil, dan Terjangkau",
  owner: "Widayat",
  address: {
    village: "Hargorejo",
    district: "Rawajitu Selatan",
    regency: "Tulang Bawang",
    province: "Lampung",
    postalCode: "34591",
  },
  phoneDisplay: "+62 812 7457 3558",
  phoneIntl: "+6281274573558",
} as const;

export const WHATSAPP_URL = `https://wa.me/6281274573558?text=${encodeURIComponent(
  "Halo JIPOSNET, saya ingin bertanya tentang pemasangan internet di daerah Hargorejo."
)}`;

export const NAV_LINKS = [
  { href: "#beranda", label: "Beranda" },
  { href: "#tentang", label: "Tentang" },
  { href: "#layanan", label: "Layanan" },
  { href: "#keunggulan", label: "Keunggulan" },
  { href: "#coverage", label: "Coverage" },
  { href: "#kontak", label: "Kontak" },
] as const;

/**
 * Awalan path aset — otomatis di-inject oleh next.config.ts dari BASE_PATH
 * (untuk GitHub Pages project site). Kosong saat dev / build hosting root.
 */
const ASSET_BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Imagery lokal (self-contained) — file ada di public/images/.
 * Diambil dari hasil pencarian bebas-watermark, sudah dioptimasi web.
 */
export const IMAGES = {
  /** Aerial view of an Indonesian village — hero backdrop */
  heroVillage: `${ASSET_BASE}/images/hero-village.jpeg`,
  /** Traditional stilt house among rice paddies */
  villageHouse: `${ASSET_BASE}/images/village-house.jpeg`,
  /** Glowing blue fiber-optic strands */
  fiber: `${ASSET_BASE}/images/fiber-optic.jpeg`,
  /** Telecom tower against sky and hills */
  tower: `${ASSET_BASE}/images/telecom-tower.jpg`,
  /** Classroom of students with laptops */
  education: `${ASSET_BASE}/images/education.jpg`,
  /** Young entrepreneur with laptop in her workshop */
  business: `${ASSET_BASE}/images/business.jpg`,
  /** Woman relaxing on a couch with a laptop */
  home: `${ASSET_BASE}/images/home-internet.jpg`,
  /** Owner portrait placeholder (generated, local) */
  owner: `${ASSET_BASE}/images/owner-widayat.png`,
} as const;
