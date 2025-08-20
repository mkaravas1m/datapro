import type { CsvFile } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag, BarChart3, Folder, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FileCardProps {
  file: CsvFile;
}

export function FileCard({ file }: FileCardProps) {
  return (
    <Card className="flex flex-col h-full transition-shadow duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl pr-4">{file.name}</CardTitle>
        <CardDescription className="line-clamp-2 h-10">{file.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <Badge variant="outline">
            <Tag className="mr-1.5 h-4 w-4" />${file.price.toFixed(2)}
          </Badge>
          <Badge variant="outline">
            <BarChart3 className="mr-1.5 h-4 w-4" />{file.rowCount.toLocaleString()} rows
          </Badge>
           <Badge variant="outline">
            <Folder className="mr-1.5 h-4 w-4" />{file.category}
          </Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="secondary" className="w-full">
          View <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}