'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const LINKS = [
  { href: '/', label: 'Overview' },
  { href: '/timeline/', label: 'Timeline' },
  { href: '/before-after/', label: 'Before / after' },
  { href: '/writeup/', label: 'The Story' },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {}
  };

  const norm = (p: string) => (p.length > 1 ? p.replace(/\/$/, '') : p);

  return (
    <header className={`site-nav${scrolled ? ' sc' : ''}`}>
      <div className="site-nav-in">
        <Link href="/" className="brand">
          <span className="brand-logos" aria-hidden="true">
            {/* eslint-disable @next/next/no-img-element */}
            <img className="brand-logo gsoc" src="/gsoc-logo.png" alt="" />
            <img className="brand-logo palisadoes" src="/palisadoes-logo.png" alt="" />
            {/* eslint-enable @next/next/no-img-element */}
          </span>
          <span className="brand-text">Talawa Admin UI Redesign</span>
        </Link>
        <div className="site-nav-right">
          <nav aria-label="Site">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={norm(pathname) === norm(l.href) ? 'page' : undefined}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? '☀' : '☾'}
          </button>
          <a
            href="https://rishavjha.com"
            target="_blank"
            rel="noopener noreferrer"
            className="author-link"
          >
            by Rishav Jha
          </a>
        </div>
      </div>
    </header>
  );
}
