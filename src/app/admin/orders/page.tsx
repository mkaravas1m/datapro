"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mockOrders = [
    { id: 'ORD001', customer: 'Liam Johnson', email: 'liam@example.com', date: '2023-06-23', amount: 250.00, status: 'Approved' },
    { id: 'ORD002', customer: 'Olivia Smith', email: 'olivia@example.com', date: '2023-06-24', amount: 150.00, status: 'Approved' },
    { id: 'ORD003', customer: 'Noah Williams', email: 'noah@example.com', date: '2023-06-25', amount: 350.00, status: 'Declined' },
    { id: 'ORD004', customer: 'Emma Brown', email: 'emma@example.com', date: '2023-06-26', amount: 450.00, status: 'Approved' },
];

export default function OrdersPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Orders</h1>
      </div>
      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>${order.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={order.status === 'Approved' ? 'default' : 'destructive'}>
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
