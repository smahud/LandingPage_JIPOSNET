<?php
/**
 * JIPOSNET — konfigurasi utama.
 *
 * INI SATU-SATUNYA FILE yang perlu Anda edit untuk mengubah data kontak,
 * alamat, nomor WhatsApp, dan pesan otomatis. Semua bagian halaman membaca
 * data dari sini.
 *
 * Kompatibel PHP 7.4+ (shared hosting / cPanel).
 */

// ── Identitas brand ─────────────────────────────────────────────────────────
const BRAND_NAME    = 'JIPOSNET';
const BRAND_TAGLINE = 'Internet Cepat, Stabil, dan Terjangkau';
const BRAND_OWNER   = 'Widayat';

// ── Alamat kantor & pusat jaringan ──────────────────────────────────────────
const ADDRESS_VILLAGE  = 'Hargorejo';
const ADDRESS_DISTRICT = 'Rawajitu Selatan';
const ADDRESS_REGENCY  = 'Tulang Bawang';
const ADDRESS_PROVINCE = 'Lampung';
const ADDRESS_POSTAL   = '34591';

// ── Kontak ──────────────────────────────────────────────────────────────────
const PHONE_DISPLAY = '+62 812 7457 3558';   // tampil di layar
const PHONE_TEL     = '+6281274573558';      // format href="tel:..."
const WA_NUMBER     = '6281274573558';       // tanpa "+" dan tanpa spasi

// Pesan otomatis saat tombol WhatsApp diklik
const WA_DEFAULT_MESSAGE = 'Halo JIPOSNET, saya ingin bertanya tentang pemasangan internet di daerah Hargorejo.';

/**
 * Opsional: domain produksi lengkap (tanpa garis miring di akhir),
 * contoh: https://jiposnet.id — dipakai untuk pratinjau tautan (og:image).
 * Kosongkan ('') bila belum ada domain.
 */
const SITE_URL = '';

/**
 * Susun URL WhatsApp dengan pesan terisi otomatis.
 */
function wa_url(string $message = ''): string
{
    $msg = $message !== '' ? $message : WA_DEFAULT_MESSAGE;

    return 'https://wa.me/' . WA_NUMBER . '?text=' . rawurlencode($msg);
}

/**
 * Daftar tautan navigasi (navbar, menu seluler, dan footer).
 */
function nav_links(): array
{
    return [
        ['href' => '#beranda',   'label' => 'Beranda'],
        ['href' => '#tentang',   'label' => 'Tentang'],
        ['href' => '#layanan',   'label' => 'Layanan'],
        ['href' => '#keunggulan', 'label' => 'Keunggulan'],
        ['href' => '#coverage',  'label' => 'Coverage'],
        ['href' => '#kontak',    'label' => 'Kontak'],
    ];
}

/**
 * Path aset gambar (berada di assets/img/).
 */
function img(string $file): string
{
    return 'assets/img/' . $file;
}
