import { Truck, Clock, MapPin, DollarSign, Package, ShieldCheck, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const zones = [
  { zone: 'Zone 1 — City Center', time: '1–3 hours', fee: 'Free over $50' },
  { zone: 'Zone 2 — Inner Suburbs', time: '2–4 hours', fee: '$3.99 or Free over $75' },
  { zone: 'Zone 3 — Outer Suburbs', time: 'Same Day', fee: '$5.99 or Free over $100' },
  { zone: 'Zone 4 — Extended Metro', time: 'Next Day', fee: '$8.99' },
]

export default function DeliveryPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Header */}
      <section className="bg-stone-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-stone-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Delivery</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold" style={{fontFamily: "'Outfit', sans-serif"}}>Delivery Information</h1>
          <p className="text-stone-400 mt-3 max-w-lg">We deliver fresh, premium meat straight from our butchery to your door — carefully packed to ensure perfect quality.</p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#C62828] mb-2">Process</p>
            <h2 className="text-3xl font-bold text-stone-900" style={{fontFamily: "'Outfit', sans-serif"}}>How Delivery Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', icon: Package, title: 'Choose Your Cuts', desc: 'Browse our selection and add your favorites to the cart.' },
              { step: '02', icon: Clock, title: 'Pick a Time', desc: 'Select a delivery window that suits your schedule.' },
              { step: '03', icon: ShieldCheck, title: 'We Prepare', desc: 'Our butchers freshly cut and vacuum-seal your order.' },
              { step: '04', icon: Truck, title: 'We Deliver', desc: 'Temperature-controlled delivery right to your doorstep.' },
            ].map((s) => (
              <div key={s.step} className="relative p-6 rounded-2xl bg-white border border-stone-100 text-center">
                <span className="text-4xl font-bold text-stone-100 absolute top-4 right-4" style={{fontFamily: "'Outfit', sans-serif"}}>{s.step}</span>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-50 text-[#C62828] mb-4 relative z-10">
                  <s.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-stone-900 mb-1 relative z-10">{s.title}</h3>
                <p className="text-sm text-stone-500 relative z-10">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zones */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#C62828] mb-2">Coverage</p>
            <h2 className="text-3xl font-bold text-stone-900" style={{fontFamily: "'Outfit', sans-serif"}}>Delivery Zones & Fees</h2>
          </div>
          <div className="bg-[#FAFAF8] rounded-2xl border border-stone-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-stone-200 bg-stone-100/50">
                  <th className="px-6 py-4 font-bold text-stone-600">Zone</th>
                  <th className="px-6 py-4 font-bold text-stone-600">Estimated Time</th>
                  <th className="px-6 py-4 font-bold text-stone-600">Fee</th>
                </tr>
              </thead>
              <tbody>
                {zones.map((z) => (
                  <tr key={z.zone} className="border-b border-stone-100 last:border-0">
                    <td className="px-6 py-4 font-medium text-stone-900">{z.zone}</td>
                    <td className="px-6 py-4 text-stone-600">{z.time}</td>
                    <td className="px-6 py-4 text-stone-600">{z.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Packaging */}
      <section className="py-20 bg-[#FAFAF8]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-2xl text-green-600 mb-5">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 mb-4" style={{fontFamily: "'Outfit', sans-serif"}}>Freshness Guaranteed</h2>
          <p className="text-stone-500 leading-relaxed max-w-xl mx-auto mb-6">
            All orders are vacuum-sealed and packed in insulated boxes with ice packs. Our cold-chain logistics ensure your meat arrives at the perfect temperature, every single time.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-semibold text-sm transition-all">
            Got questions? Contact us
          </Link>
        </div>
      </section>
    </div>
  )
}
