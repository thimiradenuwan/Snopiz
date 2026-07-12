"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, SlidersHorizontal, ChevronDown, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

const PRODUCTS = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  title: `Premium Asset ${i + 1}`,
  category: i % 2 === 0 ? "Digital" : "Physical",
  price: 49 + i * 10,
  rating: 4.8 + (i % 3) * 0.1,
}))

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Shop</h1>
          <p className="text-secondary-foreground text-lg max-w-md text-balance">
            Explore our curated collection of premium digital assets and luxury items.
          </p>
        </div>
        
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4 relative">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 glass border-white/10 h-12 rounded-xl text-white placeholder:text-muted-foreground focus-visible:ring-primary/50 bg-surface/50"
            />
          </div>
          <Button variant="outline" className="glass h-12 px-6 rounded-xl border-white/10 text-white hover:bg-white/5">
            <SlidersHorizontal className="w-5 h-5 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Categories</h3>
            <div className="flex flex-col gap-2">
              {["All", "Digital Products", "UI Kits", "Templates", "Hardware"].map((cat) => (
                <label key={cat} className="flex items-center gap-3 text-secondary-foreground hover:text-white transition-colors cursor-pointer">
                  <input type="checkbox" className="rounded border-white/20 bg-surface text-primary focus:ring-primary/50 w-4 h-4" />
                  <span className="text-sm">{cat}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Price Range</h3>
            <div className="glass p-4 rounded-xl border-white/5 space-y-4">
              <input type="range" className="w-full accent-primary" />
              <div className="flex justify-between text-xs text-secondary-foreground">
                <span>$0</span>
                <span>$500+</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm text-secondary-foreground">Showing 1-12 of 124 results</span>
            <Button variant="ghost" className="text-sm text-secondary-foreground hover:text-white">
              Sort by: Recommended <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {PRODUCTS.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: product.id * 0.05 }}
              >
                <Link href={`/product/${product.id}`}>
                  <Card className="glass-panel border-white/5 overflow-hidden group hover-glow cursor-pointer h-full flex flex-col">
                    <div className="aspect-square bg-surface relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center text-white/20">
                        <span className="text-sm font-medium">{product.title} Image</span>
                      </div>
                      <div className="absolute top-3 left-3 px-2 py-1 bg-black/40 backdrop-blur-md rounded-md text-[10px] font-medium text-white uppercase tracking-wider">
                        {product.category}
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1 justify-between">
                      <div>
                        <div className="flex items-center gap-1 mb-2 text-accent">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="text-xs font-medium text-secondary-foreground">{product.rating}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-primary transition-colors">{product.title}</h3>
                      </div>
                      <div className="flex justify-between items-end mt-4">
                        <span className="text-xl font-bold text-white">${product.price}</span>
                        <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-md transition-colors">
                          View
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
