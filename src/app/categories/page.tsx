"use client"
import { motion } from "framer-motion"

export default function CategoriesPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-24 min-h-[70vh] flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-12 rounded-3xl border-white/10 text-center max-w-2xl w-full"
      >
        <h1 className="text-4xl font-bold tracking-tight text-white mb-6">Categories</h1>
        <p className="text-secondary-foreground text-lg mb-8">
          This premium page is currently under construction. Apple-quality design and functionality coming soon.
        </p>
      </motion.div>
    </div>
  )
}
