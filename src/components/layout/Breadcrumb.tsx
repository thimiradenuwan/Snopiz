"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

export function Breadcrumb() {
  const pathname = usePathname()

  if (pathname === "/") {
    return null
  }

  const pathSegments = pathname.split("/").filter((segment) => segment !== "")

  // Format segment for display: capitalize and replace dashes with spaces
  const formatSegment = (segment: string) => {
    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div className="w-full px-6 max-w-6xl mx-auto mb-6">
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="glass rounded-full px-5 py-2.5 border border-border inline-flex items-center shadow-md"
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center space-x-2.5 text-xs sm:text-sm font-medium">
          <li>
            <Link href="/" className="text-secondary-foreground hover:text-foreground transition-colors">
              Home
            </Link>
          </li>
          {pathSegments.map((segment, index) => {
            const href = `/${pathSegments.slice(0, index + 1).join("/")}`
            const isLast = index === pathSegments.length - 1

            return (
              <li key={href} className="flex items-center space-x-2.5">
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                {isLast ? (
                  <span className="text-primary" aria-current="page">
                    {formatSegment(segment)}
                  </span>
                ) : (
                  <Link href={href} className="text-secondary-foreground hover:text-foreground transition-colors">
                    {formatSegment(segment)}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </motion.nav>
    </div>
  )
}
