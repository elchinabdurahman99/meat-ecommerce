import prisma from '@/lib/prisma'
import Link from 'next/link'
import { Package, ChevronRight, ShoppingBag } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: 'desc' },
    take: 20,
  })

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <section className="bg-stone-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-stone-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Orders</span>
          </div>
          <h1 className="text-4xl font-bold" style={{fontFamily: "'Outfit', sans-serif"}}>Order History</h1>
          <p className="text-stone-400 mt-3">Track and review your previous orders.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {orders.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-stone-100">
              <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-4" />
              <h3 className="font-bold text-stone-900 mb-2">No orders yet</h3>
              <p className="text-sm text-stone-500 mb-6">You haven&apos;t placed any orders yet. Start shopping and your orders will appear here.</p>
              <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#C62828] hover:bg-[#B71C1C] text-white rounded-xl font-semibold text-sm transition-all">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Link key={order.id} href={`/order/${order.id}`} className="block bg-white rounded-2xl border border-stone-100 hover:border-stone-200 hover:shadow-lg hover:shadow-stone-900/5 transition-all overflow-hidden">
                  <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center shrink-0">
                        <Package className="w-5 h-5 text-stone-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-stone-900">Order #{order.id.slice(0, 8)}</p>
                        <p className="text-xs text-stone-400 mt-0.5">{new Date(order.createdAt).toLocaleDateString('en-US', { dateStyle: 'medium' })} · {order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'preparing' ? 'bg-blue-100 text-blue-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>{order.status}</span>
                      <span className="font-bold text-stone-900">${order.total.toFixed(2)}</span>
                      <ChevronRight className="w-4 h-4 text-stone-400" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
