import { Metadata } from "next";
import { PrivacyContent } from "@/components/legal/PrivacyContent";

export const metadata: Metadata = {
  title: "Uninstall Privacy Policy",
  description:
    "Privacy policy for Uninstall, the app blocker by Justin Yoo.",
  openGraph: {
    title: "Uninstall Privacy Policy",
    description:
      "Privacy policy for Uninstall, the app blocker by Justin Yoo.",
    url: "https://jstnyoo.com/apps/uninstall/privacy",
    type: "website",
  },
};

export default function UninstallPrivacyPage() {
  return <PrivacyContent />;
}
