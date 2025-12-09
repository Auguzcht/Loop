import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { SoundToggle } from "@/components/shared/SoundToggle";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Loop - Stay in the loop",
    template: "%s | Loop Quiz App"
  },
  description: "Test your web development knowledge with Loop - an interactive 60-second quiz featuring 12 questions on HTML, CSS, JavaScript, and more. Challenge yourself and stay in the loop!",
  keywords: [
    "quiz app",
    "web development quiz",
    "JavaScript quiz",
    "HTML quiz",
    "CSS quiz",
    "programming quiz",
    "coding challenge",
    "developer quiz",
    "tech quiz",
    "Loop"
  ],
  authors: [{ name: "Loop Quiz" }],
  creator: "Loop Quiz",
  publisher: "Loop Quiz",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: "Loop - Stay in the loop",
    description: "Test your web development knowledge with our interactive 60-second quiz. 12 questions covering HTML, CSS, JavaScript, and more!",
    url: "/",
    siteName: "Loop Quiz App",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Loop Quiz App - Stay in the loop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Loop - Stay in the loop",
    description: "Test your web development knowledge with our interactive 60-second quiz!",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon.ico" },
      { url: "/favicon_io/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon_io/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/favicon_io/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <SoundToggle />
        {children}
      </body>
    </html>
  );
}
