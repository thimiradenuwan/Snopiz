"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { PlusCircle, Tags, Users, Settings } from "lucide-react"

export function QuickActions() {
  const actions = [
    {
      title: "Add Product",
      description: "Create a new product listing",
      icon: <PlusCircle className="h-6 w-6" />,
      href: "/admin/products/new",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "Add Category",
      description: "Create a new category",
      icon: <Tags className="h-6 w-6" />,
      href: "/admin/categories/new",
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    {
      title: "Manage Users",
      description: "View and edit user roles",
      icon: <Users className="h-6 w-6" />,
      href: "/admin/users",
      color: "text-green-500",
      bg: "bg-green-500/10"
    },
    {
      title: "Settings",
      description: "Configure store preferences",
      icon: <Settings className="h-6 w-6" />,
      href: "/admin/settings",
      color: "text-orange-500",
      bg: "bg-orange-500/10"
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
      className="col-span-1 md:col-span-2 lg:col-span-1"
    >
      <Card className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col">
        <h3 className="text-xl font-semibold mb-6 text-foreground">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              <Link href={action.href} className="block group">
                <div className="p-4 rounded-2xl border border-border/50 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                  <div className={`p-3 rounded-xl inline-flex mb-3 ${action.bg} ${action.color}`}>
                    {action.icon}
                  </div>
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {action.title}
                  </h4>
                  <p className="text-xs text-secondary-foreground mt-1">
                    {action.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}
