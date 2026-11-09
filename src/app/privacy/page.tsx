import type { Metadata } from "next";
import { EditorialFrame } from "@/components/layout/EditorialFrame";
import { site } from "@/data/site";

const description = "What this website collects, and what Gez Studio does with it.";

export const metadata: Metadata = {
  title: "Privacy",
  description,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy",
    description,
    url: "/privacy",
    images: [{ url: "/branding/gez-cover.png", alt: site.legalName }],
  },
};

const updated = "9 November 2026";

const terms = [
  {
    label: "Visiting",
    copy: "This site sets no cookies and runs no analytics. Our host, Vercel, keeps standard server logs, including IP addresses. One typeface loads from Google Fonts.",
  },
  {
    label: "Films",
    copy: "Films play through Vimeo once you press play. Vimeo may then set its own cookies.",
  },
  {
    label: "Writing to us",
    copy: "If you email us, we keep your address and message to reply and to work with you. We delete them when they are no longer needed. We don't sell or share them.",
  },
] as const;

export default function PrivacyRoute() {
  return (
    <EditorialFrame>
      <article className="info-page__body" aria-label="Privacy">
        <header className="info-hero">
          <p className="home-editorial__kicker">Privacy</p>
          <h1>What this site keeps.</h1>
          <p className="info-copy">
            {site.company.name} runs this website. This page sets out what we collect and why.
          </p>
        </header>

        <dl className="privacy-terms">
          {terms.map((term) => (
            <div className="privacy-terms__row" key={term.label}>
              <dt className="info-label">{term.label}</dt>
              <dd className="info-copy">
                <p>{term.copy}</p>
              </dd>
            </div>
          ))}
          <div className="privacy-terms__row">
            <dt className="info-label">Your rights</dt>
            <dd className="info-copy">
              <p>
                You can ask to see, correct or delete what we hold about you. Write to{" "}
                <a href={`mailto:${site.contact.email}`} data-interactive>
                  {site.contact.email}
                </a>
                . You can also complain to the Information Commissioner&apos;s Office at{" "}
                <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" data-interactive>
                  ico.org.uk
                </a>
                .
              </p>
            </dd>
          </div>
        </dl>
      </article>

      <p className="privacy-updated">Updated {updated}</p>
    </EditorialFrame>
  );
}
