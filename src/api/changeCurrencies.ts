'use server'

import config from 'next/config'
import { getPayload } from 'payload'

export type RateItem = {
  id?: string | null
  currency: string
  from_1000: { buy1000: number; sell1000?: number }
  from_5000: { buy5000: number; sell5000?: number }
}

type ChangeCurrenciesHandlerProps = {
  id: string
  data: {
    name?: string
    ratesByCurrency?: RateItem[]
  }
}[]

export async function changeCurrenciesHandler(items: ChangeCurrenciesHandlerProps) {
  try {
    if (!items || items.length === 0) return { success: false, error: 'No items provided' }

    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig as any })

    // Крок 1: Збираємо всі курси з усіх валют
    const allRatesMap: { [key: string]: { buy1000: number; buy5000: number } } = {}

    for (const item of items) {
      if (item.data.ratesByCurrency) {
        for (const rate of item.data.ratesByCurrency) {
          if (rate.currency !== 'none') {
            // Ключ: "parentId->currencyId"
            const key = `${item.id}->${rate.currency}`
            allRatesMap[key] = {
              buy1000: rate.from_1000.buy1000,
              buy5000: rate.from_5000.buy5000,
            }
          }
        }
      }
    }

    const results = []

    // Крок 2: Обробляємо кожну валюту
    for (const item of items) {
      let result: any = { success: true, id: item.id }

      if (item.data.name) {
        await payload.update({
          collection: 'currencies',
          id: item.id,
          data: { name: item.data.name },
        })
      }

      if (item.data.ratesByCurrency && item.data.ratesByCurrency.length > 0) {
        const currentCurrency = await payload.findByID({
          collection: 'currencies',
          id: item.id,
        })

        let existingRates = currentCurrency.ratesByCurrency || []

        for (const rate of item.data.ratesByCurrency) {
          const currencyId = rate.currency

          const isEmpty = !rate.from_1000.buy1000 && !rate.from_5000.buy5000

          if (isEmpty && currencyId !== 'none') {
            existingRates = existingRates.filter((existingRate: any) => {
              const existingCurrencyId =
                typeof existingRate.currency === 'string'
                  ? existingRate.currency
                  : existingRate.currency.id
              return existingCurrencyId !== currencyId
            })
          } else if (!isEmpty && currencyId !== 'none') {
            const existingIndex = existingRates.findIndex((existingRate: any) => {
              const existingCurrencyId =
                typeof existingRate.currency === 'string'
                  ? existingRate.currency
                  : existingRate.currency.id
              return existingCurrencyId === currencyId
            })

            // Якщо продаж вказано вручну - використовуємо його, інакше обчислюємо автоматично
            let sell1000 = rate.from_1000.sell1000
            let sell5000 = rate.from_5000.sell5000

            // Якщо продаж не вказано - обчислюємо з зворотного курсу
            if (!sell1000 || sell1000 === 0) {
              const reverseKey = `${currencyId}->${item.id}`
              const reverseRate = allRatesMap[reverseKey] || { buy1000: 0, buy5000: 0 }
              sell1000 = reverseRate.buy1000
            }
            if (!sell5000 || sell5000 === 0) {
              const reverseKey = `${currencyId}->${item.id}`
              const reverseRate = allRatesMap[reverseKey] || { buy1000: 0, buy5000: 0 }
              sell5000 = reverseRate.buy5000
            }

            const rateWithMirror = {
              currency: currencyId,
              from_1000: {
                buy1000: rate.from_1000.buy1000,
                sell1000: sell1000,
              },
              from_5000: {
                buy5000: rate.from_5000.buy5000,
                sell5000: sell5000,
              },
            }

            if (existingIndex !== -1) {
              existingRates[existingIndex] = {
                ...existingRates[existingIndex],
                ...rateWithMirror,
              }
            } else {
              existingRates.push(rateWithMirror)
            }
          }
        }

        await payload.update({
          collection: 'currencies',
          id: item.id,
          data: {
            ratesByCurrency: existingRates,
          },
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
