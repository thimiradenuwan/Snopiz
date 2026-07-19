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
import { DeleteProductButton } from '@/components/admin/delete-product-button';
import { ProductList } from '@/components/admin/product-list';

export const dynamic = 'force-dynamic';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const q = typeof resolvedSearchParams.q === 'string' ? resolvedSearchParams.q : '';
  const page = typeof resolvedSearchParams.page === 'string' ? parseInt(resolvedSearchParams.page) : 1;
  const c = typeof resolvedSearchParams.c === 'string' ? resolvedSearchParams.c : '';
  const limit = 10;
  const skip = (page - 1) * limit;

  const where: any = {};
  if (q) {
    where.OR = [
      { title: { contains: q, mode: 'insensitive' as const } },
      { description: { contains: q, mode: 'insensitive' as const } },
    ];
  }
  if (c) {
    where.categoryId = c;
  }

  const [products, total, categories] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: {
        order: 'asc',
      },
      skip,
      take: limit,
    }),
    prisma.product.count({ where }),
    prisma.category.findMany({ orderBy: { order: 'asc' } }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Products</h1>
          <p className="text-muted-foreground mt-2">Manage your store's product catalog and inventory.</p>
        </div>
        <Link href="/admin/products/new" className={buttonVariants()}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
        <form className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            name="q"
            defaultValue={q}
            placeholder="Search products..."
            className="pl-9"
          />
          {c && <input type="hidden" name="c" value={c} />}
        </form>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          <Link
            href={`/admin/products${q ? `?q=${q}` : ''}`}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
              !c ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/admin/products?c=${cat.id}${q ? `&q=${q}` : ''}`}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                c === cat.id ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-card border-border rounded-xl shadow-sm overflow-hidden">
        {products.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-muted-foreground/50" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-1">No products found</h3>
            <p className="text-muted-foreground max-w-sm">
              {q ? `No products match your search for "${q}".` : "You haven't added any products yet."}
            </p>
            {!q && (
              <Link href="/admin/products/new" className={cn(buttonVariants({ variant: "outline" }), "mt-4")}>
                Create your first product
              </Link>
            )}
          </div>
        ) : (
          <ProductList initialProducts={products} enableDrag={!!c} />
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of {total} products
          </p>
          <div className="flex gap-2">
            {page > 1 ? (
              <Link href={`/admin/products?page=${page - 1}${q ? `&q=${q}` : ''}`} className={buttonVariants({ variant: "outline", size: "sm" })}>Previous</Link>
            ) : (
              <Button variant="outline" size="sm" disabled>Previous</Button>
            )}
            {page < totalPages ? (
              <Link href={`/admin/products?page=${page + 1}${q ? `&q=${q}` : ''}`} className={buttonVariants({ variant: "outline", size: "sm" })}>Next</Link>
            ) : (
              <Button variant="outline" size="sm" disabled>Next</Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
