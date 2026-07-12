import CategoryTemplate from "@/components/CategoryTemplate"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "V2Ray VPN - Snopiz Premium",
  description: "Explore our premium V2Ray VPN solutions for secure, high-speed, and reliable tunneling.",
}

const vpnProducts = [
  { id: "vpn-1", title: "V2Ray Premium 1 Month", price: 5.99, description: "High-speed secure tunneling with unlimited bandwidth for 1 month.", rating: 4.8, isFeatured: false },
  { id: "vpn-2", title: "V2Ray Premium 3 Months", price: 15.99, description: "Save more with our 3-month plan. Priority support included.", rating: 4.9, isFeatured: true },
  { id: "vpn-3", title: "V2Ray Premium 6 Months", price: 29.99, description: "Half-year access with advanced routing capabilities.", rating: 4.7, isFeatured: false },
  { id: "vpn-4", title: "V2Ray Premium 1 Year", price: 49.99, description: "Ultimate yearly pass. Best value for dedicated users.", rating: 5.0, isFeatured: true },
]

const faqs = [
  { question: "What is V2Ray?", answer: "V2Ray is a powerful network proxy tool that helps you bypass network restrictions and secure your internet connection with advanced obfuscation." },
  { question: "Do you offer instant delivery?", answer: "Yes, all VPN plans are activated instantly upon successful payment. You will receive the configuration details in your email and dashboard." },
  { question: "Can I use it on multiple devices?", answer: "Our premium plans support up to 5 simultaneous device connections, including Windows, macOS, iOS, and Android." },
]

export default function V2RayVPNPage() {
  return (
    <CategoryTemplate 
      title="V2Ray VPN" 
      description="Experience lightning-fast speeds and unparalleled security with our premium V2Ray tunneling solutions."
      products={vpnProducts}
      faqs={faqs}
    />
  )
}
