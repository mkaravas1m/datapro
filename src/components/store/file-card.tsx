import type { CsvFile } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag, ShoppingCart, BarChart3, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FileCardProps {
  file: CsvFile;
}

export function FileCard({ file }: FileCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl pr-4">{file.name}</CardTitle>
          <Badge variant="outline" className="text-primary border-primary whitespace-nowrap">
            <Tag className="mr-2 h-4 w-4" />${file.price.toFixed(2)}
          </Badge>
        </div>
        <CardDescription className="line-clamp-3">{file.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>{file.rowCount.toLocaleString()} rows</span>
          </div>
          <div className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            <span>Category: {file.category}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  );
}
