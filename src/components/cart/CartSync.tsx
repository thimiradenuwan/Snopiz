"use client"

import { useEffect, useRef } from "react"
import { useCartStore, CartItem } from "@/store/cartStore"

interface CartSyncProps {
  dbItems: CartItem[];
}

export function CartSync({ dbItems }: CartSyncProps) {
  const cart = useCartStore()
  const hasSynced = useRef(false)

  useEffect(() => {
    if (!hasSynced.current) {
      hasSynced.current = true;
      cart.clearCart();
      dbItems.forEach(item => cart.addItem(item));
    }
  }, [dbItems, cart]);

  return null;
}
