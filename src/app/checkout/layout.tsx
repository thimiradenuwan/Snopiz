import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Secure Checkout | Snopiz",
  description: "Complete your purchase securely. Snopiz provides encrypted checkout and instant delivery for all premium digital goods.",
}

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
