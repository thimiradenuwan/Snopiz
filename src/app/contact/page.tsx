"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Mail, MapPin, Send, MessageSquare, Phone, 
  Clock, Share2, ArrowRight, Check, UploadCloud, ChevronDown,
  Globe
} from "lucide-react"

const contactMethods = [
  { icon: Mail, title: "Email Support", value: "support@snopiz.com" },
  { icon: Phone, title: "Phone", value: "+1 (555) 000-0000" },
  { icon: MessageSquare, title: "Discord", value: "Join Community" },
  { icon: Send, title: "Telegram", value: "@SnopizOfficial" },
  { icon: Clock, title: "Business Hours", value: "24/7 Premium Support" },
  { icon: MapPin, title: "Location", value: "Global Servers" },
]

const faqs = [
  { q: "How fast do you respond?", a: "Our premium support team guarantees a response within 1 hour for high-priority VPN or Subscriptions issues, and within 12 hours for general inquiries." },
  { q: "How do I receive my VPN?", a: "Instantly. Once your payment is verified, the VPN configuration details and software download links are sent directly to your registered email and profile dashboard." },
  { q: "What are your payment methods?", a: "We accept all major Credit Cards via Stripe, PayPal, and various Cryptocurrencies (BTC, ETH, USDT) for maximum privacy." },
  { q: "What is your refund policy?", a: "We offer a 7-day money-back guarantee if the VPN or service does not meet your technical requirements or if we fail to deliver what was promised." },
  { q: "Can I become a reseller?", a: "Yes! We offer a lucrative reseller program for bulk purchases of VPN accounts and game cheats. Select 'Business Partnership' in the form above to apply." },
]

const categories = [
  "General Inquiry",
  "VPN Support",
  "Payment Issue",
  "Software Request",
  "Subscription Help",
  "Business Partnership",
  "Bug Report",
  "Feature Request"
]

