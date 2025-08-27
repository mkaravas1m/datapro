
"use client";

import { usePathname } from 'next/navigation';
import { Header } from './header';
import { Footer } from './footer';

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const isAdminOrDashboard = pathname.startsWith('/admin') || pathname.startsWith('/dashboard');

    return (
        <div className="relative flex min-h-screen flex-col bg-background text-foreground">
            {!isAdminOrDashboard && <Header />}
            <main className="flex-1">{children}</main>
            {!isAdminOrDashboard && <Footer />}
        </div>
    );
}
