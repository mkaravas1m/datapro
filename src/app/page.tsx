import { FileCard } from "@/components/store/file-card";
import type { CsvFile } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, HandCoins, Download, Briefcase, BarChart, Mail, Building, ShieldCheck, FileCheck2, BadgePercent, Clock, AreaChart, Users, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

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

const WhyChooseUsItem = ({ icon, title, description }: { icon: React.ElementType, title: string, description: string }) => {
    const Icon = icon;
    return (
      <div className="flex items-start space-x-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary flex-shrink-0">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    );
};

const CategoryCard = ({ icon, name }: { icon: React.ElementType, name: string }) => {
  const Icon = icon;
  return (
    <Link href="#">
      <Card className="group transition-all duration-300 hover:bg-primary/5 hover:shadow-lg">
        <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-muted group-hover:bg-primary/10 text-muted-foreground group-hover:text-primary transition-colors">
                <Icon className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold">{name}</h3>
        </CardContent>
      </Card>
    </Link>
  )
}

export default function Home() {
  const availableFiles = mockFiles.filter(f => f.status === 'available').slice(0, 3);
  const searchCategories = [
    { name: "Business", icon: Briefcase },
    { name: "eCommerce", icon: BarChart },
    { name: "Email Lists", icon: Mail },
    { name: "Health", icon: Download },
    { name: "Property Records", icon: Building },
  ];

   const browseCategories = [
    { name: "Financial Data", icon: BarChart },
    { name: "B2B Contact Lists", icon: Users },
    { name: "Real Estate", icon: Building },
    { name: "Company Data", icon: Briefcase },
    { name: "Public Records", icon: FileCheck2 },
    { name: "eCommerce Trends", icon: TrendingUp },
    { name: "Demographics", icon: AreaChart },
    { name: "Healthcare", icon: Mail },
  ];

  return (
    <>
      <section className="py-20 text-center animate-fade-in">
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
              {searchCategories.map((category) => (
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

      <section className="py-20 bg-muted animate-fade-in [animation-delay:200ms]">
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
      
      <section className="py-20 animate-fade-in [animation-delay:400ms]">
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
             <Button variant="outline" asChild size="lg">
                <Link href="#">
                  View All Datasets <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted animate-fade-in [animation-delay:600ms]">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Browse by Category</h2>
            <p className="max-w-2xl mx-auto mt-3 text-muted-foreground">
              Find the specific data you need by exploring our categories.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {browseCategories.map((category) => (
                <CategoryCard key={category.name} icon={category.icon} name={category.name} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 animate-fade-in [animation-delay:800ms]">
        <div className="container">
            <div className="grid items-center gap-12 lg:grid-cols-2">
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Why Choose Us?</h2>
                    <p className="text-muted-foreground text-lg">
                        We provide high-quality, reliable data with a focus on simplicity and security.
                    </p>
                     <div className="space-y-8 pt-4">
                        <WhyChooseUsItem 
                            icon={ShieldCheck}
                            title="Verified Data"
                            description="Every dataset is manually verified to ensure accuracy and quality. No more guessing games."
                        />
                        <WhyChooseUsItem 
                            icon={FileCheck2}
                            title="Simple & Transparent"
                            description="One-time payments for the data you need. No subscriptions or hidden fees. Ever."
                        />
                        <WhyChooseUsItem 
                            icon={BadgePercent}
                            title="Exclusive Leads"
                            description="Purchase exclusive, high-intent leads that are sold only once, giving you a competitive edge."
                        />
                         <WhyChooseUsItem 
                            icon={Clock}
                            title="Instant Access"
                            description="Get immediate access to your purchased data. No waiting, no delays. Download your files right away."
                        />
                    </div>
                </div>
                <div>
                  <img
                      alt="Data analysis illustration"
                      className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
                      data-ai-hint="data analysis"
                      height="550"
                      src="https://placehold.co/550x550.png"
                      width="550"
                  />
                </div>
            </div>
        </div>
      </section>

       <section className="py-20 bg-muted animate-fade-in [animation-delay:1000ms]">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Get Started?</h2>
          <p className="max-w-xl mx-auto mt-3 text-lg text-muted-foreground">
            Explore our datasets or sign up today to access exclusive leads.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="#">Browse Datasets</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
               <Link href="/signup">Create an Account</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
