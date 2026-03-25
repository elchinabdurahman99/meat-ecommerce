import { Heart, ChevronRight, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <section className="bg-stone-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-stone-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Wishlist</span>
          </div>
          <h1 className="text-4xl font-bold" style={{fontFamily: "'Outfit', sans-serif"}}>My Wishlist</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl border border-stone-100 p-12">
            <Heart className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <h3 className="font-bold text-stone-900 mb-2 text-lg">Your wishlist is empty</h3>
            <p className="text-sm text-stone-500 mb-6 max-w-sm mx-auto">Browse our products and click the heart icon to save items you love for later.</p>
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#C62828] hover:bg-[#B71C1C] text-white rounded-xl font-semibold text-sm transition-all">
              <ShoppingBag className="w-4 h-4" /> Start Browsing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
