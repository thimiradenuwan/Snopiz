"use client"

import { useEffect, useRef } from "react"
import { useCartStore, CartItem } from "@/store/cartStore"

export function CartSync({ dbItems }: { dbItems: CartItem[] }) {
  const store = useCartStore()
  
  // Use a ref to prevent unnecessary multiple setStates if dbItems hasn't fundamentally changed
  const prevItemsRef = useRef<string>("")
  
  useEffect(() => {
    const serializedDbItems = JSON.stringify(dbItems)
    if (prevItemsRef.current !== serializedDbItems) {
      useCartStore.setState({ items: dbItems })
      prevItemsRef.current = serializedDbItems
    }
  }, [dbItems])

  return null
}
