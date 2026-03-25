'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Check } from 'lucide-react'
import { useCartStore } from '@/stores/useCartStore'

interface ProductCardProps {
  product: {
    id: string
    name: string
    description: string
    image: string
    pricePerKg: number
    availableWeights: string
    category: string
    inStock: boolean
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const availableWeights: number[] = JSON.parse(product.availableWeights)
  const [selectedWeight, setSelectedWeight] = useState(availableWeights[0] || 1)
  const [added, setAdded] = useState(false)
  const addItem = useCartStore((s) => s.addItem)

  const currentPrice = product.pricePerKg * selectedWeight

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!product.inStock) return
    addItem({
      productId: product.id,
      name: product.name,
      image: product.image,
      pricePerKg: product.pricePerKg,
      weight: selectedWeight,
      quantity: 1,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="group flex flex-col bg-white rounded-xl border border-[#EBEBEB] overflow-hidden card-hover">
      {/* Image */}
      <Link href={`/products/${product.id}`} className="relative aspect-square overflow-hidden bg-neutral-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover img-zoom"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
            <span className="text-neutral-500 font-semibold text-xs bg-white px-3 py-1.5 rounded-full border border-neutral-200">Out of Stock</span>
          </div>
        )}
        <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
          {product.category}
        </span>
        <span className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Content */}
      <div className="p-3.5 flex flex-col flex-grow">
        <Link href={`/products/${product.id}`} className="block mb-1">
          <h3 className="font-semibold text-sm text-neutral-800 line-clamp-1 group-hover:text-[#C62828] transition-colors">{product.name}</h3>
        </Link>

        {/* Weight Pills */}
        <div className="flex flex-wrap gap-1 mt-1 mb-3">
          {availableWeights.map((w) => (
            <button
              key={w}
              onClick={(e) => { e.preventDefault(); setSelectedWeight(w) }}
              className={`px-2 py-0.5 text-[11px] font-medium rounded transition-all ${
                selectedWeight === w
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
              }`}
            >
              {w}kg
            </button>
          ))}
        </div>

        {/* Price + Add */}
        <div className="mt-auto">
          <div className="flex items-baseline gap-1.5 mb-2.5">
            <span className="text-lg font-bold text-neutral-900">${currentPrice.toFixed(2)}</span>
            <span className="text-[11px] text-neutral-400">${product.pricePerKg}/kg</span>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-300 active:scale-[0.97] ${
              added
                ? 'bg-emerald-500 text-white'
                : 'bg-[#C62828] hover:bg-[#B71C1C] text-white'
            } disabled:opacity-30 disabled:cursor-not-allowed`}
          >
            {added ? (
              <><Check className="w-3.5 h-3.5" /> Added</>
            ) : (
              <><ShoppingCart className="w-3.5 h-3.5" /> Add to Cart</>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
