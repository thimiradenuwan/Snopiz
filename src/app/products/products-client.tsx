"use client"

import { motion } from "framer-motion"
import { Package, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import type { Category } from "@prisma/client"
import Image from "next/image"

interface ProductsClientProps {
  categories: Category[];
}

export default function ProductsClient({ categories }: ProductsClientProps) {
  return (
    <div className="flex flex-col items-center w-full min-h-[80vh] pt-36 pb-32">
      <div className="text-center mb-16 max-w-3xl mx-auto px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl font-semibold tracking-tight mb-6 text-foreground"
        >
          Our Products
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl text-secondary-foreground"
        >
          Select a category to explore our premium digital offerings.
        </motion.p>
      </div>

      <div className="w-full max-w-6xl px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category, index) => {
          // Predefined gradients to cycle through for categories without images,
          // or we can just use a standard one. We'll cycle through a few to keep the colorful design.
          const gradients = [
            "from-blue-500/20 to-cyan-500/20",
            "from-indigo-500/20 to-purple-500/20",
            "from-emerald-500/20 to-teal-500/20",
            "from-orange-500/20 to-amber-500/20",
          ]
          const gradient = gradients[index % gradients.length];
          const href = `/products/${category.slug}`;

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
              className="h-full"
            >
              <Link href={href} className="block h-full group outline-none">
                <Card className="h-full glass-panel border-border/50 rounded-3xl overflow-hidden relative p-8 flex flex-col items-start gap-5 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:-translate-y-2 dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-3xl transition-colors duration-500 z-20 pointer-events-none" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                  
                  <div className="w-14 h-14 rounded-2xl bg-secondary/80 backdrop-blur-md flex items-center justify-center border border-border/50 group-hover:scale-110 transition-transform duration-500 relative z-10 shadow-sm overflow-hidden">
                    {category.image ? (
                      <Image 
                        src={category.image} 
                        alt={category.name} 
                        width={56} 
                        height={56} 
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <Package className="w-7 h-7 text-foreground group-hover:text-primary transition-colors duration-500" />
                    )}
                  </div>
                  
                  <div className="relative z-10 flex-grow mt-2">
                    <h3 className="text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-500">{category.name}</h3>
                    <p className="text-secondary-foreground leading-relaxed">{category.description || "Explore this category."}</p>
                  </div>
                  
                  <div className="w-full mt-6 relative z-10">
                    <div className="w-full bg-secondary/50 backdrop-blur-sm text-foreground border border-border/50 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-500 flex items-center justify-between rounded-2xl px-5 py-3 font-medium">
                      Explore {category.name}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-500" />
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
