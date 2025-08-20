import { Database } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Database className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">DataSalesPro</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              The easiest way to buy and sell high-quality data and leads.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Datasets</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary">Browse All</Link></li>
              <li><Link href="#" className="hover:text-primary">Business Data</Link></li>
              <li><Link href="#" className="hover:text-primary">Financial Data</Link></li>
              <li><Link href="#" className="hover:text-primary">Real Estate Data</Link></li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary">Contact</Link></li>
              <li><Link href="/login" className="hover:text-primary">Sign In</Link></li>
              <li><Link href="/admin" className="hover:text-primary">Admin Panel</Link></li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} DataSalesPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
