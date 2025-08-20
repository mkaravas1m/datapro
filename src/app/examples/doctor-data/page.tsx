import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DoctorDataPage() {
  return (
    <div className="container py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Example: Doctor Data</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This page will showcase an example of our Doctor Data datasets, including sample rows and data schema.</p>
        </CardContent>
      </Card>
    </div>
  );
}
