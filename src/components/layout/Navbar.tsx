"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { Moon, Sun, User, Package, Download, Heart, Settings, ShieldCheck, LogOut, ShoppingCart } from "lucide-react"
import { useTheme } from "next-themes"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
    
    if (latest > 50) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  })

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 transition-all duration-300`}
    >
      <div 
        className={`w-full max-w-6xl flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${
          isScrolled 
            ? "glass border border-border/50 shadow-lg" 
            : "bg-transparent"
        }`}
      >
        <Link href="/" className="text-xl font-semibold tracking-tighter text-foreground flex items-center gap-1">
          Snopiz<span className="text-primary">.com</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-secondary-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <Link href="/products" className="hover:text-foreground transition-colors">Products</Link>
          <Link href="/why-choose" className="hover:text-foreground transition-colors">Why Choose</Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link>
        </nav>

        <div className="flex items-center gap-4 text-sm font-medium">
          {mounted ? (
            <button 
              aria-label="Toggle Theme" 
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-secondary/80 hover:bg-secondary transition-colors border border-border/50 backdrop-blur-md"
            >
              {resolvedTheme === "dark" ? (
                <Moon className="w-4 h-4 text-primary" />
              ) : (
                <Sun className="w-4 h-4 text-primary" />
              )}
            </button>
          ) : (
            <div className="w-9 h-9 rounded-full bg-secondary border border-border/50"></div>
          )}

          <Link href="/cart" className="flex items-center justify-center w-9 h-9 rounded-full bg-secondary/80 hover:bg-secondary transition-colors border border-border/50 backdrop-blur-md">
            <ShoppingCart className="w-4 h-4 text-foreground" />
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <Avatar className="w-10 h-10 border-2 border-border/50 hover:border-primary/50 transition-colors cursor-pointer shadow-sm">
                <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 glass-panel border-border/50">
              <DropdownMenuLabel className="px-2 py-1.5 text-sm font-semibold text-foreground">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border/50" />
              <DropdownMenuItem className="rounded-xl cursor-pointer hover:bg-secondary focus:bg-secondary p-0">
                <Link href="/profile" className="flex w-full items-center px-2 py-1.5">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl cursor-pointer hover:bg-secondary focus:bg-secondary p-0">
                <Link href="/orders" className="flex w-full items-center px-2 py-1.5">
                  <Package className="mr-2 h-4 w-4" />
                  <span>Orders</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl cursor-pointer hover:bg-secondary focus:bg-secondary p-0">
                <Link href="/downloads" className="flex w-full items-center px-2 py-1.5">
                  <Download className="mr-2 h-4 w-4" />
                  <span>Downloads</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl cursor-pointer hover:bg-secondary focus:bg-secondary p-0">
                <Link href="/wishlist" className="flex w-full items-center px-2 py-1.5">
                  <Heart className="mr-2 h-4 w-4" />
                  <span>Wishlist</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl cursor-pointer hover:bg-secondary focus:bg-secondary p-0">
                <Link href="/settings" className="flex w-full items-center px-2 py-1.5">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border/50" />
              <DropdownMenuItem className="rounded-xl cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 hover:bg-destructive/10 p-0">
                <Link href="/logout" className="flex w-full items-center px-2 py-1.5">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  )
}
