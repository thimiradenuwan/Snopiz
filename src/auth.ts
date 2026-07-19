import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import bcrypt from "bcrypt"

import { authConfig } from "./auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        guestCart: { label: "Guest Cart", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        })
        
        if (!user || !user.password) return null
        
        const passwordsMatch = await bcrypt.compare(
          credentials.password as string, 
          user.password
        )
        
        if (passwordsMatch) {
          if (credentials.guestCart) {
            try {
              const guestItems = JSON.parse(credentials.guestCart as string)
              if (guestItems && guestItems.length > 0) {
                const { mergeGuestCartAction } = await import("./actions/cart")
                await mergeGuestCartAction(guestItems, user.id)
              }
            } catch (e) {
              console.error("Failed to parse/merge guest cart:", e)
            }
          }
          return { ...user, role: user.role }
        }
        
        return null
      }
    })
  ]
})
