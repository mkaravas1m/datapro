
"use client";

import { useEffect, useState } from "react";
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
import { MoreHorizontal, Archive, ArchiveRestore } from "lucide-react";
import type { CsvFile } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { getFiles, updateFileStatus } from "@/lib/actions/files";
import { useToast } from "@/hooks/use-toast";

export default function FilesPage() {
  const [files, setFiles] = useState<CsvFile[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchFiles = async () => {
      const allFiles = await getFiles();
      setFiles(allFiles);
    };
    fetchFiles();
  }, []);

  const handleSetFileStatus = async (fileId: string, status: CsvFile['status']) => {
    const result = await updateFileStatus(fileId, status);
    if (result.error) {
      toast({
        variant: "destructive",
        title: "Error updating file",
        description: result.error,
      });
    } else {
      setFiles(files.map(file => file.id === fileId ? { ...file, status } : file));
      toast({
        title: "File status updated",
        description: `File has been set to ${status}.`,
      });
    }
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
      <Card className="rounded-lg border shadow-sm hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden lg:table-cell">Category</TableHead>
              <TableHead className="hidden sm:table-cell">Price</TableHead>
              <TableHead className="hidden sm:table-cell">Rows</TableHead>
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
                <TableCell className="hidden lg:table-cell">{file.category}</TableCell>
                <TableCell className="hidden sm:table-cell">${file.price.toFixed(2)}</TableCell>
                <TableCell className="hidden sm:table-cell">{file.rowCount?.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(file.status)} className="capitalize">
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
                       {(file.status === 'sold' || file.status === 'archived') && (
                        <DropdownMenuItem onSelect={() => handleSetFileStatus(file.id, 'available')}>
                          <ArchiveRestore className="mr-2 h-4 w-4" /> Relist / Unarchive
                        </DropdownMenuItem>
                      )}
                      {file.status === 'available' && (
                        <DropdownMenuItem onSelect={() => handleSetFileStatus(file.id, 'archived')}>
                          <Archive className="mr-2 h-4 w-4" /> Archive
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <div className="grid gap-4 md:hidden">
        {files.map(file => (
          <Card key={file.id} className="p-4 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{file.category}</p>
                </div>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      {(file.status === 'sold' || file.status === 'archived') && (
                        <DropdownMenuItem onSelect={() => handleSetFileStatus(file.id, 'available')}>
                          <ArchiveRestore className="mr-2 h-4 w-4" /> Relist / Unarchive
                        </DropdownMenuItem>
                      )}
                      {file.status === 'available' && (
                        <DropdownMenuItem onSelect={() => handleSetFileStatus(file.id, 'archived')}>
                          <Archive className="mr-2 h-4 w-4" /> Archive
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
              </div>
               <div className="flex items-center justify-between text-sm">
                  <Badge variant={getStatusBadgeVariant(file.status)} className="capitalize">
                    {file.status}
                  </Badge>
                 <div className="text-right">
                    <p className="font-semibold">${file.price.toFixed(2)}</p>
                    <p className="text-muted-foreground">{file.rowCount?.toLocaleString()} rows</p>
                 </div>
               </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
