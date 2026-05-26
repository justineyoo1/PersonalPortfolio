import { Metadata } from "next";
import { AppsPageClient } from "@/components/apps/AppsPageClient";

export const metadata: Metadata = {
  title: "Apps by Justin Yoo",
  description:
    "Three iOS apps about friction beating willpower. Brik, Eunho, and Uninstall. Plus Shwup, coming soon.",
  openGraph: {
    title: "Apps by Justin Yoo",
    description:
      "Three iOS apps about friction beating willpower. Brik, Eunho, and Uninstall.",
    url: "https://jstnyoo.com/apps",
    type: "website",
    images: [
      {
        url: "/img/apps/eunho/1-intro.png",
        width: 1320,
        height: 2868,
        alt: "Apps by Justin Yoo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apps by Justin Yoo",
    description:
      "Three iOS apps about friction beating willpower.",
    images: ["/img/apps/eunho/1-intro.png"],
  },
};

export default function AppsPage() {
  return <AppsPageClient />;
}
