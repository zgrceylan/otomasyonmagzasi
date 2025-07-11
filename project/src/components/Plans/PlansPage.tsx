import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'
import { Plan, Bot } from '../../types/database'
import PlanCard from './PlanCard'
import { motion } from 'framer-motion'

const PlansPage: React.FC = () => {
  const { user } = useAuth()
  const [plans, setPlans] = useState<Plan[]>([])
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [subscribing, setSubscribing] = useState(false)

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      // Planları ve ilişkili botları getir
      const { data: plansData, error: plansError } = await supabase
        .from('plans')
        .select(`
          *,
          plan_bots (
            bot_id,
            bots (*)
          )
        `)
        .eq('is_active', true)
        .order('sort_order')

      if (plansError) throw plansError

      // Veriyi düzenle
      const formattedPlans = plansData?.map(plan => ({
        ...plan,
        bots: plan.plan_bots?.map((pb: any) => pb.bots) || []
      })) || []

      setPlans(formattedPlans)
    } catch (error) {
      console.error('Planlar yüklenirken hata:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
  }

  const handleSubscribe = async () => {
    if (!selectedPlan || !user) return
    
    setSubscribing(true)
    
    try {
      // Kullanıcının mevcut aktif planını kontrol et
      const { data: existingPlan } = await supabase
        .from('user_plans')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single()

      if (existingPlan) {
        // Mevcut planı iptal et
        await supabase
          .from('user_plans')
          .update({ status: 'cancelled' })
          .eq('id', existingPlan.id)
      }

      // Yeni planı ekle
      const subscriptionEnd = new Date()
      subscriptionEnd.setMonth(subscriptionEnd.getMonth() + 1)

      const { error: planError } = await supabase
        .from('user_plans')
        .insert({
          user_id: user.id,
          plan_id: selectedPlan,
          status: 'trial', // 7 günlük deneme
          subscription_start: new Date().toISOString(),
          subscription_end: subscriptionEnd.toISOString(),
          trial_end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        })

      if (planError) throw planError

      // Seçilen planın botlarını kullanıcıya ekle
      const selectedPlanData = plans.find(p => p.id === selectedPlan)
      if (selectedPlanData?.bots) {
        const userBots = selectedPlanData.bots.map(bot => ({
          user_id: user.id,
          bot_id: bot.id,
          plan_id: selectedPlan,
          status: 'active' as const,
          access_start: new Date().toISOString(),
          access_end: subscriptionEnd.toISOString()
        }))

        await supabase
          .from('user_bots')
          .upsert(userBots, { onConflict: 'user_id,bot_id' })
      }

      alert('Plan başarıyla seçildi! 7 günlük ücretsiz deneme sürümünüz başladı.')
      setSelectedPlan(null)
    } catch (error) {
      console.error('Abonelik hatası:', error)
      alert('Abonelik sırasında bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setSubscribing(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Paketinizi Seçin</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Otomasyon ihtiyaçlarınız için mükemmel paketi seçin. 
          Tüm paketler, özelliklere tam erişim sağlayan 7 günlük ücretsiz deneme içerir.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            onSelect={handlePlanSelect}
            isSelected={selectedPlan === plan.id}
          />
        ))}
      </div>

      {selectedPlan && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Başlamaya hazır mısınız?
              </h3>
              <p className="text-gray-600">
                {plans.find(p => p.id === selectedPlan)?.name} paketini seçtiniz
              </p>
            </div>
            <button
              onClick={handleSubscribe}
              disabled={subscribing}
              className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {subscribing ? 'İşleniyor...' : 'Şimdi Abone Ol'}
            </button>
          </div>
        </motion.div>
      )}

      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-blue-900 mb-2">
          Seçim yapmakta yardıma mı ihtiyacınız var?
        </h3>
        <p className="text-blue-700 mb-4">
          Ekibimiz ihtiyaçlarınız için mükemmel paketi bulmanızda size yardımcı olmak için burada.
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
          Satış Ekibiyle İletişime Geç
        </button>
      </div>
    </div>
  )
}

export default PlansPage