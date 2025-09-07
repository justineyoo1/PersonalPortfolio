import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ParticleBackground from "@/components/ParticleBackground";

const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["300", "400", "500", "700"] });

export const metadata: Metadata = {
  title: "Justin Yoo Portfolio",
  description: "Justin Yoo's portfolio highlighting skills, projects, and experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* favicon removed */}

        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />

        <Script id="global-error-handler" strategy="beforeInteractive">
          {`
            window.addEventListener('error', event => {
              console.error('Global error caught:', event.error);
              // TODO: send to your logging endpoint, e.g.:
              // fetch('/api/log', { method: 'POST', body: JSON.stringify({ message: event.error.message, stack: event.error.stack }) });
            });

            window.addEventListener('unhandledrejection', event => {
              console.error('Unhandled promise rejection:', event.reason);
              // TODO: send to your logging endpoint similarly
            });
          `}
        </Script>
      </head>

      <body className={ubuntu.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ParticleBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
