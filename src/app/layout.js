import "./globals.css";

import localFont from "next/font/local";
import { GeistSans, GeistMono } from "geist/font";

import Header from "@/components/Header";

const printvetica = localFont({
  src: "../../public/fonts/Printvetica.otf",
  display: "swap",
  variable: "--font-display",
});

const departureMono = localFont({
  src: [
    {
      path: "../../public/fonts/DepartureMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/DepartureMono-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/DepartureMono-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-departure-mono",
  display: "swap",
});

// geist/font exposes preset variables: --font-geist and --font-geist-mono
// We alias them in globals.css to --font-geist-sans and --font-geist-mono
const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "brennan k.a. pollock",
    template: "%s — Brennan Kapollock",
  },
  description: "engineer and artist based in venice beach",
  icons: { icon: "/favicon.ico" },
};

export const viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${printvetica.variable} ${geistSans.variable} ${geistMono.variable} ${departureMono.variable}`}
    >
      <body>
        <Header />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
