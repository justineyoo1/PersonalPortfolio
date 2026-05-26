import { Metadata } from "next";
import { TermsContent } from "@/components/legal/TermsContent";

export const metadata: Metadata = {
  title: "Brik Terms of Service",
  description:
    "Terms of service for Brik, the morning accountability alarm app by Justin Yoo.",
  openGraph: {
    title: "Brik Terms of Service",
    description:
      "Terms of service for Brik, the morning accountability alarm app by Justin Yoo.",
    url: "https://jstnyoo.com/apps/brik/terms",
    type: "website",
  },
};

export default function BrikTermsPage() {
  return <TermsContent />;
}
