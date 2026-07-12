"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { Search, ShoppingBag, User } from "lucide-react"
import { useCartStore } from "@/store/cartStore"

export function Navbar() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  const totalItems = useCartStore((state) => state.totalItems())

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 transition-all duration-300`}
    >
      <div 
        className={`w-full max-w-6xl flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-300 ${
          isScrolled 
            ? "glass border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" 
            : "bg-transparent"
        }`}
      >
        <Link href="/" className="text-xl font-semibold tracking-tighter text-white">
          SNOPIZ<span className="text-primary">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-secondary-foreground">
          <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
          <Link href="/digital" className="hover:text-white transition-colors">Digital</Link>
          <Link href="/categories" className="hover:text-white transition-colors">Categories</Link>
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
        </nav>

        <div className="flex items-center gap-4">
          <button aria-label="Search" className="text-secondary-foreground hover:text-white transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <Link href="/dashboard" aria-label="User Dashboard" className="text-secondary-foreground hover:text-white transition-colors">
            <User className="w-5 h-5" />
          </Link>
          <Link href="/cart" aria-label="Shopping Cart" className="text-secondary-foreground hover:text-white transition-colors relative">
            <ShoppingBag className="w-5 h-5" />
            {mounted && totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </motion.header>
  )
}
