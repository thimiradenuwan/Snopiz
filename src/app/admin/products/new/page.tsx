import { prisma } from '@/lib/prisma';
import { ProductForm } from '@/components/admin/product-form';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  });

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className={buttonVariants({ variant: "outline", size: "icon" })}>
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Add New Product</h1>
          <p className="text-muted-foreground mt-2">Create a new product to add to your catalog.</p>
        </div>
      </div>

      <div className="bg-card border-border rounded-xl shadow-sm p-6">
        <ProductForm categories={categories} />
      </div>
    </div>
  );
}
