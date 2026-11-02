import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Aref_Ruqaa,
  Caveat,
  Fraunces,
  IBM_Plex_Sans_Arabic,
  Instrument_Sans,
  Instrument_Serif,
  JetBrains_Mono,
  Lalezar,
} from "next/font/google";
import { getDict, hasLocale, locales } from "../i18n";
import "../globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});
const sans = Instrument_Sans({ variable: "--font-body", subsets: ["latin"] });
const hand = Caveat({ variable: "--font-hand", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-code", subsets: ["latin"] });
// The GALILEO wordmark is set in Instrument Serif Italic (see components/Brand.tsx).
const brand = Instrument_Serif({ variable: "--font-brand", subsets: ["latin"], weight: "400", style: "italic" });

// Arabic faces only download when Arabic glyphs are on screen (unicode-range), so no preload.
const arDisplay = Lalezar({ variable: "--font-ar-display", subsets: ["arabic"], weight: "400", preload: false });
const arBody = IBM_Plex_Sans_Arabic({
  variable: "--font-ar-body",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  preload: false,
});
const arHand = Aref_Ruqaa({ variable: "--font-ar-hand", subsets: ["arabic"], weight: ["400", "700"], preload: false });

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDict(lang);
  return {
    // Set NEXT_PUBLIC_SITE_URL to the live domain so share images get absolute URLs.
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    title: t.meta.title,
    description: t.meta.description,
    alternates: { languages: { en: "/en", ar: "/ar" } },
    icons: {
      icon: [{ url: "/assets/logo/galileo-avatar-orange.svg", type: "image/svg+xml" }],
      apple: "/assets/logo/galileo-avatar-orange.png",
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      images: [{ url: "/assets/logo/galileo-logo-on-light.png", width: 3184, height: 1474 }],
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const fonts = [display, sans, hand, mono, brand, arDisplay, arBody, arHand].map((f) => f.variable).join(" ");
  return (
    <html lang={lang} dir={getDict(lang).dir} className={`${fonts} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
