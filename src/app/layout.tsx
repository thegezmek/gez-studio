import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { site } from "@/data/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
  colorScheme: "dark",
};

const shareImage = {
  url: "/branding/gez-cover.png",
  width: 1200,
  height: 630,
  alt: site.legalName,
} as const;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.pageTitle,
    template: `%s | ${site.legalName}`,
  },
  description: site.metaDescription,
  keywords: [
    "GEZ Studio",
    "film production",
    "documentary",
    "branded film",
    "commercial",
    "independent film",
    "Barcelona",
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
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: site.pageTitle,
    description: site.metaDescription,
    images: [shareImage.url],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} h-full`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-full font-sans text-bone antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: site.legalName,
              url: site.url,
              email: site.contact.email,
              description: site.metaDescription,
              logo: `${site.url}/branding/gez-cover.png`,
              sameAs: [site.social.instagram, site.social.vimeo, site.social.linkedin],
              address: site.contact.locations.map((location) => ({
                "@type": "PostalAddress",
                addressLocality: location.city,
                streetAddress: location.address,
              })),
            }),
          }}
        />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