export default function ContactUsPage() {
  const [form, setForm] = useState({
    name: "", email: "", discord: "", telegram: "",
    subject: "", category: "", message: ""
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
        setForm({ name: "", email: "", discord: "", telegram: "", subject: "", category: "", message: "" })
      }, 4000)
    }, 1500)
  }

  return (
    <div className="relative flex flex-col items-center w-full min-h-screen pt-32 pb-32 overflow-hidden bg-background">
      
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

      <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col gap-24">
        
        {/* ─── Main Grid Layout (40/60) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* ─── Left Panel (40%) ─── */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col"
          >
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
              Get in <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-lg text-secondary-foreground leading-relaxed mb-10 max-w-md">
              Support available 24/7. We guarantee lightning fast response times and 100% secure communication for all our premium members.
            </p>

            {/* Contact Info List */}
            <div className="space-y-6 mb-12">
              {contactMethods.map((method, i) => {
                const Icon = method.icon
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    key={method.title} 
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-secondary/50 border border-border/50 flex items-center justify-center backdrop-blur-sm group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-300">
                      <Icon className="w-5 h-5 text-foreground group-hover:text-primary transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="text-sm text-secondary-foreground font-medium">{method.title}</p>
                      <p className="text-base font-semibold text-foreground">{method.value}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Social Buttons */}
            <div>
              <p className="text-sm font-bold tracking-widest uppercase text-secondary-foreground mb-4">Connect with us</p>
              <div className="flex gap-4">
                {[MessageSquare, Send, Phone, Globe, Share2].map((Icon, i) => (
                  <button key={i} className="w-12 h-12 rounded-full bg-secondary/50 border border-border/50 flex items-center justify-center backdrop-blur-md hover:bg-primary hover:border-primary hover:text-primary-foreground hover:shadow-[0_0_20px_rgba(0,122,255,0.4)] hover:-translate-y-1 transition-all duration-300 text-foreground">
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>


          {/* ─── Right Panel (60%) Form ─── */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="relative w-full rounded-[2.5rem] bg-secondary/30 border border-border/40 backdrop-blur-2xl p-8 sm:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden">
              {/* Form internal glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

              <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="relative group">
                    <input 
                      type="text" required
                      value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                      className="w-full h-14 bg-background/50 border border-border/50 rounded-[18px] px-5 pt-3 pb-1 text-foreground placeholder-transparent focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all peer"
                      placeholder="Name"
                    />
                    <label className="absolute left-5 top-4 text-secondary-foreground text-sm transition-all peer-focus:-translate-y-2.5 peer-focus:text-[10px] peer-focus:text-primary peer-valid:-translate-y-2.5 peer-valid:text-[10px] pointer-events-none">Full Name</label>
                  </div>

                  {/* Email Input */}
                  <div className="relative group">
                    <input 
                      type="email" required
                      value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                      className="w-full h-14 bg-background/50 border border-border/50 rounded-[18px] px-5 pt-3 pb-1 text-foreground placeholder-transparent focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all peer"
                      placeholder="Email"
                    />
                    <label className="absolute left-5 top-4 text-secondary-foreground text-sm transition-all peer-focus:-translate-y-2.5 peer-focus:text-[10px] peer-focus:text-primary peer-valid:-translate-y-2.5 peer-valid:text-[10px] pointer-events-none">Email Address</label>
                  </div>

                  {/* Discord Input */}
                  <div className="relative group">
                    <input 
                      type="text" required
                      value={form.discord} onChange={e => setForm({...form, discord: e.target.value})}
                      className="w-full h-14 bg-background/50 border border-border/50 rounded-[18px] px-5 pt-3 pb-1 text-foreground placeholder-transparent focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all peer"
                      placeholder="Discord"
                    />
                    <label className="absolute left-5 top-4 text-secondary-foreground text-sm transition-all peer-focus:-translate-y-2.5 peer-focus:text-[10px] peer-focus:text-primary peer-valid:-translate-y-2.5 peer-valid:text-[10px] pointer-events-none">Discord Username</label>
                  </div>

                  {/* Telegram Input */}
                  <div className="relative group">
                    <input 
                      type="text" 
                      value={form.telegram} onChange={e => setForm({...form, telegram: e.target.value})}
                      className="w-full h-14 bg-background/50 border border-border/50 rounded-[18px] px-5 pt-3 pb-1 text-foreground placeholder-transparent focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all peer"
                      placeholder="Telegram"
                    />
                    <label className="absolute left-5 top-4 text-secondary-foreground text-sm transition-all peer-focus:-translate-y-2.5 peer-focus:text-[10px] peer-focus:text-primary peer-[&:not(:placeholder-shown)]:-translate-y-2.5 peer-[&:not(:placeholder-shown)]:text-[10px] pointer-events-none">Telegram Username (Optional)</label>
                  </div>
                </div>

                {/* Category Dropdown (Custom implementation for standard select) */}
                <div className="relative group">
                  <button 
                    type="button"
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                    className="w-full h-14 bg-background/50 border border-border/50 rounded-[18px] px-5 flex items-center justify-between text-left focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  >
                    <span className={form.category ? "text-foreground" : "text-secondary-foreground"}>
                      {form.category || "Select a Category"}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-secondary-foreground transition-transform ${isCategoryOpen ? "rotate-180" : ""}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isCategoryOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-16 left-0 w-full bg-secondary/90 backdrop-blur-xl border border-border/50 rounded-[18px] shadow-xl z-20 overflow-hidden"
                      >
                        {categories.map(c => (
                          <div 
                            key={c} 
                            onClick={() => { setForm({...form, category: c}); setIsCategoryOpen(false); }}
                            className="px-5 py-3 text-sm text-foreground hover:bg-primary/20 cursor-pointer transition-colors"
                          >
                            {c}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Subject */}
                <div className="relative group">
                  <input 
                    type="text" required
                    value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}
                    className="w-full h-14 bg-background/50 border border-border/50 rounded-[18px] px-5 pt-3 pb-1 text-foreground placeholder-transparent focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all peer"
                    placeholder="Subject"
                  />
                  <label className="absolute left-5 top-4 text-secondary-foreground text-sm transition-all peer-focus:-translate-y-2.5 peer-focus:text-[10px] peer-focus:text-primary peer-valid:-translate-y-2.5 peer-valid:text-[10px] pointer-events-none">Subject</label>
                </div>

                {/* Message */}
                <div className="relative group">
                  <textarea 
                    required rows={4}
                    value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                    className="w-full bg-background/50 border border-border/50 rounded-[18px] px-5 pt-6 pb-4 text-foreground placeholder-transparent focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all peer resize-none"
                    placeholder="Message"
                  />
                  <label className="absolute left-5 top-4 text-secondary-foreground text-sm transition-all peer-focus:-translate-y-2 peer-focus:text-[10px] peer-focus:text-primary peer-valid:-translate-y-2 peer-valid:text-[10px] pointer-events-none">How can we help you?</label>
                </div>

                {/* File Upload (UI Simulation) */}
                <div className="w-full border border-dashed border-border/60 rounded-[18px] p-6 flex flex-col items-center justify-center gap-2 hover:bg-background/40 hover:border-primary/50 transition-all cursor-pointer group">
                  <div className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                    <UploadCloud className="w-5 h-5 text-secondary-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Click to upload files</p>
                  <p className="text-xs text-secondary-foreground">PNG, JPG, PDF up to 10MB</p>
                </div>

                {/* Submit Button */}
                <div className="pt-2 relative">
                  <AnimatePresence mode="wait">
                    {!isSuccess ? (
                      <motion.button
                        key="submit-btn"
                        exit={{ opacity: 0, scale: 0.95 }}
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full h-14 bg-gradient-to-r from-primary to-cyan-500 rounded-full flex items-center justify-center gap-2 text-white font-semibold text-lg shadow-[0_4px_20px_rgba(0,122,255,0.4)] hover:shadow-[0_4px_25px_rgba(0,122,255,0.6)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:pointer-events-none overflow-hidden relative"
                      >
                        {isSubmitting ? (
                          <motion.div 
                            animate={{ rotate: 360 }} 
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                          />
                        ) : (
                          <>
                            Send Message
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent hover:animate-[shimmer_1.5s_infinite]" />
                      </motion.button>
                    ) : (
                      <motion.div
                        key="success-toast"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="w-full h-14 bg-emerald-500/20 border border-emerald-500/50 backdrop-blur-md rounded-full flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                      >
                        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                          <Check className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-emerald-400 font-semibold">Your request has been sent!</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </form>
            </div>
          </motion.div>

        </div>

        {/* ─── Extra Premium Section: FAQ ─── */}
        <div className="w-full max-w-4xl mx-auto mt-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-3">Frequently Asked Questions</h2>
            <p className="text-secondary-foreground">Quick answers to common questions about our services.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={false}
                animate={{ backgroundColor: activeFaq === index ? "rgba(var(--secondary), 0.5)" : "rgba(var(--background), 0.3)" }}
                className="border border-border/40 rounded-2xl overflow-hidden backdrop-blur-sm transition-colors"
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none"
                >
                  <span className="font-semibold text-foreground">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${activeFaq === index ? "rotate-180 text-primary" : ""}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-6 pb-5 pt-0 text-secondary-foreground leading-relaxed border-t border-border/20 mt-2">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 flex flex-col items-center justify-center p-10 rounded-[2.5rem] bg-secondary/30 border border-border/40 backdrop-blur-xl shadow-lg relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
            
            <MessageSquare className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">Still need help?</h3>
            <p className="text-secondary-foreground mb-8 text-center max-w-sm">
              Our vibrant community is always active. Join Discord to chat with staff and thousands of users.
            </p>
            <button className="px-8 py-4 bg-foreground text-background font-semibold rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300">
              Join Discord Community
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
