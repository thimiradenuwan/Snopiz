"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    // Simulate logout delay
    const timer = setTimeout(() => {
      router.push("/")
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen pt-24 pb-32">
      <div className="w-full max-w-lg px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-panel p-10 rounded-3xl border-border/50 text-center flex flex-col items-center"
        >
          <div className="w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center mb-6 border border-destructive/30">
            <LogOut className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-2">Logging out...</h1>
          <p className="text-secondary-foreground text-sm">
            Please wait while we securely sign you out of your account.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
