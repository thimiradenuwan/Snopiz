"use client"

import { useCartStore } from "@/store/cartStore"
import { motion } from "framer-motion"
import { ShieldCheck, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const cart = useCartStore()
  const router = useRouter()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (cart.items.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-6 py-24 min-h-[70vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Your cart is empty</h1>
        <p className="text-secondary-foreground mb-8">Add items to your cart to proceed to checkout.</p>
        <Link href="/shop">
          <Button className="bg-primary text-white rounded-xl">Back to Shop</Button>
        </Link>
      </div>
    )
  }

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      cart.clearCart()
      setIsProcessing(false)
      router.push("/dashboard")
    }, 2000)
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight text-white mb-8">Secure Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24">
        {/* Checkout Form */}
        <div className="space-y-8">
          <form onSubmit={handleCheckout} className="space-y-8">
            <div className="glass-panel p-8 rounded-3xl border-white/5 space-y-6">
              <h2 className="text-xl font-bold text-white mb-2">Payment Details</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Email Address</label>
                  <Input 
                    type="email" 
                    placeholder="you@example.com" 
                    className="glass border-white/10 h-12 rounded-xl bg-surface/50 text-white placeholder:text-muted-foreground focus-visible:ring-primary"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Card Information</label>
                  <div className="relative">
                    <Input 
                      type="text" 
                      placeholder="Card number" 
                      className="glass border-white/10 h-12 rounded-t-xl rounded-b-none bg-surface/50 text-white placeholder:text-muted-foreground focus-visible:ring-primary border-b-0"
                      required
                    />
                    <div className="flex">
                      <Input 
                        type="text" 
                        placeholder="MM / YY" 
                        className="glass border-white/10 h-12 rounded-bl-xl rounded-none bg-surface/50 text-white placeholder:text-muted-foreground focus-visible:ring-primary w-1/2"
                        required
                      />
                      <Input 
                        type="text" 
                        placeholder="CVC" 
                        className="glass border-white/10 h-12 rounded-br-xl rounded-none bg-surface/50 text-white placeholder:text-muted-foreground focus-visible:ring-primary w-1/2 border-l-0"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Name on Card</label>
                  <Input 
                    type="text" 
                    placeholder="John Doe" 
                    className="glass border-white/10 h-12 rounded-xl bg-surface/50 text-white placeholder:text-muted-foreground focus-visible:ring-primary"
                    required
                  />
                </div>
              </div>
              
              <Button type="submit" disabled={isProcessing} className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-14 text-lg hover-glow group mt-8">
                {isProcessing ? "Processing..." : `Pay $${cart.totalPrice().toFixed(2)}`}
                {!isProcessing && <Lock className="ml-2 w-5 h-5" />}
              </Button>
              
              <div className="flex items-center justify-center gap-2 text-sm text-secondary-foreground mt-6">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Payments are secure and encrypted
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel p-8 rounded-3xl border-white/5 sticky top-32"
          >
            <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
            <div className="space-y-4 mb-6">
              {cart.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-surface border border-white/5 flex items-center justify-center">
                      <span className="text-[10px] text-white/50">{item.title.substring(0, 5)}</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{item.title}</p>
                      <p className="text-secondary-foreground">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-white font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <Separator className="bg-white/10 mb-6" />
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-secondary-foreground text-sm">
                <span>Subtotal</span>
                <span className="text-white">${cart.totalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-secondary-foreground text-sm">
                <span>Taxes</span>
                <span className="text-white">$0.00</span>
              </div>
            </div>
            
            <Separator className="bg-white/10 mb-6" />
            
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-white">Total</span>
              <span className="text-2xl font-bold text-white">${cart.totalPrice().toFixed(2)}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
