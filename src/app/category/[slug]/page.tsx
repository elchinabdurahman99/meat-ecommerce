import prisma from '@/lib/prisma'
import ProductCard from '@/components/product/ProductCard'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

const categoryMeta: Record<string, { title: string; description: string; image: string }> = {
  beef: { title: 'Premium Beef', description: 'Hand-selected cuts of the finest beef, from tender ribeyes to hearty briskets.', image: 'https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9?w=1400&auto=format&fit=crop&q=80' },
  lamb: { title: 'Fresh Lamb', description: 'Locally sourced lamb, known for exceptional tenderness and rich flavor.', image: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=1400&auto=format&fit=crop&q=80' },
  chicken: { title: 'Free-Range Chicken', description: 'Organic, free-range poultry — fresh whole chickens and expertly portioned cuts.', image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=1400&auto=format&fit=crop&q=80' },
  sausages: { title: 'Craft Sausages', description: 'Handmade artisanal sausages, bursting with authentic spices and flavors.', image: 'https://images.unsplash.com/photo-1628268909376-e8c44bb3153f?w=1400&auto=format&fit=crop&q=80' },
}

const categoryMap: Record<string, string> = {
  beef: 'Beef',
  lamb: 'Lamb',
  chicken: 'Chicken',
  sausages: 'Sausages',
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const meta = categoryMeta[slug] || { title: slug.charAt(0).toUpperCase() + slug.slice(1), description: '', image: '' }
  const categoryName = categoryMap[slug] || slug.charAt(0).toUpperCase() + slug.slice(1)

  const products = await prisma.product.findMany({
    where: { category: categoryName },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[260px] md:h-[300px] overflow-hidden">
        <img src={meta.image} alt={meta.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/5" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="flex items-center gap-1.5 text-[13px] text-white/50 mb-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">{meta.title}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white" style={{fontFamily: "'Outfit', sans-serif"}}>{meta.title}</h1>
          <p className="text-white/60 mt-1.5 max-w-md text-sm">{meta.description}</p>
        </div>
      </section>

      {/* Products */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[13px] text-neutral-400 mb-5">{products.length} product{products.length !== 1 ? 's' : ''}</p>
          {products.length === 0 ? (
            <div className="text-center py-16 bg-neutral-50 rounded-xl border border-neutral-100">
              <p className="text-lg text-neutral-400 mb-3">No products found in this category yet.</p>
              <Link href="/" className="text-[#C62828] font-semibold text-sm hover:underline">← Back to Home</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
