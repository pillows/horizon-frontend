import '@/styles/global.css';

import type { Metadata } from 'next';

import clsx from 'clsx';
import { Inter } from 'next/font/google';

import { Layout } from '@/components';

interface RootLayoutProps {
  children: React.ReactNode;
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Mini Event App',
  description: 'Made for Horizon Media interview',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={clsx(
        'tabular-nums',
        'antialiased',
        'font-sans',
        inter.variable,
      )}
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body className="min-h-screen bg-white text-gray-900">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
