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

export default function ShopPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-2">Shop All Datasets</h1>
      <p className="text-muted-foreground mb-8">Browse our full collection of high-quality datasets.</p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockFiles.map((file) => (
          <FileCard key={file.id} file={file} />
        ))}
      </div>
    </div>
  );
}
