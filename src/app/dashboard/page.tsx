import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Order, Transaction } from "@/lib/types";
import { Download, ArrowUpRight } from "lucide-react";

const mockOrders: Order[] = [
  { id: "ORD001", fileId: "1", fileName: "USA B2B Company Leads", orderDate: "2023-06-23", amount: 499.99, status: 'paid', invoiceUrl: '#', downloadUrl: '#' },
  { id: "ORD002", fileId: "3", fileName: "Top 10,000 Mobile Game Player Profiles", orderDate: "2023-05-15", amount: 250.00, status: 'paid', invoiceUrl: '#', downloadUrl: '#' },
];

const mockTransactions: Transaction[] = [
    { id: 'TRN001', date: '2023-07-01', type: 'deposit', amount: 500, description: 'Stripe Deposit' },
    { id: 'TRN002', date: '2023-07-05', type: 'debit', amount: -50, description: 'Purchase: 500 Exclusive Leads' },
    { id: 'TRN003', date: '2023-07-10', type: 'deposit', amount: 200, description: 'Admin Credit' },
];

export default function DashboardPage() {
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>File Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockOrders.map(order => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell className="font-medium">{order.fileName}</TableCell>
                      <TableCell>{order.orderDate}</TableCell>
                      <TableCell>${order.amount.toFixed(2)}</TableCell>
                      <TableCell><Badge variant={order.status === 'paid' ? 'default' : 'destructive'}>{order.status}</Badge></TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" asChild>
                          <a href={order.downloadUrl}>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </a>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

           <Card>
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>
                        Your account balance history.
                    </CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                    <a href="/exclusive-leads">
                        Buy Leads
                        <ArrowUpRight className="h-4 w-4" />
                    </a>
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockTransactions.map((t) => (
                             <TableRow key={t.id}>
                                <TableCell>{t.date}</TableCell>
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
        
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Name</p>
                <p className="text-muted-foreground">John Doe</p>
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-muted-foreground">john.doe@example.com</p>
              </div>
              <Button variant="outline" className="w-full">Edit Profile</Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
