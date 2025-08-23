
import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/common/header';
import { Footer } from '@/components/common/footer';
import { BottomNav } from '@/components/common/bottom-nav';
import { createClient } from '@/lib/supabase/server';
import { AuthProvider } from '@/hooks/use-auth';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'DataSalesPro - The Premier Marketplace for Datasets',
  description: 'Buy and sell high-quality datasets for your business needs.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <html lang="en" suppressHydrationWarning>
       <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('min-h-screen bg-background font-sans antialiased dark', inter.variable)}>
        <AuthProvider user={data.user}>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pb-20 lg:pb-0">{children}</main>
            <Footer />
            <BottomNav />
          </div>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
