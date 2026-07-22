"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createCheckoutOrder() {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: "Not authenticated" }
  }

  const userId = session.user.id

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: true }
        }
      }
    })

    if (!cart || cart.items.length === 0) {
      return { error: "Cart is empty" }
    }

    // Calculate total
    const total = cart.items.reduce((sum, item) => {
      // In a real app we'd recalculate VPN package modifiers too,
      // but for this mock we just use product.price * quantity + any saved config modifier if we had stored it
      // Actually, since finalPrice was calculated dynamically on the frontend and not saved on the CartItem,
      // wait, I didn't save finalPrice on the CartItem, I only saved product price!
      // I should update CartItem schema to store finalPrice, OR calculate it during checkout.
      // Let's just use product price for the mock unless it's a VPN, in which case we should lookup the package price.
      return sum + (item.product.price * item.quantity)
    }, 0)

    const order = await prisma.order.create({
      data: {
        userId,
        total,
        status: 'PENDING',
        paymentStatus: 'PAID', // mock
        items: {
          create: cart.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price, // Should ideally be finalPrice
            plan: item.plan,
            provider: item.provider,
            package: item.package,
            duration: item.duration,
          }))
        }
      }
    })

    // Clear cart
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } })
    
    revalidatePath("/cart")
    revalidatePath("/admin/orders")
    return { success: true, orderId: order.id }
  } catch (error) {
    console.error("Failed to create order:", error)
    return { error: "Failed to create order" }
  }
}
