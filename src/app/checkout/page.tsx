'use client'

import { useState } from 'react'
import { useCartStore } from '@/stores/useCartStore'
import { useRouter } from 'next/navigation'
import { ShieldCheck, Truck, CreditCard, Banknote, Clock, MapPin, ChevronRight, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const deliveryTimes = [
  'Morning (9:00 – 12:00)',
  'Afternoon (12:00 – 15:00)',
  'Evening (15:00 – 18:00)',
  'Next Day Morning',
]

export default function CheckoutPage() {
  const { items, getSubtotal, getDeliveryFee, getTotal, clearCart } = useCartStore()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'stripe'>('cash')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    deliveryTime: deliveryTimes[0],
  })

  const subtotal = getSubtotal()
  const deliveryFee = getDeliveryFee()
  const total = getTotal()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) return

    setLoading(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          paymentMethod,
          subtotal,
          deliveryFee,
          total,
          items: items.map((item) => ({
            productId: item.productId,
            productName: item.name,
            weight: item.weight,
            quantity: item.quantity,
            price: item.pricePerKg * item.weight * item.quantity,
          })),
        }),
      })

      if (!res.ok) throw new Error('Order failed')
      const data = await res.json()
      clearCart()
      router.push(`/order/${data.id}`)
    } catch {
      alert('Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8]">
        <div className="text-center">
          <p className="text-xl font-bold text-stone-500 mb-4">Your cart is empty</p>
          <button onClick={() => router.push('/')} className="px-6 py-3 bg-[#C62828] text-white rounded-xl font-semibold hover:bg-[#B71C1C] transition-colors">
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Breadcrumb */}
      <div className="bg-stone-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-stone-400 mb-3">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Checkout</span>
          </div>
          <h1 className="text-3xl font-bold" style={{fontFamily: "'Outfit', sans-serif"}}>Checkout</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            {/* Delivery Details */}
            <div className="bg-white rounded-2xl border border-stone-100 p-6">
              <h2 className="text-lg font-bold flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center"><MapPin className="w-4 h-4 text-[#C62828]" /></div>
                Delivery Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">Full Name</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C62828]/20 focus:border-[#C62828] transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">Phone Number</label>
                  <input required type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C62828]/20 focus:border-[#C62828] transition-all" placeholder="+1 (555) 123-4567" />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-stone-600 mb-1.5">Delivery Address</label>
                <textarea required value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} rows={3}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C62828]/20 focus:border-[#C62828] transition-all resize-none" placeholder="123 Main St, Apt 4B, New York, NY 10001" />
              </div>
            </div>

            {/* Delivery Time */}
            <div className="bg-white rounded-2xl border border-stone-100 p-6">
              <h2 className="text-lg font-bold flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center"><Clock className="w-4 h-4 text-[#C62828]" /></div>
                Delivery Time
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {deliveryTimes.map((time) => (
                  <button key={time} type="button" onClick={() => setFormData({ ...formData, deliveryTime: time })}
                    className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                      formData.deliveryTime === time
                        ? 'border-[#C62828] bg-[#FFF5F5] text-[#C62828]'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}>
                    <Clock className="w-4 h-4 shrink-0" />
                    <span className="text-sm font-medium">{time}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl border border-stone-100 p-6">
              <h2 className="text-lg font-bold flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center"><CreditCard className="w-4 h-4 text-[#C62828]" /></div>
                Payment Method
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button type="button" onClick={() => setPaymentMethod('cash')}
                  className={`flex items-center gap-3 p-5 rounded-xl border transition-all ${
                    paymentMethod === 'cash' ? 'border-[#C62828] bg-[#FFF5F5]' : 'border-stone-200 hover:border-stone-300'
                  }`}>
                  <Banknote className="w-5 h-5 text-green-600" />
                  <div className="text-left">
                    <p className="font-semibold text-sm">Cash on Delivery</p>
                    <p className="text-xs text-stone-400">Pay when you receive</p>
                  </div>
                </button>
                <button type="button" onClick={() => setPaymentMethod('stripe')}
                  className={`flex items-center gap-3 p-5 rounded-xl border transition-all ${
                    paymentMethod === 'stripe' ? 'border-[#C62828] bg-[#FFF5F5]' : 'border-stone-200 hover:border-stone-300'
                  }`}>
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <div className="text-left">
                    <p className="font-semibold text-sm">Online Payment</p>
                    <p className="text-xs text-stone-400">Visa, Mastercard, etc.</p>
                  </div>
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-4 bg-[#C62828] hover:bg-[#B71C1C] disabled:bg-stone-300 text-white rounded-2xl font-bold text-base transition-all transform active:scale-[0.98] shadow-lg shadow-red-800/15 flex items-center justify-center gap-2">
              {loading ? (
                <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Placing Order...</>
              ) : (
                <>Place Order — ${total.toFixed(2)} <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-2xl border border-stone-100 p-6 space-y-4">
              <h2 className="font-bold text-lg" style={{fontFamily: "'Outfit', sans-serif"}}>Order Summary</h2>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map((item, i) => (
                  <div key={i} className="flex gap-3 items-center">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover bg-stone-100" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-stone-400">{item.weight}kg × {item.quantity}</p>
                    </div>
                    <span className="text-sm font-bold">${(item.pricePerKg * item.weight * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-stone-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-stone-500">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-stone-500">Delivery</span><span className={deliveryFee === 0 ? 'text-green-600 font-semibold' : ''}>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span></div>
                <div className="flex justify-between font-bold text-base pt-2 border-t border-stone-100"><span>Total</span><span>${total.toFixed(2)}</span></div>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-400 pt-2">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span>Secure checkout · Fresh guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
