'use client'
import { usePopup } from '@/context/PopupContext'
import CreateApplication from '@/components/PopUps/CreateApplication/CreateApplication'
import ExchangeApplication from '@/components/PopUps/ExchangeApplication/ExchangeApplication'
import ReviewImage from '@/components/PopUps/ReviewImage/ReviewImage'

export const PopupManager = () => {
  const { open, data  } = usePopup()
  console.log('Current popup:', open)

  switch (open) {
    case 'create_application':
      return <CreateApplication {...data}/>
    case 'exchange_application':
      return <ExchangeApplication {...data} />
    case 'review_image':
      return <ReviewImage {...data} />
    default:
      return null
  }
}
