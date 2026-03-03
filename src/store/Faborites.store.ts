import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoritesState {
  favorites: number[]
  toggleFavorite: (id: number) => void
  isFavorite: (id: number) => boolean
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (id) => {
        const { favorites } = get()

        if (favorites.includes(id)) {
          set({ favorites: favorites.filter((f) => f !== id) })
        } else {
          set({ favorites: [...favorites, id] })
        }
      },

      isFavorite: (id) => {
        return get().favorites.includes(id)
      }
    }),
    {
      name: 'favorites-storage'
    }
  )
)