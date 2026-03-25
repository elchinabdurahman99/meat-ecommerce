import Link from 'next/link'
import { ArrowRight, Shield, Truck, Clock, Star, Leaf, Award, Quote, Mail, ChevronRight, ShoppingBag, Flame, Sparkles } from 'lucide-react'
import prisma from '@/lib/prisma'
import ProductCard from '@/components/product/ProductCard'

const categories = [
  { name: 'Beef', slug: 'beef', image: 'https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9?w=600&auto=format&fit=crop&q=80', desc: 'Ribeye, Tenderloin, T-Bone & more' },
  { name: 'Lamb', slug: 'lamb', image: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=600&auto=format&fit=crop&q=80', desc: 'Chops, Shoulder, Leg & more' },
  { name: 'Chicken', slug: 'chicken', image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=600&auto=format&fit=crop&q=80', desc: 'Whole, Breast, Thighs & more' },
  { name: 'Sausages', slug: 'sausages', image: 'https://images.unsplash.com/photo-1628268909376-e8c44bb3153f?w=600&auto=format&fit=crop&q=80', desc: 'Italian, Beef, Merguez & more' },
]

const qualities = [
  { icon: Shield, label: '100% Halal Certified' },
  { icon: Leaf, label: 'Farm to Fork' },
  { icon: Truck, label: 'Same-Day Delivery' },
  { icon: Clock, label: 'Fresh Cut Daily' },
]

const features = [
  { icon: Shield, title: '100% Halal Certified', desc: 'Every product is halal certified from trusted, audited sources. Zero compromise.' },
  { icon: Leaf, title: 'Farm to Fork', desc: 'Ethically sourced from local farms within 50 miles. We know every farmer by name.' },
  { icon: Truck, title: 'Same-Day Delivery', desc: 'Order before 2 PM and we deliver by evening. Temperature-controlled the entire way.' },
  { icon: Clock, title: 'Fresh Cut Daily', desc: 'Every cut is prepared the same day you order. Never frozen, always fresh.' },
  { icon: Award, title: 'Master Butchers', desc: 'Hand-selected by butchers with 30+ years experience. Only the finest cuts make it.' },
  { icon: Star, title: '4.9★ from 12k+ Reviews', desc: 'Trusted by thousands of families. Our quality speaks through our customers.' },
]

const testimonials = [
  { name: 'Sarah M.', text: 'The ribeye was perfectly marbled. Restaurant quality delivered to my door in hours. This is the only butcher I trust now.', role: 'Regular Customer', rating: 5 },
  { name: 'Ahmed K.', text: 'Finally a reliable source for halal meat. The quality is exceptional and prices are fair. My whole family orders from here.', role: 'Loyal Customer', rating: 5 },
  { name: 'James L.', text: 'Lamb chops were spectacular. Perfectly trimmed, incredibly tender. Will absolutely order again — already recommended to friends.', role: 'New Customer', rating: 5 },
]

export default async function HomePage() {
  const products = await prisma.product.findMany({
    take: 8,
    orderBy: { createdAt: 'desc' },
  })

  const bestsellers = await prisma.product.findMany({
    take: 4,
    orderBy: { pricePerKg: 'desc' },
  })

  return (
    <>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 rounded-full text-[12px] font-semibold text-[#C62828] mb-5">
                <Flame className="w-3.5 h-3.5" />
                Fresh Arrivals Daily
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.1] tracking-tight text-neutral-900" style={{fontFamily: "'Outfit', sans-serif"}}>
                Premium Meat,<br />
                <span className="text-[#C62828]">Delivered Fresh</span> to Your Door.
              </h1>
              <p className="mt-5 text-base text-neutral-500 leading-relaxed max-w-lg">
                Hand-selected cuts from local farms, prepared by master butchers. Halal certified. Same-day delivery on orders before 2 PM.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link href="/category/beef" className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#C62828] hover:bg-[#B71C1C] text-white rounded-lg font-semibold text-sm shadow-md shadow-red-900/10 transition-all group">
                  Shop All Products <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link href="/about" className="inline-flex items-center justify-center gap-2 px-7 py-3 border border-neutral-200 text-neutral-600 rounded-lg font-semibold text-sm hover:bg-neutral-50 transition-all">
                  Our Story
                </Link>
              </div>
              {/* Trust Row */}
              <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-wrap gap-x-6 gap-y-2">
                {qualities.map((q) => (
                  <div key={q.label} className="flex items-center gap-1.5 text-[13px] text-neutral-500">
                    <q.icon className="w-3.5 h-3.5 text-[#C62828]" />
                    <span>{q.label}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Hero Image */}
            <div className="relative hidden lg:block">
              <div className="rounded-2xl overflow-hidden aspect-[4/5] shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9?w=900&auto=format&fit=crop&q=80"
                  alt="Premium steak cuts"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Stat Cards */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl px-4 py-3 shadow-lg border border-neutral-100 flex items-center gap-2.5">
                <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-neutral-800">100% Organic</p>
                  <p className="text-[11px] text-neutral-400">Locally sourced</p>
                </div>
              </div>
              <div className="absolute -top-3 -right-3 bg-white rounded-xl px-4 py-3 shadow-lg border border-neutral-100 flex items-center gap-2.5">
                <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-neutral-800">12k+ Customers</p>
                  <p className="text-[11px] text-neutral-400">4.9★ average</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ BESTSELLERS ═══════════════ */}
      <section className="py-14 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-7">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                <Flame className="w-4 h-4 text-[#C62828]" />
              </div>
              <h2 className="text-xl font-bold text-neutral-900" style={{fontFamily: "'Outfit', sans-serif"}}>Bestsellers</h2>
            </div>
            <Link href="/search" className="text-[13px] font-semibold text-[#C62828] hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {bestsellers.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CATEGORIES ═══════════════ */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-7">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-neutral-600" />
              </div>
              <h2 className="text-xl font-bold text-neutral-900" style={{fontFamily: "'Outfit', sans-serif"}}>Shop by Category</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/category/${cat.slug}`} className="group relative rounded-xl overflow-hidden aspect-[3/4]">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover img-zoom" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-base font-bold text-white" style={{fontFamily: "'Outfit', sans-serif"}}>{cat.name}</h3>
                  <p className="text-[11px] text-white/60 mt-0.5">{cat.desc}</p>
                  <span className="inline-flex items-center gap-0.5 mt-2 text-[11px] font-semibold text-white/70 group-hover:text-white transition-colors">
                    Browse <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ ALL PRODUCTS ═══════════════ */}
      <section className="py-14 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-7">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-emerald-600" />
              </div>
              <h2 className="text-xl font-bold text-neutral-900" style={{fontFamily: "'Outfit', sans-serif"}}>Fresh Arrivals</h2>
            </div>
            <Link href="/search" className="text-[13px] font-semibold text-[#C62828] hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY US ═══════════════ */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-neutral-900" style={{fontFamily: "'Outfit', sans-serif"}}>Why Choose PrimeCuts</h2>
            <p className="text-neutral-500 text-sm mt-1.5 max-w-md mx-auto">Quality you can taste, service you can trust.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.title} className="group p-5 rounded-xl bg-[#FAFAFA] border border-transparent hover:border-red-100 hover:bg-red-50/30 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-white border border-neutral-100 group-hover:border-red-100 group-hover:bg-red-50 flex items-center justify-center text-neutral-400 group-hover:text-[#C62828] transition-all mb-3">
                  <f.icon className="w-4.5 h-4.5" />
                </div>
                <h3 className="font-bold text-sm text-neutral-800 mb-0.5">{f.title}</h3>
                <p className="text-[13px] text-neutral-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section className="py-14 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-neutral-900" style={{fontFamily: "'Outfit', sans-serif"}}>Loved by Thousands</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <div key={t.name} className="p-5 rounded-xl bg-white border border-neutral-100">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-neutral-600 leading-relaxed mb-5 text-[13px]">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-xs font-bold text-neutral-500">{t.name.charAt(0)}</div>
                  <div>
                    <p className="font-semibold text-[13px] text-neutral-800">{t.name}</p>
                    <p className="text-[11px] text-neutral-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ NEWSLETTER ═══════════════ */}
      <section className="py-14 bg-white border-t border-neutral-100">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-11 h-11 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Mail className="w-5 h-5 text-[#C62828]" />
          </div>
          <h2 className="text-xl font-bold text-neutral-900 mb-1.5" style={{fontFamily: "'Outfit', sans-serif"}}>Get Exclusive Deals</h2>
          <p className="text-neutral-500 text-sm mb-6">Fresh offers and seasonal recipes, delivered weekly.</p>
          <form className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C62828]/20 focus:border-[#C62828] transition-all"
            />
            <button type="button" className="px-5 py-2.5 bg-[#C62828] hover:bg-[#B71C1C] text-white rounded-lg font-semibold text-sm transition-all">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
