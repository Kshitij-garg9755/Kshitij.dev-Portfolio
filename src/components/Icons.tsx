import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export function ArrowUpRight(props: IconProps) {
  return <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}><path d="M5 15 15 5M6 5h9v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function ArrowRight(props: IconProps) {
  return <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}><path d="M3.5 10h13m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function MenuIcon({ close = false, ...props }: IconProps & { close?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>{close ? <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /> : <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />}</svg>;
}

export function GithubMark(props: IconProps) {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}><path d="M12 .9A11.1 11.1 0 0 0 8.49 22.53c.55.1.76-.24.76-.53v-2.06c-3.1.67-3.76-1.31-3.76-1.31-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.7 1.15 1.7 1.15.99 1.69 2.59 1.2 3.22.92.1-.72.39-1.2.7-1.47-2.48-.28-5.09-1.24-5.09-5.5 0-1.22.43-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14A10.6 10.6 0 0 1 12 6.25c.95 0 1.9.13 2.79.38 2.11-1.43 3.04-1.14 3.04-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.77 1.15 2.99 0 4.27-2.61 5.22-5.1 5.49.4.34.75 1 .75 2.02V22c0 .29.2.64.77.53A11.1 11.1 0 0 0 12 .9Z" /></svg>;
}

export function LinkedInMark(props: IconProps) {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}><path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM8.06 18.7H5.1V9.16h2.96v9.54ZM6.58 7.86a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44Zm12.14 10.84h-2.96v-4.64c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.72H9.46V9.16h2.84v1.3h.04c.4-.75 1.36-1.55 2.8-1.55 3 0 3.58 1.97 3.58 4.53v5.26Z" /></svg>;
}

export function MailMark(props: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}><rect x="3" y="5" width="18" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function DownloadIcon(props: IconProps) {
  return <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}><path d="M10 2.75v9m0 0 3.5-3.5M10 11.75l-3.5-3.5M3.5 13.25v2.5h13v-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
