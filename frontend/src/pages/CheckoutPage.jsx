import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AuthContext from '../context/AuthContext'
import CartContext from '../context/CartContext'
import { loadRazorpayScript } from '../config/razorpay'

export default function CheckoutPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { auth } = useContext(AuthContext)
  const { cart, getTotal, clearCart } = useContext(CartContext)

  const [formData, setFormData] = useState({
    delivery_address: '',
    delivery_slot: '',
    phone: auth?.user?.phone || ''
  })
  const [coupon, setCoupon] = useState('')
  const [discount, setDiscount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!auth) {
      navigate('/login')
      return
    }
    if (cart.length === 0) {
      navigate('/cart')
      return
    }
    // Load Razorpay script
    loadRazorpayScript();
  }, [auth, cart, navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError(null)
  }

  const handleApplyCoupon = async () => {
    if (!coupon.trim()) {
      setError('Please enter a coupon code')
      return
    }
    // Mock discount application - replace with API call
    if (coupon.toUpperCase() === 'WELCOME10') {
      setDiscount(10)
    } else if (coupon.toUpperCase() === 'SAVE20') {
      setDiscount(20)
    } else {
      setError('Invalid coupon code')
      setDiscount(0)
    }
  }

  const handlePayment = async () => {
    try {
      // Validate form
      if (!formData.delivery_address.trim()) {
        setError('Please enter delivery address')
        return
      }
      if (!formData.delivery_slot) {
        setError('Please select delivery slot')
        return
      }

      setLoading(true)
      setError(null)

      const total = parseFloat(getTotal())
      const finalTotal = total - (total * discount / 100)

      // Initialize payment with backend
      const response = await fetch('http://localhost:5000/api/orders/payment/init', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
        body: JSON.stringify({
          amount: Math.round(finalTotal * 100) / 100,
          items: cart,
          delivery_slot: formData.delivery_slot,
          delivery_address: formData.delivery_address,
          coupon_code: coupon || null
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Payment initialization failed')
      }

      // Open Razorpay Payment Gateway
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: Math.round(finalTotal * 100),
        currency: 'INR',
        order_id: data.razorpay_order_id,
        name: 'Food Delivery',
        description: `Order for ${formData.delivery_slot}`,
        handler: async (paymentResponse) => {
          try {
            const verifyResponse = await fetch('http://localhost:5000/api/orders/payment/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`
              },
              body: JSON.stringify({
                order_id: data.order_id,
                razorpay_order_id: data.razorpay_order_id,
                payment_id: paymentResponse.razorpay_payment_id,
                signature: paymentResponse.razorpay_signature
              })
            })

            const result = await verifyResponse.json()

            if (verifyResponse.ok) {
              clearCart()
              navigate(`/orders/${result.order_id}`)
            } else {
              setError('Payment verification failed')
              setLoading(false)
            }
          } catch (error) {
            setError('Error processing payment: ' + error.message)
            setLoading(false)
          }
        },
        prefill: {
          email: auth.user.email,
          contact: formData.phone
        },
        theme: {
          color: '#FF9933'
        }
      }

      if (window.Razorpay) {
        const razorpay = new window.Razorpay(options)
        razorpay.open()
      } else {
        setError('Razorpay payment gateway is not available')
      }
      
      setLoading(false)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  if (!auth) {
    return null
  }

  const subtotal = parseFloat(getTotal())
  const discountAmount = subtotal * discount / 100
  const finalTotal = (subtotal - discountAmount).toFixed(2)

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">{t('checkout')}</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Address */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Delivery Address</h2>
            <textarea
              name="delivery_address"
              value={formData.delivery_address}
              onChange={handleInputChange}
              placeholder="Enter your complete delivery address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              rows="4"
            />
          </div>

          {/* Delivery Slot */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Delivery Slot</h2>
            <select
              name="delivery_slot"
              value={formData.delivery_slot}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Select delivery slot</option>
              <option value="9:00 AM - 11:00 AM">9:00 AM - 11:00 AM</option>
              <option value="11:00 AM - 1:00 PM">11:00 AM - 1:00 PM</option>
              <option value="1:00 PM - 3:00 PM">1:00 PM - 3:00 PM</option>
              <option value="3:00 PM - 5:00 PM">3:00 PM - 5:00 PM</option>
              <option value="5:00 PM - 7:00 PM">5:00 PM - 7:00 PM</option>
              <option value="7:00 PM - 9:00 PM">7:00 PM - 9:00 PM</option>
            </select>
          </div>

          {/* Coupon Code */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Apply Coupon (Optional)</h2>
            <p className="text-sm text-gray-500 mb-3">Try: WELCOME10 or SAVE20</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter coupon code"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                onClick={handleApplyCoupon}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold"
              >
                Apply
              </button>
            </div>
            {discount > 0 && (
              <p className="text-green-600 text-sm mt-2 font-semibold">
                ✓ Coupon applied! You save ₹{discountAmount.toFixed(2)}
              </p>
            )}
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Items</h2>
            <div className="space-y-3">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between py-2 border-b">
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-24 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>

            <div className="space-y-3 py-4 border-t border-b">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>Discount ({discount}%)</span>
                  <span>-₹{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-700">
                <span>Delivery Charge</span>
                <span className="text-green-600 font-semibold">FREE</span>
              </div>
            </div>

            <div className="flex justify-between text-2xl font-bold text-orange-500 py-4">
              <span>Total</span>
              <span>₹{finalTotal}</span>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading || !formData.delivery_address || !formData.delivery_slot}
              className="w-full px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Processing...' : 'Pay with Razorpay'}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              🔒 Secure payment powered by Razorpay
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
