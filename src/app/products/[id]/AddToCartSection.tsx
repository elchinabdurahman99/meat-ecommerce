'use client'

import { useState } from 'react'
import { ShoppingCart, Check, Minus, Plus } from 'lucide-react'
import { useCartStore } from '@/stores/useCartStore'

interface Props {
  product: {
    id: string
    name: string
    image: string
    pricePerKg: number
    availableWeights: string
    inStock: boolean
  }
}

export default function AddToCartSection({ product }: Props) {
  const availableWeights: number[] = JSON.parse(product.availableWeights)
  const [selectedWeight, setSelectedWeight] = useState(availableWeights[0] || 1)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const addItem = useCartStore((s) => s.addItem)

  const unitPrice = product.pricePerKg * selectedWeight
  const totalPrice = unitPrice * quantity

  const handleAdd = () => {
    if (!product.inStock) return
    addItem({
      productId: product.id,
      name: product.name,
      image: product.image,
      pricePerKg: product.pricePerKg,
      weight: selectedWeight,
      quantity,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="space-y-5">
      {/* Price */}
      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-neutral-900">${totalPrice.toFixed(2)}</span>
          <span className="text-sm text-neutral-400 font-medium">${product.pricePerKg.toFixed(2)}/kg</span>
        </div>
        {quantity > 1 && (
          <p className="text-[12px] text-neutral-400 mt-0.5">${unitPrice.toFixed(2)} × {quantity}</p>
        )}
      </div>

      {/* Weight */}
      <div>
        <p className="text-[12px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">Weight</p>
        <div className="flex flex-wrap gap-2">
          {availableWeights.map((w) => (
            <button
              key={w}
              onClick={() => setSelectedWeight(w)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg border-2 transition-all ${
                selectedWeight === w
                  ? 'border-[#C62828] bg-red-50 text-[#C62828]'
                  : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
              }`}
            >
              {w} kg
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <p className="text-[12px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">Quantity</p>
        <div className="inline-flex items-center border-2 border-neutral-200 rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-2 text-neutral-400 hover:text-neutral-700 transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-12 text-center text-sm font-bold text-neutral-900">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-2 text-neutral-400 hover:text-neutral-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Add to Cart */}
      <button
        onClick={handleAdd}
        disabled={!product.inStock}
        className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-lg text-sm font-bold transition-all duration-300 active:scale-[0.98] ${
          added
            ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
            : 'bg-[#C62828] hover:bg-[#B71C1C] text-white shadow-md shadow-red-900/15'
        } disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none`}
      >
        {added ? (
          <><Check className="w-4 h-4" /> Added to Cart</>
        ) : (
          <><ShoppingCart className="w-4 h-4" /> Add to Cart — ${totalPrice.toFixed(2)}</>
        )}
      </button>
    </div>
  )
}
