import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { LightboxProvider } from '@/components/LightboxProvider';
import { Reveal } from '@/components/Reveal';
import { META } from '@/lib/data';
import './globals.css';

export const metadata: Metadata = {
  title: `${META.project} — GSoC ${META.year} · Talawa · ${META.org}`,
  description:
    'Rebuilding the Talawa admin portal during Google Summer of Code 2023: the theming layer, the layout primitives, and the branch that stayed mergeable for five months.',
  authors: [{ name: META.contributor, url: `https://github.com/${META.handle}` }],
  openGraph: {
    title: `${META.project} — GSoC ${META.year}`,
    description: `A case study of the Talawa Admin redesign for ${META.org}.`,
    type: 'article',
  },
};

export const viewport: Viewport = {
  themeColor: '#08110E',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/*
          Fonts are loaded via <link> rather than next/font on purpose: next/font
          fetches from Google at build time, which breaks builds in sandboxed or
          offline CI. Swap to next/font if your build environment has network access.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Public+Sans:ital,wght@0,300;0,400;0,500;1,300&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a className="skip" href="#chapter-00">
          Skip to content
        </a>
        <LightboxProvider>{children}</LightboxProvider>
        <Reveal />
      </body>
    </html>
  );
}
