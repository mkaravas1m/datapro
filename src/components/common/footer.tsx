import { Package2 } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Package2 className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">DataSalesPro</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              The premier marketplace for quality datasets.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/store" className="hover:text-primary">Store</Link></li>
              <li><Link href="/#featured" className="hover:text-primary">Featured</Link></li>
              <li><Link href="/#features" className="hover:text-primary">Why Us</Link></li>
              <li><Link href="/#faq" className="hover:text-primary">FAQ</Link></li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Account</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/login" className="hover:text-primary">Login</Link></li>
              <li><Link href="/signup" className="hover:text-primary">Sign Up</Link></li>
              <li><Link href="/dashboard" className="hover:text-primary">My Dashboard</Link></li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/terms-of-service" className="hover:text-primary">Terms of Service</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} DataSalesPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
