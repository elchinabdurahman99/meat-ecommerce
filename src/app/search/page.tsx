import prisma from '@/lib/prisma'
import ProductCard from '@/components/product/ProductCard'
import { Search, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string; category?: string }> }) {
  const params = await searchParams
  const query = params.q || ''
  const category = params.category || ''

  const where: any = {}
  if (query) {
    where.OR = [
      { name: { contains: query } },
      { description: { contains: query } },
    ]
  }
  if (category) {
    where.category = category
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  })

  const categories = ['Beef', 'Lamb', 'Chicken', 'Sausages']

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <section className="bg-stone-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-stone-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">All Products</span>
          </div>
          <h1 className="text-3xl font-bold" style={{fontFamily: "'Outfit', sans-serif"}}>
            {query ? `Results for "${query}"` : 'All Products'}
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search + Filters */}
        <form className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input type="text" name="q" defaultValue={query} placeholder="Search for beef, lamb, sausages..."
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-stone-200 rounded-xl text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C62828]/20 focus:border-[#C62828] transition-all" />
            </div>
            <button type="submit" className="px-8 py-3.5 bg-[#C62828] hover:bg-[#B71C1C] text-white rounded-xl font-semibold text-sm transition-colors">Search</button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/search" className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${!category ? 'bg-[#C62828] text-white' : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'}`}>All</Link>
            {categories.map((cat) => (
              <Link key={cat} href={`/search?q=${query}&category=${cat}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  category === cat ? 'bg-[#C62828] text-white' : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                }`}>
                {cat}
              </Link>
            ))}
          </div>
        </form>

        {/* Results */}
        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-stone-100">
            <p className="text-xl text-stone-500 mb-2">No products found.</p>
            <p className="text-sm text-stone-400">Try a different search term or filter.</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-stone-500 mb-6">{products.length} product{products.length !== 1 ? 's' : ''} found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
