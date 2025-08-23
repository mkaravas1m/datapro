
import { FileCard } from '@/components/store/file-card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import type { CsvFile } from '@/lib/types';
import { Button } from '@/components/ui/button';

export const revalidate = 0; // Revalidate data on every request

interface StorePageProps {
  searchParams: {
    search?: string;
    category?: string;
    sort?: string;
  };
}

export default async function StorePage({ searchParams }: StorePageProps) {
    const supabase = createClient();
    
    const searchTerm = searchParams.search || '';
    const category = searchParams.category || 'all';
    const sortBy = searchParams.sort || 'created_at-desc';

    let query = supabase
        .from('csv_files')
        .select('*')
        .eq('status', 'available');

    if (searchTerm) {
        query = query.textSearch('name', searchTerm, { type: 'websearch' });
    }

    if (category && category !== 'all') {
        query = query.eq('category', category);
    }
    
    const [sortField, sortOrder] = sortBy.split('-');
    if (sortField && sortOrder) {
        query = query.order(sortField as keyof CsvFile, { ascending: sortOrder === 'asc' });
    }

    const { data: files, error } = await query;

    if (error) {
        console.error("Error fetching files:", error);
    }
    
    const { data: categoriesData } = await supabase.from('csv_files').select('category').eq('status', 'available');
    const uniqueCategories = ['all', ...Array.from(new Set(categoriesData?.map(c => c.category) || []))];

    return (
        <div className="container py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Data Store</h1>
                <p className="max-w-2xl mx-auto mt-3 text-muted-foreground">
                    Browse our extensive catalog of high-quality datasets.
                </p>
            </div>
            
            <div className="mb-8 p-4 bg-secondary/30 rounded-lg">
                <form method="GET" action="/store" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative md:col-span-1">
                        <Input 
                            name="search"
                            placeholder="Search datasets..."
                            defaultValue={searchTerm}
                            className="pl-10"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="md:col-span-1">
                        <Select name="category" defaultValue={category}>
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
                        <Select name="sort" defaultValue={sortBy}>
                            <SelectTrigger>
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="created_at-desc">Newest</SelectItem>
                                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                                <SelectItem value="name-desc">Name: Z to A</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="md:col-span-3 flex justify-end">
                        <Button type="submit">Filter</Button>
                    </div>
                </form>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {files && files.map(file => (
                    <FileCard key={file.id} file={file} />
                ))}
            </div>

            {(!files || files.length === 0) && (
                <div className="text-center col-span-full py-16">
                    <p className="text-xl font-semibold">No datasets found</p>
                    <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
                </div>
            )}
        </div>
    );
}
