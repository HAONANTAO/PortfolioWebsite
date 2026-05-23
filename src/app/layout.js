import { Inter, Homemade_Apple, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getAllWritings } from "@/lib/writings";
import ProjectsData from "./Data/ProjectsData";
import CommandPalette from "./components/CommandPalette";
import ThemeProvider from "./components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const signature = Homemade_Apple({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-signature",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

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
  },
  twitter: {
    card: "summary_large_image",
    title: "Aaron TAO — AI Engineer & Full Stack Developer",
    description: "Building LLM pipelines, RAG systems, and production full-stack apps.",
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/favicon.svg',
  },
  alternates: {
    types: {
      "application/rss+xml": [
        { url: "/feed.xml", title: "Aaron Tao — Writings" },
      ],
    },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aaron Tao",
  alternateName: "Haonan Tao",
  url: "https://www.taohaonan.com",
  image: "https://www.taohaonan.com/opengraph-image",
  jobTitle: "AI Engineer & Full Stack Developer",
  email: "mailto:taoaaron5@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Melbourne",
    addressCountry: "AU",
  },
  knowsAbout: [
    "Large Language Models",
    "Retrieval-Augmented Generation",
    "LangChain",
    "Next.js",
    "React Native",
    "AWS",
  ],
  sameAs: [
    "https://github.com/HAONANTAO",
    "https://www.linkedin.com/in/haonan-tao-aaron/",
  ],
};

export default function RootLayout({ children }) {
  const writings = getAllWritings();
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${signature.variable} ${serif.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
          <CommandPalette writings={writings} projects={ProjectsData} />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
