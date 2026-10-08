<?php
/**
 * JIPOSNET — <head>, navbar, dan drawer menu seluler.
 * Dipanggil oleh index.php sebelum semua section.
 */

$pageTitle = BRAND_NAME . ' — ' . BRAND_TAGLINE . ' | ' . ADDRESS_VILLAGE . ', ' . ADDRESS_REGENCY;
$pageDescription = BRAND_NAME . ' adalah penyedia internet lokal terpercaya di '
    . ADDRESS_VILLAGE . ', ' . ADDRESS_DISTRICT . ', ' . ADDRESS_REGENCY . ', ' . ADDRESS_PROVINCE
    . '. Solusi internet untuk rumah, usaha, pendidikan, dan kebutuhan digital masyarakat.';
$pageKeywords = 'JIPOSNET,internet Hargorejo,internet Tulang Bawang,internet Lampung,ISP lokal,internet desa,wifi Rawajitu Selatan,internet cepat Lampung';
$ogDescription = 'Menghubungkan masyarakat ' . ADDRESS_VILLAGE
    . ' dan sekitarnya dengan internet berkualitas, koneksi stabil, dan pelayanan lokal yang dekat dengan pelanggan.';
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#0B1F3A">

    <title><?= e($pageTitle) ?></title>
    <meta name="description" content="<?= e($pageDescription) ?>">
    <meta name="author" content="<?= e(BRAND_OWNER) ?>">
    <meta name="keywords" content="<?= e($pageKeywords) ?>">

    <meta property="og:title" content="<?= e(BRAND_NAME . ' — ' . BRAND_TAGLINE) ?>">
    <meta property="og:description" content="<?= e($ogDescription) ?>">
    <meta property="og:site_name" content="<?= e(BRAND_NAME) ?>">
    <meta property="og:locale" content="id_ID">
    <meta property="og:type" content="website">
    <?php if (SITE_URL !== ''): ?>
        <meta property="og:image" content="<?= e(SITE_URL) ?>/<?= img('hero-village.jpeg') ?>">
    <?php endif; ?>
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="<?= e(BRAND_NAME . ' — ' . BRAND_TAGLINE) ?>">
    <meta name="twitter:description" content="<?= e($ogDescription) ?>">

    <link rel="icon" href="<?= img('icon.svg') ?>" sizes="any" type="image/svg+xml">

    <!-- Font: preload subset latin (dipakai lebih dulu saat render) -->
    <link rel="preload" href="assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="assets/fonts/space-grotesk-latin.woff2" as="font" type="font/woff2" crossorigin>
    <!-- Gambar hero: mulai dimuat lebih awal -->
    <link rel="preload" as="image" href="<?= img('hero-village.jpeg') ?>">

    <link rel="stylesheet" href="assets/css/app.css">
    <link rel="stylesheet" href="assets/css/extras.css">
</head>
<body class="font-sans antialiased bg-background text-foreground">

<div class="flex min-h-screen flex-col bg-white">

    <!-- ── Navbar ─────────────────────────────────────────────────────── -->
    <header class="site-header fixed inset-x-0 top-0 z-50 transition-all duration-500" id="site-header">
        <nav aria-label="Navigasi utama" class="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <!-- Logo -->
            <a href="#beranda" aria-label="JIPOSNET — kembali ke atas" class="rounded-lg focus-visible:outline-2 focus-visible:outline-jipo-blue">
                <?= jipo_logo('dark') /* warna wordmark dikendalikan CSS sesuai status scroll */ ?>
            </a>

            <!-- Tautan desktop -->
            <ul class="hidden items-center gap-1 lg:flex">
                <?php foreach (nav_links() as $i => $link): ?>
                    <li>
                        <a href="<?= e($link['href']) ?>" class="nav-link relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300<?= $i === 0 ? ' is-active' : '' ?>">
                            <?= e($link['label']) ?>
                            <span class="nav-underline absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-jipo-blue to-jipo-cyan transition-all duration-300"></span>
                        </a>
                    </li>
                <?php endforeach; ?>
            </ul>

            <!-- CTA desktop -->
            <div class="hidden items-center gap-3 lg:flex">
                <a href="tel:<?= e(PHONE_TEL) ?>" class="nav-phone inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors">
                    <?= icon('phone', 'h-4 w-4') ?>
                    <?= e(PHONE_DISPLAY) ?>
                </a>
                <a href="<?= e(wa_url()) ?>" target="_blank" rel="noopener noreferrer"
                   class="btn-glow inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-jipo-blue to-jipo-blue-600 px-5 py-2.5 text-sm font-semibold text-white">
                    <?= icon('zap', 'h-4 w-4') ?>
                    Pasang Sekarang
                </a>
            </div>

            <!-- Tombol menu seluler -->
            <button type="button" id="drawer-open" class="nav-burger inline-flex h-11 w-11 items-center justify-center rounded-xl lg:hidden"
                    aria-label="Buka menu navigasi" aria-haspopup="dialog" aria-expanded="false" aria-controls="mobile-drawer">
                <?= icon('menu', 'h-6 w-6') ?>
            </button>
        </nav>
    </header>

    <!-- ── Drawer menu seluler ────────────────────────────────────────── -->
    <div class="drawer" id="mobile-drawer" aria-hidden="true">
        <div class="drawer-overlay" data-drawer-close></div>
        <aside class="drawer-panel w-[86vw] max-w-sm border-l border-jipo-navy-700 bg-jipo-navy text-white"
               role="dialog" aria-modal="true" aria-label="Menu navigasi seluler">
            <div class="flex items-center justify-between border-b border-white/10 pb-5">
                <?= jipo_logo('light') ?>
                <button type="button" class="flex h-11 w-11 items-center justify-center rounded-xl text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                        aria-label="Tutup menu navigasi" data-drawer-close>
                    <?= icon('x', 'h-6 w-6') ?>
                </button>
            </div>

            <nav aria-label="Navigasi seluler" class="mt-2 flex flex-col">
                <?php foreach (nav_links() as $i => $link): ?>
                    <a href="<?= e($link['href']) ?>" data-drawer-close
                       class="flex items-center justify-between border-b border-white/5 py-4 text-base font-medium text-white/85 transition-colors hover:text-jipo-cyan">
                        <?= e($link['label']) ?>
                        <span class="font-mono text-xs text-white/35">0<?= $i + 1 ?></span>
                    </a>
                <?php endforeach; ?>
            </nav>

            <div class="mt-6 flex flex-col gap-3">
                <a href="<?= e(wa_url()) ?>" target="_blank" rel="noopener noreferrer"
                   class="btn-glow inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-jipo-blue to-jipo-blue-600 px-5 py-3.5 text-sm font-semibold text-white">
                    <?= icon('zap', 'h-4 w-4') ?>
                    Pasang Internet Sekarang
                </a>
                <a href="tel:<?= e(PHONE_TEL) ?>"
                   class="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3.5 text-sm font-semibold text-white/90 transition-colors hover:border-jipo-cyan/40 hover:text-jipo-cyan">
                    <?= icon('phone', 'h-4 w-4') ?>
                    <?= e(PHONE_DISPLAY) ?>
                </a>
            </div>
        </aside>
    </div>

    <main class="flex-1">
