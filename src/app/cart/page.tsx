"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import type { CsvFile } from "@/lib/types";
import { ShoppingCart, ArrowRight, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock data, this would come from a global state/context in a real app
const mockCartItems: (CsvFile & { quantity: number })[] = [
  {
    id: "1",
    name: "USA B2B Company Leads",
    description: "A comprehensive list of over 50,000 B2B companies...",
    category: "Business",
    rowCount: 50000,
    price: 499.99,
    status: "available",
    sample: [],
    quantity: 1,
  },
  {
    id: "3",
    name: "Top 10,000 Mobile Game Player Profiles",
    description: "Demographic and engagement data for top mobile game players...",
    category: "Gaming",
    rowCount: 10000,
    price: 250.00,
    status: "available",
    sample: [],
    quantity: 1,
  },
];


export default function CartPage() {
  const cartItems = mockCartItems; // Placeholder
  const cartIsEmpty = cartItems.length === 0;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% tax placeholder
  const total = subtotal + tax;

  return (
    <div className="container py-12">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <ShoppingCart className="h-6 w-6" />
            Your Shopping Cart
          </CardTitle>
        </CardHeader>
        <CardContent>
          {cartIsEmpty ? (
            <div className="text-center text-muted-foreground py-12">
              <p className="mb-4">Your cart is currently empty.</p>
              <Button asChild>
                <Link href="/shop">
                  Continue Shopping <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-[2fr_1fr] gap-8">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-4 p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Image 
                        src={`https://placehold.co/80x80.png`} 
                        alt={item.name}
                        data-ai-hint="dataset"
                        width={80}
                        height={80}
                        className="rounded-md"
                      />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <p className="font-medium">${item.price.toFixed(2)}</p>
                       <Button variant="ghost" size="icon" className="text-muted-foreground">
                         <X className="h-4 w-4" />
                       </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                         <div className="flex justify-between">
                            <span>Taxes (8%)</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button className="w-full">Proceed to Checkout</Button>
                         <Button variant="outline" className="w-full" asChild>
                            <Link href="/shop">Continue Shopping</Link>
                        </Button>
                    </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
