<?php
/**
 * JIPOSNET — helper bersama.
 * Memuat konfigurasi, peta ikon, dan menyediakan fungsi kecil yang dipakai
 * semua template.
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/icons.php';

/**
 * Escape teks untuk output HTML (keamanan dasar).
 */
function e($value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
}

/**
 * Tahun berjalan untuk copyright footer.
 */
function current_year(): string
{
    return date('Y');
}

/**
 * Tampilkan blok section-header (eyebrow + judul + deskripsi) — padanan
 * komponen SectionHeader di versi Next.js.
 *
 * @param string $eyebrow    Label kecil di atas judul.
 * @param string $title      Judul section.
 * @param string $description Paragraf pendukung (opsional).
 * @param bool   $dark       True untuk section berlatar navy.
 * @param string $align      'center' | 'left'.
 * @param string $className  Kelas tambahan untuk wrapper.
 */
function section_header(
    string $eyebrow,
    string $title,
    string $description = '',
    bool $dark = false,
    string $align = 'center',
    string $className = ''
): void {
    $isCenter = $align === 'center';
    ?>
    <div class="rv max-w-3xl <?= $isCenter ? 'mx-auto text-center' : 'text-left' ?> <?= $className ?>">
        <span class="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] <?= $dark
            ? 'bg-jipo-cyan/10 text-jipo-cyan ring-1 ring-inset ring-jipo-cyan/25'
            : 'bg-jipo-blue/8 text-jipo-blue ring-1 ring-inset ring-jipo-blue/20' ?>">
            <span class="h-1.5 w-1.5 rounded-full <?= $dark ? 'bg-jipo-cyan' : 'bg-jipo-blue' ?>"></span>
            <?= e($eyebrow) ?>
        </span>

        <h2 class="font-display mt-5 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] <?= $dark ? 'text-white' : 'text-jipo-navy' ?>">
            <?= e($title) ?>
        </h2>

        <?php if ($description !== ''): ?>
            <p class="mt-5 text-base leading-relaxed sm:text-lg <?= $dark ? 'text-white/70' : 'text-jipo-slate' ?> <?= $isCenter ? 'mx-auto max-w-2xl' : 'max-w-2xl' ?>">
                <?= e($description) ?>
            </p>
        <?php endif; ?>
    </div>
    <?php
}

/**
 * Logo JIPOSNET — badge WiFi SVG + wordmark. Padanan komponen JipoLogo.
 *
 * @param string $variant 'dark' (wordmark navy, untuk latar terang) | 'light' (wordmark putih).
 */
function jipo_logo(string $variant = 'dark'): void
{
    ?>
    <span class="inline-flex items-center gap-2.5">
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-9 w-9 shrink-0" aria-hidden="true">
            <defs>
                <linearGradient id="jipo-badge" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#0B1F3A"></stop>
                    <stop offset="0.55" stop-color="#0A2E66"></stop>
                    <stop offset="1" stop-color="#0066FF"></stop>
                </linearGradient>
                <linearGradient id="jipo-wave" x1="14" y1="26" x2="36" y2="8" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#00D4FF"></stop>
                    <stop offset="1" stop-color="#7FDFFF"></stop>
                </linearGradient>
            </defs>
            <rect x="2" y="2" width="44" height="44" rx="13" fill="url(#jipo-badge)"></rect>
            <rect x="2.9" y="2.9" width="42.2" height="42.2" rx="12.2" stroke="rgba(255,255,255,0.18)" stroke-width="1"></rect>
            <path d="M16.2 24.6a11.5 11.5 0 0 1 15.6 0" stroke="url(#jipo-wave)" stroke-width="2.8" stroke-linecap="round"></path>
            <path d="M20.3 29.1a5.8 5.8 0 0 1 7.4 0" stroke="url(#jipo-wave)" stroke-width="2.8" stroke-linecap="round"></path>
            <circle cx="24" cy="34.4" r="3.1" fill="#00D4FF"></circle>
            <circle cx="24" cy="34.4" r="5.4" stroke="rgba(0,212,255,0.4)" stroke-width="1.2"></circle>
        </svg>
        <span class="flex flex-col leading-none">
            <span class="font-display text-xl font-bold tracking-tight <?= $variant === 'dark' ? 'logo-word' : 'text-white' ?>">JIPOS<span class="text-jipo-blue">NET</span></span>
            <span class="mt-1 text-[10px] font-medium uppercase tracking-[0.22em] <?= $variant === 'dark' ? 'logo-sub' : 'text-white/60' ?>">
                Hargorejo &bull; Lampung
            </span>
        </span>
    </span>
    <?php
}

/**
 * Gelombang WiFi animasi (arc berurutan + cincin mengembang) — padanan
 * komponen WifiWaves. Animasi murni CSS (kelas ada di app.css).
 */
function wifi_waves(string $class = ''): void
{
    ?>
    <span class="relative inline-flex items-center justify-center <?= $class ?>">
        <span class="animate-wifi-wave absolute inset-[-14px] rounded-full border border-jipo-cyan/50"></span>
        <span class="animate-wifi-wave absolute inset-[-14px] rounded-full border border-jipo-cyan/35" style="animation-delay:1.3s"></span>
        <svg viewBox="0 0 24 24" fill="none" class="relative h-full w-full text-jipo-cyan" aria-hidden="true">
            <path d="M4.5 9.5a11 11 0 0 1 15 0" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" class="animate-wifi-arc"/>
            <path d="M7.6 13a6.6 6.6 0 0 1 8.8 0" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" class="animate-wifi-arc" style="animation-delay:0.22s"/>
            <path d="M10.6 16.4a2.3 2.3 0 0 1 2.8 0" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" class="animate-wifi-arc" style="animation-delay:0.44s"/>
            <circle cx="12" cy="19.6" r="1.5" fill="currentColor"/>
        </svg>
    </span>
    <?php
}
