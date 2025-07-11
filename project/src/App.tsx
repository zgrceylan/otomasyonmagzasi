import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Layout from './components/Layout/Layout'
import LandingPage from './components/Landing/LandingPage'
import LoginForm from './components/Auth/LoginForm'
import SignupForm from './components/Auth/SignupForm'
import Dashboard from './components/Dashboard/Dashboard'
import PlansPage from './components/Plans/PlansPage'
import AdminLayout from './components/Admin/AdminLayout'
import PlanManagement from './components/Admin/PlanManagement'
import BotManagement from './components/Admin/BotManagement'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }
  
  return user ? <>{children}</> : <Navigate to="/auth/login" />
}

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }
  
  return user ? <Navigate to="/dashboard" /> : <>{children}</>
}

function AppContent() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/auth/login" 
          element={
            <PublicRoute>
              <LoginForm />
            </PublicRoute>
          } 
        />
        <Route 
          path="/auth/signup" 
          element={
            <PublicRoute>
              <SignupForm />
            </PublicRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/plans" 
          element={
            <ProtectedRoute>
              <PlansPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/bots" 
          element={
            <ProtectedRoute>
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900">Botlarım</h1>
                <p className="text-gray-600 mt-2">Otomasyon botlarınızı yönetin (Yakında)</p>
              </div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/marketplace" 
          element={
            <ProtectedRoute>
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900">Bot Mağazası</h1>
                <p className="text-gray-600 mt-2">Tekil botları keşfedin ve satın alın (Yakında)</p>
              </div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-gray-900">Yönetim Paneli</h1>
                  <p className="text-gray-600 mt-2">Platform yönetimi ana sayfası</p>
                </div>
              </AdminLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/plans" 
          element={
            <ProtectedRoute>
              <AdminLayout>
                <PlanManagement />
              </AdminLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/bots" 
          element={
            <ProtectedRoute>
              <AdminLayout>
                <BotManagement />
              </AdminLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute>
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900">Ayarlar</h1>
                <p className="text-gray-600 mt-2">Hesap ayarları ve tercihler (Yakında)</p>
              </div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/billing" 
          element={
            <ProtectedRoute>
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900">Faturalama</h1>
                <p className="text-gray-600 mt-2">Aboneliğinizi ve faturalandırmanızı yönetin (Yakında)</p>
              </div>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Layout>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  )
}

export default App