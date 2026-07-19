"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface User {
  id: string
  name: string | null
  email: string | null
  image: string | null
  role: string
  createdAt: Date
}

export function RecentUsers({ users }: { users: User[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
      className="col-span-1 md:col-span-2 lg:col-span-1"
    >
      <Card className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col">
        <h3 className="text-xl font-semibold mb-6 text-foreground">Recent Users</h3>
        <div className="space-y-6 flex-1 overflow-hidden">
          {users.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center gap-4 group hover:bg-white/5 p-2 -mx-2 rounded-2xl transition-colors"
            >
              <Avatar className="h-10 w-10 border border-border">
                <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                <AvatarFallback>{user.name?.charAt(0) || user.email?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{user.name || "Unknown User"}</p>
                <p className="text-xs text-secondary-foreground truncate">{user.email}</p>
              </div>
              <div className="text-right flex flex-col items-end">
                <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                  {user.role}
                </span>
                <span className="text-[10px] text-muted-foreground mt-1">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </motion.div>
          ))}
          {users.length === 0 && (
            <p className="text-sm text-secondary-foreground text-center py-8">No recent users found.</p>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
