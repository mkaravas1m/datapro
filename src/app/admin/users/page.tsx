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

const mockUsers = [
    { id: 'USR001', name: 'Liam Johnson', email: 'liam@example.com', role: 'Client', joined: '2023-06-23' },
    { id: 'USR002', name: 'Olivia Smith', email: 'olivia@example.com', role: 'Client', joined: '2023-06-24' },
    { id: 'USR003', name: 'Noah Williams', email: 'noah@example.com', role: 'Client', joined: '2023-06-25' },
    { id: 'USR004', name: 'Admin User', email: 'admin@example.com', role: 'Admin', joined: '2023-01-15' },
    { id: 'USR005', name: 'Staff Member', email: 'staff@example.com', role: 'Staff', joined: '2023-03-10' },
];

export default function UsersPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Customers</h1>
      </div>
      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Date Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.role === 'Admin' ? 'destructive' : user.role === 'Staff' ? 'secondary' : 'default'}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>{user.joined}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
