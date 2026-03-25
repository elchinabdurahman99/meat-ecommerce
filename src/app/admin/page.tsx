import prisma from '@/lib/prisma'
import Link from 'next/link'
import { Package, ShoppingBag, DollarSign, TrendingUp, ArrowUpRight, Clock } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const [orderCount, productCount, orders, recentProducts] = await Promise.all([
    prisma.order.count(),
    prisma.product.count(),
    prisma.order.findMany({
      take: 8,
      orderBy: { createdAt: 'desc' },
      include: { items: true },
    }),
    prisma.product.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
  ])

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)
  const avgOrder = orderCount > 0 ? totalRevenue / (orders.length || 1) : 0

  const stats = [
    { label: 'Total Orders', value: orderCount.toString(), icon: ShoppingBag, color: 'bg-blue-50 text-blue-600', trend: '+12%' },
    { label: 'Products', value: productCount.toString(), icon: Package, color: 'bg-green-50 text-green-600', trend: '' },
    { label: 'Revenue', value: `$${totalRevenue.toFixed(0)}`, icon: DollarSign, color: 'bg-red-50 text-[#C62828]', trend: '+8%' },
    { label: 'Avg. Order', value: `$${avgOrder.toFixed(2)}`, icon: TrendingUp, color: 'bg-purple-50 text-purple-600', trend: '' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-stone-900" style={{fontFamily: "'Outfit', sans-serif"}}>Dashboard</h1>
        <p className="text-sm text-stone-500 mt-1">Welcome back! Here&apos;s an overview of your shop.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-stone-100 p-5 hover:shadow-lg hover:shadow-stone-900/5 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5" />
              </div>
              {stat.trend && (
                <span className="flex items-center gap-0.5 text-xs font-semibold text-green-600"><ArrowUpRight className="w-3 h-3" />{stat.trend}</span>
              )}
            </div>
            <p className="text-2xl font-bold text-stone-900">{stat.value}</p>
            <p className="text-xs text-stone-400 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
            <h2 className="font-bold text-stone-900">Recent Orders</h2>
            <Link href="/admin/orders" className="text-xs font-semibold text-[#C62828] hover:underline">View All →</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-stone-400 border-b border-stone-100">
                  <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider">Order</th>
                  <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-stone-50 last:border-0 hover:bg-stone-50/50 transition-colors">
                    <td className="px-6 py-3.5 font-mono text-xs text-stone-500">#{order.id.slice(0, 8)}</td>
                    <td className="px-6 py-3.5 font-medium text-stone-900">{order.customerName}</td>
                    <td className="px-6 py-3.5 font-semibold">${order.total.toFixed(2)}</td>
                    <td className="px-6 py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'preparing' ? 'bg-blue-100 text-blue-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>{order.status}</span>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr><td colSpan={4} className="px-6 py-8 text-center text-stone-400 text-sm">No orders yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
            <h2 className="font-bold text-stone-900">Recent Products</h2>
            <Link href="/admin/products" className="text-xs font-semibold text-[#C62828] hover:underline">Manage →</Link>
          </div>
          <div className="divide-y divide-stone-50">
            {recentProducts.map((p) => (
              <div key={p.id} className="flex items-center gap-3 px-6 py-3.5">
                <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-stone-100" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-stone-900 truncate">{p.name}</p>
                  <p className="text-[10px] text-stone-400">{p.category}</p>
                </div>
                <span className="text-sm font-bold text-stone-900">${p.pricePerKg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
