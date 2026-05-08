import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { productService } from '../services/api'

export default function HomePage() {
  const { t } = useTranslation()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getAll()
        setProducts(response.data.slice(0, 6))
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="hero">
        <h1>{t('welcome')}</h1>
        <p>Freshly prepared Roti, Chapati, and Holige delivered to your door</p>
        <a href="/products" className="cta-button">
          {t('order_now')}
        </a>
      </div>

      {/* Featured Products */}
      <div className="mb-12">
        <h2 className="text-center">{t('featured_products')}</h2>
        {loading ? (
          <div className="text-center py-8">
            <div className="spinner mx-auto"></div>
            <p>{t('loading')}</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-card animate-fadeIn">
                <div className="product-image">
                  <span>{product.category === 'Roti' ? '🍪' : product.category === 'Chapati' ? '🥙' : '🥞'}</span>
                </div>
                <div className="product-info">
                  <span className="product-category">{product.flour_type}</span>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="product-footer">
                    <span className="product-price">₹{product.price}</span>
                    <button className="add-to-cart-btn">
                      {t('add_to_cart')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Why Choose Us */}
      <div style={{
        background: 'linear-gradient(135deg, #f0f4ff 0%, #f9f3ff 100%)',
        borderRadius: '1rem',
        padding: '3rem 2rem',
        marginBottom: '3rem'
      }}>
        <h2 className="text-center" style={{marginBottom: '2rem'}}>Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center animate-slideInLeft">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="font-semibold mb-2">Fresh & Authentic</h3>
            <p className="text-gray-600">Made fresh daily with traditional recipes</p>
          </div>
          <div className="text-center animate-fadeIn">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="font-semibold mb-2">Quick Delivery</h3>
            <p className="text-gray-600">Fast and reliable delivery at your convenience</p>
          </div>
          <div className="text-center animate-slideInRight">
            <div className="text-5xl mb-4">💰</div>
            <h3 className="font-semibold mb-2">Best Prices</h3>
            <p className="text-gray-600">Affordable prices with special discounts</p>
          </div>
        </div>
      </div>
    </div>
  )
}
