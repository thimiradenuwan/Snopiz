import { redirect } from "next/navigation"
import { auth } from "@/auth"
import Link from "next/link"
import { ShieldAlert, LayoutDashboard, Users, ShoppingCart, Settings, PackageSearch, Tags, Network, Box } from "lucide-react"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  
  if (!session || (session.user as any)?.role !== "ADMIN") {
    redirect("/")
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center gap-2 mr-8">
            <div className="bg-primary/10 p-2 rounded-xl text-primary">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg tracking-tight hidden md:inline-block">Admin Portal</span>
          </div>
          
          <nav className="flex items-center space-x-1 lg:space-x-2 text-sm font-medium">
            <Link 
              href="/admin" 
              className="px-3 py-2 text-secondary-foreground hover:text-foreground transition-colors hover:bg-secondary rounded-md flex items-center gap-2"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline-block">Dashboard</span>
            </Link>
            <Link 
              href="/admin/categories" 
              className="px-3 py-2 text-secondary-foreground hover:text-foreground transition-colors hover:bg-secondary rounded-md flex items-center gap-2"
            >
              <Tags className="h-4 w-4" />
              <span className="hidden sm:inline-block">Categories</span>
            </Link>
            <Link 
              href="/admin/products" 
              className="px-3 py-2 text-secondary-foreground hover:text-foreground transition-colors hover:bg-secondary rounded-md flex items-center gap-2"
            >
              <PackageSearch className="h-4 w-4" />
              <span className="hidden sm:inline-block">Products</span>
            </Link>
            <Link 
              href="/admin/orders" 
              className="px-3 py-2 text-secondary-foreground hover:text-foreground transition-colors hover:bg-secondary rounded-md flex items-center gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline-block">Orders</span>
            </Link>
            <Link 
              href="/admin/users" 
              className="px-3 py-2 text-secondary-foreground hover:text-foreground transition-colors hover:bg-secondary rounded-md flex items-center gap-2"
            >
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline-block">Users</span>
            </Link>
            <Link 
              href="/admin/vpn-providers" 
              className="px-3 py-2 text-secondary-foreground hover:text-foreground transition-colors hover:bg-secondary rounded-md flex items-center gap-2"
            >
              <Network className="h-4 w-4" />
              <span className="hidden sm:inline-block">VPN Providers</span>
            </Link>
            <Link 
              href="/admin/vpn-packages" 
              className="px-3 py-2 text-secondary-foreground hover:text-foreground transition-colors hover:bg-secondary rounded-md flex items-center gap-2"
            >
              <Box className="h-4 w-4" />
              <span className="hidden sm:inline-block">VPN Packages</span>
            </Link>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <Link 
              href="/admin/settings" 
              className="px-3 py-2 text-secondary-foreground hover:text-foreground transition-colors hover:bg-secondary rounded-md flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline-block">Settings</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
