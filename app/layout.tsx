import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Nathan Akili AI',
  description: 'Toute l\'intelligence artificielle au même endroit.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gradient-to-b from-black to-slate-900 text-white">
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
