'use client'

import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/stores/useCartStore'
import Link from 'next/link'

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, getSubtotal, getDeliveryFee, getTotal } = useCartStore()

  if (!isOpen) return null

  const subtotal = getSubtotal()
  const deliveryFee = getDeliveryFee()
  const total = getTotal()
  const freeDeliveryThreshold = 50
  const remainingForFree = Math.max(0, freeDeliveryThreshold - subtotal)

  return (
    <div className="fixed inset-0 z-[90]">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-fade-in" onClick={closeCart} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-[400px] bg-white shadow-2xl animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-neutral-800" />
            <h2 className="font-bold text-[15px] text-neutral-900" style={{fontFamily: "'Outfit', sans-serif"}}>Cart</h2>
            <span className="text-[11px] font-semibold text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded">{items.length}</span>
          </div>
          <button onClick={closeCart} className="p-1.5 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-md transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Delivery Progress */}
        {items.length > 0 && (
          <div className="px-5 py-2.5 bg-neutral-50 border-b border-neutral-100">
            {remainingForFree > 0 ? (
              <>
                <p className="text-[12px] text-neutral-500 mb-1.5">Add <span className="font-bold text-[#C62828]">${remainingForFree.toFixed(2)}</span> for <span className="font-bold text-emerald-600">free delivery</span></p>
                <div className="w-full h-1 bg-neutral-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#C62828] rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (subtotal / freeDeliveryThreshold) * 100)}%` }} />
                </div>
              </>
            ) : (
              <p className="text-[12px] text-emerald-600 font-semibold">✓ Free delivery unlocked!</p>
            )}
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <ShoppingBag className="w-12 h-12 text-neutral-200 mb-3" />
              <p className="font-semibold text-sm text-neutral-800 mb-0.5">Your cart is empty</p>
              <p className="text-[13px] text-neutral-400 mb-5">Add some fresh cuts to get started</p>
              <button onClick={closeCart} className="px-5 py-2 bg-[#C62828] text-white rounded-lg text-[13px] font-semibold hover:bg-[#B71C1C] transition-colors">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="divide-y divide-neutral-100">
              {items.map((item, idx) => (
                <div key={idx} className="px-5 py-3.5 flex gap-3">
                  <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover bg-neutral-100 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-[13px] text-neutral-800 truncate">{item.name}</p>
                        <p className="text-[11px] text-neutral-400 mt-0.5">{item.weight}kg · ${item.pricePerKg}/kg</p>
                      </div>
                      <button onClick={() => removeItem(item.productId, item.weight)} className="p-0.5 text-neutral-300 hover:text-red-500 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-neutral-200 rounded-md">
                        <button onClick={() => updateQuantity(item.productId, item.weight, item.quantity - 1)} className="p-1 text-neutral-400 hover:text-neutral-700">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-[12px] font-semibold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.productId, item.weight, item.quantity + 1)} className="p-1 text-neutral-400 hover:text-neutral-700">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-bold text-[13px] text-neutral-800">${(item.pricePerKg * item.weight * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-neutral-100 px-5 py-4 bg-white">
            <div className="space-y-1.5 mb-3">
              <div className="flex justify-between text-[13px]"><span className="text-neutral-500">Subtotal</span><span className="font-medium">${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-[13px]"><span className="text-neutral-500">Delivery</span><span className={deliveryFee === 0 ? 'text-emerald-600 font-semibold' : 'font-medium'}>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span></div>
              <div className="flex justify-between font-bold text-sm pt-2 border-t border-neutral-100"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#C62828] hover:bg-[#B71C1C] text-white rounded-lg font-bold text-[13px] shadow-md shadow-red-900/10 transition-all active:scale-[0.98]"
            >
              Checkout <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
