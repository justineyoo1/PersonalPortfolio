import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ParticleBackground from "@/components/ParticleBackground";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

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
        <Script id="global-error-handler" strategy="beforeInteractive">
          {`
            window.addEventListener('error', event => {
              console.error('Global error caught:', event.error);
            });
            window.addEventListener('unhandledrejection', event => {
              console.error('Unhandled promise rejection:', event.reason);
            });
          `}
        </Script>
      </head>

      <body className={inter.variable}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ParticleBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
