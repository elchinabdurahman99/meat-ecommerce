'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const statuses = ['pending', 'preparing', 'delivered']

export default function OrderStatusUpdater({ orderId, currentStatus }: { orderId: string; currentStatus: string }) {
  const [status, setStatus] = useState(currentStatus)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  const handleChange = async (newStatus: string) => {
    setSaving(true)
    setStatus(newStatus)
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      router.refresh()
    } catch {
      setStatus(currentStatus)
    } finally {
      setSaving(false)
    }
  }

  return (
    <select
      value={status}
      onChange={(e) => handleChange(e.target.value)}
      disabled={saving}
      className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors cursor-pointer capitalize ${
        status === 'delivered' ? 'bg-green-50 text-green-700 border-green-200' :
        status === 'preparing' ? 'bg-blue-50 text-blue-700 border-blue-200' :
        'bg-amber-50 text-amber-700 border-amber-200'
      }`}
    >
      {statuses.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  )
}
