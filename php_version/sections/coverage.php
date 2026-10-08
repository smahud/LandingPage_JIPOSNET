<?php
/**
 * Section Coverage — peta SVG interaktif (radar, titik koneksi yang bisa
 * di-hover/klik, toggle lapisan) + panel samping. Interaksi ditangani
 * main.js; data titik didefinisikan di bawah.
 */

$vbW = 720;
$vbH = 560;
$tower = ['x' => 360, 'y' => 252];

/** Titik koneksi pada peta — koordinat mengikuti viewBox 720x560. */
$points = [
    ['id' => 'balai',      'name' => 'Balai Desa Hargorejo', 'kind' => 'Fasilitas Umum', 'link' => 'Fiber',    'x' => 262, 'y' => 176],
    ['id' => 'sekolah',    'name' => 'SDN Hargorejo',        'kind' => 'Pendidikan',    'link' => 'Fiber',    'x' => 452, 'y' => 148, 'tipBelow' => true],
    ['id' => 'masjid',     'name' => 'Masjid Baiturrahman',  'kind' => 'Ibadah',        'link' => 'Wireless', 'x' => 548, 'y' => 262],
    ['id' => 'pasar',      'name' => 'Pasar Desa',           'kind' => 'Usaha Warga',   'link' => 'Fiber',    'x' => 208, 'y' => 330],
    ['id' => 'poskesdes',  'name' => 'Poskesdes',            'kind' => 'Kesehatan',     'link' => 'Wireless', 'x' => 318, 'y' => 428],
    ['id' => 'perumahan',  'name' => 'Perumahan Warga',      'kind' => 'Permukiman',    'link' => 'Fiber',    'x' => 508, 'y' => 420],
    ['id' => 'relay',      'name' => 'Menara Relay Sawah',   'kind' => 'Perluasan',     'link' => 'Backbone', 'x' => 574, 'y' => 468],
];

