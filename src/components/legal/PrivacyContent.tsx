"use client";

import { LegalPageClient } from "./LegalPageClient";

export function PrivacyContent() {
  return (
    <LegalPageClient title="Privacy Policy" lastUpdated="May 22, 2026">
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
        are used solely for measuring ad campaign performance. See &quot;Third-Party Analytics &amp;
        Ad Attribution&quot; below. (Anonymous diagnostic data via Apple&apos;s MetricKit is opt-in
        by the user through iOS Settings — see &quot;Performance &amp; Diagnostic Data&quot; above.)
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
              <td className="py-2 pr-4">TikTok Business SDK 1.6.1</td>
              <td className="py-2 pr-4">Ad campaign attribution (Brik, Uninstall)</td>
              <td className="py-2">
                IDFA (only if ATT permission is granted); SKAdNetwork postbacks; three custom
                events (CompleteRegistration, StartTrial, Subscribe)
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

      <SectionTitle isDark={isDark}>Third-Party Analytics &amp; Ad Attribution</SectionTitle>
      <Paragraph isDark={isDark}>
        We use the TikTok Business SDK, version 1.6.1, provided by TikTok Pte. Ltd., in two of our
        apps: Brik (bundle ID com.justinyoo.brik) and Uninstall (bundle ID com.justinyoo.uninstall).
        The SDK is used to attribute paid TikTok ad campaign installs to downstream conversion
        events. It is not used for anything else.
      </Paragraph>

      <Paragraph isDark={isDark}>
        <strong className={isDark ? "text-gray-100" : "text-[#1D1D1F]"}>
          Data the SDK transmits:
        </strong>
      </Paragraph>
      <ul
        className={`text-sm leading-relaxed mb-3 space-y-2 list-disc pl-6 ${
          isDark ? "font-mono text-gray-300" : "text-[#515154]"
        }`}
      >
        <li>
          Your Advertising Identifier (IDFA), only if you grant App Tracking Transparency
          permission for the app
        </li>
        <li>Apple SKAdNetwork postbacks (anonymized install events)</li>
        <li>
          Three custom conversion events: CompleteRegistration (onboarding completion), StartTrial
          (RevenueCat trial start), and Subscribe (paid conversion, including the product ID,
          revenue, and currency of the purchase)
        </li>
      </ul>

      <Paragraph isDark={isDark}>
        <strong className={isDark ? "text-gray-100" : "text-[#1D1D1F]"}>
          Data the SDK does NOT collect:
        </strong>
      </Paragraph>
      <ul
        className={`text-sm leading-relaxed mb-3 space-y-2 list-disc pl-6 ${
          isDark ? "font-mono text-gray-300" : "text-[#515154]"
        }`}
      >
        <li>Any in-app behavior or interaction outside the three events listed above</li>
        <li>
          Screen Time data, your blocking list, or anything from the FamilyControls or
          ManagedSettings frameworks (Uninstall)
        </li>
        <li>
          Alarm history, mission completions, or photos taken to verify a mission (Brik)
        </li>
        <li>Location, contacts, photos, microphone, or camera data</li>
        <li>
          Any personally identifiable information beyond the IDFA, and the IDFA is itself opt-in
          via ATT
        </li>
      </ul>

      <Paragraph isDark={isDark}>
        <strong className={isDark ? "text-gray-100" : "text-[#1D1D1F]"}>Opt-out:</strong>
      </Paragraph>
      <Paragraph isDark={isDark}>
        If you decline tracking via iOS Settings &gt; Privacy &amp; Security &gt; Tracking, the
        IDFA is not shared with TikTok. SKAdNetwork postbacks still fire, but they are aggregated,
        time-shifted, and non-personal by Apple&apos;s design. Declining tracking does not change
        any functionality of the app.
      </Paragraph>

      <Paragraph isDark={isDark}>
        TikTok&apos;s privacy policy:{" "}
        <Link
          isDark={isDark}
          href="https://www.tiktok.com/legal/page/global/privacy-policy/en"
        >
          tiktok.com/legal/page/global/privacy-policy/en
        </Link>
      </Paragraph>

      <Paragraph isDark={isDark}>
        This integration applies only to Brik and Uninstall. Eunho and Shwup do not include any
        third-party advertising or attribution SDK.
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
