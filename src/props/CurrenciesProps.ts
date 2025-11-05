import { StaticImageData } from 'next/image'

export type RateByCurrency = {
  currency: {
    code: string
    icon: {
      alt: string
      url: string | StaticImageData // ✅
    }
    name: string
    createdAt: string
    updatedAt: string
    ratesByCurrency?: any[] // уточни, якщо є структура
    cat_date: string
    cat_type: string
    id: string
  }
  from_1000?: {
    buy1000?: number | string | null
    sell1000?: number | string | null
  }
  from_5000?: {
    buy5000?: number | string | null
    sell5000?: number | string | null
  }
  id: string
}

export type CurrencyMeta = {
  createdAt: string
  updatedAt: string
  code: string
  name: string
  icon: {
    alt: string
    url: string
  }
  ratesByCurrency?: RateByCurrency[] // масив курсів (стара структура)
  baseRates?: {
    from_1000?: { buy1000?: number | null; sell1000?: number | null }
    from_5000?: { buy5000?: number | null; sell5000?: number | null }
  } // нова структура - базові курси відносно гривні
  exchangeableWith?: string[] | any[] // валюти, з якими можна обміняти
  cat_date: string
  cat_type: string
  id: string
}

export type RateBlock1000 = {
  buy1000: number
  sell1000: number
}

export type RateBlock5000 = {
  buy5000: number
  sell5000: number
}

export type CurrencyRateItem = {
  currency: CurrencyMeta
  from_1000?: RateBlock1000
  from_5000?: RateBlock5000
  id: string
}

export type CurrUAN = CurrencyRateItem[]
