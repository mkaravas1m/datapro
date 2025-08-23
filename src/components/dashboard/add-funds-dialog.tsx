
"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { createCheckoutSession } from "@/lib/actions/stripe";

export function AddFundsDialog() {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleAddFunds = async (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Amount",
        description: "Please enter a valid positive number.",
      });
      return;
    }

    setIsPending(true);
    
    try {
      const { url, error } = await createCheckoutSession(numericAmount);
      if (error || !url) {
        throw new Error(error || "Failed to create checkout session.");
      }
      // Redirect to Stripe checkout
      window.location.href = url;
    } catch (error: any) {
       toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Something went wrong.",
      });
       setIsPending(false);
    }
  };
  
  if (!user) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <PlusCircle className="mr-2" /> Add Funds
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleAddFunds}>
          <DialogHeader>
            <DialogTitle>Add Funds to Your Balance</DialogTitle>
            <DialogDescription>
              Enter the amount you would like to add. You will be redirected to Stripe to complete the payment.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount ($)
              </Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="col-span-3"
                placeholder="e.g., 50.00"
                min="5"
                step="0.01"
                required
              />
            </div>
          </div>
          <DialogFooter>
             <DialogClose asChild>
                <Button type="button" variant="secondary" disabled={isPending}>
                    Cancel
                </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending || !amount}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Proceed to Payment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
