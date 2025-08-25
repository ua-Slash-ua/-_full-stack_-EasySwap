'use client'
import { usePopup } from '@/context/PopupContext'
import CreateApplication from '@/components/PopUps/CreateApplication/CreateApplication'
import ExchangeApplication from '@/components/PopUps/ExchangeApplication/ExchangeApplication'
import ReviewImage from '@/components/PopUps/ReviewImage/ReviewImage'
import CurrenciesInfo from '@/components/PopUps/CurrenciesInfo/CurrenciesInfo'
import MenuMobile from '@/components/PopUps/MenuMobile/MenuMobile'
import StatusSend from '@/components/PopUps/StatusSend/StatusSend'

export const PopupManager = () => {
  const { open, data  } = usePopup()
  console.log('Current popup:', open)

  switch (open) {
    case 'create_application':
      return <CreateApplication {...data} />
    case 'exchange_application':
      return <ExchangeApplication departments={data} />
    case 'review_image':
      return <ReviewImage {...data} />
    case 'currencies_info':
      return <CurrenciesInfo {...data} />
    case 'menu_mobile':
      return <MenuMobile {...data} />
    case 'status_send':
      return <StatusSend {...data} />
    default:
      return null
  }
}
