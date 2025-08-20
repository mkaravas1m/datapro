import { FileCard } from "@/components/store/file-card";
import type { CsvFile } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, HandCoins, Download, Briefcase, BarChart, Mail, Building } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

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
    {
    id: "5",
    name: "Startup Funding Rounds 2023",
    description: "A dataset of venture capital funding rounds for tech startups throughout 2023. Includes company, investors, and round size.",
    category: "Technology",
    rowCount: 15000,
    price: 350.00,
    status: "available",
    sample: [],
  },
  {
    id: "6",
    name: "Healthcare Professional Directory",
    description: "Contact and specialization data for over 100,000 healthcare professionals in North America. Verified and updated monthly.",
    category: "Healthcare",
    rowCount: 100000,
    price: 950.00,
    status: "available",
    sample: [],
  },
];


const HowItWorksStep = ({ icon, title, description }: { icon: React.ElementType, title: string, description: string }) => {
  const Icon = icon;
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10 text-primary">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default function Home() {
  const availableFiles = mockFiles.filter(f => f.status === 'available').slice(0, 3);
  const categories = [
    { name: "Business", icon: Briefcase },
    { name: "eCommerce", icon: BarChart },
    { name: "Email Lists", icon: Mail },
    { name: "Health", icon: Download },
    { name: "Property Records", icon: Building },
  ];

  return (
    <>
      <section className="py-20 text-center">
        <div className="container">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Data Delivery
          </h1>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground md:text-xl">
            The easiest way to buy and sell data.
          </p>
          <div className="max-w-xl mx-auto mt-8">
            <div className="flex w-full items-center space-x-2">
              <Input type="text" placeholder="Search for datasets..." className="flex-1 text-base" />
              <Button type="submit" size="lg">
                <Search className="h-5 w-5" />
                <span className="ml-2">Search</span>
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {categories.map((category) => (
                <Button key={category.name} variant="ghost" className="text-muted-foreground" asChild>
                  <Link href="#">
                    <category.icon className="mr-2 h-4 w-4" />
                    {category.name}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">How It Works</h2>
            <p className="max-w-2xl mx-auto mt-3 text-muted-foreground">
              A simple, straightforward process to get the data you need.
            </p>
          </div>
          <div className="grid gap-12 md:grid-cols-3">
            <HowItWorksStep 
              icon={Search} 
              title="Browse"
              description="Explore our marketplace of high-quality, verified datasets across various categories."
            />
            <HowItWorksStep 
              icon={HandCoins}
              title="Purchase"
              description="Securely buy the data you need with a one-time payment. No subscriptions, no hidden fees."
            />
            <HowItWorksStep 
              icon={Download}
              title="Download"
              description="Instantly receive a download link for your purchased CSV file. It's that simple."
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
           <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Featured Datasets</h2>
            <p className="max-w-2xl mx-auto mt-3 text-muted-foreground">
              Check out some of the most popular datasets available right now.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {availableFiles.map((file) => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
          <div className="mt-12 text-center">
             <Button variant="outline" asChild>
                <Link href="#">
                  View All Datasets <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
          </div>
        </div>
      </section>
    </>
  );
}
