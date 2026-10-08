<?php
/**
 * Section Tentang Kami — copy misi + kolase foto + kartu sinyal melayang.
 */

$values = [
    ['icon' => 'signal',     'label' => 'Koneksi Stabil'],
    ['icon' => 'hand-heart', 'label' => 'Pelayanan Dekat'],
    ['icon' => 'sprout',     'label' => 'Tumbuh Bersama Desa'],
];
?>
<section id="tentang" class="relative overflow-hidden bg-jipo-mist py-24 sm:py-28 lg:py-32">
    <div class="bg-dots absolute inset-0" aria-hidden="true"></div>

    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <!-- ── Copy ─────────────────────────────────────────────── -->
            <div>
                <?php section_header(
                    'Tentang Kami',
                    'ISP Lokal yang Tumbuh dari Desa, untuk Desa',
                    '',
                    false,
                    'left',
                    'max-w-xl'
                ); ?>

                <div class="rv mt-6 space-y-5 text-base leading-relaxed text-jipo-slate sm:text-lg" style="--rv-delay:.12s">
                    <p>
                        <span class="font-semibold text-jipo-navy">JIPOSNET</span>
                        hadir untuk memberikan layanan internet berkualitas dengan
                        koneksi stabil dan pelayanan dekat dengan pelanggan. Kami
                        membangun jaringan dari Hargorejo — bukan dari kota besar —
                        karena kami percaya setiap warga desa berhak menikmati
                        internet yang sama baiknya dengan di perkotaan.
                    </p>
                    <p>
                        Berbasis di Hargorejo, Rawajitu Selatan, Kabupaten Tulang
                        Bawang, kami memahami kondisi lapangan, kebutuhan warga, dan
                        karakter daerah. Itulah mengapa setiap pelanggan kami bukan
                        sekadar nomor akun — mereka tetangga kami sendiri. Laporan
                        gangguan ditangani langsung oleh tim lokal yang siap datang
                        ke lokasi.
                    </p>
                    <p>
                        Dari belajar daring untuk anak-anak, transaksi digital untuk
                        warung dan usaha kecil, hingga tetap terhubung dengan keluarga
                        di perantauan — JIPOSNET berkomitmen menjadi gerbang digital
                        yang andal bagi masyarakat Lampung.
                    </p>
                </div>

                <div class="rvg mt-8 flex flex-wrap gap-3" data-stagger="0.12">
                    <?php foreach ($values as $v): ?>
                        <div class="rvi">
                            <span class="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-jipo-navy shadow-sm ring-1 ring-inset ring-jipo-navy/8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:ring-jipo-blue/30">
                                <?= icon($v['icon'], 'h-4 w-4 text-jipo-blue') ?>
                                <?= e($v['label']) ?>
                            </span>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <!-- ── Kolase foto ──────────────────────────────────────── -->
            <div class="rv relative mx-auto w-full max-w-xl lg:max-w-none" style="--rv-delay:.15s">
                <div class="relative">
                    <!-- Foto utama — pendidikan komunitas -->
                    <div class="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_32px_64px_-28px_rgba(11,31,58,0.45)] ring-1 ring-jipo-navy/10">
                        <img src="<?= img('education.jpg') ?>"
                             alt="Anak-anak desa belajar dengan laptop berkat internet dari JIPOSNET"
                             class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" decoding="async">
                        <div class="absolute inset-0 bg-gradient-to-t from-jipo-navy/35 via-transparent to-transparent"></div>
                    </div>

                    <!-- Foto sekunder menumpuk — rumah desa -->
                    <div class="absolute -bottom-10 -left-4 hidden w-48 rotate-[-4deg] overflow-hidden rounded-2xl border-4 border-white shadow-xl sm:block md:w-56 lg:-left-10">
                        <div class="relative aspect-[4/3]">
                            <img src="<?= img('village-house.jpeg') ?>"
                                 alt="Rumah panggung khas desa di tengah persawahan Hargorejo"
                                 class="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async">
                        </div>
                    </div>

                    <!-- Kartu sinyal melayang -->
                    <div class="animate-float-y glass-dark absolute -right-3 -top-8 flex items-center gap-3.5 rounded-2xl px-5 py-4 shadow-2xl sm:-right-6">
                        <?= wifi_waves('h-11 w-11') ?>
                        <span class="flex flex-col text-left">
                            <span class="text-sm font-semibold text-white">Sinyal Kuat</span>
                            <span class="mt-0.5 inline-flex items-center gap-1 text-xs text-white/65">
                                <?= icon('map-pinned', 'h-3 w-3 text-jipo-cyan') ?>
                                Hargorejo &amp; sekitarnya
                            </span>
                        </span>
                    </div>

                    <!-- Aksen sudut -->
                    <div class="absolute -bottom-6 -right-6 -z-10 h-40 w-40 rounded-3xl bg-gradient-to-br from-jipo-blue/15 to-jipo-cyan/10" aria-hidden="true"></div>
                </div>
            </div>
        </div>
    </div>
</section>
