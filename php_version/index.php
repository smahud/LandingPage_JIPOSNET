<?php
/**
 * JIPOSNET — Landing Page (Versi PHP)
 * ---------------------------------------------------------------------------
 * Halaman utama yang merangkai semua section.
 *
 * CARA PAKAI:
 *   - Unggah seluruh isi folder ini ke public_html (cPanel) atau root server.
 *   - Pastikan ekstensi PHP aktif (default di semua hosting).
 *   - Edit data kontak/alamat di includes/config.php.
 *
 * Struktur:
 *   includes/config.php   → data brand & kontak (EDIT DI SINI)
 *   includes/helpers.php  → helper tampilan (logo, section header, dll.)
 *   includes/icons.php    → peta ikon SVG
 *   includes/head.php     → <head>, navbar, menu seluler
 *   includes/foot.php     → footer & skrip
 *   sections/*.php        → satu file per section halaman
 *   assets/               → css, js, font, gambar
 */

require __DIR__ . '/includes/helpers.php';

require __DIR__ . '/includes/head.php';

require __DIR__ . '/sections/hero.php';
require __DIR__ . '/sections/about.php';
require __DIR__ . '/sections/services.php';
require __DIR__ . '/sections/features.php';
require __DIR__ . '/sections/coverage.php';
require __DIR__ . '/sections/why-choose.php';
require __DIR__ . '/sections/owner.php';
require __DIR__ . '/sections/contact.php';

require __DIR__ . '/includes/foot.php';
