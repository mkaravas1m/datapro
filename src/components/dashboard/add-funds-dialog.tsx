
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
import { addFunds } from "@/lib/actions/funds";

export function AddFundsDialog() {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();

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
    const result = await addFunds(numericAmount);
    setIsPending(false);

    if (result.error) {
      toast({
        variant: "destructive",
        title: "Error Adding Funds",
        description: result.error,
      });
    } else {
      toast({
        title: "Success",
        description: `$${numericAmount.toFixed(2)} has been added to your balance.`,
      });
      setOpen(false);
      setAmount("");
    }
  };

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
              Enter the amount you would like to add. This is a simulation and no real payment will be processed.
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
                min="0.01"
                step="0.01"
                required
              />
            </div>
          </div>
          <DialogFooter>
             <DialogClose asChild>
                <Button type="button" variant="secondary">
                    Cancel
                </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Funds
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
