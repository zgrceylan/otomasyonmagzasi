import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Bot, User, LogOut, Settings, CreditCard } from 'lucide-react'
import { motion } from 'framer-motion'

const Header: React.FC = () => {
  const { user, signOut, isAdmin } = useAuth()
  const location = useLocation()

  const navigation = [
    { name: 'Panel', href: '/dashboard' },
    { name: 'Botlarım', href: '/bots' },
    { name: 'Paketler', href: '/plans' },
    { name: 'Mağaza', href: '/marketplace' },
  ]

  const adminNavigation = [
    { name: 'Yönetim', href: '/admin' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Otomasyon Mağazası</span>
            </Link>
          </div>

          {user && (
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {isAdmin && adminNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          )}

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                <Link
                  to="/settings"
                  className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <Settings className="h-5 w-5" />
                </Link>
                <Link
                  to="/billing"
                  className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <CreditCard className="h-5 w-5" />
                </Link>
                <button
                  onClick={signOut}
                  className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-700">{user.email}</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/auth/login"
                  className="text-gray-500 hover:text-gray-700 font-medium"
                >
                  Giriş yap
                </Link>
                <Link
                  to="/auth/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  Başla
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header