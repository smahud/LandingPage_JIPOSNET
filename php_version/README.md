# JIPOSNET — Versi PHP (Shared Hosting / cPanel)

Versi PHP murni dari landing page JIPOSNET — **tanpa Node.js, tanpa build step, tanpa database**.
Cukup unggah ke hosting, langsung jalan. Desain, animasi, dan interaksi 100% identik dengan
[versi Next.js](../README.md) karena memakai CSS hasil build yang sama.

## Persyaratan

| Kebutuhan      | Versi minimal | Catatan                                      |
|----------------|---------------|----------------------------------------------|
| PHP            | 7.4+          | Sudah bawaan semua hosting cPanel modern     |
| Ekstensi       | —             | Tidak ada ekstensi khusus (murni PHP bawaan) |
| Web server     | Apache/LiteSpeed/Nginx | `.htaccess` opsional (caching & keamanan) |
| Database       | Tidak perlu   | —                                            |
| Node.js        | Tidak perlu   | —                                            |

## Struktur Folder

```
php_version/
├── index.php              ← halaman utama (merangkai semua section)
├── .htaccess              ← kompresi, cache, keamanan (Apache/LiteSpeed)
├── includes/
│   ├── config.php         ← ✏️ EDIT DI SINI: kontak, alamat, nomor WA
│   ├── helpers.php        ← helper tampilan (logo, section header, wifi)
│   ├── icons.php          ← peta ikon SVG (35 ikon lucide)
│   ├── head.php           ← <head> SEO, navbar, menu seluler
│   └── foot.php           ← footer + skrip
├── sections/              ← satu file per section (edit teks di sini)
│   ├── hero.php           ← judul besar + statistik + CTA
│   ├── about.php          ← tentang kami + kolase foto
│   ├── services.php       ← 3 kartu layanan
│   ├── features.php       ← keunggulan + widget status jaringan
│   ├── coverage.php       ← peta interaktif + data titik koneksi
│   ├── why-choose.php     ← 3 alasan memilih
│   ├── owner.php          ← profil pemilik (Widayat)
│   └── contact.php        ← langkah bergabung + panel WhatsApp
└── assets/
    ├── css/app.css        ← CSS hasil build Tailwind (jangan diedit)
    ├── css/extras.css     ← perilaku khusus versi PHP
    ├── js/main.js         ← interaksi (navbar, peta, kanvas, reveal)
    ├── img/               ← semua gambar + favicon
    └── fonts/             ← Inter & Space Grotesk (self-hosted)
```

## Cara Deploy

### A. cPanel / Shared Hosting (paling umum) — 3 menit

1. **Unduh ZIP siap upload**
   - Buka repo di GitHub → tab **Actions** → run **php-version** terbaru →
     unduh artifact **jiposnet-php-hosting**.
   - Atau zip manual seluruh isi folder `php_version/` dari repo.
2. Login cPanel → **File Manager** → masuk ke `public_html`
   (atau subfolder, misal `public_html/landing/`).
3. **Upload ZIP** → klik kanan → **Extract**.
   Pastikan `index.php` berada langsung di dalam `public_html` (bukan
   `public_html/php_version/`).
4. Selesai — buka domain Anda. Contoh: `https://domainanda.com/`

> 💡 Kalau sudah ada website di `public_html`, ekstrak ke subfolder
> `public_html/jiposnet/` lalu akses `https://domainanda.com/jiposnet/`.

### B. VPS / dedicated server

```bash
# Apache
sudo apt install php libapache2-mod-php
sudo cp -r php_version/* /var/www/html/

# Nginx + PHP-FPM
sudo apt install php-fpm nginx
sudo cp -r php_version/* /var/www/html/
# server block: root /var/www/html; index index.php;
# location ~ \.php$ { fastcgi_pass unix:/run/php/php8.2-fpm.sock; ... }
```

### C. Uji coba lokal

```bash
cd php_version
php -S localhost:8080
# buka http://localhost:8080
```

## Setelah Deploy — Yang Perlu Diubah

Buka **`includes/config.php`** dan sesuaikan:

```php
const PHONE_DISPLAY = '+62 812 7457 3558';  // nomor tampilan
const WA_NUMBER     = '6281274573558';      // nomor WhatsApp (tanpa +)
const WA_DEFAULT_MESSAGE = 'Halo JIPOSNET, ...'; // pesan otomatis WA
const SITE_URL      = '';                   // isi domain, mis. https://jiposnet.id
```

- `SITE_URL` dipakai untuk **og:image** (pratinjau saat link dibagikan di
  WhatsApp/Facebook). Isi setelah domain aktif.
- Teks tiap section diedit langsung di `sections/*.php` — cari teksnya,
  ubah, simpan. Tidak ada langkah build apa pun.
- Titik peta coverage (nama/posisi) diedit di bagian atas
  `sections/coverage.php` + daftar `MAP_POINTS` di `assets/js/main.js`.

## FAQ

**Apakah harus punya domain?**
Tidak — bisa dijalankan di subdomain gratis hosting maupun subfolder.

**Bisa campur dengan WordPress?**
Bisa. Ekstrak ke subfolder terpisah; tidak saling mengganggu.

**Kenapa gambar tidak muncul setelah upload?**
Pastikan struktur `assets/img/` ikut ter-upload, dan `index.php` berada
tepat di root tempat Anda membuka URL (bukan di dalam `php_version/`).

**Apakah form kontak ada?**
Kontak memakai tombol WhatsApp langsung (paling efektif untuk ISP lokal —
tidak perlu setting SMTP). Semua tombol CTA sudah berisi pesan otomatis.
