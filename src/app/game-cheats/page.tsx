import CategoryTemplate from "@/components/CategoryTemplate"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Game Cheats - Snopiz Premium",
  description: "Advanced modifications and enhancements for popular games.",
}

const cheatProducts = [
  { id: "cheat-1", title: "FPS Dominator Pack", price: 19.99, description: "Advanced aim assistance and sensory enhancements for popular FPS titles.", rating: 4.8, isFeatured: true },
  { id: "cheat-2", title: "RPG Progress Booster", price: 14.99, description: "Accelerate your leveling and unlock exclusive items effortlessly.", rating: 4.5, isFeatured: false },
  { id: "cheat-3", title: "Strategy Master Toolkit", price: 24.99, description: "Gain tactical advantages with our overlay toolkit.", rating: 4.7, isFeatured: false },
  { id: "cheat-4", title: "Universal ESP License (Lifetime)", price: 99.99, description: "Lifetime access to our premium ESP framework for multiple games.", rating: 5.0, isFeatured: true },
]

const faqs = [
  { question: "Are these tools safe to use?", answer: "We prioritize security. Our tools are regularly updated to remain undetected, though we always recommend using them responsibly and on alternative accounts." },
  { question: "Do I get updates when the game updates?", answer: "Yes! All active subscriptions include automatic updates whenever the target game releases a patch." },
  { question: "What is your refund policy?", answer: "If the tool fails to work on your system and our support team cannot resolve it within 48 hours, we offer a full refund." },
]

export default function GameCheatsPage() {
  return (
    <CategoryTemplate 
      title="Game Cheats" 
      description="Elevate your gameplay with our premium, secure, and undetectable game modifications and enhancements."
      products={cheatProducts}
      faqs={faqs}
    />
  )
}
