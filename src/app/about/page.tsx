import { Award, Users, Leaf, Heart, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1558030006-450675393462?w=1400&q=80" alt="Our butchery" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#C9A96E] mb-3">Our Story</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight" style={{fontFamily: "'Outfit', sans-serif"}}>
            Crafting Quality<br/>Since 1985
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-stone-600 leading-relaxed mb-6">
            PrimeCuts started as a small family butcher shop in the heart of the city. For nearly four decades, we&apos;ve been dedicated to the art of butchery — hand-selecting only the finest cuts from local farms and delivering them fresh to our customers&apos; tables.
          </p>
          <p className="text-lg text-stone-600 leading-relaxed mb-6">
            Our master butchers bring decades of experience and an unwavering commitment to quality. We believe that great food starts with great ingredients, and we take pride in knowing every farmer, every farm, and every animal that provides our premium meats.
          </p>
          <p className="text-lg text-stone-600 leading-relaxed">
            Today, we&apos;ve expanded from our original shop to offer same-day delivery across the city, making premium butcher-quality meat accessible to everyone — without compromising on the quality, freshness, or personal touch that defines us.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#C62828] mb-2">Our Values</p>
            <h2 className="text-3xl font-bold text-stone-900" style={{fontFamily: "'Outfit', sans-serif"}}>What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Leaf, title: 'Sustainability', desc: 'We partner with local farms that practice sustainable, ethical animal husbandry. Every purchase supports responsible farming.' },
              { icon: Heart, title: 'Community', desc: 'We\'re more than a business — we\'re a part of this community. We sponsor local events and donate to food banks weekly.' },
              { icon: Award, title: 'Excellence', desc: 'Every cut meets our rigorous quality standards. Our master butchers have over 100 years of combined experience.' },
            ].map((v) => (
              <div key={v.title} className="text-center p-8 rounded-2xl border border-stone-100">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-red-50 rounded-2xl text-[#C62828] mb-5">
                  <v.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">{v.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-20 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '38+', label: 'Years Experience' },
              { value: '12,000+', label: 'Happy Customers' },
              { value: '50+', label: 'Local Farm Partners' },
              { value: '4.9★', label: 'Customer Rating' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold text-stone-900" style={{fontFamily: "'Outfit', sans-serif"}}>{s.value}</p>
                <p className="text-sm text-stone-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-stone-900 text-white text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4" style={{fontFamily: "'Outfit', sans-serif"}}>Ready to Taste the Difference?</h2>
          <p className="text-stone-400 mb-6">Explore our premium selection and experience butcher-quality meat delivered to your door.</p>
          <Link href="/category/beef" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#C62828] hover:bg-[#B71C1C] text-white rounded-xl font-semibold transition-all">
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  )
}
