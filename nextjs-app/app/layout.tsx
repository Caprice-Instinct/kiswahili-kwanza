import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kiswahili Kwanza - Jifunze Kiswahili kwa Furaha",
  description: "Programu ya kujifunzia Kiswahili kwa watoto wenye dyslexia. Tumia teknolojia ya AI kujifunza kwa njia rahisi na ya kufurahisha.",
  keywords: "Kiswahili, Swahili, dyslexia, learning, children, AI, education, Kenya, Tanzania",
  authors: [{ name: "Wabuga Linet Wangui" }],
  robots: "index, follow",
  openGraph: {
    title: "Kiswahili Kwanza - Jifunze Kiswahili kwa Furaha",
    description: "Programu ya kujifunzia Kiswahili kwa watoto wenye dyslexia",
    type: "website",
    locale: "sw_KE",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sw" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased bg-white dark:bg-gray-900 min-h-screen" suppressHydrationWarning>
        <Providers>
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-8 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <p className="text-sm text-muted-foreground dyslexic-text">
                  © 2025 Kiswahili Kwanza. Imetengenezwa kwa upendo na teknolojia ya AI.
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Mradi wa Chuo Kikuu cha Strathmore - Wabuga Linet Wangui
                </p>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
