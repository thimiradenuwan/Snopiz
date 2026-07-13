"use client"

import { motion } from "framer-motion"
import { Download } from "lucide-react"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

export default function DownloadsPage() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen pt-24 pb-32 px-6">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel p-16 rounded-3xl border-border/50 text-center flex flex-col items-center"
        >
          <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 border border-primary/20">
            <Download className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground mb-4">My Downloads</h1>
          <p className="text-secondary-foreground text-lg mb-8 max-w-xl mx-auto">
            No downloads yet. Purchase a digital product and it will appear here instantly.
          </p>
          <Link href="/products" className={buttonVariants({ className: "rounded-full px-8" })}>
            Browse Products
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
