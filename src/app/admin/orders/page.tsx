import prisma from '@/lib/prisma'
import OrderStatusUpdater from './OrderStatusUpdater'
import { MapPin, Phone, Clock, Package } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminOrders() {
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: 'desc' },
  })

  const statusCounts = {
    pending: orders.filter(o => o.status === 'pending').length,
    preparing: orders.filter(o => o.status === 'preparing').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900" style={{fontFamily: "'Outfit', sans-serif"}}>Orders</h1>
          <p className="text-sm text-stone-500 mt-1">{orders.length} total orders</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-xs font-semibold">{statusCounts.pending} Pending</span>
          <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold">{statusCounts.preparing} Preparing</span>
          <span className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-semibold">{statusCounts.delivered} Delivered</span>
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl border border-stone-100 overflow-hidden hover:shadow-lg hover:shadow-stone-900/5 transition-all">
            <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-50">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-mono text-xs text-stone-400">#{order.id.slice(0, 12)}</p>
                  <span className="text-[10px] text-stone-400">•</span>
                  <p className="text-[10px] text-stone-400">{new Date(order.createdAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}</p>
                </div>
                <p className="font-semibold text-stone-900">{order.customerName}</p>
                <div className="flex items-center gap-4 mt-1 text-xs text-stone-400">
                  <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {order.phone}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {order.deliveryTime}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xl font-bold text-stone-900">${order.total.toFixed(2)}</span>
                <OrderStatusUpdater orderId={order.id} currentStatus={order.status} />
              </div>
            </div>
            <div className="px-6 py-3 bg-stone-50/50">
              <div className="flex items-start gap-2 mb-2">
                <MapPin className="w-3.5 h-3.5 text-stone-400 mt-0.5 shrink-0" />
                <p className="text-xs text-stone-500">{order.address}</p>
              </div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <Package className="w-3.5 h-3.5 text-stone-400" />
                <p className="text-xs font-medium text-stone-500">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {order.items.map((item) => (
                  <span key={item.id} className="px-2.5 py-1 bg-white border border-stone-100 rounded-lg text-[11px] font-medium text-stone-600">
                    {item.productName} ({item.weight}kg × {item.quantity})
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        {orders.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-stone-100 text-stone-500">No orders yet.</div>
        )}
      </div>
    </div>
  )
}
