import CategoryTemplate from "@/components/CategoryTemplate"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Softwares & Apps - Snopiz Premium",
  description: "Discover premium professional tools, software licenses, and applications.",
}

const softwareProducts = [
  { id: "soft-1", title: "Creative Suite Pro - 1 Year", price: 199.99, description: "Full access to professional creative tools for designers and editors.", rating: 4.9, isFeatured: true },
  { id: "soft-2", title: "Developer IDE Premium", price: 89.99, description: "Advanced integrated development environment with AI assistance.", rating: 4.8, isFeatured: false },
  { id: "soft-3", title: "Office Productivity Bundle", price: 49.99, description: "Essential office applications and cloud storage for teams.", rating: 4.6, isFeatured: false },
  { id: "soft-4", title: "Security Antivirus Pro", price: 29.99, description: "Complete digital protection for your devices with real-time threat detection.", rating: 4.7, isFeatured: true },
]

const faqs = [
  { question: "Are these licenses genuine?", answer: "Yes, all software licenses and keys we sell are 100% genuine and sourced directly from official distributors." },
  { question: "How will I receive my software?", answer: "Your license key and official download link will be delivered instantly to your email and Snopiz dashboard after purchase." },
  { question: "Is technical support included?", answer: "Yes, we offer basic installation support. For advanced software-specific queries, you can also contact the official software vendor." },
]

export default function SoftwareAppsPage() {
  return (
    <CategoryTemplate 
      title="Softwares & Apps" 
      description="Boost your productivity and unlock new capabilities with our curated selection of premium software and applications."
      products={softwareProducts}
      faqs={faqs}
    />
  )
}
