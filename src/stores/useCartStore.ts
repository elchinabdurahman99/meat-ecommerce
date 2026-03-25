import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  productId: string
  name: string
  image: string
  pricePerKg: number
  weight: number
  quantity: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  addItem: (item: CartItem) => void
  removeItem: (productId: string, weight: number) => void
  updateQuantity: (productId: string, weight: number, quantity: number) => void
  clearCart: () => void
  getSubtotal: () => number
  getDeliveryFee: () => number
  getTotal: () => number
  getItemCount: () => number
}

const FREE_DELIVERY_THRESHOLD = 50
const DELIVERY_FEE = 5.99

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (newItem: CartItem) =>
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.productId === newItem.productId && item.weight === newItem.weight
          )
          if (existingIndex > -1) {
            const updated = [...state.items]
            updated[existingIndex].quantity += newItem.quantity
            return { items: updated, isOpen: true }
          }
          return { items: [...state.items, newItem], isOpen: true }
        }),

      removeItem: (productId: string, weight: number) =>
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.productId === productId && item.weight === weight)
          ),
        })),

      updateQuantity: (productId: string, weight: number, quantity: number) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter(
                (item) => !(item.productId === productId && item.weight === weight)
              ),
            }
          }
          return {
            items: state.items.map((item) =>
              item.productId === productId && item.weight === weight
                ? { ...item, quantity }
                : item
            ),
          }
        }),

      clearCart: () => set({ items: [] }),

      getSubtotal: () => {
        const { items } = get()
        return items.reduce((sum, item) => sum + item.pricePerKg * item.weight * item.quantity, 0)
      },

      getDeliveryFee: () => {
        const subtotal = get().getSubtotal()
        return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
      },

      getTotal: () => {
        return get().getSubtotal() + get().getDeliveryFee()
      },

      getItemCount: () => {
        const { items } = get()
        return items.reduce((sum, item) => sum + item.quantity, 0)
      },
    }),
    {
      name: 'primecuts-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
)
