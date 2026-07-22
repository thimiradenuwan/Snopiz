"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView, animate } from "framer-motion"
import { 
  Zap, Lock, Globe, MessageCircle, CheckCircle, Shield, Server, 
  RefreshCw, DollarSign, Download, Star, ArrowRight, XCircle, HeartHandshake, ShieldCheck,
  Check
} from "lucide-react"
import Link from "next/link"

/* ────────────────────────────────────────────────────────────────────────────
 * Data Models
 * ──────────────────────────────────────────────────────────────────────────── */

const features = [
  { title: "Instant Delivery",  description: "Automated system delivers your digital purchases immediately to your inbox.", icon: Zap },
  { title: "24/7 Premium Support", description: "Our dedicated expert team is available around the clock via Discord and Telegram.", icon: MessageCircle },
  { title: "Secure Payments",   description: "Bank-grade 256-bit encryption ensures your financial data is always protected.", icon: Lock },
  { title: "Verified Products", description: "Every product is rigorously tested to guarantee peak performance and safety.", icon: ShieldCheck },
  { title: "Premium Quality",   description: "We provide only top-tier digital services that meet strict quality standards.", icon: Star },
  { title: "Fast VPN Servers",  description: "Ultra-low latency global servers designed specifically for gaming and streaming.", icon: Server },
  { title: "Regular Updates",   description: "You always have access to the latest software versions automatically.", icon: RefreshCw },
  { title: "Affordable Pricing",description: "Premium digital tools at unbeatable prices, providing maximum value.", icon: DollarSign },
]

const timelineSteps = [
  { title: "Choose a Product", description: "Browse our premium selection of VPNs, digital tools, and subscriptions.", icon: Star },
  { title: "Secure Checkout", description: "Pay securely with Stripe or Crypto. Your data is 100% encrypted.", icon: Lock },
  { title: "Automatic Delivery", description: "Our system instantly generates and emails your product credentials.", icon: Zap },
  { title: "Enjoy Instantly", description: "Setup in minutes with our easy-to-follow guides and 24/7 support.", icon: CheckCircle },
]

const comparisonData = [
  { feature: "Instant Delivery", snopiz: true, others: false },
  { feature: "24/7 Premium Support", snopiz: true, others: false },
  { feature: "Verified Clean Files", snopiz: true, others: false },
  { feature: "Affordable Pricing", snopiz: true, others: false },
  { feature: "Regular Auto-Updates", snopiz: true, others: false },
  { feature: "Encrypted Checkout", snopiz: true, others: true },
]

const reviews = [
  { name: "Alex R.", country: "🇺🇸 USA", product: "Premium VPN", rating: 5, text: "The latency for gaming is incredible. Ping dropped by 40ms instantly." },
  { name: "Sarah K.", country: "🇬🇧 UK", product: "Software Key", rating: 5, text: "Delivered instantly to my email. Key activated perfectly on the first try." },
  { name: "Jin W.", country: "🇰🇷 KR", product: "Gaming Cheat", rating: 5, text: "Undetected for months. The auto-updater is a lifesaver." },
  { name: "Michael T.", country: "🇨🇦 CAN", product: "Subscription", rating: 5, text: "Support answered my Discord ticket in literally 2 minutes. Unbeatable." },
  { name: "Elena M.", country: "🇩🇪 GER", product: "Premium VPN", rating: 5, text: "Best value for money. Setup was seamless with their tutorials." },
]

const badges = [
  { label: "256-bit Encryption", icon: Lock },
  { label: "Verified Business", icon: Shield },
  { label: "Privacy First", icon: Globe },
  { label: "Global Support", icon: HeartHandshake },
]


/* ────────────────────────────────────────────────────────────────────────────
 * Utility Components
 * ──────────────────────────────────────────────────────────────────────────── */

function AnimatedCounter({ from = 0, to, duration = 2, suffix = "", prefix = "" }: { from?: number, to: number, duration?: number, suffix?: string, prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (ref.current) {
            // format with commas if needed, though for these small numbers it's fine
            const formatted = Math.floor(value).toLocaleString()
            ref.current.textContent = `${prefix}${formatted}${suffix}`
          }
        }
      })
      return controls.stop
    }
  }, [inView, from, to, duration, prefix, suffix])

  return <span ref={ref}>{prefix}{from}{suffix}</span>
}


/* ────────────────────────────────────────────────────────────────────────────
 * Main Page
 * ──────────────────────────────────────────────────────────────────────────── */

