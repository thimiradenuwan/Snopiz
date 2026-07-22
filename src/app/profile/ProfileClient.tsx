"use client"

import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  User, Package, Download, Heart, Settings, LogOut,
  ShoppingBag, Star, ChevronRight, Bell, Shield, Globe, Palette,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"

type UserProps = {
  name: string | null;
  email: string | null;
  role: string;
  createdAt: Date;
  image: string | null;
}

const sidebarItems = [
  { id: "profile",   label: "Profile",   icon: User },
  { id: "orders",    label: "Orders",    icon: Package },
  { id: "downloads", label: "Downloads", icon: Download },
  { id: "wishlist",  label: "Wishlist",  icon: Heart },
  { id: "settings",  label: "Settings",  icon: Settings },
]


/* ─────────────────────────────── Profile Content ──────────────────────────── */
function ProfileContent({ user }: { user?: UserProps }) {
  const joinDate = user?.createdAt 
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'Unknown';
    
  return (
    <div className="space-y-4">

      {/* ── Hero card ── */}
      <div className="relative overflow-hidden rounded-[2rem] glass-panel px-7 py-6">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/8 rounded-full blur-3xl pointer-events-none" />

        {/* Avatar + name row */}
        <div className="relative flex items-center gap-5">
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/25 flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            {/* Online dot */}
            <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-background ring-[1.5px] ring-emerald-500/30" />
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-foreground tracking-tight leading-tight">{user?.name || 'User'}</h2>
            <p className="text-sm text-secondary-foreground mt-0.5">{user?.role === 'ADMIN' ? 'Administrator' : 'Premium Member'}</p>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex-shrink-0">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Active
          </span>
        </div>
      </div>

      {/* ── Account details ── iOS grouped list */}
      <div className="glass-panel rounded-[2rem] overflow-hidden">
        <div className="px-5 py-3 border-b border-border/30">
          <p className="text-[10px] font-bold text-secondary-foreground uppercase tracking-[0.12em]">Account Details</p>
        </div>
        {[
          { label: "Email",    value: user?.email || "Not set",        hasAction: false },
          { label: "Name",     value: user?.name || "Not set",         hasAction: false },
          { label: "Role",     value: user?.role || "USER",            hasAction: false },
          { label: "Joined",   value: joinDate,                        hasAction: false },
        ].map((item, i, arr) => (
          <div key={item.label}>
            <div className={`flex items-center justify-between px-5 py-3.5 ${item.hasAction ? "cursor-pointer active:bg-secondary/50" : ""}`}>
              <span className="text-sm text-secondary-foreground">{item.label}</span>
              <div className="flex items-center gap-1">
                <span className={`text-sm font-medium ${item.hasAction ? "text-primary" : "text-foreground"}`}>{item.value}</span>
                {item.hasAction && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />}
              </div>
            </div>
            {i < arr.length - 1 && <div className="ios-separator mx-5" />}
          </div>
        ))}
      </div>

    </div>
  )
}

/* ─────────────────────────────── Empty State ───────────────────────────────── */
function EmptyState({ icon: Icon, title, desc }: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  desc: string
}) {
  return (
    <div className="glass-panel rounded-[2rem] px-8 py-16 flex flex-col items-center text-center">
      <div className="w-14 h-14 rounded-2xl bg-secondary/80 border border-border/50 flex items-center justify-center mb-5">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h2 className="text-lg font-bold text-foreground mb-2 tracking-tight">{title}</h2>
      <p className="text-secondary-foreground text-sm max-w-xs leading-relaxed">{desc}</p>
    </div>
  )
}

/* ─────────────────────────────── Settings ───────────────────────────────────  */
const settingsGroups = [
  {
    title: "Preferences",
    items: [
      { label: "Notifications", desc: "Order updates & announcements", icon: Bell },
      { label: "Appearance",    desc: "Dark mode, accent color",       icon: Palette },
      { label: "Language",      desc: "English (US)",                  icon: Globe },
    ],
  },
  {
    title: "Security",
    items: [
      { label: "Two-Factor Auth", desc: "Add extra security layer", icon: Shield },
    ],
  },
]

