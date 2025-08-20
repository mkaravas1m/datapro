"use client";

import Link from "next/link";
import { Database, LayoutGrid, LogIn, UserPlus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const isLoggedIn = false; // This would be replaced with actual auth state
  const userRole = "Client"; // This would come from user data

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Database className="h-6 w-6 text-primary" />
            <span className="font-bold">DataSalesPro</span>
          </Link>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            <Link
              href="/"
              className="transition-colors hover:text-foreground/80 text-foreground"
            >
              CSV Store
            </Link>
            <Link
              href="/exclusive-leads"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Exclusive Leads
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {isLoggedIn ? (
            <>
              {userRole === "Admin" ? (
                <Button asChild variant="outline">
                  <Link href="/admin">
                    <LayoutGrid className="mr-2 h-4 w-4" /> Admin Panel
                  </Link>
                </Button>
              ) : (
                <Button asChild variant="outline">
                  <Link href="/dashboard">
                    <LayoutGrid className="mr-2 h-4 w-4" /> Dashboard
                  </Link>
                </Button>
              )}
            </>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href="/signup">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
