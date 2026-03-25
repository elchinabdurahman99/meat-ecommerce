import { User, Package, MapPin, Heart, Settings, ChevronRight, LogIn } from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <section className="bg-stone-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-stone-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">My Account</span>
          </div>
          <h1 className="text-4xl font-bold" style={{fontFamily: "'Outfit', sans-serif"}}>My Account</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Guest prompt */}
          <div className="bg-white rounded-2xl border border-stone-100 p-8 mb-8 text-center">
            <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <User className="w-8 h-8 text-stone-400" />
            </div>
            <h2 className="text-xl font-bold text-stone-900 mb-2" style={{fontFamily: "'Outfit', sans-serif"}}>Welcome, Guest</h2>
            <p className="text-sm text-stone-500 mb-6 max-w-sm mx-auto">Sign in or create an account to track your orders, manage delivery addresses, and save your favorites.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#C62828] hover:bg-[#B71C1C] text-white rounded-xl font-semibold text-sm transition-all">
                <LogIn className="w-4 h-4" /> Sign In
              </button>
              <button className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 rounded-xl font-semibold text-sm transition-all">
                Create Account
              </button>
            </div>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Package, title: 'Order History', desc: 'View and track your previous orders', href: '/orders' },
              { icon: Heart, title: 'Wishlist', desc: 'Products you\'ve saved for later', href: '/wishlist' },
              { icon: MapPin, title: 'Delivery Addresses', desc: 'Manage your saved addresses', href: '/profile' },
              { icon: Settings, title: 'Account Settings', desc: 'Update email, password, preferences', href: '/profile' },
            ].map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-stone-100 hover:border-red-100 hover:shadow-lg hover:shadow-stone-900/5 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-stone-100 group-hover:bg-red-50 flex items-center justify-center text-stone-500 group-hover:text-[#C62828] transition-colors shrink-0">
                  <link.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-stone-900 text-sm">{link.title}</p>
                  <p className="text-xs text-stone-400 mt-0.5">{link.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
