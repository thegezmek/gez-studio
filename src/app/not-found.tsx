import type { Metadata } from "next";
import Link from "next/link";
import { EditorialFrame } from "@/components/layout/EditorialFrame";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <EditorialFrame>
      <article className="info-page__body">
        <p className="home-editorial__kicker">404</p>
        <h1>This page is not here.</h1>
        <p className="info-copy">
          The page you asked for is not on this site.{" "}
          <Link href="/#films" data-interactive>
            See the films.
          </Link>
        </p>
      </article>
    </EditorialFrame>
  );
}
