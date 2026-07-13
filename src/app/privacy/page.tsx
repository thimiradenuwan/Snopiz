"use client"

import { motion } from "framer-motion"
import { Shield } from "lucide-react"

export default function PrivacyPolicyPage() {
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
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-5xl font-semibold tracking-tight text-foreground mb-4">Privacy Policy</h1>
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
              title: "Information We Collect",
              content: "We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This includes your name, email address, and payment information (processed securely via our payment partners)."
            },
            {
              title: "How We Use Your Information",
              content: "We use the information we collect to process transactions, send you related information including purchase confirmations and invoices, respond to your comments and questions, and send you technical notices and support messages."
            },
            {
              title: "Data Security",
              content: "We implement bank-grade 256-bit encryption and industry-standard security measures to protect your personal information. Your payment information is never stored on our servers and is processed entirely by our trusted payment partners."
            },
            {
              title: "No-Log Policy",
              content: "For VPN services, we operate a strict no-logging policy. We do not track, record, or store your browsing activity, connection timestamps, or IP addresses while you use our VPN services."
            },
            {
              title: "Contact Us",
              content: "If you have questions about this Privacy Policy, please contact us at support@snopiz.com or through our official Discord server."
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
