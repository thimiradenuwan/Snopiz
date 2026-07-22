"use client"

import { useCartStore } from "@/store/cartStore"
import { motion } from "framer-motion"
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useEffect, useState } from "react"
import { updateCartItemAction, removeFromCartAction } from "@/actions/cart"

export default function CartPage() {
  const [mounted, setMounted] = useState(false)
  const cart = useCartStore()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight text-white mb-8">Shopping Cart</h1>

      {cart.items.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-16 rounded-3xl border-white/5 flex flex-col items-center justify-center text-center"
        >
          <ShoppingBag className="w-16 h-16 text-muted-foreground mb-6 opacity-50" />
          <h2 className="text-2xl font-semibold text-white mb-4">Your cart is empty</h2>
          <p className="text-secondary-foreground mb-8 max-w-md">
            Looks like you haven&apos;t added any premium digital assets or items to your cart yet.
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-xl hover-glow">
              Continue Shopping
            </Button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.items.map((item, index) => (
              <motion.div 
                key={item.cartItemId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-4 border-white/5 flex items-center gap-6"
              >
                <div className="w-24 h-24 rounded-xl bg-surface border border-white/5 overflow-hidden flex-shrink-0 flex items-center justify-center text-white/20 text-xs text-center p-2">
                  {item.title}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                  {item.plan && (
                    <div className="text-sm text-secondary-foreground mb-2 space-x-2">
                      <span className="px-2 py-0.5 bg-white/5 rounded-md">{item.plan}</span>
                      {item.provider && <span className="px-2 py-0.5 bg-white/5 rounded-md">{item.provider}</span>}
                      {item.package && <span className="px-2 py-0.5 bg-white/5 rounded-md">{item.package}</span>}
                      {item.duration && <span className="px-2 py-0.5 bg-white/5 rounded-md">{item.duration}</span>}
                    </div>
                  )}
                  <p className="text-primary font-medium">LKR {item.price}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center glass border-white/10 rounded-full px-2 py-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-full text-secondary-foreground hover:text-white hover:bg-white/5"
                      onClick={() => {
                        if (item.quantity > 1) {
                          cart.updateQuantity(item.cartItemId, item.quantity - 1)
                          updateCartItemAction(item.cartItemId, item.quantity - 1).catch(console.error)
                        } else {
                          cart.removeItem(item.cartItemId)
                          removeFromCartAction(item.cartItemId).catch(console.error)
                        }
                      }}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium text-white">{item.quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-full text-secondary-foreground hover:text-white hover:bg-white/5"
                      onClick={() => {
                        cart.updateQuantity(item.cartItemId, item.quantity + 1)
                        updateCartItemAction(item.cartItemId, item.quantity + 1).catch(console.error)
                      }}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-destructive/80 hover:text-destructive hover:bg-destructive/10 rounded-full"
                    onClick={() => {
                      cart.removeItem(item.cartItemId)
                      removeFromCartAction(item.cartItemId).catch(console.error)
                    }}
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel p-8 rounded-3xl border-white/5 sticky top-32"
            >
              <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-secondary-foreground">
                  <span>Subtotal ({cart.totalItems()} items)</span>
                  <span className="text-white">LKR {cart.totalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-secondary-foreground">
                  <span>Taxes</span>
                  <span className="text-white">Calculated at checkout</span>
                </div>
              </div>
              <Separator className="bg-white/10 mb-6" />
              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-bold text-white">Total</span>
                <span className="text-2xl font-bold text-white">LKR {cart.totalPrice().toFixed(2)}</span>
              </div>
              <Button size="lg" onClick={async () => {
                const { createCheckoutOrder } = await import('@/actions/checkout');
                const res = await createCheckoutOrder();
                if (res?.success) {
                  window.location.href = '/profile'; // Redirect to profile or orders
                } else {
                  console.error(res?.error);
                }
              }} className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-14 text-lg hover-glow group">
                Proceed to Checkout
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  )
}
