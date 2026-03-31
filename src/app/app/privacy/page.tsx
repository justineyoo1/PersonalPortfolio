import { Metadata } from "next";
import { PrivacyContent } from "@/components/legal/PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy — Justin Yoo",
  description:
    "Privacy policy for Uninstall, Brik, Eunho, and Shwup — iOS apps by Justin Yoo.",
  openGraph: {
    title: "Privacy Policy — Justin Yoo",
    description:
      "Privacy policy for Uninstall, Brik, Eunho, and Shwup — iOS apps by Justin Yoo.",
    url: "https://jstnyoo.com/app/privacy",
    type: "website",
  },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
