import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      
      const protectedPaths = ["/profile", "/orders", "/downloads", "/settings", "/admin"]
      const isProtectedPath = protectedPaths.some(path => nextUrl.pathname.startsWith(path))

      if (isProtectedPath) {
        if (isLoggedIn) return true
        return false // Redirect to signIn
      } else if (isLoggedIn) {
        const isAuthPath = nextUrl.pathname.startsWith("/login") || nextUrl.pathname.startsWith("/register")
        if (isAuthPath) {
          return Response.redirect(new URL("/profile", nextUrl))
        }
      }
      return true
    },
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
      }
      if (trigger === "update" && session) {
        return { ...token, ...session.user }
      }
      return token
    },
    session({ session, token }) {
      if (token) {
        if (session.user) {
          session.user.id = token.id as string
          (session.user as any).role = token.role as "USER" | "ADMIN"
        }
      }
      return session
    },
  },
  providers: [], // Add providers in auth.ts
} satisfies NextAuthConfig
