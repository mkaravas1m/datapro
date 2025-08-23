import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Order, Transaction, Profile } from "@/lib/types";
import { Download, ArrowUpRight, DollarSign } from "lucide-react";
import Link from "next/link";
import { AddFundsDialog } from "@/components/dashboard/add-funds-dialog";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardClientContent } from "@/components/dashboard/dashboard-client-content";

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?message=Please log in to view your dashboard.");
  }

  const { data: profileData } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  
  const profile: Profile | null = profileData;

  const { data: ordersData } = await supabase
    .from('orders')
    .select('*, file:csv_files ( name )')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
  const orders: Order[] = ordersData as Order[] || [];

  const { data: transactionsData } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
  const transactions: Transaction[] = transactionsData || [];
  
  const userBalance = profile?.balance ?? 0;

  return (
    <DashboardClientContent
      user={user}
      profile={profile}
      orders={orders}
      transactions={transactions}
      userBalance={userBalance}
    />
  );
}
