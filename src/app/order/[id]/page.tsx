import prisma from '@/lib/prisma'
import Link from 'next/link'
import { CheckCircle2, Package, Clock, MapPin, Phone, User, ArrowRight } from 'lucide-react'

export default async function OrderConfirmation({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  })

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-xl font-bold text-gray-500">Order not found</p>
          <Link href="/" className="text-[#C62828] mt-4 inline-block font-medium">Go Home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50/60 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 rounded-3xl mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900" style={{fontFamily: "'Outfit', sans-serif"}}>Order Placed!</h1>
          <p className="text-gray-500 mt-2">Thank you! We&apos;re preparing your fresh cuts.</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-400">Order ID</p>
              <p className="font-mono font-bold text-sm text-gray-900">{order.id}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
              order.status === 'delivered' ? 'bg-emerald-50 text-emerald-700' :
              order.status === 'preparing' ? 'bg-blue-50 text-blue-700' :
              'bg-amber-50 text-amber-700'
            }`}>{order.status}</span>
          </div>

          <div className="px-6 py-4 border-b border-gray-100 space-y-2.5">
            <div className="flex items-center gap-2 text-sm text-gray-600"><User className="w-4 h-4 text-gray-400" /> {order.customerName}</div>
            <div className="flex items-center gap-2 text-sm text-gray-600"><Phone className="w-4 h-4 text-gray-400" /> {order.phone}</div>
            <div className="flex items-center gap-2 text-sm text-gray-600"><MapPin className="w-4 h-4 text-gray-400" /> {order.address}</div>
            <div className="flex items-center gap-2 text-sm text-gray-600"><Clock className="w-4 h-4 text-gray-400" /> {order.deliveryTime}</div>
          </div>

          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm"><Package className="w-4 h-4" /> Items</h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div><p className="font-medium text-gray-900">{item.productName}</p><p className="text-xs text-gray-400">{item.weight}kg × {item.quantity}</p></div>
                  <span className="font-semibold">${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="px-6 py-4 space-y-2">
            <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal</span><span>${order.subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Delivery</span><span className={order.deliveryFee === 0 ? 'text-emerald-600 font-semibold' : ''}>{order.deliveryFee === 0 ? 'FREE' : `$${order.deliveryFee.toFixed(2)}`}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Payment</span><span className="capitalize">{order.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Online'}</span></div>
            <div className="flex justify-between font-bold text-lg pt-3 border-t border-gray-100"><span>Total</span><span>${order.total.toFixed(2)}</span></div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#C62828] hover:bg-[#B71C1C] text-white rounded-xl font-semibold transition-all">
            Continue Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
