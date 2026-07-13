"use client"

import { motion } from "framer-motion"
import { Zap, Lock, Globe, MessageCircle } from "lucide-react"
import { Card } from "@/components/ui/card"

const features = [
  { title: "Instant Delivery", description: "Automated system delivers your digital purchases immediately to your inbox.", icon: Zap, gradient: "from-yellow-500/20 to-orange-500/20" },
  { title: "Secure Payments", description: "Bank-grade 256-bit encryption ensures your financial data is always protected.", icon: Lock, gradient: "from-green-500/20 to-emerald-500/20" },
  { title: "Worldwide Access", description: "No borders. Access your premium tools and services from anywhere globally.", icon: Globe, gradient: "from-blue-500/20 to-cyan-500/20" },
  { title: "24/7 Support", description: "Our dedicated expert team is available around the clock to assist you.", icon: MessageCircle, gradient: "from-purple-500/20 to-pink-500/20" },
]

export default function WhyChoosePage() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen pt-20 pb-32">
      {/* Header */}
      <section className="relative w-full py-20 flex flex-col items-center justify-center overflow-hidden px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 blur-[100px] rounded-full pointer-events-none opacity-50" />
        
        <div className="relative z-10 w-full max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6 text-foreground">Why Choose Snopiz</h1>
            <p className="text-xl text-secondary-foreground max-w-2xl mx-auto">
              We deliver an unparalleled premium experience tailored for the modern digital era. Here's what sets us apart.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full max-w-6xl px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
              >
                <Card className="glass-panel border-border/50 rounded-[2rem] p-8 flex items-start gap-6 hover-glow group transition-all duration-500 h-full">
                  <div className="w-16 h-16 rounded-2xl bg-secondary/80 backdrop-blur-md flex items-center justify-center border border-border/50 shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-sm relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <Icon className="w-8 h-8 text-foreground group-hover:text-primary transition-colors duration-500 relative z-10" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground mb-3">{feature.title}</h3>
                    <p className="text-secondary-foreground text-lg leading-relaxed">{feature.description}</p>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
