import { db } from "./db"
import { Prisma } from "@prisma/client"

/**
 * User Helpers
 */
export async function getUserById(id: string) {
  return await db.user.findUnique({
    where: { id },
  })
}

export async function getUserByEmail(email: string) {
  return await db.user.findUnique({
    where: { email },
  })
}

/**
 * Category Helpers
 */
export async function getCategories() {
  return await db.category.findMany({
    orderBy: { name: "asc" },
  })
}

export async function getCategoryBySlug(slug: string) {
  return await db.category.findUnique({
    where: { slug },
    include: { products: true },
  })
}

/**
 * Product Helpers
 */
export async function getProducts(options?: {
  categoryId?: string
  featured?: boolean
  active?: boolean
  take?: number
  skip?: number
}) {
  return await db.product.findMany({
    where: {
      categoryId: options?.categoryId,
      featured: options?.featured,
      active: options?.active ?? true,
    },
    include: {
      images: true,
      category: true,
    },
    take: options?.take,
    skip: options?.skip,
    orderBy: { createdAt: "desc" },
  })
}

export async function getProductBySlug(slug: string) {
  return await db.product.findUnique({
    where: { slug },
    include: {
      images: true,
      category: true,
    },
  })
}

/**
 * Order Helpers
 */
export async function getUserOrders(userId: string) {
  return await db.order.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })
}

export async function createOrder(
  userId: string,
  total: number,
  items: { productId: string; price: number; quantity: number }[]
) {
  return await db.order.create({
    data: {
      userId,
      total,
      status: "PENDING",
      paymentStatus: "UNPAID",
      items: {
        create: items.map((item) => ({
          productId: item.productId,
          price: item.price,
          quantity: item.quantity,
        })),
      },
    },
    include: {
      items: true,
    },
  })
}
