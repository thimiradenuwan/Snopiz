"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { CartItem } from "@/store/cartStore"

export async function addToCartAction(productId: string, quantity: number) {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: "Not authenticated" }
  }

  const userId = session.user.id

  try {
    let cart = await prisma.cart.findUnique({ where: { userId } })
    
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId } })
    }

    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: productId,
        },
      },
    })

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      })
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: productId,
          quantity: quantity,
        },
      })
    }
    
    revalidatePath("/cart")
    return { success: true }
  } catch (error) {
    console.error("Failed to add to cart:", error)
    return { error: "Failed to add to cart" }
  }
}

export async function updateCartItemAction(productId: string, quantity: number) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Not authenticated" }

  const userId = session.user.id

  try {
    const cart = await prisma.cart.findUnique({ where: { userId } })
    if (!cart) return { error: "Cart not found" }

    await prisma.cartItem.update({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: productId,
        },
      },
      data: { quantity },
    })
    
    revalidatePath("/cart")
    return { success: true }
  } catch (error) {
    console.error("Failed to update cart:", error)
    return { error: "Failed to update cart" }
  }
}

export async function removeFromCartAction(productId: string) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Not authenticated" }

  const userId = session.user.id

  try {
    const cart = await prisma.cart.findUnique({ where: { userId } })
    if (!cart) return { error: "Cart not found" }

    await prisma.cartItem.delete({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: productId,
        },
      },
    })
    
    revalidatePath("/cart")
    return { success: true }
  } catch (error) {
    console.error("Failed to remove from cart:", error)
    return { error: "Failed to remove from cart" }
  }
}

export async function mergeGuestCartAction(guestItems: CartItem[], userId: string) {
  try {
    let cart = await prisma.cart.findUnique({ where: { userId } })
    
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId } })
    }

    for (const item of guestItems) {
      const existingItem = await prisma.cartItem.findUnique({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId: item.id, // In Zustand store, productId is stored as id
          },
        },
      })

      if (existingItem) {
        await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + item.quantity },
        })
      } else {
        await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId: item.id,
            quantity: item.quantity,
          },
        })
      }
    }
    return { success: true }
  } catch (error) {
    console.error("Failed to merge cart:", error)
    return { error: "Failed to merge cart" }
  }
}
