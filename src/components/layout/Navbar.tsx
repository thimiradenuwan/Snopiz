"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Moon, Sun, ShoppingCart, Menu, X, User, LogOut, Package, Download, Heart, Settings } from "lucide-react"
import { useTheme } from "next-themes"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useCartStore } from "@/store/cartStore"
import { Session } from "next-auth"
import { useRouter } from "next/navigation"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/why-choose", label: "Why Choose" },
  { href: "/contact", label: "Contact Us" },
]


export function Navbar({ session }: { session: Session | null }) {
  const pathname = usePathname()
  const router = useRouter()
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const cart = useCartStore()

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  const cartCount = mounted ? cart.totalItems() : 0

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4"
    >
      <div
        className={`w-full max-w-6xl flex items-center justify-between px-5 py-2.5 rounded-full transition-all duration-500 ${
          isScrolled
            ? "bg-card/85 backdrop-blur-2xl border border-border/60 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "bg-card/40 backdrop-blur-xl border border-border/40 shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold tracking-tighter text-foreground flex items-center gap-0.5 flex-shrink-0">
          Snopiz<span className="text-primary">.com</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isActive(link.href)
                  ? "text-foreground bg-secondary/80"
                  : "text-secondary-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          {mounted ? (
            <button
              aria-label="Toggle theme"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-secondary/70 hover:bg-secondary transition-colors border border-border/50 backdrop-blur-md"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="w-4 h-4 text-primary" />
              ) : (
                <Moon className="w-4 h-4 text-primary" />
              )}
            </button>
          ) : (
            <div className="w-9 h-9 rounded-full bg-secondary/50 border border-border/50" />
          )}

          {/* Cart */}
          <Link
            href="/cart"
            className="relative flex items-center justify-center w-9 h-9 rounded-full bg-secondary/70 hover:bg-secondary transition-colors border border-border/50 backdrop-blur-md"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="w-4 h-4 text-foreground" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>

          {/* Authentication UI */}
          {session?.user ? (
            <Link href="/profile" className="outline-none">
              <Avatar className={`w-9 h-9 border-2 transition-colors cursor-pointer shadow-sm ${
                pathname.startsWith("/profile") || pathname.startsWith("/orders") || pathname.startsWith("/downloads") || pathname.startsWith("/wishlist") || pathname.startsWith("/settings")
                  ? "border-primary"
                  : "border-border/50 hover:border-primary/50"
              }`}>
                <AvatarImage src={session.user.image || ""} alt={session.user.name || "User"} />
                <AvatarFallback className="text-sm font-semibold bg-secondary text-foreground">
                  {session.user.name?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-1.5 rounded-full text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="px-4 py-1.5 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-[0_0_15px_rgba(0,122,255,0.3)]"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="flex md:hidden items-center justify-center w-9 h-9 rounded-full bg-secondary/70 hover:bg-secondary transition-colors border border-border/50"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 left-4 right-4 bg-card/90 backdrop-blur-2xl border border-border/60 rounded-3xl p-3 shadow-[0_16px_48px_rgba(0,0,0,0.2)] flex flex-col gap-1"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-secondary text-foreground"
                    : "text-secondary-foreground hover:bg-secondary/60 hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
