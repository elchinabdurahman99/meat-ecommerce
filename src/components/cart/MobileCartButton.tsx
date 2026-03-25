'use client'

import { useState, useEffect } from 'react'
import { ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/stores/useCartStore'

export default function MobileCartButton() {
  const [mounted, setMounted] = useState(false)
  const { openCart, getItemCount, getTotal } = useCartStore()
  const count = getItemCount()

  useEffect(() => { setMounted(true) }, [])

  if (!mounted || count === 0) return null

  return (
    <button
      onClick={openCart}
      className="fixed bottom-6 left-4 right-4 z-[80] md:hidden flex items-center justify-between px-6 py-4 bg-neutral-900 text-white rounded-2xl shadow-2xl shadow-neutral-900/30 active:scale-[0.98] transition-transform"
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <ShoppingBag className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C62828] text-[9px] font-bold rounded-full flex items-center justify-center">{count}</span>
        </div>
        <span className="font-semibold text-sm">View Cart</span>
      </div>
      <span className="font-bold text-sm">${getTotal().toFixed(2)}</span>
    </button>
  )
}
