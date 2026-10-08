<?php
/**
 * Section Hero — panorama desa, wordmark raksasa, CTA ganda, strip fitur.
 * Semua elemen reveal di sini beranimasi saat halaman dimuat (bukan on-scroll).
 */

$heroStats = [
    ['icon' => 'wifi',    'title' => 'Internet Stabil 24 Jam',        'desc' => 'Koneksi terjaga sepanjang hari'],
    ['icon' => 'cpu',     'title' => 'Teknologi Jaringan Modern',     'desc' => 'Infrastruktur fiber & nirkabel'],
    ['icon' => 'headset', 'title' => 'Support Lokal Cepat',           'desc' => 'Tim Hargorejo siap datang'],
    ['icon' => 'wallet',  'title' => 'Harga Terjangkau',              'desc' => 'Paket sesuai kemampuan warga'],
];
?>
<section id="beranda" class="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-jipo-navy-950">
    <!-- ── Latar sinematik ─────────────────────────────────────────────── -->
    <div class="absolute inset-0 -z-20">
        <img src="<?= img('hero-village.jpeg') ?>"
             alt="Panorama udara desa Hargorejo dengan hamparan sawah dan perkampungan yang terhubung internet"
             class="absolute inset-0 h-full w-full object-cover" fetchpriority="high" decoding="async">
    </div>

    <!-- Overlay navy sinematik -->
    <div class="absolute inset-0 -z-10 bg-gradient-to-b from-jipo-navy-950/88 via-jipo-navy/62 to-jipo-navy-950/96"></div>
    <div class="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_65%_at_50%_36%,transparent_0%,rgba(6,15,31,0.32)_72%,rgba(6,15,31,0.78)_100%)]"></div>

    <!-- Jaringan mesh hidup dengan partikel data mengalir -->
    <canvas id="network-canvas" aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10 h-full w-full"></canvas>

    <!-- Bola cahaya ambien -->
    <div class="animate-glow-pulse absolute -left-32 top-1/4 -z-10 h-96 w-96 rounded-full bg-jipo-blue/20 blur-[110px]"></div>
    <div class="animate-glow-pulse absolute -right-24 bottom-1/4 -z-10 h-80 w-80 rounded-full bg-jipo-cyan/15 blur-[100px]" style="animation-delay:2.4s"></div>

    <!-- ── Konten ──────────────────────────────────────────────────────── -->
    <div class="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 pb-14 pt-32 text-center sm:px-6 lg:px-8">
        <!-- Badge status jaringan -->
        <div class="rv" data-rv-load style="--rv-delay:0s;--rv-y:30px">
            <span class="glass-dark inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-xs font-medium text-white/85 sm:text-sm">
                <span class="relative flex h-2.5 w-2.5">
                    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-jipo-green opacity-75"></span>
                    <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-jipo-green"></span>
                </span>
                Jaringan Aktif
                <span class="hidden h-3 w-px bg-white/20 sm:block"></span>
                <span class="hidden items-center gap-1.5 sm:inline-flex">
                    <?= icon('map-pin', 'h-3.5 w-3.5 text-jipo-cyan') ?>
                    Hargorejo, Tulang Bawang — Lampung
                </span>
            </span>
        </div>

        <!-- Wordmark brand -->
        <h1 class="rv font-display mt-7 text-balance text-[clamp(3.4rem,11vw,8rem)] font-bold leading-[0.95] tracking-tight text-white" data-rv-load style="--rv-delay:.12s;--rv-y:30px">
            JIPOS<span class="bg-gradient-to-r from-jipo-cyan via-jipo-blue to-jipo-cyan bg-clip-text text-transparent text-glow-cyan">NET</span>
        </h1>

        <!-- Proposisi nilai -->
        <h2 class="rv font-display mt-6 max-w-4xl text-balance text-xl font-semibold leading-snug text-white/95 sm:text-3xl lg:text-[2.1rem]" data-rv-load style="--rv-delay:.24s;--rv-y:30px">
            Internet
            <span class="bg-gradient-to-r from-jipo-cyan to-jipo-blue bg-clip-text text-transparent">Cepat, Stabil, dan Terjangkau</span>
            untuk Menghubungkan Masyarakat
        </h2>

        <p class="rv mx-auto mt-5 max-w-2xl text-balance text-base leading-relaxed text-white/70 sm:text-lg" data-rv-load style="--rv-delay:.36s;--rv-y:30px">
            Solusi internet terpercaya untuk rumah, usaha, pendidikan, dan
            kebutuhan digital masyarakat Hargorejo dan sekitarnya.
        </p>

        <!-- CTA -->
        <div class="rv mt-9 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row" data-rv-load style="--rv-delay:.48s;--rv-y:30px">
            <a href="<?= e(wa_url()) ?>" target="_blank" rel="noopener noreferrer"
               class="btn-glow inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-jipo-blue to-jipo-blue-600 px-8 py-4 text-base font-semibold text-white sm:w-auto">
                <?= icon('zap', 'h-5 w-5') ?>
                Pasang Internet Sekarang
            </a>
            <a href="#kontak"
               class="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-white/25 bg-white/5 px-8 py-4 text-base font-semibold text-white/90 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-jipo-cyan/60 hover:bg-white/10 hover:text-jipo-cyan sm:w-auto">
                <?= icon('phone', 'h-5 w-5') ?>
                Hubungi Kami
            </a>
        </div>
    </div>

    <!-- ── Strip fitur ─────────────────────────────────────────────────── -->
    <div class="rv relative z-10 mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 lg:px-8" data-rv-load style="--rv-delay:.62s;--rv-y:30px">
        <ul class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <?php foreach ($heroStats as $stat): ?>
                <li class="glass-dark group flex items-center gap-3.5 rounded-2xl px-4 py-4 transition-colors duration-300 hover:border-jipo-cyan/40">
                    <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-jipo-blue/30 to-jipo-cyan/20 ring-1 ring-inset ring-white/15 transition-transform duration-300 group-hover:scale-110">
                        <?= icon($stat['icon'], 'h-5 w-5 text-jipo-cyan') ?>
                    </span>
                    <span class="flex flex-col text-left">
                        <span class="text-sm font-semibold text-white"><?= e($stat['title']) ?></span>
                        <span class="mt-0.5 text-xs text-white/60"><?= e($stat['desc']) ?></span>
                    </span>
                </li>
            <?php endforeach; ?>
        </ul>
    </div>
</section>
