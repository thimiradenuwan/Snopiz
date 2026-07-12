import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import { Package, Download, Settings, LogOut } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const session = await auth()

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border-white/5">
            <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center text-2xl font-bold mb-4">
              {session?.user?.name?.[0] || session?.user?.email?.[0]?.toUpperCase() || "U"}
            </div>
            <h3 className="text-lg font-semibold text-white truncate">{session?.user?.name || "User"}</h3>
            <p className="text-sm text-secondary-foreground truncate mb-6">{session?.user?.email}</p>
            
            <nav className="space-y-2">
              <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2 text-white bg-white/10 rounded-xl transition-colors">
                <Package className="w-4 h-4" /> Orders
              </Link>
              <Link href="/dashboard/downloads" className="flex items-center gap-3 px-4 py-2 text-secondary-foreground hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                <Download className="w-4 h-4" /> Downloads
              </Link>
              <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-2 text-secondary-foreground hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                <Settings className="w-4 h-4" /> Settings
              </Link>
            </nav>
            
            <div className="mt-8 pt-6 border-t border-white/10">
              <form action={async () => {
                "use server"
                await signOut({ redirectTo: "/" })
              }}>
                <Button type="submit" variant="ghost" className="w-full flex items-center justify-start gap-3 px-4 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl">
                  <LogOut className="w-4 h-4" /> Sign Out
                </Button>
              </form>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">Order History</h1>
          <div className="glass-panel p-12 rounded-3xl border-white/5 flex flex-col items-center justify-center text-center">
            <Package className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
            <h2 className="text-xl font-semibold text-white mb-2">No orders yet</h2>
            <p className="text-secondary-foreground">When you purchase a premium asset, it will appear here.</p>
          </div>
        </main>
      </div>
    </div>
  )
}
