import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { 
  LayoutDashboard, 
  Bot, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  CreditCard,
  BarChart3,
  Shield
} from 'lucide-react'
import { motion } from 'framer-motion'

const Sidebar: React.FC = () => {
  const { isAdmin } = useAuth()
  const location = useLocation()

  const navigation = [
    { name: 'Panel', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Botlarım', href: '/bots', icon: Bot },
    { name: 'Paketler', href: '/plans', icon: Package },
    { name: 'Mağaza', href: '/marketplace', icon: ShoppingCart },
    { name: 'Faturalama', href: '/billing', icon: CreditCard },
    { name: 'Ayarlar', href: '/settings', icon: Settings },
  ]

  const adminNavigation = [
    { name: 'Yönetim Paneli', href: '/admin', icon: Shield },
    { name: 'Kullanıcı Yönetimi', href: '/admin/users', icon: Users },
    { name: 'Bot Yönetimi', href: '/admin/bots', icon: Bot },
    { name: 'Paket Yönetimi', href: '/admin/plans', icon: Package },
    { name: 'Analitik', href: '/admin/analytics', icon: BarChart3 },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 h-screen fixed left-0 top-16">
      <div className="p-4">
        <nav className="space-y-2">
          <div className="pb-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Ana Menü
            </h3>
            <div className="mt-2 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive(item.href)
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>

          {isAdmin && (
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
               Yönetim
              </h3>
              <div className="mt-2 space-y-1">
                {adminNavigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive(item.href)
                          ? 'bg-purple-100 text-purple-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  )
}

export default Sidebar