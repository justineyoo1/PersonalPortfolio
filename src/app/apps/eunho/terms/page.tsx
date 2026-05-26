import { Metadata } from "next";
import { TermsContent } from "@/components/legal/TermsContent";

export const metadata: Metadata = {
  title: "Eunho Terms of Service",
  description:
    "Terms of service for Eunho, the single-habit tracker by Justin Yoo.",
  openGraph: {
    title: "Eunho Terms of Service",
    description:
      "Terms of service for Eunho, the single-habit tracker by Justin Yoo.",
    url: "https://jstnyoo.com/apps/eunho/terms",
    type: "website",
  },
};

export default function EunhoTermsPage() {
  return <TermsContent />;
}
