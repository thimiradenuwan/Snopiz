import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import ProductClient from "./ProductClient"

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const productSlug = resolvedParams.id
  
  const productData = await prisma.product.findUnique({
    where: { slug: productSlug },
    include: {
      images: true
    }
  })

  if (!productData) {
    notFound()
  }

  // Convert dates to strings
  const product = {
    ...productData,
    createdAt: productData.createdAt.toISOString(),
    updatedAt: productData.updatedAt.toISOString(),
  };

  let vpnProviders: any[] = []
  if (product.isVpn) {
    const dbProviders = await prisma.vpnProvider.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
      include: {
        packages: {
          where: { active: true },
          orderBy: { order: 'asc' }
        }
      }
    })
    vpnProviders = dbProviders.map(p => ({
      ...p,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
      packages: p.packages.map(pkg => ({
        ...pkg,
        createdAt: pkg.createdAt.toISOString(),
        updatedAt: pkg.updatedAt.toISOString(),
      }))
    }))
  }

  return <ProductClient product={product} vpnProviders={vpnProviders} />
}

