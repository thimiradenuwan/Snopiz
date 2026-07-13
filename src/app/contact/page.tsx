"use client"

import { motion } from "framer-motion"
import { Mail, MapPin, Send, MessageSquare, Phone } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"

const contactMethods = [
  {
    title: "Email Support",
    value: "support@snopiz.com",
    description: "Get in touch via email. We typically respond within 24 hours.",
    icon: Mail,
    href: "mailto:support@snopiz.com",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Discord Community",
    value: "Join snopiz.com",
    description: "Connect with thousands of users in our official Discord server.",
    icon: MessageSquare,
    href: "https://discord.gg/snopiz",
    gradient: "from-indigo-500/20 to-purple-500/20",
  },
  {
    title: "Telegram Channel",
    value: "@SnopizOfficial",
    description: "Get instant updates and reach our fast support team via Telegram.",
    icon: Send,
    href: "https://t.me/snopiz",
    gradient: "from-sky-500/20 to-blue-500/20",
  },
  {
    title: "WhatsApp Support",
    value: "+1 (555) 0123-4567",
    description: "Message us on WhatsApp for direct VIP support and queries.",
    icon: Phone,
    href: "https://wa.me/155501234567",
    gradient: "from-emerald-500/20 to-green-500/20",
  },
  {
    title: "Global Headquarters",
    value: "San Francisco, CA",
    description: "Our digital operations center. (Remote-first company)",
    icon: MapPin,
    href: "#",
    gradient: "from-orange-500/20 to-red-500/20",
  },
]

export default function ContactUsPage() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen pt-20 pb-32">
      {/* Header */}
      <section className="relative w-full py-20 flex flex-col items-center justify-center overflow-hidden px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[100px] rounded-full pointer-events-none opacity-50" />
        
        <div className="relative z-10 w-full max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6 text-foreground">Get in Touch</h1>
            <p className="text-xl text-secondary-foreground max-w-2xl mx-auto">
              We're here to help. Reach out to us through any of our premium support channels for instant assistance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards Grid */}
      <section className="w-full max-w-6xl px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            // Make the first card span 2 columns on large screens if we want to, but let's just use standard flow.
            // Since there are 5 cards, the last two will center if we use flex, but grid will leave one empty spot.
            // We can handle the 5th card specifically.
            const isLast = index === contactMethods.length - 1;

            return (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                className={isLast ? "sm:col-span-2 lg:col-span-1 lg:col-start-2" : ""}
              >
                <Link href={method.href} className="block h-full group outline-none">
                  <Card className="h-full glass-panel border-border/50 rounded-3xl overflow-hidden relative p-8 flex flex-col items-start gap-5 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:-translate-y-2 dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-3xl transition-colors duration-500 z-20 pointer-events-none" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${method.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                    
                    <div className="w-14 h-14 rounded-2xl bg-secondary/80 backdrop-blur-md flex items-center justify-center border border-border/50 group-hover:scale-110 transition-transform duration-500 relative z-10 shadow-sm">
                      <Icon className="w-7 h-7 text-foreground group-hover:text-primary transition-colors duration-500" />
                    </div>
                    
                    <div className="relative z-10 flex-grow mt-2">
                      <h3 className="text-2xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-500">{method.title}</h3>
                      <p className="text-lg font-medium text-primary mb-3">{method.value}</p>
                      <p className="text-secondary-foreground leading-relaxed">{method.description}</p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
