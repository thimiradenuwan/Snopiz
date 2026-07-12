import CategoryTemplate from "@/components/CategoryTemplate"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Other Items - Snopiz Premium",
  description: "Explore diverse premium digital assets and exclusive items.",
}

const otherProducts = [
  { id: "other-1", title: "Premium UI Kit Bundle", price: 49.99, description: "Over 500+ crafted UI components for modern web applications.", rating: 4.9, isFeatured: true },
  { id: "other-2", title: "Exclusive Icon Pack", price: 12.99, description: "A beautifully designed icon set tailored for premium interfaces.", rating: 4.8, isFeatured: false },
  { id: "other-3", title: "Creator Templates Masterclass", price: 34.99, description: "Comprehensive templates for social media and content creators.", rating: 4.6, isFeatured: false },
  { id: "other-4", title: "Digital Marketing Blueprint", price: 29.99, description: "Step-by-step guide to scaling your online digital product business.", rating: 5.0, isFeatured: true },
]

const faqs = [
  { question: "What formats do the design assets come in?", answer: "Our UI kits and icon packs typically include Figma (.fig), Sketch, and SVG formats for maximum compatibility." },
  { question: "Can I use these assets for commercial projects?", answer: "Yes! All items in this category come with a commercial license allowing you to use them in client and personal projects." },
  { question: "Do you offer bundles?", answer: "Yes, we occasionally offer special bundle deals. Keep an eye on our homepage or subscribe to our newsletter for updates." },
]

export default function OtherItemsPage() {
  return (
    <CategoryTemplate 
      title="Other Items" 
      description="Discover a diverse collection of premium digital assets, design resources, and exclusive items to elevate your projects."
      products={otherProducts}
      faqs={faqs}
    />
  )
}
