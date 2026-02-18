import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NIVS Group',
  description: 'Import and distribution – wholesale to markets and local stores',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mk" suppressHydrationWarning>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
