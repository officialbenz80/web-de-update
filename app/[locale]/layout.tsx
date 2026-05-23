// app/[locale]/layout.tsx
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  // Change "de" | "en" to string here to satisfy Next.js core constraints
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children, params }: LayoutProps) {
  // Await the parameters from Next.js
  const resolvedParams = await params;

  // Cast it securely inside the component if you need strict type checking downstream
  const locale = resolvedParams.locale as "de" | "en";

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
