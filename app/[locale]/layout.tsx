import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface LayoutProps {
  children: React.ReactNode;
  // Change "de" | "en" to string here to satisfy Next.js core constraints
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "Login",
  description:
    "Mobiler Login ins WEB.DE Postfach: Hier Kønne Sie sich mit dem smartphone und Tablet schnell ran sicher von unter…...",
};

export default async function RootLayout({ children, params }: LayoutProps) {
  const resolvedParams = await params;

  const locale = resolvedParams.locale as "de" | "en";

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
