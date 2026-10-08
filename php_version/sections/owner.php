<?php
/**
 * Section Pemilik — potret Widayat, kutipan, dan narasi profil.
 */
?>
<section class="relative overflow-hidden bg-jipo-mist py-24 sm:py-28 lg:py-32">
    <div class="bg-dots absolute inset-0" aria-hidden="true"></div>
    <!-- Cahaya lembut brand -->
    <div class="animate-glow-pulse absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-jipo-blue/10 blur-[110px]" aria-hidden="true"></div>

    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <!-- ── Potret ───────────────────────────────────────────── -->
            <div class="rv relative mx-auto w-full max-w-sm lg:max-w-none">
                <div class="relative">
                    <!-- Bingkai offset -->
                    <div class="absolute -inset-3 rounded-[2rem] border-2 border-dashed border-jipo-blue/25" aria-hidden="true"></div>
                    <div class="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] shadow-[0_36px_72px_-28px_rgba(11,31,58,0.55)] ring-1 ring-jipo-navy/10">
                        <img src="<?= img('owner-widayat.png') ?>"
                             alt="Widayat, pemilik JIPOSNET, berdiri di area desa Hargorejo"
                             class="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async">
                        <div class="absolute inset-0 bg-gradient-to-t from-jipo-navy/55 via-transparent to-transparent"></div>
                    </div>

                    <!-- Badge nama -->
                    <div class="glass-light absolute -bottom-6 left-1/2 flex w-[86%] -translate-x-1/2 items-center gap-3.5 rounded-2xl px-5 py-4 shadow-xl">
                        <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-jipo-blue to-jipo-cyan/70 text-white">
                            <?= icon('badge-check', 'h-6 w-6') ?>
                        </span>
                        <span class="flex flex-col">
                            <span class="font-display text-base font-bold text-jipo-navy"><?= e(BRAND_OWNER) ?></span>
                            <span class="text-xs font-medium text-jipo-slate">Pemilik &amp; Pendiri <?= e(BRAND_NAME) ?></span>
                        </span>
                    </div>
                </div>
            </div>

            <!-- ── Profil & kutipan ─────────────────────────────────── -->
            <div class="pt-6 lg:pt-0">
                <div class="rv">
                    <span class="inline-flex items-center gap-2 rounded-full bg-jipo-blue/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-jipo-blue ring-1 ring-inset ring-jipo-blue/20">
                        <span class="h-1.5 w-1.5 rounded-full bg-jipo-blue"></span>
                        Dari Pemilik Kami
                    </span>
                </div>

                <div class="rv" style="--rv-delay:.1s">
                    <figure class="relative mt-7">
                        <?= icon('quote', 'absolute -left-2 -top-4 h-14 w-14 text-jipo-blue/15 sm:-left-6') ?>
                        <blockquote class="font-display relative text-balance text-2xl font-semibold leading-snug text-jipo-navy sm:text-[2rem] sm:leading-[1.3]">
                            &ldquo;Menghubungkan masyarakat dengan teknologi agar setiap
                            orang memiliki kesempatan berkembang di era digital.&rdquo;
                        </blockquote>
                    </figure>
                </div>

                <div class="rv mt-7 space-y-4 text-base leading-relaxed text-jipo-slate" style="--rv-delay:.2s">
                    <p>
                        Widayat membangun JIPOSNET dari sebuah keyakinan sederhana:
                        jarak tidak boleh menjadi alasan warga desa tertinggal. Berawal
                        dari membantu tetangga mendapat sinyal internet yang layak,
                        kini jaringan itu tumbuh menjadi layanan yang dipercaya
                        keluarga, warung, sekolah, dan lembaga di Hargorejo dan
                        sekitarnya.
                    </p>
                    <p>
                        Baginya, JIPOSNET bukan sekadar bisnis penyedia internet —
                        ini gerbang menuju peluang: anak-anak yang bisa belajar lebih
                        luas, usaha kecil yang naik kelas, dan desa yang lebih
                        terhubung dengan dunia.
                    </p>
                </div>

                <div class="rv mt-8 flex flex-wrap items-center gap-4" style="--rv-delay:.3s">
                    <div class="flex flex-col">
                        <span class="font-display text-2xl font-bold text-jipo-navy"><?= e(BRAND_OWNER) ?></span>
                        <span class="mt-1 inline-flex items-center gap-2 text-sm text-jipo-slate">
                            <span class="h-px w-8 bg-jipo-blue/50" aria-hidden="true"></span>
                            Hargorejo, Tulang Bawang
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
