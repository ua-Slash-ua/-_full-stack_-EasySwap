'use server'

import { getPayload } from 'payload'
import config from 'next/config'

export type RateItem = {
  id?: string | null
  currency: string // Завжди string ID, а не об'єкт
  from_1000: { buy1000: number; sell1000: number }
  from_5000: { buy5000: number; sell5000: number }
}

type ChangeCurrenciesHandlerProps = {
  id: string
  data: {
    name?: string
    ratesByCurrency?: RateItem[]
  }
}[]

// Головна функція обробки
export async function changeCurrenciesHandler(items: ChangeCurrenciesHandlerProps) {
  try {
    if (!items || items.length === 0) return { success: false, error: 'No items provided' }

    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig as any })

    const results = []

    for (const item of items) {
      let result: any = { success: true, id: item.id }

      // Оновлюємо назву якщо потрібно
      if (item.data.name) {
        await payload.update({
          collection: 'currencies',
          id: item.id,
          data: { name: item.data.name }
        })
      }

      // Обробляємо ratesByCurrency якщо є
      if (item.data.ratesByCurrency && item.data.ratesByCurrency.length > 0) {
        // Отримуємо поточні дані валюти
        const currentCurrency = await payload.findByID({
          collection: 'currencies',
          id: item.id
        })

        let existingRates = currentCurrency.ratesByCurrency || []

        // Обробляємо кожен курс
        item.data.ratesByCurrency.forEach(rate => {
          const currencyId = rate.currency // Тепер завжди string

          // Перевіряємо чи поля пусті (для видалення)
          const isEmpty = !rate.from_1000.buy1000 && !rate.from_1000.sell1000 &&
            !rate.from_5000.buy5000 && !rate.from_5000.sell5000

          if (isEmpty && currencyId !== "none") {
            // Видаляємо курс
            existingRates = existingRates.filter((existingRate: any) => {
              const existingCurrencyId = typeof existingRate.currency === 'string'
                ? existingRate.currency
                : existingRate.currency.id
              return existingCurrencyId !== currencyId
            })
          } else if (!isEmpty && currencyId !== "none") {
            // Шукаємо існуючий курс
            const existingIndex = existingRates.findIndex((existingRate: any) => {
              const existingCurrencyId = typeof existingRate.currency === 'string'
                ? existingRate.currency
                : existingRate.currency.id
              return existingCurrencyId === currencyId
            })

            if (existingIndex !== -1) {
              // Оновлюємо існуючий курс
              existingRates[existingIndex] = {
                ...existingRates[existingIndex],
                from_1000: rate.from_1000,
                from_5000: rate.from_5000
              }
            } else {
              // Створюємо новий курс (без поля id)
              const newRate = {
                currency: currencyId, // використовуємо string ID замість об'єкта
                from_1000: rate.from_1000,
                from_5000: rate.from_5000
              }
              existingRates.push(newRate)
            }
          }
        })

        // Оновлюємо валюту з новими курсами
        await payload.update({
          collection: 'currencies',
          id: item.id,
          data: {
            ratesByCurrency: existingRates
          }
        })

        result.ratesProcessed = item.data.ratesByCurrency.length
      }

      results.push(result)
    }

    return { success: true, results }
  } catch (error: any) {
    console.error('changeCurrenciesHandler error:', error)
    return { success: false, error: error.message }
  }
}