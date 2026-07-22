"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { CartItem } from "@/store/cartStore"

export async function addToCartAction(
  productId: string, 
  quantity: number,
  config?: { plan?: string; provider?: string; package?: string; duration?: string }
) {
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

    const isVpnConfig = !!(config?.plan || config?.provider || config?.package)

    if (isVpnConfig) {
      // For VPN configs, just create a new line item always
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: productId,
          quantity: quantity,
          plan: config.plan,
          provider: config.provider,
          package: config.package,
          duration: config.duration,
        },
      })
    } else {
      // For regular items, try to find an existing one without config to merge
      const existingItem = await prisma.cartItem.findFirst({
        where: {
          cartId: cart.id,
          productId: productId,
          plan: null,
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
    }
    
    revalidatePath("/cart")
    return { success: true }
  } catch (error) {
    console.error("Failed to add to cart:", error)
    return { error: "Failed to add to cart" }
  }
}

export async function updateCartItemAction(cartItemId: string, quantity: number) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Not authenticated" }

  const userId = session.user.id

  try {
    const cart = await prisma.cart.findUnique({ where: { userId } })
    if (!cart) return { error: "Cart not found" }

    // Verify the cart item belongs to this cart
    const item = await prisma.cartItem.findUnique({
      where: { id: cartItemId }
    })

    if (!item || item.cartId !== cart.id) {
       return { error: "Item not found" }
    }

    await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    })
    
    revalidatePath("/cart")
    return { success: true }
  } catch (error) {
    console.error("Failed to update cart:", error)
    return { error: "Failed to update cart" }
  }
}

export async function removeFromCartAction(cartItemId: string) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Not authenticated" }

  const userId = session.user.id

  try {
    const cart = await prisma.cart.findUnique({ where: { userId } })
    if (!cart) return { error: "Cart not found" }

    const item = await prisma.cartItem.findUnique({
      where: { id: cartItemId }
    })

    if (item && item.cartId === cart.id) {
      await prisma.cartItem.delete({
        where: { id: cartItemId },
      })
    }
    
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
      const isVpnConfig = !!(item.plan || item.provider || item.package)
      
      if (isVpnConfig) {
         await prisma.cartItem.create({
            data: {
              cartId: cart.id,
              productId: item.id,
              quantity: item.quantity,
              plan: item.plan,
              provider: item.provider,
              package: item.package,
              duration: item.duration,
            },
         })
      } else {
        const existingItem = await prisma.cartItem.findFirst({
          where: {
            cartId: cart.id,
            productId: item.id,
            plan: null,
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
    }
    return { success: true }
  } catch (error) {
    console.error("Failed to merge cart:", error)
    return { error: "Failed to merge cart" }
  }
}

export async function getCartAction() {
  const session = await auth()
  if (!session?.user?.id) return { error: "Not authenticated" }

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: true
              }
            }
          }
        }
      }
    })

    if (!cart) return { items: [] }

    return {
      items: cart.items.map(item => ({
        cartItemId: item.id, // We'll map the db id to cartItemId
        id: item.productId,
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images?.[0]?.image,
        plan: item.plan || undefined,
        provider: item.provider || undefined,
        package: item.package || undefined,
        duration: item.duration || undefined,
      }))
    }
  } catch (error) {
    console.error("Failed to get cart:", error)
    return { error: "Failed to get cart" }
  }
}
