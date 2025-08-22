
"use client";

import Link from "next/link";
import { Database, LogIn, UserPlus, ShoppingCart, ChevronDown, LayoutGrid, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Separator } from "../ui/separator";

export function Header() {
  const pathname = usePathname();
  const isLoggedIn = false; // This would be replaced with actual auth state
  const userRole = "Client"; // This would come from user data
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

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
        <div className="mr-4 hidden md:flex md:items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Database className="h-6 w-6 text-primary" />
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
              <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors hover:text-foreground/80 focus-visible:ring-0", 
                  examplesOfOurDataLinks.some(l => pathname.startsWith(l.href)) ? "text-foreground" : "text-foreground/60"
                )}>
                  Examples <ChevronDown className="h-4 w-4" />
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

        {/* Mobile Menu */}
        <div className="flex w-full items-center justify-between md:hidden">
            <Link href="/" className="flex items-center space-x-2">
                <Database className="h-6 w-6 text-primary" />
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
                 <Link
                    href="/"
                    className="mr-6 flex items-center space-x-2 mb-8"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Database className="h-6 w-6 text-primary" />
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
                         <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="examples" className="border-b-0">
                                <AccordionTrigger className="py-2 text-lg font-semibold text-foreground/60 hover:text-foreground/80 hover:no-underline [&[data-state=open]]:text-foreground">Examples</AccordionTrigger>
                                <AccordionContent>
                                    <div className="pl-4 flex flex-col gap-2">
                                        {examplesOfOurDataLinks.map(link => (
                                            <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="block text-muted-foreground hover:text-foreground/80">
                                                {link.label}
                                            </Link>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex flex-col pr-6">
                         {!isLoggedIn ? (
                            <>
                                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 py-2 text-lg text-foreground/60 hover:text-foreground/80"><LogIn className="h-5 w-5" /> Login</Link>
                                <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 py-2 text-lg text-foreground/60 hover:text-foreground/80"><UserPlus className="h-5 w-5" /> Sign Up</Link>
                            </>
                         ) : (
                             <Link href={userRole === 'Admin' ? '/admin' : '/dashboard'} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 py-2 text-lg text-foreground/60 hover:text-foreground/80"><LayoutGrid className="h-5 w-5" /> Dashboard</Link>
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
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
              <Button asChild>
                <Link href="/signup">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up
                </Link>
              </Button>
            </>
          ) : (
            <>
              {userRole === "Admin" ? (
                <Button asChild variant="outline">
                  <Link href="/admin">
                    <LayoutGrid className="mr-2 h-4 w-4" /> Admin
                  </Link>
                </Button>
              ) : (
                <Button asChild variant="outline">
                  <Link href="/dashboard">
                    <LayoutGrid className="mr-2 h-4 w-4" /> Account
                  </Link>
                </Button>
              )}
            </>
          )}

          <Button asChild variant="ghost" size="icon">
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
