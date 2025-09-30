import type React from 'react';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { ClientLayout } from '@/components/client-layout';
import { PlansProvider } from '@/components/providers/plans-provider';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Celpius AI - CELPIP Practice Platform',
  description: 'AI-powered CELPIP exam preparation with real-time feedback and adaptive learning',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/_next/static/media/GeistMonoVF.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${poppins.variable} ${GeistMono.variable} font-sans antialiased`}>
        <PlansProvider>
          <ClientLayout>{children}</ClientLayout>
        </PlansProvider>
      </body>
    </html>
  );
}
