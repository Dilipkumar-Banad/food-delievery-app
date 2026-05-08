import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Trash2, Plus, Minus } from 'lucide-react'
import CartContext from '../context/CartContext'

export default function CartPage() {
  const { t } = useTranslation()
  const { cart, removeFromCart, updateQuantity, getTotal, clearCart } = useContext(CartContext)

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">{t('cart')}</h1>
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-600 mb-4 text-lg">Your cart is empty</p>
          <Link 
            to="/products" 
            className="inline-block px-6 py-3 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">{t('cart')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">{t('product')}</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Price</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Quantity</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Total</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody divide-y>
                  {cart.map(item => (
                    <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.flour_type}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-700">₹{item.price}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2 bg-gray-100 rounded w-fit mx-auto">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-200 transition"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={16} className="text-gray-600" />
                          </button>
                          <span className="px-4 py-1 min-w-[2.5rem] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-200 transition"
                          >
                            <Plus size={16} className="text-gray-600" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center font-semibold text-orange-500">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded transition inline-flex items-center justify-center"
                          title="Remove from cart"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-24">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal ({cart.length} items)</span>
                <span>₹{getTotal()}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Delivery Charge</span>
                <span className="text-green-600 font-semibold">FREE</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold text-gray-800">
                  <span>Total</span>
                  <span className="text-orange-500">₹{getTotal()}</span>
                </div>
              </div>
            </div>

            <Link
              to="/checkout"
              className="block w-full px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition text-center mb-3"
            >
              Proceed to Checkout
            </Link>

            <button
              onClick={() => clearCart()}
              className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
            >
              Clear Cart
            </button>

            <Link
              to="/products"
              className="block w-full mt-3 px-6 py-3 border-2 border-orange-500 text-orange-500 font-semibold rounded-lg hover:bg-orange-50 transition text-center"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
