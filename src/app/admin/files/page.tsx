"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ToggleLeft, ToggleRight } from "lucide-react";
import type { CsvFile } from "@/lib/types";

const mockFiles: CsvFile[] = [
  {
    id: "1",
    name: "USA B2B Company Leads",
    description: "A comprehensive list of over 50,000 B2B companies in the United States, including contact information, industry, and revenue.",
    category: "Business",
    rowCount: 50000,
    price: 499.99,
    status: "available",
    sample: [],
  },
  {
    id: "2",
    name: "Global E-commerce Transactions Q1 2024",
    description: "Anonymized transaction data from e-commerce platforms worldwide for the first quarter of 2024. Ideal for market analysis.",
    category: "Finance",
    rowCount: 1200000,
    price: 1299.00,
    status: "available",
    sample: [],
  },
  {
    id: "3",
    name: "Top 10,000 Mobile Game Player Profiles",
    description: "Demographic and engagement data for top mobile game players. Includes preferred genres, session length, and IAP history.",
    category: "Gaming",
    rowCount: 10000,
    price: 250.00,
    status: "available",
    sample: [],
  },
  {
    id: "4",
    name: "Real Estate Listings - California (Jan 2024)",
    description: "Detailed property listings from across California for January 2024. Contains prices, locations, square footage, and more.",
    category: "Real Estate",
    rowCount: 85000,
    price: 600.00,
    status: "sold",
    sample: [],
  },
    {
    id: "5",
    name: "Startup Funding Rounds 2023",
    description: "A dataset of venture capital funding rounds for tech startups throughout 2023. Includes company, investors, and round size.",
    category: "Technology",
    rowCount: 15000,
    price: 350.00,
    status: "sold",
    sample: [],
  },
  {
    id: "6",
    name: "Healthcare Professional Directory",
    description: "Contact and specialization data for over 100,000 healthcare professionals in North America. Verified and updated monthly.",
    category: "Healthcare",
    rowCount: 100000,
    price: 950.00,
    status: "archived",
    sample: [],
  },
];


export default function FilesPage() {
  const [files, setFiles] = useState<CsvFile[]>(mockFiles);

  const toggleFileStatus = (fileId: string, currentStatus: CsvFile['status']) => {
    setFiles(files.map(file => {
      if (file.id === fileId) {
        if (currentStatus === 'sold') return { ...file, status: 'available' };
        if (currentStatus === 'available') return { ...file, status: 'archived' };
        if (currentStatus === 'archived') return { ...file, status: 'available' };
      }
      return file;
    }));
  };

  const getStatusBadgeVariant = (status: CsvFile['status']) => {
    switch(status) {
      case 'available': return 'default';
      case 'sold': return 'destructive';
      case 'archived': return 'secondary';
      default: return 'outline';
    }
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Files</h1>
      </div>
      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Rows</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.id}>
                <TableCell className="font-medium">{file.name}</TableCell>
                <TableCell>{file.category}</TableCell>
                <TableCell>${file.price.toFixed(2)}</TableCell>
                <TableCell>{file.rowCount.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(file.status)}>
                    {file.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onSelect={() => toggleFileStatus(file.id, file.status)}>
                        {file.status === 'sold' ? <><ToggleRight className="mr-2 h-4 w-4" /> Re-list</> : <><ToggleLeft className="mr-2 h-4 w-4" /> Unlist</>}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}