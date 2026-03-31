import { Metadata } from "next";
import { TermsContent } from "@/components/legal/TermsContent";

export const metadata: Metadata = {
  title: "Terms of Service — Justin Yoo",
  description:
    "Terms of service for Uninstall, Brik, Eunho, and Shwup — iOS apps by Justin Yoo.",
  openGraph: {
    title: "Terms of Service — Justin Yoo",
    description:
      "Terms of service for Uninstall, Brik, Eunho, and Shwup — iOS apps by Justin Yoo.",
    url: "https://jstnyoo.com/app/terms",
    type: "website",
  },
};

export default function TermsPage() {
  return <TermsContent />;
}
