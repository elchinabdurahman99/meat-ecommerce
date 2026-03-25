'use client'

import CartDrawer from '@/components/cart/CartDrawer'
import MobileCartButton from '@/components/cart/MobileCartButton'

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <CartDrawer />
      <MobileCartButton />
    </>
  )
}
