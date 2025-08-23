import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Zap, PlusCircle, ArrowRight } from "lucide-react";
import type { ExclusiveLeadBatch, Profile } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export default async function ExclusiveLeadsPage() {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    let userBalance: number | null = null;
    if (user) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
        userBalance = profile?.balance ?? 0;
    }

    const { data: leadBatchesData } = await supabase
        .from('exclusive_lead_batches')
        .select('*')
        .order('created_at', { ascending: false });

    const leadBatches: ExclusiveLeadBatch[] = leadBatchesData || [];

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
                    {user && userBalance !== null && (
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
                    )}
                </div>
                <div className="md:col-span-2">
                    <h2 className="pb-4 text-2xl font-bold tracking-tight border-b">Available Lead Campaigns</h2>
                    <div className="mt-6 space-y-6">
                        {leadBatches.map(batch => (
                            <Card key={batch.id} className="transition-all duration-300 hover:shadow-primary/10 hover:shadow-lg">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="max-w-lg">
                                            <CardTitle className="text-xl">{batch.name}</CardTitle>
                                            <CardDescription className="mt-1">Price per lead: ${batch.price_per_lead.toFixed(2)}</CardDescription>
                                        </div>
                                         <Badge variant={batch.status === 'available' ? 'default' : 'secondary'}>{batch.status === 'available' ? 'Active' : 'Sold Out'}</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Leads Remaining</p>
                                            <p className="text-2xl font-semibold">{batch.available_leads.toLocaleString()} / {batch.total_leads.toLocaleString()}</p>
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
