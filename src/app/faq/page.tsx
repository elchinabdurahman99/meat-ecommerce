'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, HelpCircle } from 'lucide-react'
import Link from 'next/link'

const faqs = [
  { q: 'How fresh is the meat?', a: 'All our meat is freshly cut on the day of your order. We never sell frozen or pre-packaged meat. Our butchers prepare your exact cuts after you place your order.' },
  { q: 'Is your meat halal certified?', a: 'Yes! All our products are 100% halal certified. We source from halal-certified farms and follow strict halal slaughtering procedures.' },
  { q: 'What is your delivery area?', a: 'We deliver across the metro area in 4 zones. City center orders arrive within 1–3 hours, and outer suburb deliveries are available same-day or next-day. Check our Delivery page for full zone details.' },
  { q: 'How is the meat packaged?', a: 'Each cut is vacuum-sealed and placed in an insulated box with ice packs. This keeps the meat at perfect temperature throughout delivery. Our packaging is also eco-friendly and recyclable.' },
  { q: 'Can I place a custom order?', a: 'Absolutely! If you need a specific cut, weight, or preparation, contact us via the Contact page or call us directly. Our butchers can accommodate most custom requests with 24 hours notice.' },
  { q: 'What is your return/refund policy?', a: 'If you are not satisfied with your order for any reason, contact us within 24 hours of delivery. We offer a full refund or replacement on any product that does not meet your expectations.' },
  { q: 'Do you offer bulk/wholesale pricing?', a: 'Yes, we offer special pricing for bulk orders (10kg+) and wholesale accounts for restaurants and businesses. Contact us for a custom quote.' },
  { q: 'How do I track my order?', a: 'Once your order is dispatched, you will receive an SMS and email with tracking information. You can also check your order status on the Order History page.' },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <section className="bg-stone-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-stone-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">FAQ</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold" style={{fontFamily: "'Outfit', sans-serif"}}>Frequently Asked Questions</h1>
          <p className="text-stone-400 mt-3 max-w-lg">Everything you need to know about ordering from PrimeCuts.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-semibold text-stone-900 pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-stone-400 shrink-0 transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`} />
                </button>
                {openIndex === i && (
                  <div className="px-6 pb-5 pt-0 animate-slide-down">
                    <p className="text-sm text-stone-500 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center p-8 bg-white rounded-2xl border border-stone-100">
            <HelpCircle className="w-8 h-8 text-[#C62828] mx-auto mb-3" />
            <h3 className="font-bold text-stone-900 mb-2">Still have questions?</h3>
            <p className="text-sm text-stone-500 mb-4">Our team is here to help. Reach out and we&apos;ll get back to you quickly.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[#C62828] hover:bg-[#B71C1C] text-white rounded-xl font-semibold text-sm transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
