"use client"

import { motion } from "framer-motion"
import { FileText } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen pt-24 pb-32 px-6">
      <div className="w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-5xl font-semibold tracking-tight text-foreground mb-4">Terms of Service</h1>
          <p className="text-secondary-foreground">Last updated: July 2026</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-8 rounded-3xl border-border/50 space-y-6 text-secondary-foreground leading-relaxed"
        >
          {[
            {
              title: "Acceptance of Terms",
              content: "By accessing and using Snopiz, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service."
            },
            {
              title: "Digital Products",
              content: "All products sold on Snopiz are digital in nature. Upon successful payment, products are delivered instantly to your registered email and account dashboard. Due to the nature of digital products, all sales are final unless the product is proven defective."
            },
            {
              title: "Refund Policy",
              content: "Refunds are considered on a case-by-case basis within 7 days of purchase, only if the digital product does not function as described. Game cheats and VPN services are non-refundable once activated."
            },
            {
              title: "Prohibited Use",
              content: "You agree not to use our products for any unlawful purpose or in a way that could harm Snopiz or its users. Reselling or redistributing purchased digital products without authorization is strictly prohibited."
            },
            {
              title: "Limitation of Liability",
              content: "Snopiz shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service. Contact support@snopiz.com for any disputes."
            },
          ].map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-semibold text-foreground mb-2">{section.title}</h2>
              <p>{section.content}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
