import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { AdminUser } from '../types/database'

export const useAdmin = () => {
  const { user } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminData, setAdminData] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false)
        setAdminData(null)
        setLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('admin_users')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (error && error.code !== 'PGRST116') {
          console.error('Admin check error:', error)
          setIsAdmin(false)
          setAdminData(null)
        } else if (data) {
          setIsAdmin(true)
          setAdminData(data)
        } else {
          setIsAdmin(false)
          setAdminData(null)
        }
      } catch (error) {
        console.error('Admin check error:', error)
        setIsAdmin(false)
        setAdminData(null)
      } finally {
        setLoading(false)
      }
    }

    checkAdminStatus()
  }, [user])

  return { isAdmin, adminData, loading }
}