'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, Menu, X, Beef, ChevronDown, User, Truck, Phone, MapPin, Heart } from 'lucide-react'
import { useCartStore } from '@/stores/useCartStore'
import SearchModal from '@/components/search/SearchModal'

const categories = [
  {
    name: 'Beef',
    slug: 'beef',
    image: 'https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9?w=400&auto=format&fit=crop&q=80',
    items: [
      { name: 'Ribeye Steak', slug: 'beef' },
      { name: 'Tenderloin', slug: 'beef' },
      { name: 'T-Bone Steak', slug: 'beef' },
      { name: 'Short Ribs', slug: 'beef' },
      { name: 'Minced Beef', slug: 'beef' },
    ],
  },
  {
    name: 'Lamb',
    slug: 'lamb',
    image: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=400&auto=format&fit=crop&q=80',
    items: [
      { name: 'Lamb Chops', slug: 'lamb' },
      { name: 'Leg of Lamb', slug: 'lamb' },
      { name: 'Lamb Shoulder', slug: 'lamb' },
      { name: 'Lamb Mince', slug: 'lamb' },
    ],
  },
  {
    name: 'Chicken',
    slug: 'chicken',
    image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&auto=format&fit=crop&q=80',
    items: [
      { name: 'Whole Chicken', slug: 'chicken' },
      { name: 'Chicken Breast', slug: 'chicken' },
      { name: 'Chicken Thighs', slug: 'chicken' },
      { name: 'Chicken Wings', slug: 'chicken' },
    ],
  },
  {
    name: 'Sausages',
    slug: 'sausages',
    image: 'https://images.unsplash.com/photo-1628268909376-e8c44bb3153f?w=400&auto=format&fit=crop&q=80',
    items: [
      { name: 'Italian Sausages', slug: 'sausages' },
      { name: 'Beef Sausages', slug: 'sausages' },
      { name: 'Merguez', slug: 'sausages' },
    ],
  },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { openCart, getItemCount } = useCartStore()
  const count = getItemCount()
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => { setMounted(true) }, [])

  const handleMouseEnter = (slug: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
    setActiveDropdown(slug)
  }
  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 150)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      {/* Top Bar */}
      <div className="bg-neutral-900 text-center py-2 px-4">
        <p className="text-[12px] text-neutral-300 font-medium">
          <span className="text-white font-semibold">FREE DELIVERY</span> on orders over $50 · Same-day delivery available ·{' '}
          <Link href="/about" className="underline underline-offset-2 hover:text-white transition-colors">Learn more</Link>
        </p>
      </div>

      {/* Main Nav */}
      <nav className="sticky top-0 z-50 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <div className="w-9 h-9 rounded-lg bg-[#C62828] text-white flex items-center justify-center">
                <Beef className="w-5 h-5" />
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-lg text-neutral-900 leading-none" style={{fontFamily: "'Outfit', sans-serif"}}>PrimeCuts</span>
                <span className="block text-[9px] tracking-[0.2em] uppercase text-neutral-400 font-medium">Premium Butcher</span>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-0">
              <Link href="/" className="px-3.5 py-2 text-[13px] font-medium text-neutral-600 hover:text-[#C62828] rounded-md hover:bg-neutral-50 transition-all">Home</Link>
              {categories.map((cat) => (
                <div key={cat.slug} className="relative" onMouseEnter={() => handleMouseEnter(cat.slug)} onMouseLeave={handleMouseLeave}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className={`flex items-center gap-0.5 px-3.5 py-2 text-[13px] font-medium rounded-md transition-all ${
                      activeDropdown === cat.slug ? 'text-[#C62828] bg-red-50' : 'text-neutral-600 hover:text-[#C62828] hover:bg-neutral-50'
                    }`}
                  >
                    {cat.name}
                    <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === cat.slug ? 'rotate-180' : ''}`} />
                  </Link>
                  {activeDropdown === cat.slug && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0.5 w-[380px] bg-white rounded-xl border border-neutral-200 shadow-xl animate-slide-down overflow-hidden" onMouseEnter={() => handleMouseEnter(cat.slug)} onMouseLeave={handleMouseLeave}>
                      <div className="grid grid-cols-2">
                        <div className="relative overflow-hidden">
                          <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-3 left-3">
                            <p className="text-white font-bold" style={{fontFamily: "'Outfit', sans-serif"}}>{cat.name}</p>
                            <Link href={`/category/${cat.slug}`} className="text-[11px] text-white/70 hover:text-white font-medium transition-colors">View all →</Link>
                          </div>
                        </div>
                        <div className="p-3">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 mb-2">Popular Cuts</p>
                          <ul className="space-y-0">
                            {cat.items.map((item) => (
                              <li key={item.name}>
                                <Link href={`/category/${item.slug}`} className="block px-2.5 py-1.5 text-[13px] text-neutral-600 hover:text-[#C62828] hover:bg-red-50 rounded-md font-medium transition-all">
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <Link href="/about" className="px-3.5 py-2 text-[13px] font-medium text-neutral-600 hover:text-[#C62828] rounded-md hover:bg-neutral-50 transition-all">About</Link>
              <Link href="/delivery" className="px-3.5 py-2 text-[13px] font-medium text-neutral-600 hover:text-[#C62828] rounded-md hover:bg-neutral-50 transition-all">Delivery</Link>
            </div>

            {/* Right */}
            <div className="flex items-center gap-0.5">
              <button onClick={() => setSearchOpen(true)} className="hidden sm:flex items-center gap-1.5 h-8 px-3 bg-neutral-100 hover:bg-neutral-200 rounded-md text-[13px] text-neutral-400 transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <span className="hidden md:inline">Search</span>
                <kbd className="hidden md:inline-flex h-4 items-center rounded border border-neutral-300 bg-white px-1 text-[9px] font-medium text-neutral-400">⌘K</kbd>
              </button>
              <Link href="/profile" className="p-2 text-neutral-400 hover:text-neutral-700 rounded-md hover:bg-neutral-50 transition-all">
                <User className="w-[18px] h-[18px]" />
              </Link>
              <Link href="/wishlist" className="p-2 text-neutral-400 hover:text-neutral-700 rounded-md hover:bg-neutral-50 transition-all hidden sm:flex">
                <Heart className="w-[18px] h-[18px]" />
              </Link>
              <button onClick={openCart} className="relative p-2 text-neutral-400 hover:text-neutral-700 rounded-md hover:bg-neutral-50 transition-all">
                <ShoppingCart className="w-[18px] h-[18px]" />
                {mounted && count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[9px] font-bold text-white bg-[#C62828] rounded-full flex items-center justify-center">{count}</span>
                )}
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-neutral-500 hover:bg-neutral-50 rounded-md transition-all ml-0.5">
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-100 bg-white animate-slide-down">
            <div className="max-w-7xl mx-auto px-4 py-3 space-y-0.5 max-h-[70vh] overflow-y-auto">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center px-3 py-2.5 text-neutral-700 hover:bg-neutral-50 rounded-lg text-sm font-medium">Home</Link>
              {categories.map((cat) => (
                <Link key={cat.slug} href={`/category/${cat.slug}`} onClick={() => setMobileMenuOpen(false)} className="flex items-center px-3 py-2.5 text-neutral-700 hover:bg-neutral-50 rounded-lg text-sm font-medium">{cat.name}</Link>
              ))}
              <div className="border-t border-neutral-100 my-1.5 pt-1.5">
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2.5 text-neutral-700 hover:bg-neutral-50 rounded-lg text-sm font-medium"><MapPin className="w-4 h-4 text-neutral-400" /> About</Link>
                <Link href="/delivery" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2.5 text-neutral-700 hover:bg-neutral-50 rounded-lg text-sm font-medium"><Truck className="w-4 h-4 text-neutral-400" /> Delivery</Link>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2.5 text-neutral-700 hover:bg-neutral-50 rounded-lg text-sm font-medium"><Phone className="w-4 h-4 text-neutral-400" /> Contact</Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
