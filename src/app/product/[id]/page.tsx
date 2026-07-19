"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, ShieldCheck, Download, Heart, Share2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useCartStore } from "@/store/cartStore"
import { useRouter } from "next/navigation"
import { addToCartAction } from "@/actions/cart"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const cart = useCartStore()
  const router = useRouter()

  const handleAddToCart = async () => {
    cart.addItem({
      id: params.id,
      title: "Snopiz Premium UI Kit",
      price: 99.00,
      quantity: 1,
    })
    
    // Call server action (will gracefully fail if not logged in)
    try {
      await addToCartAction(params.id, 1)
    } catch (e) {
      console.error(e)
    }
  }

  const handleBuyNow = () => {
    handleAddToCart()
    router.push("/checkout")
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24">
        {/* Gallery */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="aspect-[4/3] w-full rounded-2xl glass-panel border-border overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center text-foreground/30 text-lg font-medium">
              Main Product Image
            </div>
          </motion.div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-square rounded-xl glass-panel border-border overflow-hidden relative hover:border-primary/50 transition-colors cursor-pointer">
                <div className="absolute inset-0 flex items-center justify-center text-foreground/30 text-sm">
                  Thumb {i}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full">
              Digital Product
            </span>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="text-secondary-foreground hover:text-foreground hover:bg-secondary rounded-full" onClick={() => setIsWishlisted(!isWishlisted)}>
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-accent text-accent" : ""}`} />
              </Button>
              <Button variant="ghost" size="icon" className="text-secondary-foreground hover:text-foreground hover:bg-secondary rounded-full">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Snopiz Premium UI Kit
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1 text-accent">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current opacity-50" />
            </div>
            <span className="text-sm text-secondary-foreground underline decoration-dashed underline-offset-4 cursor-pointer hover:text-foreground transition-colors">
              (128 Reviews)
            </span>
          </div>

          <div className="text-4xl font-bold text-foreground mb-8">
            $99.00
          </div>

          <p className="text-secondary-foreground text-lg mb-8 leading-relaxed">
            The ultimate design system for modern web applications. Featuring over 200+ meticulously crafted components with glassmorphism effects, perfect typography, and smooth animations.
          </p>

          <div className="space-y-4 mb-10">
            <h3 className="text-foreground font-medium">Included Features:</h3>
            <ul className="space-y-3">
              {['200+ Premium Components', 'Framer Motion Animations included', 'Fully Responsive Layouts', 'Lifetime Updates'].map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-secondary-foreground">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Check className="w-3 h-3" />
                  </div>
                  {feat}
                </li>
              ))}
            </ul>
          </div>

          <Separator className="bg-border mb-8" />

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button size="lg" onClick={handleBuyNow} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-14 text-lg hover-glow group">
              Buy Now
            </Button>
            <Button size="lg" variant="outline" onClick={handleAddToCart} className="flex-1 rounded-xl h-14 text-lg border-border glass hover:bg-secondary transition-colors text-foreground">
              Add to Cart
            </Button>
          </div>

          <div className="glass rounded-xl p-6 border-border flex flex-col gap-4">
            <div className="flex items-center gap-3 text-secondary-foreground">
              <ShieldCheck className="w-6 h-6 text-accent" />
              <span className="text-sm">Secure Stripe Payment</span>
            </div>
            <div className="flex items-center gap-3 text-secondary-foreground">
              <Download className="w-6 h-6 text-accent" />
              <span className="text-sm">Instant Digital Delivery</span>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  )
}
