<?php
/**
 * Section Keunggulan — panel navy gelap: widget status jaringan "live"
 * (latensi diperbarui oleh JS) + checklist 5 fitur.
 */

$features = [
    ['icon' => 'activity', 'title' => 'Internet Stabil 24 Jam',        'desc' => 'Pantauan jaringan tanpa henti dan penanganan gangguan secara cepat, siang maupun malam.'],
    ['icon' => 'cpu',     'title' => 'Teknologi Jaringan Modern',      'desc' => 'Kombinasi fiber optik dan wireless terkini agar kualitas koneksi tetap optimal di semua cuaca.'],
    ['icon' => 'headset', 'title' => 'Support Lokal Cepat',            'desc' => 'Teknisi dari Hargorejo sendiri — dilaporkan pagi, ditangani hari itu juga tanpa antre panjang.'],
    ['icon' => 'wallet',  'title' => 'Harga Terjangkau',               'desc' => 'Paket beragam yang disesuaikan kemampuan warga, tanpa biaya tersembunyi.'],
    ['icon' => 'map-pin', 'title' => 'Coverage Area Lampung',          'desc' => 'Jangkauan terus meluas dari Hargorejo ke seluruh Rawajitu Selatan, Tulang Bawang, dan sekitarnya.'],
];

$signalBars = [10, 16, 22, 28];
?>
<section id="keunggulan" class="relative overflow-hidden bg-jipo-navy-950 py-24 sm:py-28 lg:py-32">
    <!-- Tekstur latar -->
    <div class="bg-grid-dark absolute inset-0" aria-hidden="true"></div>
    <div class="animate-glow-pulse absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-jipo-blue/15 blur-[130px]" aria-hidden="true"></div>
    <div class="animate-glow-pulse absolute -bottom-24 right-1/5 h-80 w-80 rounded-full bg-jipo-cyan/12 blur-[120px]" style="animation-delay:3s" aria-hidden="true"></div>

    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <!-- Kiri — judul + widget status -->
            <div>
                <?php section_header(
                    'Kenapa JIPOSNET',
                    'Anda Layak Mendapatkan Koneksi Terbaik',
                    'Kami menggabungkan teknologi jaringan modern dengan pelayanan tetangga — cepat saat dipasang, cepat pula saat dibutuhkan bantuan.',
                    true,
                    'left',
                    'max-w-xl'
                ); ?>

                <div class="rv mt-10" style="--rv-delay:.15s">
                    <!-- Widget status jaringan -->
                    <div class="glass-dark relative overflow-hidden rounded-3xl p-6 shadow-2xl sm:p-7">
                        <!-- Kilau scanline -->
                        <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(0,212,255,0.14),transparent_55%)]" aria-hidden="true"></div>

                        <div class="relative flex items-center justify-between">
                            <span class="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Status Jaringan</span>
                            <span class="inline-flex items-center gap-2 rounded-full bg-jipo-green/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-300 ring-1 ring-inset ring-jipo-green/30">
                                <span class="relative flex h-2 w-2">
                                    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                                    <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
                                </span>
                                Live
                            </span>
                        </div>

                        <div class="relative mt-6 flex items-center justify-between gap-4">
                            <div class="flex items-center gap-4">
                                <?= wifi_waves('h-14 w-14') ?>
                                <div>
                                    <div class="font-display text-3xl font-bold text-white">
                                        <span id="latency-value">12</span>
                                        <span class="ml-1 text-base font-medium text-white/55">ms</span>
                                    </div>
                                    <div class="mt-1 text-xs font-medium uppercase tracking-wider text-white/55">Latensi Rata-rata</div>
                                </div>
                            </div>

                            <!-- Bar sinyal -->
                            <div class="flex items-end gap-1.5" aria-hidden="true">
                                <?php foreach ($signalBars as $i => $h): ?>
                                    <span class="w-2 rounded-sm bg-gradient-to-t from-jipo-blue to-jipo-cyan"
                                          style="height:<?= $h ?>px; animation:wifi-arc 2s ease-in-out <?= $i * 0.18 ?>s infinite"></span>
                                <?php endforeach; ?>
                            </div>
                        </div>

                        <!-- Bar metrik -->
                        <div class="relative mt-6 space-y-4">
                            <div>
                                <div class="mb-1.5 flex items-center justify-between text-xs">
                                    <span class="font-medium text-white/70">Kualitas Koneksi</span>
                                    <span class="font-mono font-semibold text-jipo-cyan">99.9%</span>
                                </div>
                                <div class="h-2 overflow-hidden rounded-full bg-white/10">
                                    <div class="h-full w-[99%] rounded-full bg-gradient-to-r from-jipo-blue via-jipo-cyan to-jipo-cyan"></div>
                                </div>
                            </div>
                            <div>
                                <div class="mb-1.5 flex items-center justify-between text-xs">
                                    <span class="font-medium text-white/70">Paket Hilang</span>
                                    <span class="font-mono font-semibold text-jipo-green">0.0%</span>
                                </div>
                                <div class="h-2 overflow-hidden rounded-full bg-white/10">
                                    <div class="h-full w-[2%] rounded-full bg-jipo-green"></div>
                                </div>
                            </div>
                        </div>

                        <p class="relative mt-6 border-t border-white/10 pt-4 text-[11px] leading-relaxed text-white/45">
                            Indikator kualitas jaringan JIPOSNET di area Hargorejo dan sekitarnya.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Kanan — checklist fitur -->
            <div class="rvg space-y-4" data-stagger="0.11">
                <?php foreach ($features as $i => $feature): ?>
                    <div class="rvi">
                        <div class="group glass-dark flex items-start gap-4 rounded-2xl p-5 transition-all duration-400 hover:-translate-y-1 hover:border-jipo-cyan/45 hover:bg-white/[0.07] sm:p-6">
                            <span class="font-display mt-0.5 hidden text-sm font-bold text-jipo-cyan/50 sm:block">0<?= $i + 1 ?></span>
                            <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-jipo-blue/25 to-jipo-cyan/15 ring-1 ring-inset ring-white/10 transition-transform duration-400 group-hover:scale-110">
                                <?= icon($feature['icon'], 'h-5 w-5 text-jipo-cyan') ?>
                            </span>
                            <div>
                                <h3 class="flex items-center gap-2 text-base font-semibold text-white sm:text-lg">
                                    <?= e($feature['title']) ?>
                                    <?= icon('circle-check', 'h-4.5 w-4.5 shrink-0 text-jipo-green') ?>
                                </h3>
                                <p class="mt-1.5 text-sm leading-relaxed text-white/65"><?= e($feature['desc']) ?></p>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</section>
