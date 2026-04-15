import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ARU STAY',
  description: 'A calm base in Seoul.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
