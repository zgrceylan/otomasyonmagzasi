import React from 'react'
import { CheckCircle, Star, Bot } from 'lucide-react'
import { motion } from 'framer-motion'
import { Plan } from '../../types/database'

interface PlanCardProps {
  plan: Plan
  onSelect: (planId: string) => void
  isSelected?: boolean
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, onSelect, isSelected }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative bg-white rounded-lg shadow-sm border-2 transition-all duration-300 ${
        isSelected 
          ? 'border-blue-500 shadow-lg' 
          : plan.sort_order === 2 // Growth paketi en popüler
            ? 'border-blue-200' 
            : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      {plan.sort_order === 2 && (
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-2">
          <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <Star className="h-4 w-4 mr-1" />
            En Popüler
          </div>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
          <div className="text-right">
            <span className="text-3xl font-bold text-gray-900">₺{plan.price.toLocaleString()}</span>
            <span className="text-gray-500 ml-1">/ay</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6">{plan.description}</p>
        
        {/* Dahil edilen botlar */}
        {plan.bots && plan.bots.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
              <Bot className="h-4 w-4 mr-2" />
              Dahil Edilen Botlar
            </h4>
            <div className="space-y-2">
              {plan.bots.map((bot) => (
                <div key={bot.id} className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span>{bot.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Özellikler */}
        <ul className="space-y-3 mb-6">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        
        <button
          onClick={() => onSelect(plan.id)}
          className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
            isSelected
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : plan.sort_order === 2
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {isSelected ? 'Seçildi' : 'Paketi Seç'}
        </button>
      </div>
    </motion.div>
  )
}

export default PlanCard