import type { Metadata } from "next";
import { ContactPage } from "@/components/layout/ContactPanel";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: site.contact.intro,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact",
    description: site.contact.intro,
    url: "/contact",
    images: [{ url: "/branding/gez-cover.png", alt: site.legalName }],
  },
};

export default function ContactRoute() {
  return <ContactPage />;
}
