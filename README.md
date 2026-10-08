<div align="center">

# 🌐 JIPOSNET — Landing Page

**Internet Cepat, Stabil, dan Terjangkau untuk Menghubungkan Masyarakat**

Landing page resmi **JIPOSNET** — provider internet lokal di
Hargorejo, Rawajitu Selatan, Tulang Bawang, Lampung 34591

[![Deploy](https://img.shields.io/badge/deploy-GitHub%20Pages-0066FF?style=flat-square&logo=githubactions&logoColor=white)](https://github.com/smahud/LandingPage_JIPOSNET/actions)
[![Lisensi: MIT](https://img.shields.io/badge/lisensi-MIT-16A34A?style=flat-square)](LICENSE)

🔗 **Live:** **https://smahud.github.io/LandingPage_JIPOSNET/**

</div>

---

## ✨ Tentang Proyek Ini

Landing page marketing satu halaman untuk memperkenalkan layanan JIPOSNET:
hero sinematik dengan animasi jaringan partikel interaktif, tiga paket layanan,
peta coverage interaktif (SVG dengan tooltip & layer), profil pemilik, dan
seksi kontak berbasis WhatsApp.

Dibangun dengan **Next.js 16 · TypeScript · Tailwind CSS 4 · shadcn/ui · Framer Motion**.

> 📦 **Dua versi tersedia — pilih sesuai kebutuhan hosting Anda:**
>
> | Versi | Lokasi | Untuk siapa |
> |---|---|---|
> | **Next.js** (utama) | root repo / `src/` | GitHub Pages, Vercel, Netlify, VPS — sudah live |
> | **PHP murni** | [`php_version/`](php_version/) | shared hosting / cPanel biasa — tanpa Node.js sama sekali |
>
> Keduanya identik secara desain, animasi, dan interaksi (memakai CSS hasil build yang sama).
> Panduan lengkap versi PHP: **[`php_version/README.md`](php_version/README.md)**

> Semua tombol kontak langsung membuka WhatsApp **(+62 812-7457-3558)** dengan
> pesan yang sudah terisi otomatis — tanpa perlu backend sama sekali.

---

## 🚀 Cara Deploy — Pilih yang Paling Mudah

### ✅ Opsi A — GitHub Pages (OTOMATIS, sudah aktif)

Repo ini sudah terhubung ke GitHub Actions. **Setiap push ke branch `main`**
otomatis membangun ulang dan memperbarui situs dalam ±2 menit:

```bash
git add .
git commit -m "update konten"
git push        # → situs otomatis ter-update
```

Pantau progresnya di tab **[Actions](https://github.com/smahud/LandingPage_JIPOSNET/actions)**,
lalu lihat hasilnya di **https://smahud.github.io/LandingPage_JIPOSNET/**

### ✅ Opsi B — Hosting Sendiri (cPanel / shared hosting) — TANPA INSTALL APA PUN

1. Buka tab **[Actions](https://github.com/smahud/LandingPage_JIPOSNET/actions)**
   → klik run terbaru yang berstatus ✅ hijau
2. Di bagian bawah halaman tersebut, **download artifact `jiposnet-static-hosting`** (berupa ZIP)
3. **Ekstrak seluruh isi ZIP** ke folder `public_html` di hosting Anda
4. Selesai — situs langsung live di domain Anda 🎉

> ZIP ini dibangun untuk domain utama / subdomain (root). Tidak perlu Node.js,
> tidak perlu proses build di server — cukup upload & ekstrak.

### ✅ Opsi C — Versi PHP untuk Shared Hosting / cPanel

Punya hosting PHP biasa (cPanel) tanpa dukungan Node.js? **Gunakan versi PHP** —
kode sumbernya ada di folder **[`php_version/`](php_version/)**:

1. Buka tab **[Actions](https://github.com/smahud/LandingPage_JIPOSNET/actions)**
   → run **php-version** terbaru → download artifact **`jiposnet-php-hosting`** (ZIP)
2. Ekstrak seluruh isi ZIP ke `public_html` di hosting Anda
3. Selesai — cukup PHP 7.4+ (bawaan semua hosting), tanpa database, tanpa build

Detail lengkap (struktur file, cara edit konten, FAQ): **[`php_version/README.md`](php_version/README.md)**

### ✅ Opsi D — Vercel / Netlify (gratis, ±1 menit)

| Platform | Cara |
|---|---|
| **Vercel** | Buka [vercel.com/new](https://vercel.com/new) → import repo ini → **Deploy** (tanpa konfigurasi apa pun) |
| **Netlify** | Buka [app.netlify.com](https://app.netlify.com) → *Add new site* → *Import an existing project* → pilih repo ini → **Deploy** |

### ✅ Opsi E — VPS (nginx / Apache)

```bash
git clone https://github.com/smahud/LandingPage_JIPOSNET.git
cd LandingPage_JIPOSNET
bun install                       # atau: npm install
STATIC_EXPORT=1 bun run build     # hasil build ada di folder out/
sudo mkdir -p /var/www/jiposnet
sudo cp -r out/* /var/www/jiposnet/
```

Contoh blok server nginx:

```nginx
server {
    listen 80;
    server_name jiposnet.id www.jiposnet.id;
    root /var/www/jiposnet;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

---

## 🧑‍💻 Development Lokal

Prasyarat: [Bun](https://bun.sh) (atau Node.js 20+ dengan npm — ganti `bun` → `npm run`)

```bash
bun install      # install dependensi
bun run dev      # dev server di http://localhost:3000
bun run lint     # cek kualitas kode
```

### Mode Build

| Perintah | Hasil |
|---|---|
| `bun run build` | Build Next.js normal (untuk Vercel / `bun run start`) |
| `STATIC_EXPORT=1 bun run build` | Situs statis murni di `out/` — untuk hosting apa pun |
| `STATIC_EXPORT=1 BASE_PATH=/LandingPage_JIPOSNET bun run build` | Situs statis dengan sub-path (GitHub Pages) |

---

## ✏️ Mengubah Konten

| Yang ingin diubah | Lokasi |
|---|---|
| **Nomor WhatsApp, alamat, info brand** | `src/components/jiposnet/constants.ts` ← *satu file untuk semuanya* |
| Teks tiap seksi | `src/components/jiposnet/hero.tsx`, `about.tsx`, `services.tsx`, dst. |
| Gambar | ganti file di `public/images/` (pertahankan nama file yang sama) |
| Foto pemilik (Widayat) | `public/images/owner-widayat.png` |
| Warna & font brand | variabel `--color-jipo-*` di `src/app/globals.css` |
| Ikon / favicon | `src/app/icon.svg` |

Setelah mengubah, cukup `git push` — situs online otomatis ter-update.

> 💡 Untuk versi PHP, semua edit dilakukan langsung di file `php_version/`
> (`includes/config.php` untuk kontak/alamat, `sections/*.php` untuk teks) —
> tanpa proses build apa pun.

---

## 📁 Struktur Proyek

```
├── .github/workflows/deploy.yml       # CI: build → deploy GitHub Pages + ZIP hosting statis
├── .github/workflows/php-version.yml   # CI: validasi sintaks + ZIP versi PHP
├── public/images/                      # seluruh gambar (self-contained, tanpa CDN luar)
├── php_version/                        # 📦 VERSI PHP — shared hosting / cPanel
│   ├── index.php                       # halaman utama
│   ├── includes/config.php             # kontak, alamat, WhatsApp (EDIT DI SINI)
│   ├── sections/                       # satu file per seksi halaman
│   └── assets/                         # css, js, font, gambar (self-contained)
└── src/
    ├── app/                            # layout, halaman utama, gaya global, favicon
    ├── components/
    │   ├── jiposnet/                   # seluruh komponen landing page JIPOSNET
    │   └── ui/                         # komponen shadcn/ui yang dipakai
    ├── hooks/                          # use-toast
    └── lib/                            # utilitas cn()
```

---

## 📞 Kontak

**Widayat** — +62 812 7457 3558
Hargorejo, Rawajitu Selatan, Tulang Bawang, Lampung 34591

## 📄 Lisensi

[MIT](LICENSE) © 2026 smahud — JIPOSNET
