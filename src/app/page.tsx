"use client"

import { motion, Variants } from "framer-motion"
import { ArrowRight, Sparkles, Shield, Laptop, Gamepad, Package } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const FADE_UP_ANIMATION_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
}

const categories = [
  {
    title: "V2Ray VPN",
    description: "Premium secure VPN plans with instant activation.",
    icon: Shield,
    href: "/v2ray-vpn",
    buttonText: "Explore VPN",
    gradient: "from-blue-500/20 to-primary/20",
  },
  {
    title: "Softwares & Apps",
    description: "Premium software licenses and useful applications.",
    icon: Laptop,
    href: "/software-apps",
    buttonText: "Browse Software",
    gradient: "from-purple-500/20 to-accent/20",
  },
  {
    title: "Game Cheats",
    description: "Premium undetected gaming tools and cheats.",
    icon: Gamepad,
    href: "/game-cheats",
    buttonText: "View Cheats",
    gradient: "from-emerald-500/20 to-green-500/20",
  },
  {
    title: "Other Items",
    description: "More premium digital products and services.",
    icon: Package,
    href: "/other-items",
    buttonText: "Explore More",
    gradient: "from-orange-500/20 to-yellow-500/20",
  },
]

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-6">
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-accent/20 blur-[100px] rounded-full pointer-events-none" />
        
        <motion.div
          initial="hidden"
          animate="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="mb-6 flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 text-sm font-medium text-primary">
            <Sparkles className="w-4 h-4" />
            <span>Introducing Snopiz Premium</span>
          </motion.div>
          
          <motion.h1 
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 text-balance text-white"
          >
            Digital perfection. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Delivered instantly.
            </span>
          </motion.h1>
          
          <motion.p 
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="text-lg md:text-xl text-secondary-foreground mb-12 max-w-2xl text-balance"
          >
            Experience the future of e-commerce. Premium digital products and beautifully crafted items, designed for the modern creator.
          </motion.p>
          
          <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-lg hover-glow group">
              Explore Products
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg border-white/10 glass hover:bg-white/5 transition-colors">
              View Categories
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="w-full max-w-6xl px-6 py-24 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">Browse by Category</h2>
            <p className="text-secondary-foreground">Explore our curated selection of premium digital products.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="h-full"
              >
                <Link href={category.href} className="block h-full group">
                  <Card className="h-full glass-panel border-white/5 overflow-hidden relative p-6 flex flex-col items-start gap-4 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-primary/20">
                    {/* Glowing Hover Borders */}
                    <div className="absolute inset-0 border border-transparent group-hover:border-primary/50 rounded-xl transition-colors duration-500 z-20 pointer-events-none" />
                    
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 relative z-10">
                      <Icon className="w-6 h-6 text-white group-hover:text-primary transition-colors" />
                    </div>
                    
                    <div className="relative z-10 flex-grow">
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">{category.title}</h3>
                      <p className="text-sm text-secondary-foreground">{category.description}</p>
                    </div>
                    
                    <div className="w-full mt-auto relative z-10">
                      <Button variant="ghost" className="w-full bg-white/5 hover:bg-primary/20 hover:text-white border border-white/5 group-hover:border-primary/50 transition-all duration-300 flex items-center justify-between rounded-xl">
                        {category.buttonText}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="w-full max-w-6xl px-6 py-24 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">Trending Now</h2>
            <p className="text-secondary-foreground">Discover the most sought-after digital assets and premium items loved by creators worldwide.</p>
          </div>
          <Link href="/shop" className="text-primary hover:text-accent transition-colors font-medium flex items-center gap-2">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="glass-panel border-white/5 overflow-hidden group hover-glow">
              <div className="aspect-[4/3] bg-surface relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent group-hover:scale-105 transition-transform duration-500" />
                {/* Mock image placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-white/20">
                  <span className="text-sm font-medium">Product Image</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-white">Premium UI Kit {i}</h3>
                  <span className="text-accent font-medium">$49</span>
                </div>
                <p className="text-sm text-secondary-foreground mb-4">Complete design system with 100+ components.</p>
                <Button className="w-full bg-white/5 hover:bg-white/10 text-white rounded-xl">
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
