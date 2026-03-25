'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Search, ArrowRight, Clock } from 'lucide-react'
import Link from 'next/link'

interface SearchResult {
  id: string
  name: string
  image: string
  pricePerKg: number
  category: string
}

export default function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [recentSearches] = useState(['Ribeye', 'Lamb Chops', 'Chicken Breast'])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
      setResults([])
    }
  }, [open])

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    const controller = new AbortController()
    const search = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`, { signal: controller.signal })
        const data = await res.json()
        setResults(data)
      } catch { /* aborted */ }
      setLoading(false)
    }
    const timeout = setTimeout(search, 250)
    return () => { clearTimeout(timeout); controller.abort() }
  }, [query])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] animate-fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative max-w-2xl mx-auto mt-[10vh] animate-scale-in">
        <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden mx-4">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-5 border-b border-stone-100">
            <Search className="w-5 h-5 text-stone-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for ribeye, lamb chops, sausages..."
              className="w-full py-4 text-base bg-transparent outline-none placeholder-stone-400"
            />
            <button onClick={onClose} className="shrink-0 p-1.5 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-lg transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="max-h-[60vh] overflow-y-auto">
            {/* No query — show recent */}
            {!query.trim() && (
              <div className="p-5">
                <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-stone-400 mb-3 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Recent Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-lg text-sm font-medium transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
                <div className="mt-6">
                  <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-stone-400 mb-3">Popular Categories</p>
                  <div className="grid grid-cols-2 gap-2">
                    {['Beef', 'Lamb', 'Chicken', 'Sausages'].map((cat) => (
                      <Link
                        key={cat}
                        href={`/category/${cat.toLowerCase()}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-3 bg-stone-50 hover:bg-[#FFF5F5] border border-stone-100 hover:border-red-200 rounded-xl transition-all group"
                      >
                        <span className="text-sm font-semibold text-stone-700 group-hover:text-[#C62828]">{cat}</span>
                        <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#C62828] transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Loading */}
            {loading && query.trim() && (
              <div className="p-8 text-center">
                <div className="w-6 h-6 border-2 border-stone-200 border-t-[#C62828] rounded-full animate-spin mx-auto" />
              </div>
            )}

            {/* Results */}
            {!loading && results.length > 0 && (
              <div className="p-2">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/category/${product.category.toLowerCase()}`}
                    onClick={onClose}
                    className="flex items-center gap-4 p-3 hover:bg-stone-50 rounded-xl transition-colors group"
                  >
                    <img src={product.image} alt={product.name} className="w-14 h-14 rounded-xl object-cover bg-stone-100" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-stone-900 group-hover:text-[#C62828] truncate transition-colors">{product.name}</p>
                      <p className="text-xs text-stone-500 mt-0.5">{product.category}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-sm text-stone-900">${product.pricePerKg}</p>
                      <p className="text-[10px] text-stone-400">per kg</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* No results */}
            {!loading && query.trim() && results.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-stone-500 text-sm">No products found for &quot;{query}&quot;</p>
                <Link href={`/search?q=${encodeURIComponent(query)}`} onClick={onClose} className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-[#C62828] hover:underline">
                  View all results <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-stone-100 bg-stone-50/50 flex items-center justify-between text-[11px] text-stone-400">
            <span>Type to search products</span>
            <div className="flex items-center gap-2">
              <kbd className="px-1.5 py-0.5 bg-white border border-stone-200 rounded text-[10px] font-mono">ESC</kbd>
              <span>to close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
