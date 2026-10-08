<?php
/**
 * JIPOSNET — footer, skrip, dan penutup dokumen.
 * Dipanggil oleh index.php setelah semua section.
 */
?>
    </main>

    <!-- ── Footer ─────────────────────────────────────────────────────── -->
    <footer class="relative mt-auto border-t border-white/8 bg-jipo-navy-950">
        <!-- Garis aksen atas -->
        <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-jipo-cyan/50 to-transparent" aria-hidden="true"></div>

        <div class="mx-auto max-w-7xl px-4 pb-12 pt-14 sm:px-6 lg:px-8">
            <div class="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
                <!-- Brand -->
                <div>
                    <?= jipo_logo('light') ?>
                    <p class="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
                        Gerbang digital masyarakat <?= e(ADDRESS_VILLAGE) ?> — internet cepat, stabil,
                        dan terjangkau untuk rumah, usaha, dan masa depan desa.
                    </p>
                    <div class="mt-6 flex items-center gap-3">
                        <a href="#beranda" aria-label="Facebook JIPOSNET (segera)" title="@jiposnet — segera hadir"
                           class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/60 ring-1 ring-inset ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-jipo-blue/20 hover:text-jipo-cyan hover:ring-jipo-cyan/40">
                            <?= icon('facebook', 'h-4.5 w-4.5') ?>
                        </a>
                        <a href="#beranda" aria-label="Instagram JIPOSNET (segera)" title="@jiposnet.id — segera hadir"
                           class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/60 ring-1 ring-inset ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-jipo-blue/20 hover:text-jipo-cyan hover:ring-jipo-cyan/40">
                            <?= icon('instagram', 'h-4.5 w-4.5') ?>
                        </a>
                        <a href="#beranda" aria-label="YouTube JIPOSNET (segera)" title="JIPOSNET Official — segera hadir"
                           class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/60 ring-1 ring-inset ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-jipo-blue/20 hover:text-jipo-cyan hover:ring-jipo-cyan/40">
                            <?= icon('youtube', 'h-4.5 w-4.5') ?>
                        </a>
                    </div>
                </div>

                <!-- Navigasi -->
                <nav aria-label="Navigasi footer">
                    <h3 class="text-xs font-bold uppercase tracking-[0.18em] text-white/45">Jelajahi</h3>
                    <ul class="mt-5 space-y-3">
                        <?php foreach (nav_links() as $link): ?>
                            <li>
                                <a href="<?= e($link['href']) ?>" class="text-sm text-white/65 transition-colors hover:text-jipo-cyan">
                                    <?= e($link['label']) ?>
                                </a>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </nav>

                <!-- Kontak -->
                <div>
                    <h3 class="text-xs font-bold uppercase tracking-[0.18em] text-white/45">Hubungi Kami</h3>
                    <ul class="mt-5 space-y-4 text-sm text-white/65">
                        <li class="flex items-start gap-3">
                            <?= icon('map-pin', 'mt-0.5 h-4.5 w-4.5 shrink-0 text-jipo-cyan') ?>
                            <span>
                                <?= e(ADDRESS_VILLAGE) ?>, <?= e(ADDRESS_DISTRICT) ?>,<br>
                                <?= e(ADDRESS_REGENCY) ?>, <?= e(ADDRESS_PROVINCE) ?> <?= e(ADDRESS_POSTAL) ?>
                            </span>
                        </li>
                        <li>
                            <a href="tel:<?= e(PHONE_TEL) ?>" class="flex items-center gap-3 transition-colors hover:text-jipo-cyan">
                                <?= icon('phone', 'h-4.5 w-4.5 shrink-0 text-jipo-cyan') ?>
                                <?= e(PHONE_DISPLAY) ?>
                            </a>
                        </li>
                        <li>
                            <a href="<?= e(wa_url()) ?>" target="_blank" rel="noopener noreferrer"
                               class="font-semibold text-jipo-cyan transition-colors hover:text-white">
                                Chat WhatsApp &rarr;
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Baris bawah -->
            <div class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-7 sm:flex-row">
                <p class="text-xs text-white/45">
                    &copy; <?= current_year() ?> <?= e(BRAND_NAME) ?>. Seluruh hak cipta dilindungi.
                </p>
                <p class="inline-flex items-center gap-2 text-xs text-white/45">
                    <span class="relative flex h-2 w-2">
                        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-jipo-green opacity-75"></span>
                        <span class="relative inline-flex h-2 w-2 rounded-full bg-jipo-green"></span>
                    </span>
                    Jaringan aktif — melayani <?= e(ADDRESS_VILLAGE) ?> &amp; sekitarnya
                </p>
            </div>
        </div>
    </footer>
</div><!-- /.min-h-screen -->

<script src="assets/js/main.js" defer></script>
</body>
</html>
