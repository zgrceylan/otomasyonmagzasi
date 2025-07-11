import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Bot } from '../../types/database'
import { Plus, Edit, Trash2, Save, X } from 'lucide-react'
import { motion } from 'framer-motion'

const BotManagement: React.FC = () => {
  const [bots, setBots] = useState<Bot[]>([])
  const [loading, setLoading] = useState(true)
  const [editingBot, setEditingBot] = useState<Bot | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    workflow_id: ''
  })

  const categories = [
    'Veri İşleme',
    'CRM',
    'Üretkenlik',
    'Sosyal Medya',
    'Müşteri Hizmetleri',
    'Satış',
    'E-posta',
    'Mesajlaşma'
  ]

  useEffect(() => {
    fetchBots()
  }, [])

  const fetchBots = async () => {
    try {
      const { data, error } = await supabase
        .from('bots')
        .select('*')
        .order('name')

      if (error) throw error
      setBots(data || [])
    } catch (error) {
      console.error('Botlar yüklenirken hata:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (bot: Bot) => {
    setEditingBot(bot)
    setFormData({
      name: bot.name,
      description: bot.description || '',
      category: bot.category || '',
      workflow_id: bot.workflow_id || ''
    })
    setShowAddForm(true)
  }

  const handleAdd = () => {
    setEditingBot(null)
    setFormData({
      name: '',
      description: '',
      category: '',
      workflow_id: ''
    })
    setShowAddForm(true)
  }

  const handleSave = async () => {
    try {
      const botData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        workflow_id: formData.workflow_id || null
      }

      if (editingBot) {
        // Güncelle
        const { error } = await supabase
          .from('bots')
          .update(botData)
          .eq('id', editingBot.id)

        if (error) throw error
      } else {
        // Yeni ekle
        const { error } = await supabase
          .from('bots')
          .insert(botData)

        if (error) throw error
      }

      await fetchBots()
      setShowAddForm(false)
      setEditingBot(null)
    } catch (error) {
      console.error('Kaydetme hatası:', error)
      alert('Kaydetme sırasında bir hata oluştu.')
    }
  }

  const handleDelete = async (botId: string) => {
    if (!confirm('Bu botu silmek istediğinizden emin misiniz?')) return

    try {
      const { error } = await supabase
        .from('bots')
        .delete()
        .eq('id', botId)

      if (error) throw error

      await fetchBots()
    } catch (error) {
      console.error('Silme hatası:', error)
      alert('Silme sırasında bir hata oluştu.')
    }
  }

  const toggleStatus = async (bot: Bot) => {
    try {
      const { error } = await supabase
        .from('bots')
        .update({ is_active: !bot.is_active })
        .eq('id', bot.id)

      if (error) throw error

      await fetchBots()
    } catch (error) {
      console.error('Durum güncelleme hatası:', error)
      alert('Durum güncellenirken bir hata oluştu.')
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Bot Yönetimi</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Yeni Bot
        </button>
      </div>

      {/* Bot Listesi */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bot Adı
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kategori
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Açıklama
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Durum
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bots.map((bot) => (
              <motion.tr
                key={bot.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{bot.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {bot.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs truncate">
                    {bot.description}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleStatus(bot)}
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      bot.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {bot.is_active ? 'Aktif' : 'Pasif'}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(bot)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(bot.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {editingBot ? 'Bot Düzenle' : 'Yeni Bot Ekle'}
              </h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Bot Adı */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bot Adı
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Kategori */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kategori
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Kategori seçin</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
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

              {/* Workflow ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Workflow ID (Opsiyonel)
                </label>
                <input
                  type="text"
                  value={formData.workflow_id}
                  onChange={(e) => setFormData(prev => ({ ...prev, workflow_id: e.target.value }))}
                  placeholder="n8n workflow ID"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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

export default BotManagement