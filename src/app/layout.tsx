import type { Metadata } from "next";
import { Fraunces, Karla } from "next/font/google";
import { siteConfig } from "@/config/site.config";
import "./globals.css";

/**
 * Fonts via next/font: worden bij de build self-hosted, dus geen runtime-request
 * naar de Google Fonts CDN op de live site (AVG). Fraunces in de variabele snit met
 * de SOFT/WONK-assen uit het brandbook; Karla voor lopende tekst.
 */
const display = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
  variable: "--font-display",
});

const body = Karla({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.naam,
    template: `%s — ${siteConfig.naam}`,
  },
  description: siteConfig.omschrijving,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
