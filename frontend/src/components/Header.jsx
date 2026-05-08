import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Menu, X, ShoppingCart } from 'lucide-react'

export default function Header() {
  const { t, i18n } = useTranslation()
  const { auth, setAuth } = useContext(AuthContext)
  const [menuOpen, setMenuOpen] = React.useState(false)

  const handleLogout = () => {
    localStorage.removeItem('auth')
    setAuth(null)
  }

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'kn' : 'en'
    i18n.changeLanguage(newLang)
    localStorage.setItem('language', newLang)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="logo cta-button">
            🍛 {t('app_name')}
          </Link>

          <nav className="hidden md:flex gap-6 items-center">
            <Link to="/products" className="hover:text-orange-500">{t('products')}</Link>
            {auth && auth.user.role === 'customer' && (
              <Link to="/cart" className="flex items-center gap-2 hover:text-orange-500">
                <ShoppingCart size={20} /> {t('cart')}
              </Link>
            )}
            {auth && auth.user.role === 'admin' && (
              <Link to="/admin" className="hover:text-orange-500">{t('admin')}</Link>
            )}
            {auth && auth.user.role === 'agent' && (
              <Link to="/agent" className="hover:text-orange-500">{t('agent')}</Link>
            )}
            <button 
              onClick={toggleLanguage}
              className="px-3 py-1 bg-gray-100 rounded border border-gray-300"
            >
              {i18n.language === 'en' ? 'ಕನ್ನಡ' : 'English'}
            </button>
            {auth ? (
              <div className="flex gap-3">
                <Link to="/profile" className="text-sm hover:text-orange-500">
                  {auth.user.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                >
                  {t('logout')}
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link to="/login" className="px-4 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-50">
                  {t('login')}
                </Link>
                <Link to="/register" className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                  {t('register')}
                </Link>
              </div>
            )}
          </nav>

          <button 
            className="md:hidden" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <nav className="md:hidden flex flex-col gap-4 mt-4 pt-4 border-t">
            <Link to="/products" className="hover:text-orange-500">{t('products')}</Link>
            {auth && (
              <Link to="/cart" className="hover:text-orange-500">{t('cart')}</Link>
            )}
            <button 
              onClick={toggleLanguage}
              className="px-3 py-1 bg-gray-100 rounded border border-gray-300 w-fit"
            >
              {i18n.language === 'en' ? 'ಕನ್ನಡ' : 'English'}
            </button>
            {!auth && (
              <div className="flex flex-col gap-2">
                <Link to="/login" className="px-4 py-2 border border-orange-500 text-orange-500 rounded text-center">
                  {t('login')}
                </Link>
                <Link to="/register" className="px-4 py-2 bg-orange-500 text-white rounded text-center">
                  {t('register')}
                </Link>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
