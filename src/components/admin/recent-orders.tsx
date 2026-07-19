"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface OrderUser {
  name: string | null
  email: string | null
  image: string | null
}

interface Order {
  id: string
  total: number
  status: string
  paymentStatus: string
  createdAt: Date
  user: OrderUser
}

export function RecentOrders({ orders }: { orders: Order[] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "DELIVERED": return "bg-green-500/10 text-green-500"
      case "SHIPPED": return "bg-blue-500/10 text-blue-500"
      case "PROCESSING": return "bg-yellow-500/10 text-yellow-500"
      case "CANCELLED": return "bg-red-500/10 text-red-500"
      default: return "bg-gray-500/10 text-gray-500"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "PAID": return "bg-green-500/10 text-green-500"
      case "FAILED": return "bg-red-500/10 text-red-500"
      case "REFUNDED": return "bg-orange-500/10 text-orange-500"
      default: return "bg-yellow-500/10 text-yellow-500"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
      className="col-span-1 md:col-span-2 lg:col-span-2"
    >
      <Card className="glass-panel p-6 rounded-3xl border-white/10 h-full flex flex-col">
        <h3 className="text-xl font-semibold mb-6 text-foreground">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-secondary-foreground uppercase bg-secondary/50 rounded-lg">
              <tr>
                <th className="px-4 py-3 rounded-l-lg font-medium">Order ID</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Payment</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 rounded-r-lg font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="border-b border-border/50 hover:bg-white/5 transition-colors group"
                >
                  <td className="px-4 py-4 font-mono text-xs text-muted-foreground">
                    #{order.id.slice(-8).toUpperCase()}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border border-border">
                        <AvatarImage src={order.user.image || ""} />
                        <AvatarFallback>{order.user.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">{order.user.name || "Unknown"}</span>
                        <span className="text-xs text-secondary-foreground">{order.user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-secondary-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right font-medium">
                    ${order.total.toFixed(2)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && (
            <p className="text-sm text-secondary-foreground text-center py-8">No recent orders found.</p>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
