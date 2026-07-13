"use client"

import { motion } from "framer-motion"
import { Settings } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen pt-24 pb-32 px-6">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel p-10 rounded-3xl border-border/50"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
              <Settings className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground">Settings</h1>
              <p className="text-secondary-foreground text-sm">Manage your account preferences</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { label: "Email Notifications", desc: "Receive updates about your orders and account" },
              { label: "Two-Factor Authentication", desc: "Add an extra layer of security to your account" },
              { label: "Language & Region", desc: "Set your preferred language and timezone" },
              { label: "Privacy Settings", desc: "Control who can see your profile and activity" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between p-4 rounded-2xl bg-secondary/40 border border-border/50"
              >
                <div>
                  <p className="font-medium text-foreground text-sm">{item.label}</p>
                  <p className="text-xs text-secondary-foreground mt-0.5">{item.desc}</p>
                </div>
                <div className="w-10 h-6 rounded-full bg-secondary border border-border/50 flex-shrink-0 ml-4" />
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground text-center mt-8">
            Full settings panel coming soon.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
