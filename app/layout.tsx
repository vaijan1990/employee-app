import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/queryClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Personalregister",
  description: "Bläddra och utforska ditt team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sv"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
        {/* Skip to main content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          Hoppa till huvudinnehåll
        </a>

        {/* Header */}
        <header role="banner" className="sticky top-0 z-40 border-b border-white/60 bg-white/70 backdrop-blur-md shadow-sm">
          <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
            {/* Logo mark */}
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md shadow-indigo-200">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5 text-white"
                aria-hidden="true"
              >
                <path
                  d="M17 20H7a5 5 0 0 1 0-10h.09A6 6 0 1 1 17 20Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="7" r="3" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </div>
            <div>
              <span className="text-base font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent leading-none">
                PeopleHub
              </span>
              <p className="text-[10px] text-gray-400 leading-none mt-0.5">Personalregister</p>
            </div>
          </div>
        </header>

        <QueryProvider>
          <div className="flex-1" id="main-content">{children}</div>
        </QueryProvider>

        <footer className="border-t border-white/60 bg-white/50 py-4 text-center text-xs text-gray-400">
          © 2026 PeopleHub · Alla rättigheter förbehållna
        </footer>
      </body>
    </html>
  );
}
