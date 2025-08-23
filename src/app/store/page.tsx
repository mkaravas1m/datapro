"use client"

import { useState } from 'react';
import { CsvFile } from '@/lib/types';
import { FileCard } from '@/components/store/file-card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

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

export default function StorePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('all');
    const [sortBy, setSortBy] = useState('newest');

    const availableFiles = mockFiles.filter(file => file.status === 'available');

    const filteredFiles = availableFiles
        .filter(file =>
            file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            file.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(file => category === 'all' || file.category === category);
    
    const sortedFiles = filteredFiles.sort((a, b) => {
        switch (sortBy) {
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            case 'newest':
            default:
                return 0; 
        }
    });

    const uniqueCategories = ['all', ...Array.from(new Set(availableFiles.map(f => f.category)))];

    return (
        <div className="container py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Data Store</h1>
                <p className="max-w-2xl mx-auto mt-3 text-muted-foreground">
                    Browse our extensive catalog of high-quality datasets.
                </p>
            </div>
            
            <div className="mb-8 p-4 bg-secondary/30 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative md:col-span-1">
                        <Input 
                            placeholder="Search datasets..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="md:col-span-1">
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by category" />
                            </SelectTrigger>
                            <SelectContent>
                                {uniqueCategories.map(cat => (
                                    <SelectItem key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="md:col-span-1">
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger>
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="newest">Newest</SelectItem>
                                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                                <SelectItem value="name-desc">Name: Z to A</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sortedFiles.map(file => (
                    <FileCard key={file.id} file={file} />
                ))}
            </div>

            {sortedFiles.length === 0 && (
                <div className="text-center col-span-full py-16">
                    <p className="text-xl font-semibold">No datasets found</p>
                    <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
                </div>
            )}
        </div>
    );
}
