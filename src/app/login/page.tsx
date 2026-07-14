"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Mail, Lock, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { loginAction } from "@/actions/auth"

export default function LoginPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    const result = await loginAction(formData)
    
    if (result?.error) {
      setError(result.error)
      setIsSubmitting(false)
    } else {
      router.push("/profile")
      router.refresh()
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen pt-24 pb-24 overflow-hidden bg-background">
      
      {/* ─── Animated Background ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-primary/20 blur-[140px] rounded-full"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-20%] left-[-10%] w-[900px] h-[900px] bg-cyan-500/10 blur-[150px] rounded-full"
        />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full rounded-[2.5rem] bg-secondary/30 border border-border/40 backdrop-blur-2xl p-8 sm:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {/* Form internal glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold tracking-tight mb-2">
                Welcome <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">Back</span>
              </h1>
              <p className="text-secondary-foreground text-sm">Sign in to your Snopiz account</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email Input */}
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-foreground group-focus-within:text-primary transition-colors z-10" />
                <input 
                  type="email" 
                  name="email"
                  required
                  className="w-full h-14 bg-background/50 border border-border/50 rounded-[18px] pl-12 pr-5 pt-3 pb-1 text-foreground placeholder-transparent focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all peer"
                  placeholder="Email"
                />
                <label className="absolute left-12 top-4 text-secondary-foreground text-sm transition-all peer-focus:-translate-y-2.5 peer-focus:text-[10px] peer-focus:text-primary peer-valid:-translate-y-2.5 peer-valid:text-[10px] pointer-events-none">Email Address</label>
              </div>

              {/* Password Input */}
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-foreground group-focus-within:text-primary transition-colors z-10" />
                <input 
                  type="password" 
                  name="password"
                  required
                  className="w-full h-14 bg-background/50 border border-border/50 rounded-[18px] pl-12 pr-5 pt-3 pb-1 text-foreground placeholder-transparent focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all peer"
                  placeholder="Password"
                />
                <label className="absolute left-12 top-4 text-secondary-foreground text-sm transition-all peer-focus:-translate-y-2.5 peer-focus:text-[10px] peer-focus:text-primary peer-valid:-translate-y-2.5 peer-valid:text-[10px] pointer-events-none">Password</label>
              </div>

              <div className="flex items-center justify-between mt-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-border/50 bg-background/50 text-primary focus:ring-primary/50 focus:ring-offset-0" />
                  <span className="text-sm text-secondary-foreground group-hover:text-foreground transition-colors">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-sm text-primary hover:text-primary/80 transition-colors">
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <div className="pt-4 relative">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full h-14 bg-gradient-to-r from-primary to-cyan-500 rounded-full flex items-center justify-center gap-2 text-white font-semibold text-lg shadow-[0_4px_20px_rgba(0,122,255,0.4)] hover:shadow-[0_4px_25px_rgba(0,122,255,0.6)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:pointer-events-none overflow-hidden relative group"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-6 h-6 animate-spin text-white" />
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                </button>
              </div>
              
              <div className="text-center mt-4">
                <p className="text-sm text-secondary-foreground">
                  Don't have an account?{" "}
                  <Link href="/register" className="text-primary hover:text-primary/80 font-medium transition-colors">
                    Create one
                  </Link>
                </p>
              </div>

            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
