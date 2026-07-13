"use client"

import { motion } from "framer-motion"
import { HelpCircle, ChevronDown } from "lucide-react"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"

const faqs = [
  {
    question: "How fast is the delivery?",
    answer: "Delivery is completely instant! As soon as your payment is confirmed, your digital products are sent directly to your email and become available in your account dashboard.",
  },
  {
    question: "Are the payments secure?",
    answer: "Yes, we use bank-grade 256-bit encryption and partner with industry-leading payment gateways to ensure your data is always protected.",
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer refunds for products that don't work as described within 7 days of purchase. Please check our refund policy for detailed terms on specific categories.",
  },
  {
    question: "How do I access my purchases?",
    answer: "After purchase, all your digital products are available in the Downloads section of your account. You'll also receive an email with download instructions.",
  },
  {
    question: "Are the VPN plans anonymous?",
    answer: "Yes, our V2Ray VPN plans operate with a strict no-logging policy. We do not track, store, or share your browsing activity.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept all major credit/debit cards, PayPal, and various cryptocurrency options for maximum privacy and convenience.",
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="flex flex-col items-center w-full min-h-screen pt-24 pb-32 px-6">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-5xl font-semibold tracking-tight text-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-secondary-foreground">
            Everything you need to know about Snopiz.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07 + 0.2 }}
              className="glass border border-border/50 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-secondary/30 transition-colors"
              >
                <span className="text-base font-medium text-foreground pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-secondary-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="px-6 pb-5 text-secondary-foreground leading-relaxed border-t border-border/50 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
