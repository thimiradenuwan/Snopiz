"use client"

import { motion, Variants } from "framer-motion"
import { ArrowRight, Search, SlidersHorizontal, Sparkles, Star, Heart, ChevronRight, ChevronDown } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const FADE_UP_ANIMATION_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
}

interface Product {
  id: string
  title: string
  price: number
  description: string
  image?: string
  rating?: number
  isFeatured?: boolean
}

interface FAQ {
  question: string
  answer: string
}

interface CategoryTemplateProps {
  title: string
  description: string
  products: Product[]
  faqs?: FAQ[]
}

export default function CategoryTemplate({ title, description, products, faqs = [] }: CategoryTemplateProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  
  const featuredProducts = products.filter(p => p.isFeatured)
  const regularProducts = products.filter(p => !p.isFeatured)

  const displayedProducts = regularProducts.filter(product => 
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const renderProductCard = (product: Product, index: number) => (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="glass-panel border-white/5 overflow-hidden group hover-glow h-full flex flex-col relative transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-primary/10 hover:border-primary/30">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        {/* Product Image Section */}
        <div className="aspect-[4/3] bg-surface relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 flex items-center justify-center text-white/20">
            <span className="text-sm font-medium">{product.title} Image</span>
          </div>
          {/* Wishlist Button */}
          <button className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-md text-white/70 hover:text-red-500 hover:bg-black/60 transition-colors z-20">
            <Heart className="w-4 h-4" />
          </button>
        </div>
        
        <div className="p-6 flex flex-col flex-grow relative z-10">
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className={`w-3 h-3 ${star <= (product.rating || 5) ? 'text-yellow-500 fill-yellow-500' : 'text-white/20'}`} />
            ))}
            <span className="text-xs text-secondary-foreground ml-1">({(product.rating || 5).toFixed(1)})</span>
          </div>
          <div className="flex justify-between items-start mb-2 gap-4">
            <h3 className="text-lg font-semibold text-white line-clamp-2 group-hover:text-primary transition-colors">{product.title}</h3>
          </div>
          <p className="text-sm text-secondary-foreground mb-6 flex-grow">{product.description}</p>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
            <span className="text-xl font-bold text-white">${product.price.toFixed(2)}</span>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-[0_0_15px_rgba(var(--primary),0.3)] hover:shadow-[0_0_25px_rgba(var(--primary),0.5)] transition-all px-6">
              Buy Now
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )

  return (
    <div className="flex flex-col items-center w-full min-h-screen pt-24 pb-12">
      {/* Breadcrumb Navigation */}
      <div className="w-full max-w-6xl px-6 mb-4 flex items-center text-sm text-secondary-foreground z-10">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-white">{title}</span>
      </div>

      {/* Premium Hero Banner */}
      <section className="relative w-full max-w-6xl rounded-3xl overflow-hidden px-6 py-20 mb-16 mx-6 border border-white/10">
        <div className="absolute inset-0 bg-surface/50 backdrop-blur-xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/10 blur-[100px] rounded-full pointer-events-none" />
        
        <motion.div
          initial="hidden"
          animate="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          className="relative z-10 flex flex-col items-start max-w-2xl"
        >
          <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="mb-4 flex items-center gap-2 px-3 py-1.5 rounded-full glass border-white/10 text-xs font-medium text-primary">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Premium Category</span>
          </motion.div>
          
          <motion.h1 
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 text-white"
          >
            {title}
          </motion.h1>
          
          <motion.p 
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="text-base md:text-lg text-secondary-foreground text-balance"
          >
            {description}
          </motion.p>
        </motion.div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="w-full max-w-6xl px-6 mb-16 relative z-10">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Featured {title}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product, index) => renderProductCard(product, index))}
          </div>
        </section>
      )}

      {/* Search and Filter Section */}
      <section className="w-full max-w-6xl px-6 mb-12">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between glass-panel p-4 rounded-2xl border-white/5 relative z-10 shadow-lg">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input 
              placeholder={`Search ${title.toLowerCase()}...`} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 bg-white/5 border-white/10 focus-visible:ring-1 focus-visible:ring-primary/50 text-white placeholder:text-white/40 h-10 rounded-xl"
            />
          </div>
          <Button variant="outline" className="w-full sm:w-auto h-10 rounded-xl glass border-white/10 hover:bg-white/5 hover:text-white text-white/80 flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </Button>
        </div>
      </section>

      {/* Main Product Grid */}
      <section className="w-full max-w-6xl px-6 mb-24 relative z-10">
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedProducts.map((product, index) => renderProductCard(product, index))}
          </div>
        ) : (
          <div className="text-center py-24 glass-panel rounded-2xl border-white/5">
            <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
            <p className="text-secondary-foreground">Try adjusting your search criteria.</p>
          </div>
        )}
      </section>

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="w-full max-w-3xl px-6 mb-24 relative z-10 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-secondary-foreground">Everything you need to know about our {title.toLowerCase()}.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="glass-panel border border-white/10 rounded-2xl overflow-hidden transition-all duration-300">
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                >
                  <span className="font-medium text-white">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-white/50 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="p-6 pt-0 text-secondary-foreground border-t border-white/5 mt-2">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Categories / Products */}
      <section className="w-full max-w-6xl px-6 border-t border-white/5 pt-16 mb-24 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-2 text-white">Related Categories</h2>
            <p className="text-sm text-secondary-foreground">Explore other premium offerings.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["Softwares & Apps", "Game Cheats", "Other Items"].filter(c => c !== title).map((cat, i) => (
            <Link key={i} href="#" className="p-4 glass rounded-2xl border border-white/5 flex items-center gap-4 group hover:bg-white/5 hover:border-primary/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-medium group-hover:text-primary transition-colors">{cat}</h4>
                <p className="text-xs text-secondary-foreground">Explore items <ArrowRight className="inline w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" /></p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="w-full max-w-6xl px-6 relative z-10">
        <div className="glass-panel border-white/10 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
          <h2 className="text-3xl font-bold text-white mb-4 relative z-10">Ready to get started?</h2>
          <p className="text-secondary-foreground max-w-xl mx-auto mb-8 relative z-10">
            Join thousands of satisfied customers who have elevated their digital experience with our premium products.
          </p>
          <Button size="lg" className="bg-white text-black hover:bg-white/90 rounded-full px-8 relative z-10">
            Create an Account
          </Button>
        </div>
      </section>
    </div>
  )
}
