import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Your Shopping Cart | Snopiz",
  description: "View and manage the premium digital assets in your shopping cart before proceeding to checkout.",
}

export default function CartLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
