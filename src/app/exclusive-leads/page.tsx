import { auth } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Zap, PlusCircle, ArrowRight } from "lucide-react";
import type { ExclusiveLeadBatch } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

const mockLeadBatches: ExclusiveLeadBatch[] = [
    { id: '1', name: 'USA B2C High-Income Homeowners', pricePerLead: 1.25, totalLeads: 10000, availableLeads: 7500, status: 'available' },
    { id: '2', name: 'UK Tech Startups - Pre-seed', pricePerLead: 2.50, totalLeads: 5000, availableLeads: 1200, status: 'available' },
    { id: '3', name: 'Canada Real Estate Investors', pricePerLead: 1.75, totalLeads: 8000, availableLeads: 0, status: 'sold_out' },
    { id: '4', name: 'Australia E-commerce Founders', pricePerLead: 2.10, totalLeads: 6000, availableLeads: 6000, status: 'available' },
];


export default async function ExclusiveLeadsPage() {
    const session = await auth();
    if (!session) {
        redirect('/login');
    }

    const userBalance = 750.50; // Mock data

    return (
        <div className="container py-8 md:py-12">
            <section className="text-center">
                <h1 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl">Exclusive Leads Program</h1>
                <p className="max-w-3xl mx-auto mt-6 text-lg text-muted-foreground md:text-xl">
                    Fuel your sales pipeline with a steady stream of exclusive, high-quality leads generated just for you. Top up your balance and never miss an opportunity.
                </p>
            </section>

            <section className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-3">
                <div className="md:col-span-1">
                    <Card className="sticky top-24">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Your Balance</CardTitle>
                             <DollarSign className="w-6 h-6 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-5xl font-bold tracking-tight">${userBalance.toFixed(2)}</p>
                            <p className="text-sm text-muted-foreground">Available for lead purchases</p>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">
                                <PlusCircle className="mr-2" /> Add Funds
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
                <div className="md:col-span-2">
                    <h2 className="pb-4 text-2xl font-bold tracking-tight border-b">Available Lead Campaigns</h2>
                    <div className="mt-6 space-y-6">
                        {mockLeadBatches.map(batch => (
                            <Card key={batch.id} className="transition-all duration-300 hover:shadow-primary/10 hover:shadow-lg">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="max-w-lg">
                                            <CardTitle className="text-xl">{batch.name}</CardTitle>
                                            <CardDescription className="mt-1">Price per lead: ${batch.pricePerLead.toFixed(2)}</CardDescription>
                                        </div>
                                         <Badge variant={batch.status === 'available' ? 'default' : 'secondary'}>{batch.status === 'available' ? 'Active' : 'Sold Out'}</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Leads Remaining</p>
                                            <p className="text-2xl font-semibold">{batch.availableLeads.toLocaleString()} / {batch.totalLeads.toLocaleString()}</p>
                                        </div>
                                        <Button disabled={batch.status !== 'available'}>
                                            Start Campaign <ArrowRight className="ml-2" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
