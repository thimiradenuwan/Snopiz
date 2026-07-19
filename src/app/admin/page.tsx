import { prisma } from "@/lib/prisma"
import { StatCard } from "@/components/admin/stat-card"
import { RecentUsers } from "@/components/admin/recent-users"
import { RecentOrders } from "@/components/admin/recent-orders"
import { QuickActions } from "@/components/admin/quick-actions"
import { Users, Package, Tags, ShoppingCart } from "lucide-react"

export default async function AdminDashboardPage() {
  // Fetch statistics
  const [
    totalUsers,
    totalProducts,
    totalCategories,
    totalOrders,
    recentUsers,
    recentOrders,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.product.count(),
    prisma.category.count(),
    prisma.order.count(),
    prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
      },
    }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { name: true, email: true, image: true },
        },
      },
    }),
  ])

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-secondary-foreground mt-1">
            Welcome to the Snopiz admin portal. Here's what's happening today.
          </p>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value={totalUsers} 
          icon={<Users className="h-6 w-6" />} 
          delay={0.0} 
        />
        <StatCard 
          title="Total Products" 
          value={totalProducts} 
          icon={<Package className="h-6 w-6" />} 
          delay={0.1} 
        />
        <StatCard 
          title="Total Categories" 
          value={totalCategories} 
          icon={<Tags className="h-6 w-6" />} 
          delay={0.2} 
        />
        <StatCard 
          title="Total Orders" 
          value={totalOrders} 
          icon={<ShoppingCart className="h-6 w-6" />} 
          delay={0.3} 
        />
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentUsers users={recentUsers} />
        <RecentOrders orders={recentOrders} />
        <QuickActions />
      </div>
    </div>
  )
}
