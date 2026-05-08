import React from 'react'
import { useTranslation } from 'react-i18next'

export default function AgentDashboard() {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">{t('agent')}</h1>
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Agent dashboard functionality to be implemented</p>
      </div>
    </div>
  )
}
