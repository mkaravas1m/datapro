
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Order, Transaction, Profile } from "@/lib/types";
import { Download, ArrowUpRight, DollarSign, Loader2 } from "lucide-react";
import Link from "next/link";
import { AddFundsDialog } from "@/components/dashboard/add-funds-dialog";
import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";


interface DashboardClientContentProps {
    user: User;
    profile: Profile | null;
    orders: Order[];
    transactions: Transaction[];
    userBalance: number;
}

export function DashboardClientContent({ user, profile: initialProfile, orders: initialOrders, transactions: initialTransactions, userBalance: initialBalance }: DashboardClientContentProps) {
  
  const [profile, setProfile] = useState<Profile | null>(initialProfile);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [userBalance, setUserBalance] = useState<number>(initialBalance);


  useEffect(() => {
      const fetchAndSetData = () => {
        setProfile(initialProfile);
        setOrders(initialOrders);
        setTransactions(initialTransactions);
        setUserBalance(initialBalance);
      }
      fetchAndSetData();

      const supabase = createClient();
      const channel = supabase.channel('db-changes-dashboard')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles', filter: `id=eq.${user.id}` }, 
        async (payload) => {
           const { data: profileData } = await supabase.from('profiles').select('*').eq('id', user.id).single();
           setProfile(profileData);
           setUserBalance(profileData?.balance ?? 0);
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'transactions', filter: `user_id=eq.${user.id}` }, 
        async (payload) => {
           const { data: transactionsData } = await supabase.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
           setTransactions(transactionsData || []);
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      }

  }, [initialProfile, initialOrders, initialTransactions, initialBalance, user.id]);


  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>

      <div className="grid gap-8">
        <div className="grid gap-8 lg:grid-cols-3">
            <Card className="lg:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-md font-medium">Exclusive Leads Balance</CardTitle>
                  <DollarSign className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                  <div className="text-4xl font-bold">${userBalance.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">
                      Use this balance for exclusive lead campaigns.
                  </p>
              </CardContent>
              <CardFooter>
                  <AddFundsDialog />
              </CardFooter>
            </Card>
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Name</p>
                  <p className="text-muted-foreground">{profile?.full_name ?? 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
              </CardContent>
            </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View your past purchases and download files.</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Desktop Table */}
                <Table className="hidden md:table">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden sm:table-cell">Order ID</TableHead>
                      <TableHead>File Name</TableHead>
                      <TableHead className="hidden sm:table-cell">Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map(order => (
                      <TableRow key={order.id}>
                        <TableCell className="hidden sm:table-cell">{order.id}</TableCell>
                        <TableCell className="font-medium">{order.file?.name ?? 'N/A'}</TableCell>
                        <TableCell className="hidden sm:table-cell">{new Date(order.created_at || '').toLocaleDateString()}</TableCell>
                        <TableCell>${order.amount.toFixed(2)}</TableCell>
                        <TableCell><Badge variant={order.status === 'paid' ? 'default' : 'destructive'}>{order.status}</Badge></TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" asChild>
                            <a href="#">
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </a>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                     {orders.length === 0 && (
                      <TableRow>
                          <TableCell colSpan={6} className="text-center h-24">You haven't made any purchases yet.</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                {/* Mobile Card List */}
                <div className="grid gap-4 md:hidden">
                  {orders.map(order => (
                    <Card key={order.id} className="bg-secondary/50">
                      <CardHeader>
                        <CardTitle className="text-lg">{order.file?.name ?? 'N/A'}</CardTitle>
                        <CardDescription>
                            Order #{order.id} - {new Date(order.created_at || '').toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-bold">${order.amount.toFixed(2)}</p>
                            <Badge variant={order.status === 'paid' ? 'default' : 'destructive'}>{order.status}</Badge>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href="#">
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </a>
                          </Button>
                      </CardContent>
                    </Card>
                  ))}
                   {orders.length === 0 && (
                      <div className="text-center py-12">
                          <p>You haven't made any purchases yet.</p>
                      </div>
                    )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-1 space-y-8">
            <Card>
              <CardHeader className="flex flex-row items-center">
                  <div className="grid gap-2">
                      <CardTitle>Transaction History</CardTitle>
                      <CardDescription>
                          Your account balance history for exclusive leads.
                      </CardDescription>
                  </div>
                  <Button asChild size="sm" className="ml-auto gap-1">
                      <Link href="/exclusive-leads">
                          Manage Leads
                          <ArrowUpRight className="h-4 w-4" />
                      </Link>
                  </Button>
              </CardHeader>
              <CardContent>
                  <Table>
                      <TableHeader>
                          <TableRow>
                              <TableHead className="hidden sm:table-cell">Date</TableHead>
                              <TableHead>Description</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          {transactions.map((t) => (
                              <TableRow key={t.id}>
                                  <TableCell className="hidden sm:table-cell">{new Date(t.created_at || '').toLocaleDateString()}</TableCell>
                                  <TableCell className="font-medium text-xs">{t.description}</TableCell>
                                  <TableCell>
                                      <Badge variant="outline" className={t.type === 'deposit' ? 'text-green-600 border-green-600' : 'text-red-600 border-red-600'}>
                                          {t.type}
                                      </Badge>
                                  </TableCell>
                                  <TableCell className={`text-right font-medium ${t.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                      {t.amount > 0 ? '+' : ''}${Math.abs(t.amount).toFixed(2)}
                                  </TableCell>
                              </TableRow>
                          ))}
                          {transactions.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center h-24">No transactions yet.</TableCell>
                            </TableRow>
                          )}
                      </TableBody>
                  </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
