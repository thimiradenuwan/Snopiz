import { prisma } from '@/lib/prisma';
import { CategoryForm } from '@/components/admin/category-form';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  const category = await prisma.category.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      image: true,
    }
  });

  if (!category) {
    notFound();
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/categories" className={buttonVariants({ variant: "outline", size: "icon" })}>
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Edit Category</h1>
          <p className="text-muted-foreground mt-2">Update category details and hierarchy.</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm p-6">
        <CategoryForm category={category} />
      </div>
    </div>
  );
}
