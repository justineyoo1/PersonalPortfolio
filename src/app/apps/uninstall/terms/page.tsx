import { Metadata } from "next";
import { TermsContent } from "@/components/legal/TermsContent";

export const metadata: Metadata = {
  title: "Uninstall Terms of Service",
  description:
    "Terms of service for Uninstall, the app blocker by Justin Yoo.",
  openGraph: {
    title: "Uninstall Terms of Service",
    description:
      "Terms of service for Uninstall, the app blocker by Justin Yoo.",
    url: "https://jstnyoo.com/apps/uninstall/terms",
    type: "website",
  },
};

export default function UninstallTermsPage() {
  return <TermsContent />;
}
