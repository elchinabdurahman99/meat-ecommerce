import Link from 'next/link'
import { LayoutDashboard, Package, ShoppingBag, Beef, ArrowLeft, ChevronRight } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-stone-200 min-h-screen sticky top-0">
          <div className="p-5 border-b border-stone-100">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#C62828] to-[#8E0000] text-white shadow-sm">
                <Beef className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-sm text-stone-900" style={{fontFamily: "'Outfit', sans-serif"}}>PrimeCuts</span>
                <span className="block text-[10px] tracking-[0.1em] uppercase text-stone-400 font-semibold">Admin Panel</span>
              </div>
            </Link>
          </div>
          <nav className="flex-1 p-3 space-y-0.5">
            <Link href="/admin" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-all">
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </Link>
            <Link href="/admin/orders" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-all">
              <ShoppingBag className="w-4 h-4" /> Orders
            </Link>
            <Link href="/admin/products" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-all">
              <Package className="w-4 h-4" /> Products
            </Link>
          </nav>
          <div className="p-3 border-t border-stone-100">
            <Link href="/" className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-medium text-stone-400 hover:text-[#C62828] hover:bg-red-50 transition-all">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to store
            </Link>
          </div>
        </aside>

        {/* Mobile top nav */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-stone-200 px-4 py-3 flex items-center justify-between shadow-sm">
          <Link href="/admin" className="font-bold text-sm flex items-center gap-2">
            <div className="w-7 h-7 bg-[#C62828] text-white rounded-lg flex items-center justify-center"><Beef className="w-4 h-4" /></div>
            Admin
          </Link>
          <div className="flex gap-4">
            <Link href="/admin" className="text-xs font-medium text-stone-600">Dashboard</Link>
            <Link href="/admin/orders" className="text-xs font-medium text-stone-600">Orders</Link>
            <Link href="/admin/products" className="text-xs font-medium text-stone-600">Products</Link>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 md:p-8 p-4 pt-16 md:pt-8 max-w-6xl">
          {children}
        </div>
      </div>
    </div>
  )
}
