import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import CategoryClient from "@/app/products/[category]/category-client"

export const dynamic = 'force-dynamic';

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params
  const categorySlug = resolvedParams.category
  
  const categoryData = await prisma.category.findUnique({
    where: { slug: categorySlug },
    include: {
      products: {
        where: { active: true },
        orderBy: { order: 'asc' },
        include: { images: true }
      }
    }
  })

  if (!categoryData) {
    notFound()
  }

  // Convert dates to strings to avoid Next.js serialization error
  const category = {
    ...categoryData,
    createdAt: categoryData.createdAt.toISOString(),
    updatedAt: categoryData.updatedAt.toISOString(),
    products: categoryData.products.map(p => ({
      ...p,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString()
    }))
  };

  // Generate a deterministic gradient based on slug length
  const gradients = [
    "from-blue-500/20 to-cyan-500/20",
    "from-indigo-500/20 to-purple-500/20",
    "from-emerald-500/20 to-teal-500/20",
    "from-orange-500/20 to-amber-500/20",
    "from-rose-500/20 to-pink-500/20"
  ];
  const gradient = gradients[category.slug.length % gradients.length];

  return <CategoryClient category={category} gradient={gradient} />
}
