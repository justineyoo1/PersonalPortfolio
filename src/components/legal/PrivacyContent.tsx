"use client";

import { LegalPageClient } from "./LegalPageClient";

export function PrivacyContent() {
  return (
    <LegalPageClient title="Privacy Policy" lastUpdated="March 31, 2026">
      {(isDark) => <PrivacyBody isDark={isDark} />}
    </LegalPageClient>
  );
}

function SectionTitle({ isDark, children }: { isDark: boolean; children: React.ReactNode }) {
  return isDark ? (
    <h2 className="font-mono text-[#60A5FA] text-sm font-bold mt-6 mb-2">
      ## {children}
    </h2>
  ) : (
    <h2 className="text-[17px] font-semibold text-[#1D1D1F] mt-6 mb-2">
      {children}
    </h2>
  );
}

function Paragraph({ isDark, children }: { isDark: boolean; children: React.ReactNode }) {
  return (
    <p
      className={`text-sm leading-relaxed mb-3 ${
        isDark ? "font-mono text-gray-300" : "text-[#515154]"
      }`}
    >
      {children}
    </p>
  );
}

function Link({ isDark, href, children }: { isDark: boolean; href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`underline ${
        isDark ? "text-[#60A5FA] hover:text-[#93C5FD]" : "text-[#007AFF] hover:text-[#0066D6]"
      }`}
    >
      {children}
    </a>
  );
}

function PrivacyBody({ isDark }: { isDark: boolean }) {
  return (
    <div>
      <Paragraph isDark={isDark}>
        Apps covered: Uninstall, Brik, Eunho, and Shwup — all developed by Justin Yoo.
      </Paragraph>

      <SectionTitle isDark={isDark}>Data We Collect</SectionTitle>
      <Paragraph isDark={isDark}>
        Our apps are designed with privacy as a priority. We do not collect, store, or transmit
        personal data to external servers unless explicitly stated below.
      </Paragraph>

      <ul className={`text-sm leading-relaxed mb-3 space-y-3 ${isDark ? "font-mono text-gray-300" : "text-[#515154]"}`}>
        <li>
          <strong className={isDark ? "text-gray-100" : "text-[#1D1D1F]"}>Subscription & Purchase Data:</strong>{" "}
          We use RevenueCat to manage subscriptions. RevenueCat processes your purchase through
          Apple&apos;s App Store. We receive an anonymous user identifier and entitlement status. We do
          not see your name, email, or payment details. RevenueCat&apos;s privacy policy:{" "}
          <Link isDark={isDark} href="https://www.revenuecat.com/privacy/">
            revenuecat.com/privacy
          </Link>
        </li>
        <li>
          <strong className={isDark ? "text-gray-100" : "text-[#1D1D1F]"}>App Usage Statistics (Uninstall only):</strong>{" "}
          Blocking duration and streak statistics are stored locally on your device using UserDefaults.
          This data never leaves your device.
        </li>
        <li>
          <strong className={isDark ? "text-gray-100" : "text-[#1D1D1F]"}>Install Tracking (Uninstall only):</strong>{" "}
          We track the number of times the app has been installed using Apple&apos;s Keychain and iCloud
          Key-Value Store. This is used solely to display your &quot;uninstall count&quot; within the app. No
          personal information is associated with this data.
        </li>
        <li>
          <strong className={isDark ? "text-gray-100" : "text-[#1D1D1F]"}>Screen Time / Family Controls (Uninstall only):</strong>{" "}
          Uninstall uses Apple&apos;s Screen Time API (FamilyControls, ManagedSettings,
          DeviceActivity) to block apps you select. All blocking is processed entirely on-device by
          iOS. We cannot see which apps you block, how long you use your phone, or any Screen Time
          data. Apple does not share this data with developers.
        </li>
      </ul>

      <SectionTitle isDark={isDark}>Data We Do NOT Collect</SectionTitle>
      <Paragraph isDark={isDark}>
        We do not collect: names, email addresses, phone numbers, location data, contacts, photos,
        health data, browsing history, advertising identifiers, analytics or crash reporting data, or
        any data for tracking purposes.
      </Paragraph>

      <SectionTitle isDark={isDark}>Third-Party SDKs</SectionTitle>
      <div className="overflow-x-auto mb-3">
        <table
          className={`w-full text-sm border-collapse ${
            isDark ? "font-mono" : ""
          }`}
        >
          <thead>
            <tr
              className={
                isDark
                  ? "border-b border-gray-700 text-gray-400"
                  : "border-b border-[#E5E5EA] text-[#86868B]"
              }
            >
              <th className="text-left py-2 pr-4 font-medium">SDK</th>
              <th className="text-left py-2 pr-4 font-medium">Purpose</th>
              <th className="text-left py-2 font-medium">Data Accessed</th>
            </tr>
          </thead>
          <tbody className={isDark ? "text-gray-300" : "text-[#515154]"}>
            <tr className={isDark ? "border-b border-gray-800" : "border-b border-[#F2F2F7]"}>
              <td className="py-2 pr-4">RevenueCat</td>
              <td className="py-2 pr-4">Subscription management</td>
              <td className="py-2">Anonymous purchase receipts</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">Apple StoreKit</td>
              <td className="py-2 pr-4">In-app purchases</td>
              <td className="py-2">Purchase transactions (processed by Apple)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Paragraph isDark={isDark}>
        No advertising, analytics, or tracking SDKs are used in any of our apps.
      </Paragraph>

      <SectionTitle isDark={isDark}>Children&apos;s Privacy</SectionTitle>
      <Paragraph isDark={isDark}>
        Our apps are not directed at children under 13. Uninstall uses the Screen Time API in
        &quot;individual&quot; mode only (self-use), not &quot;child&quot; mode.
      </Paragraph>

      <SectionTitle isDark={isDark}>Your Rights</SectionTitle>
      <Paragraph isDark={isDark}>
        Since we don&apos;t collect personal data on our servers, there is nothing to delete or export.
        Subscription management and purchase history are handled by Apple — manage these in Settings
        &gt; Apple ID &gt; Subscriptions.
      </Paragraph>

      <SectionTitle isDark={isDark}>Data Retention</SectionTitle>
      <Paragraph isDark={isDark}>
        All app data is stored locally on your device and in your personal iCloud account.
        Uninstalling the app removes local data. iCloud Key-Value Store data can be managed through
        your iCloud settings.
      </Paragraph>

      <SectionTitle isDark={isDark}>Changes to This Policy</SectionTitle>
      <Paragraph isDark={isDark}>
        We may update this policy from time to time. Changes will be reflected by the &quot;Last
        updated&quot; date above.
      </Paragraph>

      <SectionTitle isDark={isDark}>Contact</SectionTitle>
      <Paragraph isDark={isDark}>
        For privacy questions, contact:{" "}
        <Link isDark={isDark} href="mailto:justinyoou@gmail.com">
          justinyoou@gmail.com
        </Link>
      </Paragraph>
    </div>
  );
}
