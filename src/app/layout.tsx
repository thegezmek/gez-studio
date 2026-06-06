import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { site } from "@/data/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["300"],
  variable: "--font-v2-serif-fallback",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#18181b",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.pageTitle,
    template: `%s | ${site.legalName}`,
  },
  description: site.metaDescription,
  keywords: [
    "gez studio",
    "wandering doc studio",
    "documentary production",
    "impact documentary",
    "nomadic filmmaker",
    "Lewis Ozcan",
    "social impact film",
  ],
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: site.url,
    siteName: site.legalName,
    title: site.pageTitle,
    description: site.metaDescription,
    images: [
      {
        url: "/branding/gez-cover.png",
        width: 1200,
        height: 630,
        alt: site.pageTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.pageTitle,
    description: site.metaDescription,
    images: ["/branding/gez-cover.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: site.url },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${cormorant.variable} h-full`}
    >
      <body className="h-full font-sans text-bone antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
