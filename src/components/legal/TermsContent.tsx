"use client";

import { LegalPageClient } from "./LegalPageClient";

export function TermsContent() {
  return (
    <LegalPageClient title="Terms of Service" lastUpdated="March 31, 2026">
      {(isDark) => <TermsBody isDark={isDark} />}
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

function TermsBody({ isDark }: { isDark: boolean }) {
  return (
    <div>
      <Paragraph isDark={isDark}>
        Apps covered: Uninstall, Brik, Eunho, and Shwup — all developed by Justin Yoo.
      </Paragraph>

      <SectionTitle isDark={isDark}>Acceptance of Terms</SectionTitle>
      <Paragraph isDark={isDark}>
        By downloading or using any of our apps, you agree to these terms. If you do not agree, do
        not use the apps.
      </Paragraph>

      <SectionTitle isDark={isDark}>Description of Service</SectionTitle>
      <ul className={`text-sm leading-relaxed mb-3 space-y-1.5 list-disc pl-5 ${isDark ? "font-mono text-gray-300" : "text-[#515154]"}`}>
        <li>
          <strong className={isDark ? "text-gray-100" : "text-[#1D1D1F]"}>Uninstall</strong> is a
          self-control app that allows you to temporarily block access to apps and websites on your
          own device using Apple&apos;s Screen Time API.
        </li>
        <li>
          <strong className={isDark ? "text-gray-100" : "text-[#1D1D1F]"}>Brik</strong> is a morning
          accountability alarm app.
        </li>
        <li>
          <strong className={isDark ? "text-gray-100" : "text-[#1D1D1F]"}>Eunho</strong> is a
          single-habit tracker.
        </li>
        <li>
          <strong className={isDark ? "text-gray-100" : "text-[#1D1D1F]"}>Shwup</strong> is a gym
          logging app where you can spend tracked minutes to buy items and decorate your room.
        </li>
      </ul>

      <SectionTitle isDark={isDark}>Subscriptions & Payments</SectionTitle>
      <Paragraph isDark={isDark}>
        Some apps offer auto-renewable subscriptions. By subscribing:
      </Paragraph>
      <ul className={`text-sm leading-relaxed mb-3 space-y-1.5 list-disc pl-5 ${isDark ? "font-mono text-gray-300" : "text-[#515154]"}`}>
        <li>Payment is charged to your Apple ID account at confirmation of purchase.</li>
        <li>
          Your subscription automatically renews unless you cancel at least 24 hours before the end
          of the current billing period.
        </li>
        <li>
          Your account will be charged for renewal within 24 hours prior to the end of the current
          period at the same price.
        </li>
        <li>
          You can manage and cancel subscriptions in your device&apos;s Settings &gt; Apple ID &gt;
          Subscriptions.
        </li>
        <li>
          Free trials, if offered, automatically convert to paid subscriptions at the end of the
          trial period unless cancelled.
        </li>
      </ul>
      <Paragraph isDark={isDark}>
        All payments are processed by Apple. We do not handle payment information directly.
      </Paragraph>

      <SectionTitle isDark={isDark}>App Blocking (Uninstall)</SectionTitle>
      <ul className={`text-sm leading-relaxed mb-3 space-y-1.5 list-disc pl-5 ${isDark ? "font-mono text-gray-300" : "text-[#515154]"}`}>
        <li>Uninstall blocks apps at your own request for self-discipline purposes.</li>
        <li>
          Once a one-time block is activated, it is designed to be difficult to cancel. You can
          remove blocking by revoking Screen Time authorization in your device&apos;s Settings &gt;
          Screen Time, or by uninstalling the app.
        </li>
        <li>Routine blocks can be deactivated with a cooldown period.</li>
        <li>
          We are not responsible for any consequences of being unable to access blocked apps during
          an active blocking session, including missed calls, messages, or other communications.
        </li>
        <li>
          You acknowledge that you are blocking apps voluntarily and for your own benefit.
        </li>
      </ul>

      <SectionTitle isDark={isDark}>Disclaimer of Warranties</SectionTitle>
      <Paragraph isDark={isDark}>
        Our apps are provided &quot;as is&quot; without warranty of any kind, express or implied. We do not
        guarantee that the apps will be error-free, uninterrupted, or compatible with all devices.
      </Paragraph>

      <SectionTitle isDark={isDark}>Limitation of Liability</SectionTitle>
      <Paragraph isDark={isDark}>
        To the maximum extent permitted by law, we shall not be liable for any indirect, incidental,
        special, consequential, or punitive damages arising from your use of our apps.
      </Paragraph>

      <SectionTitle isDark={isDark}>Termination</SectionTitle>
      <Paragraph isDark={isDark}>
        We reserve the right to terminate or suspend access to our apps at any time, without notice,
        for conduct that we believe violates these terms or is harmful to other users or us.
      </Paragraph>

      <SectionTitle isDark={isDark}>Governing Law</SectionTitle>
      <Paragraph isDark={isDark}>
        These terms are governed by the laws of the State of North Carolina, United States.
      </Paragraph>

      <SectionTitle isDark={isDark}>Changes to These Terms</SectionTitle>
      <Paragraph isDark={isDark}>
        We may update these terms from time to time. Continued use of the apps after changes
        constitutes acceptance of the new terms.
      </Paragraph>

      <SectionTitle isDark={isDark}>Contact</SectionTitle>
      <Paragraph isDark={isDark}>
        For questions about these terms, contact:{" "}
        <Link isDark={isDark} href="mailto:justinyoou@gmail.com">
          justinyoou@gmail.com
        </Link>
      </Paragraph>
    </div>
  );
}
