<?php
/**
 * Section Kontak — latar fiber optik, 3 langkah bergabung, dan panel
 * konversi WhatsApp/telepon.
 */

$steps = [
    ['icon' => 'message-circle', 'title' => '1. Hubungi Kami',   'desc' => 'Chat WhatsApp — ceritakan lokasi dan kebutuhan internet Anda.'],
    ['icon' => 'search-check',   'title' => '2. Survei Lokasi',  'desc' => 'Tim kami memeriksa sinyal di titik Anda dan menawarkan paket terbaik.'],
    ['icon' => 'wrench',         'title' => '3. Instalasi & Aktif', 'desc' => 'Pemasangan rapi oleh teknisi lokal, langsung bisa digunakan.'],
];
?>
<section id="kontak" class="relative overflow-hidden bg-jipo-navy-950 py-24 sm:py-28 lg:py-32">
    <!-- Latar fiber optik -->
    <div class="absolute inset-0" aria-hidden="true">
        <img src="<?= img('fiber-optic.jpeg') ?>" alt=""
             class="absolute inset-0 h-full w-full object-cover opacity-30" loading="lazy" decoding="async">
        <div class="absolute inset-0 bg-gradient-to-b from-jipo-navy-950/95 via-jipo-navy-950/80 to-jipo-navy-950/97"></div>
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(0,102,255,0.16),transparent_75%)]"></div>
    </div>

    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-3xl text-center">
            <div class="rv">
                <span class="glass-dark inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-jipo-cyan ring-1 ring-inset ring-jipo-cyan/25">
                    <?= icon('wifi', 'h-3.5 w-3.5') ?>
                    Hubungi Kami
                </span>
            </div>

            <div class="rv" style="--rv-delay:.1s">
                <h2 class="font-display mt-6 text-balance text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.85rem]">
                    Siap Terhubung dengan
                    <span class="bg-gradient-to-r from-jipo-cyan to-jipo-blue bg-clip-text text-transparent text-glow-cyan">Internet Lebih Baik?</span>
                </h2>
            </div>

            <div class="rv" style="--rv-delay:.18s">
                <p class="mx-auto mt-5 max-w-2xl text-balance text-base leading-relaxed text-white/70 sm:text-lg">
                    Tim JIPOSNET siap membantu Anda mulai hari ini. Cukup satu chat —
                    kami urus survei, instalasi, hingga internet Anda aktif.
                </p>
            </div>
        </div>

        <!-- Langkah -->
        <div class="rvg mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-3" data-stagger="0.13">
            <?php foreach ($steps as $step): ?>
                <div class="rvi">
                    <div class="glass-dark group h-full rounded-3xl p-6 text-center transition-all duration-400 hover:-translate-y-1.5 hover:border-jipo-cyan/45">
                        <span class="mx-auto flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-jipo-blue/30 to-jipo-cyan/20 ring-1 ring-inset ring-white/15 transition-transform duration-400 group-hover:scale-110">
                            <?= icon($step['icon'], 'h-6 w-6 text-jipo-cyan') ?>
                        </span>
                        <h3 class="font-display mt-4 text-lg font-bold text-white"><?= e($step['title']) ?></h3>
                        <p class="mt-2 text-sm leading-relaxed text-white/65"><?= e($step['desc']) ?></p>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

        <!-- Panel konversi -->
        <div class="rv mx-auto mt-14 max-w-4xl" style="--rv-delay:.2s">
            <div class="glass-dark relative overflow-hidden rounded-[2rem] px-6 py-10 text-center shadow-2xl sm:px-12 sm:py-12">
                <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,212,255,0.12),transparent_60%)]" aria-hidden="true"></div>

                <div class="relative">
                    <div class="font-display text-xl font-bold text-white"><?= e(BRAND_NAME) ?></div>
                    <p class="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm text-white/75 sm:text-base">
                        <?= icon('map-pin', 'h-4.5 w-4.5 shrink-0 text-jipo-cyan') ?>
                        Hargorejo, Rawajitu Selatan,
                        <br class="sm:hidden">
                        Tulang Bawang, Lampung 34591
                    </p>
                    <a href="tel:<?= e(PHONE_TEL) ?>"
                       class="mt-4 inline-flex items-center gap-2 text-lg font-semibold text-white transition-colors hover:text-jipo-cyan sm:text-xl">
                        <?= icon('phone', 'h-5 w-5 text-jipo-cyan') ?>
                        <?= e(PHONE_DISPLAY) ?>
                    </a>

                    <div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <a href="<?= e(wa_url()) ?>" target="_blank" rel="noopener noreferrer"
                           class="btn-glow-green inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#1FAF54] to-[#25D366] px-9 py-4 text-lg font-bold text-white sm:w-auto">
                            <?= icon('message-circle', 'h-6 w-6') ?>
                            Chat WhatsApp
                        </a>
                        <a href="tel:<?= e(PHONE_TEL) ?>"
                           class="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-white/25 bg-white/5 px-8 py-4 text-base font-semibold text-white/90 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-jipo-cyan/60 hover:text-jipo-cyan sm:w-auto">
                            <?= icon('phone', 'h-5 w-5') ?>
                            Telepon Langsung
                        </a>
                    </div>

                    <p class="mt-6 text-xs text-white/45">
                        Respon cepat setiap hari &bull; Survei lokasi gratis untuk warga Hargorejo dan sekitarnya
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>
