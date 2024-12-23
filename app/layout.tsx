import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';

const roboto = Roboto({
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Covearch',
  description: 'Search engine for Covid-19 related information',
  keywords: ['covid', 'covid-19', 'coronavirus', 'search', 'engine'],
  openGraph: {
    title: 'Covearch',
    description: 'Search engine for Covid-19 related information',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/icon.png`,
        width: 512,
        height: 512,
        alt: 'Covearch',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>{children}</body>
    </html>
  );
}
