import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "JIPOSNET — Internet Cepat, Stabil, dan Terjangkau | Hargorejo, Tulang Bawang",
  description:
    "JIPOSNET adalah penyedia internet lokal terpercaya di Hargorejo, Rawajitu Selatan, Tulang Bawang, Lampung. Solusi internet untuk rumah, usaha, pendidikan, dan kebutuhan digital masyarakat.",
  keywords: [
    "JIPOSNET",
    "internet Hargorejo",
    "internet Tulang Bawang",
    "internet Lampung",
    "ISP lokal",
    "internet desa",
    "wifi Rawajitu Selatan",
    "internet cepat Lampung",
  ],
  authors: [{ name: "Widayat" }],
  openGraph: {
    title: "JIPOSNET — Internet Cepat, Stabil, dan Terjangkau",
    description:
      "Menghubungkan masyarakat Hargorejo dan sekitarnya dengan internet berkualitas, koneksi stabil, dan pelayanan lokal yang dekat dengan pelanggan.",
    siteName: "JIPOSNET",
    type: "website",
    locale: "id_ID",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1F3A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
