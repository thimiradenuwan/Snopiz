import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shop Premium Assets | Snopiz",
  description: "Explore our curated collection of premium digital assets, UI kits, and luxury hardware items designed for the modern creator.",
}

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
