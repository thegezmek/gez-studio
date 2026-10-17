import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";

export const dynamic = "force-static";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePageRoute() {
  return <HomePage />;
}
