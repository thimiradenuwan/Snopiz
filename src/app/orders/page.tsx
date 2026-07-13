"use client"

import { motion } from "framer-motion"
import { Package, Clock, CheckCircle } from "lucide-react"

export default function OrdersPage() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen pt-24 pb-32">
      <div className="w-full max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel p-10 rounded-3xl border-border/50 text-center"
        >
          <div className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-6 border border-primary/30">
            <Package className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground mb-4">Order History</h1>
          <p className="text-secondary-foreground text-lg mb-8 max-w-xl mx-auto">
            Track your recent purchases, view invoices, and manage your subscriptions. This section is currently under construction.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
