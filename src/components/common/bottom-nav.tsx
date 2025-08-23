
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Store, LayoutDashboard, User, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

export function BottomNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  const isLoggedIn = !!user;

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/store", label: "Store", icon: Store },
    isLoggedIn 
      ? { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard }
      : { href: "/login", label: "Login", icon: LogIn },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t border-border">
      <div className={`grid h-full max-w-lg grid-cols-${navItems.length} mx-auto font-medium`}>
        {navItems.map((item) => {
          if (!item) return null;
          const isActive = (item.href === "/" && pathname === item.href) || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "inline-flex flex-col items-center justify-center px-5 hover:bg-muted/50 group",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
