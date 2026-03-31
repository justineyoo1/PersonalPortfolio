import { Metadata } from "next";
import { AppsPageClient } from "@/components/apps/AppsPageClient";

export const metadata: Metadata = {
  title: "Apps by Justin Yoo",
  description:
    "iOS apps for productivity, fitness, and focus — Brik, Uninstall, Shwup, and Eunho.",
  openGraph: {
    title: "Apps by Justin Yoo",
    description:
      "iOS apps for productivity, fitness, and focus — Brik, Uninstall, Shwup, and Eunho.",
    url: "https://jstnyoo.com/apps",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Apps by Justin Yoo",
    description:
      "iOS apps for productivity, fitness, and focus — Brik, Uninstall, Shwup, and Eunho.",
  },
};

export default function AppsPage() {
  return <AppsPageClient />;
}
