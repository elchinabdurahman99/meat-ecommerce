import Link from 'next/link'
import { Beef, Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#C62828] flex items-center justify-center text-white">
                <Beef className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-base text-neutral-900" style={{fontFamily: "'Outfit', sans-serif"}}>PrimeCuts</span>
                <span className="block text-[9px] tracking-[0.15em] uppercase text-neutral-400">Premium Butcher</span>
              </div>
            </Link>
            <p className="text-[13px] text-neutral-500 leading-relaxed mb-4">
              The finest locally-sourced meats since 1985. Every cut hand-selected by our master butchers.
            </p>
            <div className="flex gap-2">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-md bg-white border border-neutral-200 hover:border-[#C62828] hover:text-[#C62828] flex items-center justify-center text-neutral-400 transition-all">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-wider uppercase text-neutral-400 mb-4">Shop</h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Premium Beef', href: '/category/beef' },
                { name: 'Fresh Lamb', href: '/category/lamb' },
                { name: 'Free-Range Chicken', href: '/category/chicken' },
                { name: 'Craft Sausages', href: '/category/sausages' },
                { name: 'All Products', href: '/search' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[13px] text-neutral-500 hover:text-[#C62828] transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-wider uppercase text-neutral-400 mb-4">Company</h4>
            <ul className="space-y-2.5">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Delivery Info', href: '/delivery' },
                { name: 'Contact', href: '/contact' },
                { name: 'FAQ', href: '/faq' },
                { name: 'Order History', href: '/orders' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[13px] text-neutral-500 hover:text-[#C62828] transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-wider uppercase text-neutral-400 mb-4">Contact</h4>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2 text-[13px] text-neutral-500"><MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-neutral-400" /> 123 Butcher Lane, NY 10001</li>
              <li className="flex items-center gap-2 text-[13px] text-neutral-500"><Phone className="w-3.5 h-3.5 shrink-0 text-neutral-400" /> +1 (555) 123-4567</li>
              <li className="flex items-center gap-2 text-[13px] text-neutral-500"><Mail className="w-3.5 h-3.5 shrink-0 text-neutral-400" /> hello@primecuts.com</li>
              <li className="flex items-center gap-2 text-[13px] text-neutral-500"><Clock className="w-3.5 h-3.5 shrink-0 text-neutral-400" /> Mon–Sat: 7am – 8pm</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-neutral-400">© 2025 PrimeCuts. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px] text-neutral-400">
            <Link href="#" className="hover:text-neutral-700 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-neutral-700 transition-colors">Terms</Link>
            <Link href="#" className="hover:text-neutral-700 transition-colors">Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
