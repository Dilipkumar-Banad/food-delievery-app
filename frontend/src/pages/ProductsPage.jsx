import React, { useEffect, useState, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { productService } from '../services/api'
import CartContext from '../context/CartContext'

export default function ProductsPage() {
  const { t } = useTranslation()
  const { addToCart } = useContext(CartContext)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await productService.getAll()
        setProducts(response.data)
        setError(null)
      } catch (error) {
        console.error('Error fetching products:', error)
        setError('Failed to load products. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const handleAddToCart = (product) => {
    if (product.quantity <= 0) {
      alert('This product is out of stock')
      return
    }
    addToCart(product)
    alert(`${product.name} added to cart!`)
  }

  const filteredProducts = filter === 'all'
    ? products
    : products.filter(p => p.category.toLowerCase() === filter.toLowerCase())

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">{t('products')}</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Filter */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-6 py-2 rounded whitespace-nowrap font-medium transition ${
            filter === 'all' ? 'bg-orange-500 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('roti')}
          className={`px-6 py-2 rounded whitespace-nowrap font-medium transition ${
            filter === 'roti' ? 'bg-orange-500 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {t('roti')}
        </button>
        <button
          onClick={() => setFilter('chapati')}
          className={`px-6 py-2 rounded whitespace-nowrap font-medium transition ${
            filter === 'chapati' ? 'bg-orange-500 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {t('chapati')}
        </button>
        <button
          onClick={() => setFilter('holige')}
          className={`px-6 py-2 rounded whitespace-nowrap font-medium transition ${
            filter === 'holige' ? 'bg-orange-500 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {t('holige')}
        </button>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            <p className="mt-4 text-gray-600">{t('loading')}</p>
          </div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-6xl">
                  {product.category === 'Roti' ? '🍪' : product.category === 'Chapati' ? '🥙' : '🥞'}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-1 font-medium">{product.flour_type}</p>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-2xl font-bold text-orange-500">₹{product.price}</span>
                  <p className={`text-xs font-semibold mt-1 ${product.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.quantity > 0 ? `Available: ${product.quantity}` : 'Out of Stock'}
                  </p>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.quantity === 0}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
                >
                  {t('add_to_cart')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