export default function WhyChoosePage() {
  // Timeline Scroll Animation
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <div className="relative flex flex-col items-center w-full min-h-screen pt-36 pb-32 overflow-hidden bg-background text-foreground">
      {/* ─── Living Background ─── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Blurred Orbs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.4, 0.3], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-primary/20 blur-[150px] rounded-full transform-gpu"
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[10%] left-[-10%] w-[900px] h-[900px] bg-cyan-500/15 blur-[160px] rounded-full transform-gpu"
        />
        {/* Noise Texture */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col gap-32">
        
        {/* ─────────────────────────────────────────────────────────────────
            1. Hero Section
            ───────────────────────────────────────────────────────────────── */}
        <section className="flex flex-col items-center text-center mt-10 md:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Why Thousands Choose <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">Snopiz</span>
            </h1>
            <p className="text-lg md:text-xl text-secondary-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              Delivering premium VPNs, digital products and software with instant delivery and trusted support worldwide.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
              <Link href="/products" className="h-14 px-8 rounded-full bg-foreground text-background flex items-center justify-center gap-2 font-semibold hover:scale-105 hover:shadow-[0_10px_40px_rgba(255,255,255,0.15)] transition-all duration-300">
                Explore Products <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/contact" className="h-14 px-8 rounded-full bg-secondary/80 border border-border/50 text-foreground flex items-center justify-center font-semibold hover:bg-secondary hover:border-border transition-all duration-300 backdrop-blur-md">
                Contact Support
              </Link>
            </div>
          </motion.div>

          {/* Premium Stats Row */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full"
          >
            {[
              { num: 10000, suffix: "+", label: "Happy Customers" },
              { num: 99, suffix: ".9%", label: "Success Rate" },
              { num: 24, suffix: "/7", label: "Premium Support" },
              { prefix: "0", num: 0, suffix: "ms", label: "Instant Delivery", override: "Instant" },
            ].map((stat, i) => (
              <div key={i} className="glass-panel rounded-3xl p-6 flex flex-col items-center justify-center border-border/40 hover:-translate-y-1 transition-transform duration-300">
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                  {stat.override ? stat.override : <AnimatedCounter to={stat.num} suffix={stat.suffix} prefix={stat.prefix} />}
                </h3>
                <p className="text-sm font-medium text-secondary-foreground uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────
            2. Trust Features Grid
            ───────────────────────────────────────────────────────────────── */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">The Premium Standard</h2>
            <p className="text-secondary-foreground text-lg">Engineered for luxury, security, and speed.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                >
                  <div className="h-full glass-panel border-border/40 rounded-[2rem] p-8 flex flex-col items-start gap-5 hover:shadow-[0_20px_40px_rgba(0,122,255,0.12)] hover:border-primary/30 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="w-12 h-12 rounded-2xl bg-secondary/80 border border-border/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-500 relative z-10">
                      <Icon className="w-6 h-6 text-foreground group-hover:text-primary transition-colors duration-500" />
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-500">{feature.title}</h3>
                      <p className="text-sm text-secondary-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────
            3. How Snopiz Works (Timeline)
            ───────────────────────────────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto w-full py-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">How Snopiz Works</h2>
            <p className="text-secondary-foreground text-lg">From selection to execution in under 2 minutes.</p>
          </div>
          
          <div className="relative" ref={timelineRef}>
            {/* The line */}
            <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-1 bg-secondary/50 rounded-full -translate-x-1/2 overflow-hidden">
              <motion.div 
                className="w-full bg-gradient-to-b from-primary to-cyan-400 origin-top"
                style={{ scaleY: lineHeight }}
              />
            </div>

            <div className="flex flex-col gap-12">
              {timelineSteps.map((step, i) => {
                const isEven = i % 2 === 0;
                const Icon = step.icon;
                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16`}
                  >
                    {/* Node */}
                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-background border-4 border-primary z-10 flex items-center justify-center shadow-[0_0_15px_rgba(0,122,255,0.5)]">
                      <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                    </div>

                    {/* Content Box */}
                    <div className={`flex-1 pl-20 md:pl-0 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                      <div className={`glass-panel border-border/40 rounded-3xl p-6 md:p-8 hover:border-primary/30 transition-colors duration-300 inline-block w-full md:w-[85%] ${isEven ? 'md:ml-auto' : 'md:mr-auto'}`}>
                        <div className={`flex items-center gap-3 mb-3 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                          {!isEven && <Icon className="w-5 h-5 text-primary" />}
                          <span className="text-xs font-bold text-primary tracking-widest uppercase">Step {i + 1}</span>
                          {isEven && <Icon className="w-5 h-5 text-primary" />}
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                        <p className="text-secondary-foreground text-sm">{step.description}</p>
                      </div>
                    </div>
                    {/* Empty spacer for grid alignment on desktop */}
                    <div className="hidden md:block flex-1" />
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────
            4. Comparison Section
            ───────────────────────────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto w-full py-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">Why We Stand Out</h2>
            <p className="text-secondary-foreground text-lg">The numbers and features speak for themselves.</p>
          </div>

          <div className="glass-panel border-border/40 rounded-[2.5rem] overflow-hidden">
            <div className="grid grid-cols-3 text-center border-b border-border/30 bg-secondary/20">
              <div className="p-6 text-left font-semibold text-secondary-foreground">Feature</div>
              <div className="p-6 font-bold text-foreground text-lg flex items-center justify-center gap-2">
                Snopiz <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <div className="p-6 font-semibold text-secondary-foreground flex items-center justify-center gap-2">
                Others
              </div>
            </div>

            {comparisonData.map((row, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="grid grid-cols-3 text-center border-b border-border/20 last:border-0 hover:bg-secondary/10 transition-colors"
              >
                <div className="p-5 text-left font-medium text-foreground text-sm md:text-base flex items-center">
                  {row.feature}
                </div>
                <div className="p-5 flex items-center justify-center bg-primary/5">
                  {row.snopiz ? (
                    <Check className="w-6 h-6 text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  ) : (
                    <XCircle className="w-5 h-5 text-destructive/50" />
                  )}
                </div>
                <div className="p-5 flex items-center justify-center">
                  {row.others ? (
                    <Check className="w-5 h-5 text-secondary-foreground" />
                  ) : (
                    <XCircle className="w-5 h-5 text-destructive/50" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────
            5. Customer Reviews Carousel
            ───────────────────────────────────────────────────────────────── */}
        <section className="w-full py-10 overflow-hidden">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">Loved by Gamers</h2>
            <p className="text-secondary-foreground text-lg">Don't just take our word for it.</p>
          </div>

          {/* Simple scrollable carousel without massive complexity, native feel */}
          <div className="flex gap-6 overflow-x-auto pb-10 px-4 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {/* Inject global styles for hiding scrollbar just for this element via generic tailwind or inline if needed, but 'hide-scrollbar' works if defined, otherwise: */}
            <style jsx>{`
              .hide-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>
            
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                className="snap-center shrink-0 w-[300px] md:w-[350px] glass-panel border-border/40 rounded-3xl p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-foreground leading-relaxed mb-6 font-medium">"{review.text}"</p>
                </div>
                <div className="flex items-center gap-3 border-t border-border/20 pt-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold border border-border/50">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{review.name}</p>
                    <p className="text-xs text-secondary-foreground">{review.product} • {review.country}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────
            6. Security Badges
            ───────────────────────────────────────────────────────────────── */}
        <section className="w-full py-10">
          <div className="glass border-border/30 rounded-full py-6 px-4 md:px-10 flex flex-wrap items-center justify-center gap-6 md:gap-12">
            {badges.map((b, i) => {
              const Icon = b.icon
              return (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{b.label}</span>
                </div>
              )
            })}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────
            7. Massive Footer CTA
            ───────────────────────────────────────────────────────────────── */}
        <section className="w-full pb-20">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full rounded-[3rem] glass-panel border-border/50 p-12 md:p-20 flex flex-col items-center text-center overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Ready to experience <br/>
                <span className="text-primary">premium digital services?</span>
              </h2>
              <p className="text-xl text-secondary-foreground mb-10 max-w-xl mx-auto">
                Join thousands of users who have already upgraded their digital lifestyle with Snopiz.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products" className="h-14 px-10 rounded-full bg-foreground text-background flex items-center justify-center font-semibold hover:scale-105 hover:shadow-[0_10px_40px_rgba(255,255,255,0.15)] transition-all duration-300">
                  Start Shopping
                </Link>
                <Link href="/#discord" className="h-14 px-10 rounded-full bg-secondary/80 border border-border/50 text-foreground flex items-center justify-center font-semibold hover:bg-secondary transition-all duration-300 backdrop-blur-md">
                  Join Discord
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  )
}
