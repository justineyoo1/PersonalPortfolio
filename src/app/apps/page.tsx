import { Metadata } from "next";
import { AppsPageClient } from "@/components/apps/AppsPageClient";

export const metadata: Metadata = {
  title: "Built by Justin Yoo",
  description:
    "Three iOS apps about friction beating willpower — Brik, Eunho, Uninstall. Plus two products in private beta: Bord and Whistle.",
  openGraph: {
    title: "Built by Justin Yoo",
    description:
      "Three iOS apps about friction beating willpower. Plus Bord and Whistle in private beta.",
    url: "https://jstnyoo.com/apps",
    type: "website",
    images: [
      {
        url: "/img/apps/eunho/1-intro.png",
        width: 1320,
        height: 2868,
        alt: "Built by Justin Yoo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Built by Justin Yoo",
    description:
      "Three iOS apps about friction beating willpower. Plus Bord and Whistle in private beta.",
    images: ["/img/apps/eunho/1-intro.png"],
  },
};

export default function AppsPage() {
  return <AppsPageClient />;
}
