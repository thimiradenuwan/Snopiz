"use client"

import { use } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Filter, Search, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { notFound } from "next/navigation"

// Mock data for categories
const categoryData = {
  "v2ray-vpn": {
    title: "V2Ray VPN",
    description: "Premium secure VPN plans with instant activation and zero logging.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    products: [
      { id: 1, name: "V2Ray Premium 1 Month", price: "$5.99", rating: 5, reviews: 124 },
      { id: 2, name: "V2Ray Premium 3 Months", price: "$14.99", rating: 4.8, reviews: 89 },
      { id: 3, name: "V2Ray Premium 1 Year", price: "$49.99", rating: 5, reviews: 312 },
    ]
  },
  "software": {
    title: "Softwares & Apps",
    description: "Premium software licenses and useful applications for productivity and creativity.",
    gradient: "from-indigo-500/20 to-purple-500/20",
    products: [
      { id: 4, name: "Adobe Creative Cloud 1Y", price: "$89.99", rating: 5, reviews: 45 },
      { id: 5, name: "Microsoft Office 365 Pro", price: "$29.99", rating: 4.9, reviews: 156 },
      { id: 6, name: "Windows 11 Pro Key", price: "$15.99", rating: 4.7, reviews: 320 },
    ]
  },
  "game-cheat": {
    title: "Game Cheats",
    description: "Premium undetected gaming tools and cheats for competitive edge.",
    gradient: "from-emerald-500/20 to-teal-500/20",
    products: [
      { id: 7, name: "Valorant Premium Aimbot", price: "$35.00", rating: 4.5, reviews: 67 },
      { id: 8, name: "CS2 Undetected VIP", price: "$25.00", rating: 4.8, reviews: 120 },
      { id: 9, name: "Warzone Esp & Radar", price: "$40.00", rating: 4.6, reviews: 88 },
    ]
  },
  "other": {
    title: "Other Items",
    description: "More premium digital products, accounts, and exclusive services.",
    gradient: "from-orange-500/20 to-amber-500/20",
    products: [
      { id: 10, name: "Netflix Premium 1 Month", price: "$4.99", rating: 4.9, reviews: 540 },
      { id: 11, name: "Spotify Premium 1 Year", price: "$20.00", rating: 5, reviews: 230 },
      { id: 12, name: "ChatGPT Plus 1 Month", price: "$12.99", rating: 4.8, reviews: 180 },
    ]
  }
}

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = use(params)
  const categoryKey = resolvedParams.category as keyof typeof categoryData
  
  const data = categoryData[categoryKey]

  if (!data) {
    notFound()
  }

  return (
    <div className="flex flex-col items-center w-full min-h-screen pt-36 pb-32">
      {/* Category Header */}
      <section className="relative w-full py-20 flex flex-col items-center justify-center overflow-hidden px-6 mb-12">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br ${data.gradient} blur-[100px] rounded-full pointer-events-none opacity-50`} />
        
        <div className="relative z-10 w-full max-w-6xl">
          <Link href="/products" className="inline-flex items-center text-sm font-medium text-secondary-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Categories
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6 text-foreground">{data.title}</h1>
            <p className="text-xl text-secondary-foreground max-w-2xl">{data.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="w-full max-w-6xl px-6 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <p className="text-secondary-foreground font-medium">Showing {data.products.length} products</p>
          <div className="flex gap-3">
            <Button variant="outline" className="glass rounded-xl border-border/50">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </Button>
            <Button variant="outline" className="glass rounded-xl border-border/50">
              <Search className="w-4 h-4 mr-2" /> Search
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full glass-panel border-border/50 rounded-3xl overflow-hidden group hover-glow transition-all duration-500">
                <div className="aspect-[4/3] bg-secondary/50 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${data.gradient} group-hover:scale-105 transition-transform duration-700 opacity-20`} />
                  <div className="absolute inset-0 flex items-center justify-center text-foreground/30">
                    <span className="text-sm font-medium">Product Image</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-foreground">{product.name}</h3>
                  </div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex text-primary">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-transparent stroke-current opacity-30'}`} viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-secondary-foreground">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                    <span className="text-2xl font-bold text-foreground">{product.price}</span>
                    <Button className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
                      <ShoppingCart className="w-4 h-4 mr-2" /> Add
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
