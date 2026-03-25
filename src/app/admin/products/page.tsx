'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Save, Package } from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string
  image: string
  pricePerKg: number
  availableWeights: string
  category: string
  inStock: boolean
}

const defaultProduct = {
  name: '',
  description: '',
  image: '',
  pricePerKg: '',
  availableWeights: '[0.5, 1, 2]',
  category: 'Beef',
  inStock: true,
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(defaultProduct)
  const [saving, setSaving] = useState(false)

  const fetchProducts = async () => {
    const res = await fetch('/api/products')
    const data = await res.json()
    setProducts(data)
    setLoading(false)
  }

  useEffect(() => { fetchProducts() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editingId) {
        await fetch(`/api/products/${editingId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
      } else {
        await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
      }
      setShowForm(false)
      setEditingId(null)
      setForm(defaultProduct)
      await fetchProducts()
    } catch {
      alert('Failed to save product')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (product: Product) => {
    setEditingId(product.id)
    setForm({
      name: product.name,
      description: product.description,
      image: product.image,
      pricePerKg: String(product.pricePerKg),
      availableWeights: product.availableWeights,
      category: product.category,
      inStock: product.inStock,
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    await fetch(`/api/products/${id}`, { method: 'DELETE' })
    await fetchProducts()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900" style={{fontFamily: "'Outfit', sans-serif"}}>Products</h1>
          <p className="text-sm text-stone-500 mt-1">{products.length} products</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditingId(null); setForm(defaultProduct) }}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#C62828] hover:bg-[#B71C1C] text-white rounded-xl font-medium text-sm transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl border border-stone-100 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
              <h2 className="font-bold text-stone-900" style={{fontFamily: "'Outfit', sans-serif"}}>{editingId ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setShowForm(false)} className="p-1.5 hover:bg-stone-100 rounded-lg transition-colors"><X className="w-5 h-5 text-stone-400" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-1.5">Product Name</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C62828]/20 focus:border-[#C62828]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-1.5">Description</label>
                <textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C62828]/20 focus:border-[#C62828] resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-1.5">Image URL</label>
                <input required value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C62828]/20 focus:border-[#C62828]" />
                {form.image && <img src={form.image} alt="Preview" className="mt-2 w-full h-32 object-cover rounded-xl bg-stone-100" />}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">Price per Kg ($)</label>
                  <input required type="number" step="0.01" value={form.pricePerKg} onChange={(e) => setForm({ ...form, pricePerKg: e.target.value })} className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C62828]/20 focus:border-[#C62828]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C62828]/20 focus:border-[#C62828]">
                    <option>Beef</option><option>Lamb</option><option>Chicken</option><option>Sausages</option><option>Custom</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-1.5">Available Weights (JSON)</label>
                <input required value={form.availableWeights} onChange={(e) => setForm({ ...form, availableWeights: e.target.value })} className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C62828]/20 focus:border-[#C62828]" placeholder='[0.5, 1, 2]' />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={form.inStock} onChange={(e) => setForm({ ...form, inStock: e.target.checked })} id="inStock" className="rounded border-stone-300 text-[#C62828] focus:ring-[#C62828]" />
                <label htmlFor="inStock" className="text-sm font-medium text-stone-600">In Stock</label>
              </div>
              <button type="submit" disabled={saving} className="w-full py-3 bg-[#C62828] hover:bg-[#B71C1C] disabled:bg-stone-300 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                <Save className="w-4 h-4" /> {saving ? 'Saving...' : editingId ? 'Update Product' : 'Create Product'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-20 text-stone-500">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-stone-100">
          <Package className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <p className="text-stone-500">No products yet. Add your first product above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl border border-stone-100 overflow-hidden hover:shadow-lg hover:shadow-stone-900/5 transition-all group">
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(product)} className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm text-blue-600 hover:bg-blue-50 transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm text-red-600 hover:bg-red-50 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                {!product.inStock && (
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-red-600 text-white text-[10px] font-bold rounded-md uppercase">Out of Stock</div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-stone-400">{product.category}</span>
                  <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                </div>
                <h3 className="font-bold text-sm text-stone-900 line-clamp-1">{product.name}</h3>
                <p className="text-xs text-stone-400 line-clamp-1 mt-0.5">{product.description}</p>
                <p className="text-base font-bold text-stone-900 mt-2">${product.pricePerKg}<span className="text-xs text-stone-400 font-normal">/kg</span></p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
