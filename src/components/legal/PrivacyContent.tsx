"use client";

import { LegalPageClient } from "./LegalPageClient";

export function PrivacyContent() {
  return (
    <LegalPageClient title="Privacy Policy" lastUpdated="May 20, 2026">
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
          <strong className={isDark ? "text-gray-100" : "text-[#1D1D1F]"}>Performance & Diagnostic Data (Uninstall only):</strong>{" "}
          If you opt in to <em>Share With App Developers</em> in iOS Settings → Privacy & Security →
          Analytics & Improvements, Apple may forward aggregated, anonymous performance metrics and
          crash reports to us via Apple&apos;s MetricKit framework. This data is delivered by Apple,
          not by the app, and is used solely to diagnose bugs and improve reliability. It is not
          linked to your identity. You can disable it at any time in iOS Settings.
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
        health data, browsing history, or in-app behavior data. Anonymous attribution identifiers
        are used solely for measuring ad campaign performance — see &quot;Ad Performance and
        Attribution&quot; below. (Anonymous diagnostic data via Apple&apos;s MetricKit is opt-in by
        the user through iOS Settings — see &quot;Performance & Diagnostic Data&quot; above.)
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
            <tr className={isDark ? "border-b border-gray-800" : "border-b border-[#F2F2F7]"}>
              <td className="py-2 pr-4">Apple StoreKit</td>
              <td className="py-2 pr-4">In-app purchases</td>
              <td className="py-2">Purchase transactions (processed by Apple)</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">TikTok Business SDK</td>
              <td className="py-2 pr-4">Ad campaign attribution (Uninstall, Brik, Eunho)</td>
              <td className="py-2">
                Anonymous device identifier (IDFA/IDFV per ATT choice); install + trial +
                subscription events
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Paragraph isDark={isDark}>
        In-app behavior tracking SDKs (Mixpanel, Amplitude, Firebase Analytics, etc.) are NOT used.
        Apple&apos;s first-party MetricKit framework remains the only source of in-app performance
        telemetry, and it requires user opt-in via iOS Settings.
      </Paragraph>

      <SectionTitle isDark={isDark}>Ad Performance and Attribution</SectionTitle>
      <Paragraph isDark={isDark}>
        Effective May 20, 2026: our apps (Brik, Uninstall, Eunho) use the TikTok Business SDK to
        measure how well our advertising performs. This is the entire scope of third-party data
        collection in our apps.
      </Paragraph>

      <Paragraph isDark={isDark}>
        <strong className={isDark ? "text-gray-100" : "text-[#1D1D1F]"}>What is collected:</strong>
      </Paragraph>
      <ul
        className={`text-sm leading-relaxed mb-3 space-y-2 list-disc pl-6 ${
          isDark ? "font-mono text-gray-300" : "text-[#515154]"
        }`}
      >
        <li>
          Anonymous device identifier (IDFA or IDFV, governed by your iOS App Tracking Transparency
          choice)
        </li>
        <li>App install events</li>
        <li>
          Conversion events (start of free trial, subscription purchase, completion of onboarding)
        </li>
        <li>
          Apple SKAdNetwork postbacks (privacy-preserving attribution standard built into iOS)
        </li>
      </ul>

      <Paragraph isDark={isDark}>
        <strong className={isDark ? "text-gray-100" : "text-[#1D1D1F]"}>What is NOT collected:</strong>
      </Paragraph>
      <ul
        className={`text-sm leading-relaxed mb-3 space-y-2 list-disc pl-6 ${
          isDark ? "font-mono text-gray-300" : "text-[#515154]"
        }`}
      >
        <li>
          Uninstall: which apps you block, your screen time usage, any Screen Time framework data
        </li>
        <li>
          Brik: your alarm history, mission completions, photos taken to silence alarms, or
          wake-up patterns
        </li>
        <li>Eunho: your habit data, hold-to-check-in history, or streaks</li>
        <li>Any content you interact with in our apps</li>
        <li>Your location, contacts, photos, or any other on-device information</li>
      </ul>

      <Paragraph isDark={isDark}>
        This data is used to measure ad campaign performance only. We do not sell this data, share
        it with any third party other than TikTok for attribution purposes, or use it to build any
        user profile beyond the install or conversion record.
      </Paragraph>

      <Paragraph isDark={isDark}>
        You can decline tracking at any time via iOS Settings → Privacy and Security → Tracking.
        Declining tracking does not affect any functionality of our apps — it switches our
        attribution method to Apple&apos;s privacy-preserving SKAdNetwork.
      </Paragraph>

      <Paragraph isDark={isDark}>
        Third-party SDK: TikTok Business SDK. TikTok&apos;s privacy policy:{" "}
        <Link
          isDark={isDark}
          href="https://www.tiktok.com/legal/page/global/partner-privacy-policy/en"
        >
          tiktok.com/legal/page/global/partner-privacy-policy/en
        </Link>
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
