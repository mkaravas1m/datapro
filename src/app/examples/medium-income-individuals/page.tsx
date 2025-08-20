import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MediumIncomeIndividualsPage() {
  return (
    <div className="container py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Example: Medium Income Individuals Data</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This page will showcase an example of our Medium Income Individuals datasets, including sample rows and data schema.</p>
        </CardContent>
      </Card>
    </div>
  );
}
