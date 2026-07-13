"use client"

import { useState } from "react"
import { motion, Variants, AnimatePresence } from "framer-motion"
import { ArrowRight, Sparkles, Shield, Laptop, Gamepad, Package, Zap, Lock, Globe, MessageCircle, Star, ChevronDown } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const FADE_UP_ANIMATION_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20 } },
}

const categories = [
  {
    title: "V2Ray VPN",
    description: "Premium secure VPN plans with instant activation.",
    icon: Shield,
    href: "/products/v2ray-vpn",
    buttonText: "Explore VPN",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Softwares & Apps",
    description: "Premium software licenses and useful applications.",
    icon: Laptop,
    href: "/products/software",
    buttonText: "Browse Software",
    gradient: "from-indigo-500/20 to-purple-500/20",
  },
  {
    title: "Game Cheats",
    description: "Premium undetected gaming tools and cheats.",
    icon: Gamepad,
    href: "/products/game-cheat",
    buttonText: "View Cheats",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    title: "Other Items",
    description: "More premium digital products and services.",
    icon: Package,
    href: "/products/other",
    buttonText: "Explore More",
    gradient: "from-orange-500/20 to-amber-500/20",
  },
]


const reviews = [
  { name: "Alex Mercer", role: "Pro Gamer", content: "The tools are flawless and completely undetected. Premium service that actually delivers on its promises.", rating: 5 },
  { name: "Sarah Jenkins", role: "Software Developer", content: "Got my software licenses instantly. The UI of this store is just breathtaking, feels like shopping at Apple.", rating: 5 },
  { name: "David Chen", role: "Privacy Advocate", content: "V2Ray VPN service is blazing fast and reliable. The setup was instant. Highly recommended.", rating: 5 },
]

const faqs = [
  { question: "How fast is the delivery?", answer: "Delivery is completely instant! As soon as your payment is confirmed, your digital products are sent directly to your email and become available in your account dashboard." },
  { question: "Are the payments secure?", answer: "Yes, we use bank-grade 256-bit encryption and partner with industry-leading payment gateways to ensure your data is always protected." },
  { question: "Do you offer refunds?", answer: "We offer refunds for products that don't work as described within 7 days of purchase. Please check our refund policy for detailed terms on specific categories." },
]

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="relative w-full min-h-[95vh] flex flex-col items-center justify-center overflow-hidden px-6 pt-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-accent/20 blur-[120px] rounded-full pointer-events-none" />
        
        <motion.div
          initial="hidden"
          animate="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.2 },
            },
          }}
          className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto"
        >
          <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="mb-8 flex items-center gap-2 px-5 py-2.5 rounded-full glass border-border/50 text-sm font-medium text-primary shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span>Introducing Snopiz Premium iOS 26</span>
          </motion.div>
          
          <motion.h1 
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="text-6xl md:text-8xl font-semibold tracking-tight mb-8 text-balance text-foreground leading-[1.1]"
          >
            Digital perfection. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-300% animate-gradient">
              Delivered instantly.
            </span>
          </motion.h1>
          
          <motion.p 
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="text-xl md:text-2xl text-secondary-foreground mb-12 max-w-3xl text-balance font-medium"
          >
            Experience the future of digital commerce. Premium software, unmatched tools, and beautifully crafted items designed for the modern user.
          </motion.p>
          
          <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="flex flex-col sm:flex-row gap-5 w-full justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 py-7 text-lg hover-glow group shadow-[0_8px_30px_rgba(0,122,255,0.3)]">
              Explore Products
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-10 py-7 text-lg border-border/50 glass hover:bg-secondary/80 transition-colors shadow-sm text-foreground">
              View Categories
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="w-full max-w-6xl px-6 py-32 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-foreground">Browse by Category</h2>
            <p className="text-lg text-secondary-foreground">Explore our curated selection of premium digital products.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                className="h-full"
              >
                <Link href={category.href} className="block h-full group outline-none">
                  <Card className="h-full glass-panel border-border/50 rounded-3xl overflow-hidden relative p-8 flex flex-col items-start gap-5 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:-translate-y-2 dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-3xl transition-colors duration-500 z-20 pointer-events-none" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                    
                    <div className="w-14 h-14 rounded-2xl bg-secondary/80 backdrop-blur-md flex items-center justify-center border border-border/50 group-hover:scale-110 transition-transform duration-500 relative z-10 shadow-sm">
                      <Icon className="w-7 h-7 text-foreground group-hover:text-primary transition-colors duration-500" />
                    </div>
                    
                    <div className="relative z-10 flex-grow mt-2">
                      <h3 className="text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-500">{category.title}</h3>
                      <p className="text-secondary-foreground leading-relaxed">{category.description}</p>
                    </div>
                    
                    <div className="w-full mt-6 relative z-10">
                      <div className="w-full bg-secondary/50 backdrop-blur-sm text-foreground border border-border/50 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-500 flex items-center justify-between rounded-2xl px-5 py-3 font-medium">
                        {category.buttonText}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-500" />
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>


      {/* Customer Reviews Section */}
      <section className="w-full max-w-6xl px-6 py-32 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-foreground">Loved by Creators</h2>
          <p className="text-lg text-secondary-foreground">Join thousands of satisfied customers who trust Snopiz for their digital needs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              <Card className="h-full glass-panel border-border/50 rounded-3xl p-8 flex flex-col gap-6 hover-glow transition-all duration-500">
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-lg text-foreground flex-grow leading-relaxed italic">"{review.content}"</p>
                <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-lg font-semibold text-primary border border-border/50">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{review.name}</h4>
                    <p className="text-sm text-secondary-foreground">{review.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full max-w-4xl px-6 py-32 relative z-10 mb-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-foreground">Frequently Asked Questions</h2>
          <p className="text-lg text-secondary-foreground">Everything you need to know about the product and billing.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass border border-border/50 rounded-[2rem] overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left outline-none hover:bg-secondary/50 transition-colors"
              >
                <span className="text-xl font-medium text-foreground">{faq.question}</span>
                <ChevronDown className={`w-6 h-6 text-secondary-foreground transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-6 pt-2 text-lg text-secondary-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
