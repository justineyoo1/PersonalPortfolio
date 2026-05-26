import { Metadata } from "next";
import { PrivacyContent } from "@/components/legal/PrivacyContent";

export const metadata: Metadata = {
  title: "Brik Privacy Policy",
  description:
    "Privacy policy for Brik, the morning accountability alarm app by Justin Yoo.",
  openGraph: {
    title: "Brik Privacy Policy",
    description:
      "Privacy policy for Brik, the morning accountability alarm app by Justin Yoo.",
    url: "https://jstnyoo.com/apps/brik/privacy",
    type: "website",
  },
};

export default function BrikPrivacyPage() {
  return <PrivacyContent />;
}
