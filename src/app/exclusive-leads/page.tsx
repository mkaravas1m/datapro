import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { ExclusiveLeadBatch } from "@/lib/types";
import { DollarSign, ShoppingCart } from "lucide-react";

const mockBatches: ExclusiveLeadBatch[] = [
    { id: '1', name: 'Hot SaaS Trial Signups - USA', pricePerLead: 2.50, totalLeads: 1000, availableLeads: 850, status: 'available' },
    { id: '2', name: 'Real Estate Investors - FL', pricePerLead: 5.00, totalLeads: 500, availableLeads: 200, status: 'available' },
    { id: '3', name: 'C-Level Executives in Tech', pricePerLead: 10.00, totalLeads: 250, availableLeads: 0, status: 'sold_out' },
];

export default function ExclusiveLeadsPage() {
    const currentBalance = 450.00;

    return (
        <div className="container py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Exclusive Leads</h1>
                    <p className="text-muted-foreground">Purchase fresh, exclusive leads. Sold only once.</p>
                </div>
                 <Card className="mt-4 md:mt-0">
                    <CardHeader className="flex flex-row items-center justify-between p-4">
                        <CardTitle className="text-sm font-medium">Your Balance</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold">${currentBalance.toFixed(2)}</div>
                    </CardContent>
                </Card>
            </div>
            
            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                     <Card>
                        <CardHeader>
                            <CardTitle>Available Lead Batches</CardTitle>
                            <CardDescription>Select a batch and quantity to purchase.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Batch Name</TableHead>
                                        <TableHead>Price/Lead</TableHead>
                                        <TableHead>Available</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockBatches.filter(b => b.status === 'available').map(batch => (
                                        <TableRow key={batch.id}>
                                            <TableCell className="font-medium">{batch.name}</TableCell>
                                            <TableCell>${batch.pricePerLead.toFixed(2)}</TableCell>
                                            <TableCell>{batch.availableLeads.toLocaleString()}</TableCell>
                                            <TableCell>
                                                <Input type="number" defaultValue="100" className="w-24" />
                                            </TableCell>
                                            <TableCell>
                                                <Button size="sm">
                                                    <ShoppingCart className="h-4 w-4 mr-2" />
                                                    Buy
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Add Funds</CardTitle>
                            <CardDescription>Deposit funds to your account balance via Stripe.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="amount">Amount ($)</Label>
                                <Input id="amount" type="number" placeholder="e.g., 500" />
                            </div>
                             <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                                <DollarSign className="h-4 w-4 mr-2" />
                                Deposit Funds
                            </Button>
                        </CardContent>
                         <CardFooter>
                            <p className="text-xs text-muted-foreground">
                                Secure payments processed by Stripe. You will be redirected to complete your purchase.
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
