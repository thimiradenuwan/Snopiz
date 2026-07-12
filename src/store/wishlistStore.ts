import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WishlistState {
  items: string[]
  toggleItem: (id: string) => void
  hasItem: (id: string) => boolean
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (id) => set((state) => {
        if (state.items.includes(id)) {
          return { items: state.items.filter(i => i !== id) }
        }
        return { items: [...state.items, id] }
      }),
      hasItem: (id) => get().items.includes(id),
    }),
    {
      name: 'snopiz-wishlist-storage',
    }
  )
)
