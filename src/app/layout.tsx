import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jacob Conrad Quendangan — Information Systems • Data & UI/UX",
  description:
    "Portfolio of Jacob Conrad Quendangan: Information Systems student specializing in data analytics, machine learning, and UI/UX design.",
  openGraph: {
    title: "Jacob Conrad Quendangan — Data Analytics & UI/UX",
    description: "Award-winning projects across data, systems, and design.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#fafafa] text-slate-900 dark:bg-slate-900 dark:text-zinc-50">
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
