import { MapPin, Phone, Mail, Clock, Send, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Header */}
      <section className="bg-stone-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-stone-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Contact</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold" style={{fontFamily: "'Outfit', sans-serif"}}>Get in Touch</h1>
          <p className="text-stone-400 mt-3 max-w-lg">Have a question, special request, or just want to say hi? We&apos;d love to hear from you.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-4">
              {[
                { icon: MapPin, label: 'Visit Us', value: '123 Butcher Lane,\nFresh Market District,\nNew York, NY 10001' },
                { icon: Phone, label: 'Call Us', value: '+1 (555) 123-4567' },
                { icon: Mail, label: 'Email', value: 'hello@primecuts.com' },
                { icon: Clock, label: 'Hours', value: 'Mon–Sat: 7:00am – 8:00pm\nSunday: 8:00am – 4:00pm' },
              ].map((c) => (
                <div key={c.label} className="flex gap-4 p-5 bg-white rounded-2xl border border-stone-100">
                  <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center text-[#C62828] shrink-0">
                    <c.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-[0.1em] uppercase text-stone-400 mb-1">{c.label}</p>
                    <p className="text-sm text-stone-700 whitespace-pre-line">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-stone-100 p-8">
                <h2 className="text-xl font-bold text-stone-900 mb-6" style={{fontFamily: "'Outfit', sans-serif"}}>Send us a Message</h2>
                <form className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-stone-600 mb-1.5">Full Name</label>
                      <input type="text" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C62828]/20 focus:border-[#C62828] transition-all" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-600 mb-1.5">Email</label>
                      <input type="email" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C62828]/20 focus:border-[#C62828] transition-all" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1.5">Subject</label>
                    <input type="text" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C62828]/20 focus:border-[#C62828] transition-all" placeholder="How can we help?" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1.5">Message</label>
                    <textarea rows={5} className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C62828]/20 focus:border-[#C62828] transition-all resize-none" placeholder="Tell us what you need..." />
                  </div>
                  <button type="button" className="flex items-center gap-2 px-7 py-3.5 bg-[#C62828] hover:bg-[#B71C1C] text-white rounded-xl font-semibold text-sm shadow-md shadow-red-800/10 transition-all">
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
