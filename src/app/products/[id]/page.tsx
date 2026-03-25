import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Shield, Leaf, Truck, Clock, Award, Snowflake, ArrowLeft } from 'lucide-react'
import prisma from '@/lib/prisma'
import ProductCard from '@/components/product/ProductCard'
import AddToCartSection from './AddToCartSection'

const guarantees = [
  { icon: Shield, label: '100% Halal' },
  { icon: Leaf, label: 'Farm Fresh' },
  { icon: Truck, label: 'Same-Day' },
  { icon: Clock, label: 'Cut Today' },
  { icon: Award, label: 'Premium' },
  { icon: Snowflake, label: 'Cold Chain' },
]

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const product = await prisma.product.findUnique({
    where: { id },
  })

  if (!product) notFound()

  const relatedProducts = await prisma.product.findMany({
    where: {
      category: product.category,
      id: { not: product.id },
    },
    take: 4,
  })

  const categorySlug = product.category.toLowerCase()

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-neutral-100 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-1.5 text-[13px] text-neutral-400">
          <Link href="/" className="hover:text-neutral-700 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/category/${categorySlug}`} className="hover:text-neutral-700 transition-colors">{product.category}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-neutral-700 font-medium truncate max-w-[220px]">{product.name}</span>
        </div>
      </div>

      {/* Product */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-xl overflow-hidden bg-neutral-50 border border-neutral-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Guarantee Badges on Image */}
            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
              {guarantees.slice(0, 3).map((g) => (
                <span key={g.label} className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-md text-[11px] font-semibold text-neutral-600 shadow-sm">
                  <g.icon className="w-3 h-3 text-[#C62828]" />
                  {g.label}
                </span>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <Link
              href={`/category/${categorySlug}`}
              className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-[0.12em] uppercase text-[#C62828] mb-2 hover:underline self-start"
            >
              {product.category}
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mb-3" style={{fontFamily: "'Outfit', sans-serif"}}>
              {product.name}
            </h1>
            <p className="text-neutral-500 leading-relaxed text-[14px] mb-6">
              {product.description}
            </p>

            <AddToCartSection
              product={{
                id: product.id,
                name: product.name,
                image: product.image,
                pricePerKg: product.pricePerKg,
                availableWeights: product.availableWeights,
                inStock: product.inStock,
              }}
            />

            {/* Trust Signals */}
            <div className="mt-6 pt-5 border-t border-neutral-100 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-[13px] text-neutral-500">
                <Shield className="w-4 h-4 text-[#C62828]" />
                <span>Halal Certified</span>
              </div>
              <div className="flex items-center gap-2 text-[13px] text-neutral-500">
                <Truck className="w-4 h-4 text-[#C62828]" />
                <span>Free delivery over $50</span>
              </div>
              <div className="flex items-center gap-2 text-[13px] text-neutral-500">
                <Clock className="w-4 h-4 text-[#C62828]" />
                <span>Same-day delivery</span>
              </div>
              <div className="flex items-center gap-2 text-[13px] text-neutral-500">
                <Snowflake className="w-4 h-4 text-[#C62828]" />
                <span>Temperature controlled</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Bar */}
      <section className="border-y border-neutral-100 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {guarantees.map((g) => (
              <div key={g.label} className="flex items-center gap-2 text-[13px] text-neutral-600">
                <div className="w-8 h-8 rounded-lg bg-white border border-neutral-100 flex items-center justify-center">
                  <g.icon className="w-4 h-4 text-[#C62828]" />
                </div>
                <span className="font-medium">{g.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-neutral-900" style={{fontFamily: "'Outfit', sans-serif"}}>You May Also Like</h2>
            <Link href={`/category/${categorySlug}`} className="text-[13px] font-semibold text-[#C62828] hover:underline flex items-center gap-1">
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {relatedProducts.map((p: any) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
