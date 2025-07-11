import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Plan, Bot } from '../../types/database'
import { Plus, Edit, Trash2, Save, X, Bot as BotIcon } from 'lucide-react'
import { motion } from 'framer-motion'

const PlanManagement: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([])
  const [bots, setBots] = useState<Bot[]>([])
  const [loading, setLoading] = useState(true)
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    features: [''],
    selectedBots: [] as string[]
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Planları getir
      const { data: plansData, error: plansError } = await supabase
        .from('plans')
        .select(`
          *,
          plan_bots (
            bot_id,
            bots (*)
          )
        `)
        .order('sort_order')

      if (plansError) throw plansError

      // Botları getir
      const { data: botsData, error: botsError } = await supabase
        .from('bots')
        .select('*')
        .order('name')

      if (botsError) throw botsError

      // Veriyi düzenle
      const formattedPlans = plansData?.map(plan => ({
        ...plan,
        bots: plan.plan_bots?.map((pb: any) => pb.bots) || []
      })) || []

      setPlans(formattedPlans)
      setBots(botsData || [])
    } catch (error) {
      console.error('Veri yüklenirken hata:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (plan: Plan) => {
    setEditingPlan(plan)
    setFormData({
      name: plan.name,
      description: plan.description || '',
      price: plan.price,
      features: plan.features || [''],
      selectedBots: plan.bots?.map(bot => bot.id) || []
    })
    setShowAddForm(true)
  }

  const handleAdd = () => {
    setEditingPlan(null)
    setFormData({
      name: '',
      description: '',
      price: 0,
      features: [''],
      selectedBots: []
    })
    setShowAddForm(true)
  }

  const handleSave = async () => {
    try {
      const planData = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        features: formData.features.filter(f => f.trim() !== ''),
        sort_order: editingPlan?.sort_order || plans.length + 1
      }

      let planId: string

      if (editingPlan) {
        // Güncelle
        const { error } = await supabase
          .from('plans')
          .update(planData)
          .eq('id', editingPlan.id)

        if (error) throw error
        planId = editingPlan.id
      } else {
        // Yeni ekle
        const { data, error } = await supabase
          .from('plans')
          .insert(planData)
          .select()
          .single()

        if (error) throw error
        planId = data.id
      }

      // Plan-bot ilişkilerini güncelle
      // Önce mevcut ilişkileri sil
      await supabase
        .from('plan_bots')
        .delete()
        .eq('plan_id', planId)

      // Yeni ilişkileri ekle
      if (formData.selectedBots.length > 0) {
        const planBots = formData.selectedBots.map(botId => ({
          plan_id: planId,
          bot_id: botId
        }))

        await supabase
          .from('plan_bots')
          .insert(planBots)
      }

      await fetchData()
      setShowAddForm(false)
      setEditingPlan(null)
    } catch (error) {
      console.error('Kaydetme hatası:', error)
      alert('Kaydetme sırasında bir hata oluştu.')
    }
  }

  const handleDelete = async (planId: string) => {
    if (!confirm('Bu planı silmek istediğinizden emin misiniz?')) return

    try {
      const { error } = await supabase
        .from('plans')
        .delete()
        .eq('id', planId)

      if (error) throw error

      await fetchData()
    } catch (error) {
      console.error('Silme hatası:', error)
      alert('Silme sırasında bir hata oluştu.')
    }
  }

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }))
  }

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((f, i) => i === index ? value : f)
    }))
  }

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  const toggleBot = (botId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedBots: prev.selectedBots.includes(botId)
        ? prev.selectedBots.filter(id => id !== botId)
        : [...prev.selectedBots, botId]
    }))
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Paket Yönetimi</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Yeni Paket
        </button>
      </div>

      {/* Plan Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(plan)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(plan.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <p className="text-gray-600 mb-4">{plan.description}</p>
            
            <div className="text-2xl font-bold text-gray-900 mb-4">
              ₺{plan.price.toLocaleString()}/ay
            </div>

            {/* Dahil edilen botlar */}
            {plan.bots && plan.bots.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                  <BotIcon className="h-4 w-4 mr-1" />
                  Dahil Edilen Botlar
                </h4>
                <div className="space-y-1">
                  {plan.bots.map((bot) => (
                    <div key={bot.id} className="text-sm text-gray-600">
                      • {bot.name}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Özellikler */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Özellikler</h4>
              <ul className="space-y-1">
                {plan.features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    • {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {editingPlan ? 'Paket Düzenle' : 'Yeni Paket Ekle'}
              </h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Paket Adı */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Paket Adı
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Açıklama */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Açıklama
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Fiyat */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fiyat (₺/ay)
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Botlar */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dahil Edilen Botlar
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-gray-200 rounded-md p-3">
                  {bots.map((bot) => (
                    <label key={bot.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.selectedBots.includes(bot.id)}
                        onChange={() => toggleBot(bot.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{bot.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Özellikler */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Özellikler
                </label>
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        placeholder="Özellik açıklaması"
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => removeFeature(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addFeature}
                    className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Özellik Ekle
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                İptal
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PlanManagement