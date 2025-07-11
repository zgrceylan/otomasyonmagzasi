import React from 'react'
import { Link } from 'react-router-dom'
import { Bot, Zap, Shield, Globe, ArrowRight, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: Bot,
      title: 'Akıllı Otomasyon',
      description: 'Instagram, WhatsApp ve e-posta hesaplarınızı güçlü otomasyon iş akışlarına bağlayın.'
    },
    {
      icon: Zap,
      title: 'Yıldırım Hızı',
      description: 'Otomasyon botlarınızı saatler değil, saniyeler içinde dağıtın ve etkinleştirin.'
    },
    {
      icon: Shield,
      title: 'Güvenli ve Güvenilir',
      description: 'Kurumsal düzeyde güvenlik ve %99.9 çalışma süresi garantisi.'
    },
    {
      icon: Globe,
      title: 'Küresel Ölçek',
      description: 'Otomasyonunuzu birden fazla platform ve bölgede ölçeklendirin.'
    }
  ]

  const plans = [
    {
      name: 'Başlangıç',
      price: 5000,
      features: [
        'Data Collector',
        'CRM Bot',
        'Temel analitik',
        'E-posta desteği'
      ]
    },
    {
      name: 'Büyüme',
      price: 12000,
      features: [
        'Başlangıç + Meeting Summarizer',
        'Instagram DM',
        'Support Bot',
        'Gelişmiş analitik',
        'Öncelikli destek'
      ],
      popular: true
    },
    {
      name: 'Kurumsal',
      price: 25000,
      features: [
        'Büyüme + Lead Generator',
        'Email Responder',
        'WhatsApp Bot',
        'Google Maps Data Collector',
        '7/24 destek'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">İş Süreçlerinizi</span>
                  <span className="block text-blue-600">Otomatikleştirin</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  Instagram, WhatsApp ve e-posta otomasyonlarını güçlü n8n iş akışlarıyla bağlayın. 
                  7 günlük ücretsiz deneme sürümünüzü başlatın ve otomasyonun geleceğini deneyimleyin.
                </p>
                <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                  <Link
                    to="/auth/signup"
                    className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors"
                  >
                    Ücretsiz Deneme Başlat
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <p className="mt-3 text-sm text-gray-500">
                    Kredi kartı gerekmez • 7 günlük ücretsiz deneme
                  </p>
                </div>
              </motion.div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md"
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
                  <div className="flex items-center justify-between mb-6">
                    <Bot className="h-8 w-8" />
                    <span className="text-sm font-medium">Otomasyon Mağazası</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-sm">Instagram botu etkinleştirildi</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-sm">WhatsApp otomasyonu çalışıyor</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-sm">E-posta dizileri dağıtıldı</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Neden Otomasyon Mağazası?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Modern işletmeler için en güçlü otomasyon platformu
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center">
                  <feature.icon className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Basit, Şeffaf Fiyatlandırma
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              İşletmeniz için doğru planı seçin
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative bg-white rounded-lg shadow-lg overflow-hidden ${
                  plan.popular ? 'ring-2 ring-blue-600' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 text-sm font-medium">
                    En Popüler
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold text-gray-900">₺{plan.price.toLocaleString()}</span>
                    <span className="text-base text-gray-500 ml-1">/ay</span>
                  </div>
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-base text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Link
                      to="/auth/signup"
                      className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-base font-medium transition-colors ${
                        plan.popular
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Başla
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Otomatikleştirmeye hazır mısınız?</span>
            <span className="block text-blue-200">Ücretsiz deneme sürümünüzü bugün başlatın.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/auth/signup"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors"
              >
                Ücretsiz Deneme Başlat
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage