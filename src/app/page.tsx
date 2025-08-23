import { Button } from "@/components/ui/button";
import { ArrowRight, Search, TrendingUp, ShieldCheck, Database } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FileCard } from "@/components/store/file-card";
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
    status: "available",
    sample: [],
  },
];


const FeatureCard = ({ icon, title, description }: { icon: React.ElementType, title: string, description: string }) => {
  const Icon = icon;
  return (
    <Card className="bg-secondary/50 border-white/10 text-center">
      <CardHeader className="flex flex-col items-center gap-4">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
          <Icon className="w-8 h-8" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default function Home() {
  return (
    <div className="w-full">
       <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute top-0 left-0 -z-10 h-96 w-96 glow-effect"></div>
      <div className="absolute bottom-0 right-0 -z-10 h-96 w-96 glow-effect"></div>

      <section className="py-20 md:py-32 text-center">
        <div className="container">
          <h1 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            The Premier Marketplace for Quality Datasets
          </h1>
          <p className="max-w-3xl mx-auto mt-6 text-lg text-muted-foreground md:text-xl">
            Empower your business with high-quality, verified datasets. Find the data you need to drive growth, innovation, and strategic decisions.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 mt-8">
            <div className="relative w-full max-w-lg">
                <Input placeholder="Search for datasets..." className="h-12 pl-12 pr-28 rounded-full" />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Button size="lg" className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full h-10 px-6">
                    Search
                </Button>
            </div>
             <p className="text-sm text-muted-foreground mt-2">
                <Link href="/store" className="underline hover:text-primary">
                Browse all datasets
                </Link>
            </p>
          </div>
        </div>
      </section>

      <section id="featured" className="py-12 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Featured Datasets</h2>
            <p className="max-w-2xl mx-auto mt-3 text-muted-foreground">
              Explore some of our most popular and recently added datasets.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
             {mockFiles.map(file => (
                <FileCard key={file.id} file={file} />
             ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg">
                <Link href="/store">Explore Store <ArrowRight className="ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="features" className="py-12 md:py-24 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Why Choose DataSalesPro?</h2>
            <p className="max-w-2xl mx-auto mt-3 text-muted-foreground">
              We provide the tools and trust you need to succeed with data.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard icon={ShieldCheck} title="Verified Quality" description="Every dataset is meticulously verified for accuracy and completeness, so you can trust the data you purchase." />
            <FeatureCard icon={TrendingUp} title="Drive Growth" description="Leverage our diverse datasets to uncover market trends, generate leads, and make smarter business decisions." />
            <FeatureCard icon={Database} title="Instant Access" description="Get immediate access to your purchased datasets. No waiting, no hassle. Download and start working right away." />
          </div>
        </div>
      </section>

       <section className="py-12 md:py-24">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to find your data?</h2>
          <p className="max-w-xl mx-auto mt-3 text-lg text-muted-foreground">
            Join thousands of businesses already using our datasets to gain a competitive edge.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="/signup">Get Started Now <ArrowRight className="ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
