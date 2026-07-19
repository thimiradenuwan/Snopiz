"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Filter, Search, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Category, Product } from "@prisma/client"

export default function CategoryClient({ 
  category, 
  gradient 
}: { 
  category: Omit<Category, 'createdAt'|'updatedAt'> & { 
    createdAt: string; 
    updatedAt: string; 
    products: (Omit<Product, 'createdAt'|'updatedAt'> & { createdAt: string; updatedAt: string })[] 
  }, 
  gradient: string 
}) {
  return (
    <div className="flex flex-col items-center w-full min-h-screen pt-36 pb-32">
      {/* Category Header */}
      <section className="relative w-full py-20 flex flex-col items-center justify-center overflow-hidden px-6 mb-12">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br ${gradient} blur-[100px] rounded-full pointer-events-none opacity-50`} />
        
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
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6 text-foreground">{category.name}</h1>
            <p className="text-xl text-secondary-foreground max-w-2xl">{category.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="w-full max-w-6xl px-6 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <p className="text-secondary-foreground font-medium">Showing {category.products.length} products</p>
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
          {category.products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full glass-panel border-border/50 rounded-3xl overflow-hidden group hover-glow transition-all duration-500">
                <div className="aspect-[4/3] bg-secondary/50 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} group-hover:scale-105 transition-transform duration-700 opacity-20`} />
                  <div className="absolute inset-0 flex items-center justify-center text-foreground/30">
                    <span className="text-sm font-medium">Product Image</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-foreground">{product.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex text-primary">
                      {/* Using 5 stars default for db products until reviews exist */}
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-secondary-foreground">(5)</span>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                    <span className="text-2xl font-bold text-foreground">${product.price.toFixed(2)}</span>
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
