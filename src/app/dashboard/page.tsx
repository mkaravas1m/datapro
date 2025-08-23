
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Order, Transaction, Profile } from "@/lib/types";
import { Download, ArrowUpRight, DollarSign, PlusCircle } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  const { data: ordersData } = await supabase
    .from('orders')
    .select(`
      *,
      file:csv_files ( name )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
  const orders: Order[] = ordersData || [];

  const { data: transactions } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
    
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { balance: userBalance = 0, ...userProfile }: Profile = profile || { balance: 0 };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>
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
              </div>
            </CardContent>
          </Card>

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
                        {(transactions || []).map((t) => (
                             <TableRow key={t.id}>
                                <TableCell className="hidden sm:table-cell">{new Date(t.created_at || '').toLocaleDateString()}</TableCell>
                                <TableCell className="font-medium">{t.description}</TableCell>
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
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        </div>
        
        <div className="lg:col-span-1 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Name</p>
                <p className="text-muted-foreground">{userProfile?.full_name ?? 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
              <Button variant="outline" className="w-full">Edit Profile</Button>
            </CardContent>
          </Card>
          
           <Card>
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
              <CardFooter className="flex-col items-start gap-2">
                  <Button className="w-full" asChild>
                    <Link href="/exclusive-leads"><PlusCircle className="mr-2 h-4 w-4"/> Add Funds</Link>
                  </Button>
              </CardFooter>
          </Card>

        </div>

      </div>
    </div>
  )
}
