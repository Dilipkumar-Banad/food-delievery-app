import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { authService } from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const { t } = useTranslation()
  const { setAuth } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await authService.register(
        formData.email,
        formData.password,
        formData.name,
        formData.phone
      )
      const { user, token } = response.data
      localStorage.setItem('auth', JSON.stringify({ user, token }))
      setAuth({ user, token })
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <div className="bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">{t('register')}</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">{t('name')}</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full"
              placeholder="John Doe"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">{t('email')}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full"
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">{t('phone')}</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full"
              placeholder="9876543210"
              maxLength="10"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">{t('password')}</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full"
              placeholder="••••••"
              minLength="6"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 disabled:opacity-50"
          >
            {loading ? t('loading') : t('register')}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          {t('already_have_account')} <a href="/login" className="text-orange-500 font-semibold hover:underline">{t('login')}</a>
        </p>
      </div>
    </div>
  )
}
