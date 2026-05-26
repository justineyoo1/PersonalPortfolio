import { Metadata } from "next";
import { PrivacyContent } from "@/components/legal/PrivacyContent";

export const metadata: Metadata = {
  title: "Eunho Privacy Policy",
  description:
    "Privacy policy for Eunho, the single-habit tracker by Justin Yoo.",
  openGraph: {
    title: "Eunho Privacy Policy",
    description:
      "Privacy policy for Eunho, the single-habit tracker by Justin Yoo.",
    url: "https://jstnyoo.com/apps/eunho/privacy",
    type: "website",
  },
};

export default function EunhoPrivacyPage() {
  return <PrivacyContent />;
}
