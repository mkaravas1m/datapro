"use client";

import Link from "next/link";
import { Package2, LogIn, UserPlus, Menu, ShoppingCart, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "../ui/sheet";
import React from "react";
import { Separator } from "../ui/separator";

export function Header() {
  const pathname = usePathname();
  const isLoggedIn = false; // This would be replaced with actual auth state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { href: "/store", label: "Store" },
    { href: "/#featured", label: "Featured" },
    { href: "/#features", label: "Why Us" },
    { href: "/#faq", label: "FAQ" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex md:items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Package2 className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block">DataSalesPro</span>
          </Link>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn("transition-colors hover:text-foreground/80", 
                  pathname === link.href ? "text-foreground" : "text-foreground/60"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Menu */}
        <div className="flex w-full items-center justify-between md:hidden">
            <Link href="/" className="flex items-center space-x-2">
                <Package2 className="h-6 w-6 text-primary" />
                <span className="font-bold sm:inline-block">DataSalesPro</span>
            </Link>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                 <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                 <Link
                    href="/"
                    className="mr-6 flex items-center space-x-2 mb-8"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Package2 className="h-6 w-6 text-primary" />
                    <span className="font-bold">DataSalesPro</span>
                  </Link>
                <div className="flex flex-col h-full">
                    <div className="flex flex-col pr-6">
                        {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn("py-2 text-lg transition-colors hover:text-foreground/80", 
                            pathname === link.href ? "text-foreground" : "text-foreground/60"
                            )}
                        >
                            {link.label}
                        </Link>
                        ))}
                    </div>

                    <Separator className="my-4" />

                    <div className="flex flex-col pr-6">
                         {!isLoggedIn ? (
                            <>
                                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 py-2 text-lg text-foreground/60 hover:text-foreground/80"><LogIn className="h-5 w-5" /> Login</Link>
                                <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 py-2 text-lg text-foreground/60 hover:text-foreground/80"><UserPlus className="h-5 w-5" /> Sign Up</Link>
                            </>
                         ) : (
                             <Link href={'/dashboard'} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 py-2 text-lg text-foreground/60 hover:text-foreground/80"><LayoutDashboard className="h-5 w-5" /> Dashboard</Link>
                         )}
                    </div>
                </div>
              </SheetContent>
            </Sheet>
        </div>

        <div className="ml-auto hidden items-center space-x-1 sm:space-x-2 md:flex">
          {!isLoggedIn ? (
            <>
              <Button asChild variant="ghost">
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Link>
              </Button>
              <Button asChild>
                <Link href="/signup">
                  Sign Up <UserPlus className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </>
          ) : (
             <>
              <Button asChild variant="ghost" size="icon">
                <Link href="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Cart</span>
                </Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
