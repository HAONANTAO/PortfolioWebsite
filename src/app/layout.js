import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Aaron TAO — AI Engineer & Full Stack Developer",
  description: "Portfolio of Aaron TAO — AI Engineer & Full Stack Developer. Building LLM-powered apps with React, Next.js, LangChain, and AWS. iOS app live on the App Store.",
  metadataBase: new URL("https://www.taohaonan.com"),
  openGraph: {
    title: "Aaron TAO — AI Engineer & Full Stack Developer",
    description: "Building LLM pipelines, RAG systems, and production full-stack apps. React · Next.js · LangChain · AWS · React Native.",
    url: "https://www.taohaonan.com",
    siteName: "Aaron TAO Portfolio",
    type: "website",
    images: [
      {
        url: "/images/Projects/documind.png",
        width: 1200,
        height: 630,
        alt: "Aaron TAO — AI Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aaron TAO — AI Engineer & Full Stack Developer",
    description: "Building LLM pipelines, RAG systems, and production full-stack apps.",
    images: ["/images/Projects/documind.png"],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
