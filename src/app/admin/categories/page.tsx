import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Search } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CategoryList } from '@/components/admin/category-list';

export const dynamic = 'force-dynamic';

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const q = typeof resolvedSearchParams.q === 'string' ? resolvedSearchParams.q : '';
  const page = typeof resolvedSearchParams.page === 'string' ? parseInt(resolvedSearchParams.page) : 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const where = q
    ? {
        OR: [
          { name: { contains: q, mode: 'insensitive' as const } },
          { description: { contains: q, mode: 'insensitive' as const } },
        ],
      }
    : {};

  const [categories, total] = await Promise.all([
    prisma.category.findMany({
      where,
      include: {
        _count: {
          select: { products: true }
        }
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ],
      skip,
      take: limit,
    }),
    prisma.category.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Categories</h1>
          <p className="text-muted-foreground mt-2">Manage your store's product categories and collections.</p>
        </div>
        <Link href="/admin/categories/new" className={buttonVariants()}>
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <form className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            name="q"
            defaultValue={q}
            placeholder="Search categories..."
            className="pl-9"
          />
        </form>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        {categories.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-muted-foreground/50" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-1">No categories found</h3>
            <p className="text-muted-foreground max-w-sm">
              {q ? `No categories match your search for "${q}".` : "You haven't added any categories yet."}
            </p>
            {!q && (
              <Link href="/admin/categories/new" className={cn(buttonVariants({ variant: "outline" }), "mt-4")}>
                Create your first category
              </Link>
            )}
          </div>
        ) : (
          <CategoryList initialCategories={categories} />
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of {total} categories
          </p>
          <div className="flex gap-2">
            {page > 1 ? (
              <Link href={`/admin/categories?page=${page - 1}${q ? `&q=${q}` : ''}`} className={buttonVariants({ variant: "outline", size: "sm" })}>Previous</Link>
            ) : (
              <Button variant="outline" size="sm" disabled>Previous</Button>
            )}
            {page < totalPages ? (
              <Link href={`/admin/categories?page=${page + 1}${q ? `&q=${q}` : ''}`} className={buttonVariants({ variant: "outline", size: "sm" })}>Next</Link>
            ) : (
              <Button variant="outline" size="sm" disabled>Next</Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
