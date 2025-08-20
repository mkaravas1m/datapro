"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const cartIsEmpty = true; // Placeholder

  return (
    <div className="container py-12">
      <Card className="w-full max-w-3xl mx-auto">
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
                <Link href="/">
                  Continue Shopping <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ) : (
            <div>
              {/* Cart items will go here */}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
