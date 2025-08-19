'use client'
import { usePopup } from '@/context/PopupContext'
import CreateApplication from '@/components/PopUps/CreateApplication/CreateApplication'
import ExchangeApplication from '@/components/PopUps/ExchangeApplication/ExchangeApplication'

export const PopupManager = () => {
  const { open } = usePopup()
  console.log('Current popup:', open)

  switch (open) {
    case 'create_application':
      return <CreateApplication />
    case 'exchange_application':
      return <ExchangeApplication  />
    default:
      return null
  }
}
