import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MediSure: Your Health Insurance Eligibility Guide',
  description: 'Find the government health insurance schemes that fit your needs.',
  openGraph: {
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex flex-col min-h-screen">
          <header className="bg-background border-b py-4">
            <div className="container mx-auto px-4">
              <img src="/logo.png" alt="MediSure Logo" className="h-8" />
            </div>
          </header>
          <main className="flex-grow">
            {children}
          </main>
          <footer className="bg-background border-t py-4">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
              <p>&copy; 2024 MediSure. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
