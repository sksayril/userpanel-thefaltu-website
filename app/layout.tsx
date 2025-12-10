import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'XHamster - Free Video Streaming Platform',
  description: 'Watch trending videos in HD and 4K quality',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
