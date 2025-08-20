
"use client";

import Link from "next/link";
import { Database, LogIn, UserPlus, ShoppingCart, ChevronDown, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export function Header() {
  const pathname = usePathname();
  const isLoggedIn = false; // This would be replaced with actual auth state
  const userRole = "Client"; // This would come from user data

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/company", label: "Company" },
    { href: "/shop", label: "Shop" },
  ];

  const examplesOfOurDataLinks = [
    { href: "/examples/business-data", label: "Business Data" },
    { href: "/examples/doctor-data", label: "Doctor Data" },
    { href: "/examples/high-income-individuals", label: "High Income Individuals" },
    { href: "/examples/medium-income-individuals", label: "Medium Income Individuals" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Database className="h-6 w-6 text-primary" />
            <span className="font-bold">DataSalesPro</span>
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
              <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors hover:text-foreground/80 focus-visible:ring-0", 
                  examplesOfOurDataLinks.some(l => pathname.startsWith(l.href)) ? "text-foreground" : "text-foreground/60"
                )}>
                  Examples Of Our Data <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {examplesOfOurDataLinks.map(link => (
                    <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href}>{link.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
        <div className="ml-auto flex items-center justify-end space-x-2">
          {isLoggedIn ? (
            <>
              <Button asChild variant="ghost" size="icon">
                <Link href="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Cart</span>
                </Link>
              </Button>
              {userRole === "Admin" ? (
                <Button asChild variant="outline">
                  <Link href="/admin">
                    <LayoutGrid className="mr-2 h-4 w-4" /> Admin Panel
                  </Link>
                </Button>
              ) : (
                  <Button asChild variant="outline">
                  <Link href="/dashboard">
                    <LayoutGrid className="mr-2 h-4 w-4" /> My Account
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
              <Button asChild variant="ghost" size="icon">
                <Link href="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Cart</span>
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
