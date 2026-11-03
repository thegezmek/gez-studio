import type { Metadata } from "next";
import { StudioPage } from "@/components/layout/StudioPanel";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Studio",
  description: site.about[0],
  alternates: { canonical: "/studio" },
  openGraph: {
    title: "Studio",
    description: site.about[0],
    url: "/studio",
    images: [{ url: "/branding/gez-cover.png", alt: site.legalName }],
  },
};

export default function StudioRoute() {
  return <StudioPage />;
}
