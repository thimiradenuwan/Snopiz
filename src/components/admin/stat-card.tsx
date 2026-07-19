"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

interface StatCardProps {
  title: string
  value: string | number
  icon: ReactNode
  delay?: number
}

export function StatCard({ title, value, icon, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="glass-panel p-6 rounded-3xl border-white/10 hover-lift h-full flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-secondary-foreground">{title}</p>
            <h3 className="text-3xl font-bold tracking-tight text-foreground">{value}</h3>
          </div>
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            {icon}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
