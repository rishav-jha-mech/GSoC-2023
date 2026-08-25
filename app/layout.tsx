import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { LightboxProvider } from '@/components/LightboxProvider';
import { Reveal } from '@/components/Reveal';
import { Nav } from '@/components/Nav';
import { META } from '@/lib/data';
import './globals.css';

/**
 * Runs before hydration so the theme is correct on first paint — no
 * light-flash-then-dark on load. Reads the same key ThemeToggle writes to.
 */
const THEME_INIT = `
try {
  var t = localStorage.getItem('theme');
  if (t !== 'light' && t !== 'dark') {
    t = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  document.documentElement.setAttribute('data-theme', t);
} catch (e) {}
`;

export const metadata: Metadata = {
  metadataBase: new URL('https://gsoc.rishavjha.com'),
  title: `${META.project} — GSoC ${META.year} · Talawa · ${META.org}`,
  description:
    'Rebuilding the Talawa admin portal during Google Summer of Code 2023: the theming layer, the layout primitives, and the branch that stayed mergeable for five months.',
  authors: [{ name: META.contributor, url: 'https://rishavjha.com' }],
  creator: META.contributor,
  publisher: META.contributor,
  openGraph: {
    title: `${META.project} — GSoC ${META.year}`,
    description: `A case study of the Talawa Admin redesign for ${META.org}.`,
    type: 'article',
    url: 'https://gsoc.rishavjha.com',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${META.project} — GSoC ${META.year}`,
    description: `A case study of the Talawa Admin redesign for ${META.org}.`,
    images: ['/og-image.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#08110E',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          Fonts are loaded via <link> rather than next/font on purpose: next/font
          fetches from Google at build time, which breaks builds in sandboxed or
          offline CI. Swap to next/font if your build environment has network access.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400&family=Space+Grotesk:wght@500;600;700&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;1,300&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,300&display=swap"
          rel="stylesheet"
        />
        {/* eslint-disable-next-line react/no-danger */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Nav />
        <LightboxProvider>
          <main id="main">{children}</main>
        </LightboxProvider>
        <Reveal />
      </body>
    </html>
  );
}
