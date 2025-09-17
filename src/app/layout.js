import './globals.css';

import { Bodoni_Moda } from 'next/font/google';
import { GeistSans, GeistMono } from 'geist/font';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-display',
});

// geist/font exposes preset variables: --font-geist and --font-geist-mono
// We alias them in globals.css to --font-geist-sans and --font-geist-mono
const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata = {
  metadataBase: new URL('https://example.com'),
  title: {
    default: 'Brennan Kapollock — Portfolio',
    template: '%s — Brennan Kapollock',
  },
  description: 'Designer & developer focused on editorial scale, clean typography, and thoughtful digital experiences.',
  icons: { icon: '/favicon.ico' },
};

export const viewport = {
  themeColor: '#ffffff',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bodoni.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Header />
        <main id="main" className="container-site">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