function SettingsContent() {
  return (
    <div className="space-y-4">
      {settingsGroups.map((group) => (
        <div key={group.title} className="glass-panel rounded-[2rem] overflow-hidden">
          <div className="px-5 py-3 border-b border-border/30">
            <p className="text-[10px] font-bold text-secondary-foreground uppercase tracking-[0.12em]">{group.title}</p>
          </div>
          {group.items.map((item, i, arr) => {
            const Icon = item.icon
            return (
              <div key={item.label}>
                <div className="flex items-center gap-3.5 px-5 py-3.5 cursor-pointer active:bg-secondary/50 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-secondary/80 border border-border/40 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3.5 h-3.5 text-foreground/70" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-secondary-foreground truncate">{item.desc}</p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                </div>
                {i < arr.length - 1 && <div className="ios-separator mx-5" />}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

const contentMap: Record<string, React.ComponentType<any>> = {
  profile:   ProfileContent,
  orders:    () => <EmptyState icon={Package}  title="No Orders Yet"     desc="Your orders will appear here after your first purchase." />,
  downloads: () => <EmptyState icon={Download} title="No Downloads Yet"  desc="Purchased digital products are available for instant download." />,
  wishlist:  () => <EmptyState icon={Heart}    title="Wishlist is Empty"  desc="Save favourite products here to find them easily later." />,
  settings:  SettingsContent,
}

/* ─────────────────────────────── Page ──────────────────────────────────────── */
export default function ProfileClient({ user }: { user: UserProps }) {
  const [active, setActive] = useState("profile")
  const router = useRouter()
  const ActiveContent = contentMap[active] ?? ProfileContent

  return (
    <div className="relative w-full min-h-screen pt-36 pb-32 px-4 md:px-6 overflow-hidden">
      {/* Subtle single-hue background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative w-full max-w-4xl mx-auto">

        {/* Page title */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">My Account</h1>
          <p className="text-sm text-secondary-foreground mt-0.5">Manage your profile and preferences</p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 items-stretch">

          {/* ── Sidebar ── */}
          <motion.aside
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full md:w-48 flex-shrink-0 h-full"
          >
            <div className="glass-panel rounded-[2rem] overflow-hidden h-full flex flex-col">

              {/* Mini user header */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border/30">
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <User className="w-3.5 h-3.5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">{user.name || 'User'}</p>
                  <p className="text-[10px] text-secondary-foreground">{user.role}</p>
                </div>
              </div>

              {/* Nav items */}
              <div className="px-3 py-3">
                {user.role === 'ADMIN' && (
                  <Link
                    href="/admin"
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left mb-1 text-primary hover:bg-primary/10"
                  >
                    <Shield className="w-4 h-4 flex-shrink-0" />
                    Admin Portal
                  </Link>
                )}
                {sidebarItems.map(({ id, label, icon: Icon }) => {
                  const isActive = active === id
                  return (
                    <button
                      key={id}
                      onClick={() => setActive(id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left mb-1 last:mb-0 ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-[0_2px_12px_rgba(0,122,255,0.35)]"
                          : "text-secondary-foreground hover:bg-secondary/60 hover:text-foreground"
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      {label}
                    </button>
                  )
                })}
              </div>

              {/* Logout */}
              <div className="px-3 py-3 border-t border-border/30 mt-auto">
                <button
                  onClick={async () => {
                    const { useCartStore } = await import("@/store/cartStore")
                    useCartStore.getState().clearCart()
                    signOut({ callbackUrl: "/login" })
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors text-left"
                >
                  <LogOut className="w-4 h-4 flex-shrink-0" />
                  Logout
                </button>
              </div>

            </div>
          </motion.aside>

          {/* ── Main Content ── */}
          <div className="flex-1 min-w-0 h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
              >
                <ActiveContent user={user} />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  )
}