$coverageLevels = [
    ['label' => 'Hargorejo — pusat jaringan',        'value' => 100, 'note' => 'Sinyal Kuat'],
    ['label' => 'Rawajitu Selatan — sekitar desa',   'value' => 70,  'note' => 'Sinyal Baik'],
    ['label' => 'Tulang Bawang — area pemekaran',    'value' => 38,  'note' => 'Sedang Diperluas'],
];
?>
<section id="coverage" class="relative overflow-hidden bg-jipo-mist py-24 sm:py-28 lg:py-32">
    <div class="bg-dots absolute inset-0" aria-hidden="true"></div>

    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <?php section_header(
            'Coverage Area',
            'Jangkauan yang Tumbuh dari Hargorejo',
            'Pusat jaringan kami berada di Hargorejo, Rawajitu Selatan, Tulang Bawang — dan terus meluas ke seluruh penjuru Lampung. Jelajahi peta untuk melihat titik-titik koneksi kami.'
        ); ?>

        <div class="mt-14 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-10">
            <!-- Peta -->
            <div class="rv">
                <div class="relative overflow-hidden rounded-3xl bg-jipo-navy-950 shadow-[0_36px_80px_-32px_rgba(11,31,58,0.65)] ring-1 ring-white/10">
                    <!-- Toolbar -->
                    <div class="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3 sm:px-5">
                        <div class="flex items-center gap-2.5">
                            <?= icon('radar', 'h-4.5 w-4.5 text-jipo-cyan') ?>
                            <span class="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">
                                Peta Jaringan — Hargorejo
                            </span>
                        </div>
                        <div class="flex items-center gap-2">
                            <button type="button" id="toggle-coverage" aria-pressed="true"
                                    class="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all duration-300 bg-jipo-cyan/15 text-jipo-cyan ring-1 ring-inset ring-jipo-cyan/40">
                                <?= icon('eye', 'h-3.5 w-3.5') ?>
                                Jangkauan
                            </button>
                            <button type="button" id="toggle-points" aria-pressed="true"
                                    class="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all duration-300 bg-jipo-blue/20 text-jipo-cyan ring-1 ring-inset ring-jipo-blue/50">
                                <?= icon('eye', 'h-3.5 w-3.5') ?>
                                Titik Koneksi
                            </button>
                        </div>
                    </div>

                    <!-- Kanvas peta -->
                    <div class="relative">
                        <svg viewBox="0 0 <?= $vbW ?> <?= $vbH ?>" class="block h-auto w-full" role="img"
                             aria-label="Peta digital jangkauan jaringan JIPOSNET di sekitar Hargorejo dengan titik-titik koneksi">
                            <defs>
                                <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,212,255,0.07)" stroke-width="1"/>
                                </pattern>
                                <radialGradient id="coverage-grad" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stop-color="#0066FF" stop-opacity="0.28"/>
                                    <stop offset="55%" stop-color="#0066FF" stop-opacity="0.12"/>
                                    <stop offset="100%" stop-color="#00D4FF" stop-opacity="0.02"/>
                                </radialGradient>
                                <linearGradient id="sweep-grad" x1="360" y1="252" x2="507" y2="166" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stop-color="#00D4FF" stop-opacity="0.3"/>
                                    <stop offset="100%" stop-color="#00D4FF" stop-opacity="0"/>
                                </linearGradient>
                            </defs>

                            <!-- Dasar peta -->
                            <rect width="<?= $vbW ?>" height="<?= $vbH ?>" fill="#081527"/>
                            <rect width="<?= $vbW ?>" height="<?= $vbH ?>" fill="url(#map-grid)"/>

                            <!-- Sungai -->
                            <path d="M-20 470 C 120 430, 150 520, 300 500 S 560 540, 740 480"
                                  fill="none" stroke="rgba(0,212,255,0.10)" stroke-width="26" stroke-linecap="round"/>
                            <path d="M-20 470 C 120 430, 150 520, 300 500 S 560 540, 740 480"
                                  fill="none" stroke="rgba(0,212,255,0.16)" stroke-width="8" stroke-linecap="round"/>

                            <!-- Jalan -->
                            <g stroke="rgba(255,255,255,0.09)" fill="none" stroke-linecap="round">
                                <path d="M60 60 C 200 120, 260 90, 340 150 S 520 120, 680 70" stroke-width="7"/>
                                <path d="M40 380 C 160 360, 240 300, 380 300 S 600 340, 700 300" stroke-width="9"/>
                                <path d="M250 540 C 260 430, 300 380, 330 260 S 380 100, 420 30" stroke-width="6"/>
                                <path d="M540 540 C 530 470, 520 380, 545 270" stroke-width="6"/>
                            </g>

                            <!-- Zona jangkauan (toggle: Jangkauan) -->
                            <g id="map-coverage">
                                <circle cx="<?= $tower['x'] ?>" cy="<?= $tower['y'] ?>" r="175" fill="url(#coverage-grad)"/>
                                <?php foreach ([60, 115, 170] as $r): ?>
                                    <circle cx="<?= $tower['x'] ?>" cy="<?= $tower['y'] ?>" r="<?= $r ?>"
                                            fill="none" stroke="rgba(0,212,255,0.28)" stroke-width="1.4" stroke-dasharray="5 7"/>
                                <?php endforeach; ?>
                                <!-- Cincin denyut -->
                                <circle class="animate-pulse-ring" cx="<?= $tower['x'] ?>" cy="<?= $tower['y'] ?>" r="120"
                                        fill="none" stroke="rgba(0,212,255,0.5)" stroke-width="1.6"/>
                                <circle class="animate-pulse-ring" style="animation-delay:1.6s" cx="<?= $tower['x'] ?>" cy="<?= $tower['y'] ?>" r="120"
                                        fill="none" stroke="rgba(0,102,255,0.45)" stroke-width="1.6"/>
                            </g>

                            <!-- Sapuan radar -->
                            <g class="animate-spin-slow" style="transform-box:view-box; transform-origin:<?= $tower['x'] ?>px <?= $tower['y'] ?>px">
                                <path d="M <?= $tower['x'] ?> <?= $tower['y'] ?> L <?= $tower['x'] ?> <?= $tower['y'] - 175 ?> A 175 175 0 0 1 <?= $tower['x'] + 151.6 ?> <?= $tower['y'] - 87.5 ?> Z" fill="url(#sweep-grad)"/>
                            </g>

                            <!-- Kabel data menara → titik (toggle: Titik Koneksi) -->
                            <g id="map-lines">
                                <?php foreach ($points as $p): ?>
                                    <line data-line="<?= e($p['id']) ?>"
                                          x1="<?= $tower['x'] ?>" y1="<?= $tower['y'] ?>" x2="<?= $p['x'] ?>" y2="<?= $p['y'] ?>"
                                          stroke="rgba(0,190,255,0.3)" stroke-width="1.3" stroke-dasharray="7 9" class="animate-dash-flow"/>
                                <?php endforeach; ?>
                            </g>

                            <!-- Titik koneksi (toggle: Titik Koneksi) -->
                            <g id="map-points">
                                <?php foreach ($points as $p): ?>
                                    <g data-point="<?= e($p['id']) ?>" class="cursor-pointer" role="button"
                                       aria-label="Titik koneksi: <?= e($p['name']) ?>"
                                       tabindex="0">
                                        <circle cx="<?= $p['x'] ?>" cy="<?= $p['y'] ?>" r="18" fill="transparent"/>
                                        <circle class="animate-pulse-ring" cx="<?= $p['x'] ?>" cy="<?= $p['y'] ?>" r="13"
                                                fill="none" stroke="rgba(0,212,255,0.45)" stroke-width="1.4"/>
                                        <circle data-dot="<?= e($p['id']) ?>" cx="<?= $p['x'] ?>" cy="<?= $p['y'] ?>" r="5.5"
                                                fill="#FFFFFF" stroke="#0066FF" stroke-width="2"
                                                style="transition:r .25s ease, fill .25s ease"/>
                                        <text x="<?= $p['x'] ?>" y="<?= $p['y'] - 15 ?>" text-anchor="middle"
                                              font-size="12.5" font-weight="600" fill="rgba(255,255,255,0.72)"
                                              stroke="#081527" stroke-width="3.5"
                                              style="paint-order:stroke; pointer-events:none"><?= e($p['name']) ?></text>
                                    </g>
                                <?php endforeach; ?>
                            </g>

                            <!-- Penanda menara -->
                            <g style="pointer-events:none">
                                <circle cx="<?= $tower['x'] ?>" cy="<?= $tower['y'] ?>" r="24" fill="rgba(0,102,255,0.22)"/>
                                <circle cx="<?= $tower['x'] ?>" cy="<?= $tower['y'] ?>" r="15" fill="#0066FF" stroke="#00D4FF" stroke-width="2.5"/>
                                <path d="M <?= $tower['x'] - 5 ?> <?= $tower['y'] + 5.5 ?> L <?= $tower['x'] + 5 ?> <?= $tower['y'] + 5.5 ?> M <?= $tower['x'] - 3.4 ?> <?= $tower['y'] + 1.5 ?> L <?= $tower['x'] + 3.4 ?> <?= $tower['y'] + 1.5 ?> M <?= $tower['x'] - 1.8 ?> <?= $tower['y'] - 2.5 ?> L <?= $tower['x'] + 1.8 ?> <?= $tower['y'] - 2.5 ?> M <?= $tower['x'] ?> <?= $tower['y'] - 7 ?> L <?= $tower['x'] ?> <?= $tower['y'] + 5.5 ?>"
                                      stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
                                <text x="<?= $tower['x'] ?>" y="<?= $tower['y'] + 42 ?>" text-anchor="middle"
                                      font-size="13" font-weight="700" fill="#FFFFFF" stroke="#081527" stroke-width="4"
                                      style="paint-order:stroke">Menara Hargorejo</text>
                            </g>

                            <!-- Kompas -->
                            <g opacity="0.8" style="pointer-events:none" transform="translate(668 52)">
                                <circle r="17" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.22)"/>
                                <path d="M0 -11 L4 4 L0 1 L-4 4 Z" fill="#00D4FF"/>
                                <text y="-22" text-anchor="middle" font-size="10" font-weight="700" fill="rgba(255,255,255,0.75)">U</text>
                            </g>

                            <!-- Skala -->
                            <g transform="translate(28 530)" style="pointer-events:none">
                                <rect x="-8" y="-14" width="112" height="26" rx="7" fill="rgba(8,21,39,0.75)" stroke="rgba(255,255,255,0.14)"/>
                                <path d="M4 6 L4 12 M4 9 L60 9 M60 6 L60 12" stroke="rgba(255,255,255,0.75)" stroke-width="1.4"/>
                                <text x="68" y="12.5" font-size="10.5" fill="rgba(255,255,255,0.8)" font-weight="600">&plusmn; 1 km</text>
                            </g>
                        </svg>

                        <!-- Tooltip HTML untuk titik aktif -->
                        <div id="map-tooltip" class="pointer-events-none absolute z-10 hidden w-max max-w-[240px] -translate-x-1/2 rounded-xl bg-jipo-navy-800/95 px-4 py-3 shadow-2xl ring-1 ring-jipo-cyan/40 backdrop-blur-sm">
                            <div class="flex items-center gap-2">
                                <span class="relative flex h-2 w-2">
                                    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-jipo-green opacity-75"></span>
                                    <span class="relative inline-flex h-2 w-2 rounded-full bg-jipo-green"></span>
                                </span>
                                <span class="text-sm font-semibold text-white" id="tooltip-name"></span>
                            </div>
                            <div class="mt-1.5 flex items-center gap-2 text-[11px] text-white/65">
                                <span class="rounded-md bg-white/10 px-1.5 py-0.5 font-medium" id="tooltip-kind"></span>
                                <span class="inline-flex items-center gap-1">
                                    <?= icon('signal-high', 'h-3 w-3 text-jipo-cyan') ?>
                                    <span id="tooltip-link"></span> — Terhubung
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Legenda -->
                    <div class="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 bg-white/[0.03] px-4 py-3 text-[11px] font-medium text-white/60 sm:px-5">
                        <span class="inline-flex items-center gap-2">
                            <span class="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-jipo-blue ring-2 ring-jipo-cyan/60">
                                <span class="h-1 w-1 rounded-full bg-white"></span>
                            </span>
                            Menara Utama
                        </span>
                        <span class="inline-flex items-center gap-2">
                            <span class="h-3.5 w-3.5 rounded-full bg-white ring-2 ring-jipo-blue"></span>
                            Titik Koneksi
                        </span>
                        <span class="inline-flex items-center gap-2">
                            <span class="h-3.5 w-3.5 rounded-full bg-jipo-blue/25 ring-1 ring-jipo-cyan/40"></span>
                            Jangkauan Sinyal
                        </span>
                        <span class="ml-auto hidden text-white/35 sm:block">Arahkan kursor ke titik untuk detail</span>
                    </div>
                </div>
            </div>

            <!-- Panel samping -->
            <div class="flex flex-col gap-6">
                <div class="rv" style="--rv-delay:.1s">
                    <div class="rounded-3xl bg-white p-6 shadow-[0_18px_50px_-24px_rgba(11,31,58,0.35)] ring-1 ring-jipo-navy/8 sm:p-7">
                        <div class="flex items-start gap-4">
                            <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-jipo-blue/10 ring-1 ring-inset ring-jipo-blue/20">
                                <?= icon('map-pin', 'h-6 w-6 text-jipo-blue') ?>
                            </span>
                            <div>
                                <h3 class="font-display text-lg font-bold text-jipo-navy">Kantor &amp; Pusat Jaringan</h3>
                                <p class="mt-2 text-sm leading-relaxed text-jipo-slate">
                                    Hargorejo, Rawajitu Selatan,<br>
                                    Tulang Bawang, Lampung 34591
                                </p>
                                <a href="tel:<?= e(PHONE_TEL) ?>"
                                   class="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-jipo-blue transition-colors hover:text-jipo-blue-600">
                                    <?= icon('phone', 'h-4 w-4') ?>
                                    <?= e(PHONE_DISPLAY) ?>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="rv" style="--rv-delay:.18s">
                    <div class="relative h-44 overflow-hidden rounded-3xl shadow-lg ring-1 ring-jipo-navy/10 sm:h-48">
                        <img src="<?= img('telecom-tower.jpg') ?>"
                             alt="Menara telekomunikasi JIPOSNET dengan latar bukit dan langit"
                             class="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async">
                        <div class="absolute inset-0 bg-gradient-to-t from-jipo-navy/85 via-jipo-navy/25 to-transparent"></div>
                        <div class="absolute bottom-4 left-5 flex items-center gap-2.5">
                            <?= icon('radio-tower', 'h-5 w-5 text-jipo-cyan') ?>
                            <span class="text-sm font-semibold text-white">Menara jaringan utama — Hargorejo</span>
                        </div>
                    </div>
                </div>

                <div class="rv" style="--rv-delay:.26s">
                    <div class="rounded-3xl bg-jipo-navy p-6 shadow-xl sm:p-7">
                        <h3 class="font-display text-lg font-bold text-white">Status Perluasan Jangkauan</h3>
                        <div class="mt-5 space-y-5">
                            <?php foreach ($coverageLevels as $level): ?>
                                <div>
                                    <div class="mb-2 flex items-center justify-between text-xs">
                                        <span class="font-medium text-white/80"><?= e($level['label']) ?></span>
                                        <span class="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide <?= $level['value'] === 100
                                            ? 'bg-jipo-green/20 text-emerald-300'
                                            : ($level['value'] >= 60 ? 'bg-jipo-cyan/15 text-jipo-cyan' : 'bg-white/10 text-white/60') ?>">
                                            <?= e($level['note']) ?>
                                        </span>
                                    </div>
                                    <div class="h-2 overflow-hidden rounded-full bg-white/10">
                                        <div class="h-full rounded-full <?= $level['value'] === 100
                                            ? 'bg-gradient-to-r from-jipo-green to-emerald-300'
                                            : ($level['value'] >= 60 ? 'bg-gradient-to-r from-jipo-blue to-jipo-cyan' : 'bg-gradient-to-r from-jipo-blue/70 to-jipo-cyan/50') ?>"
                                             style="width:<?= $level['value'] ?>%"></div>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                        <a href="<?= e(wa_url('Halo JIPOSNET, apakah jaringan sudah tersedia di lokasi saya?')) ?>"
                           target="_blank" rel="noopener noreferrer"
                           class="btn-glow mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-jipo-blue to-jipo-blue-600 px-5 py-3 text-sm font-semibold text-white">
                            <?= icon('map-pin', 'h-4 w-4') ?>
                            Cek Ketersediaan di Lokasi Anda
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
