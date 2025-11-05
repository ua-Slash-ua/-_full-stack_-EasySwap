'use server'

import config from 'next/config'
import { getPayload } from 'payload'

export type CurrencyRateItem = {
  id: string
  buy1000: number
  sell1000: number
  buy5000: number
  sell5000: number
  exchangeableWith: string[]
}

export async function saveCurrenciesRates(items: CurrencyRateItem[]) {
  try {
    if (!items || items.length === 0) return { success: false, error: 'No items provided' }

    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig as any })

    // Знаходимо гривню (UAN) для обчислення продажу
    const uanCurrency = await payload.find({
      collection: 'currencies',
      where: {
        code: {
          equals: 'UAN',
        },
      },
      limit: 1,
    })

    const uanBaseRates = uanCurrency.docs[0]?.baseRates

    // Функція для retry операції при WriteConflict помилках
    const updateWithRetry = async (
      item: CurrencyRateItem,
      sell1000: number,
      sell5000: number,
      retries = 3,
    ): Promise<{ success: boolean; id: string; error?: string }> => {
      for (let attempt = 0; attempt < retries; attempt++) {
        try {
          // Зберігаємо значення (якщо вони > 0, інакше null)
          // item.buy1000 та item.buy5000 вже в форматі збереження (обернений курс < 1)
          const updateData = {
            baseRates: {
              from_1000: {
                buy1000: item.buy1000 > 0 ? item.buy1000 : null,
                sell1000: sell1000 && sell1000 > 0 ? sell1000 : null,
              },
              from_5000: {
                buy5000: item.buy5000 > 0 ? item.buy5000 : null,
                sell5000: sell5000 && sell5000 > 0 ? sell5000 : null,
              },
            },
            exchangeableWith: item.exchangeableWith,
          }

          console.log(`Saving currency ${item.id}:`, updateData)

          await payload.update({
            collection: 'currencies',
            id: item.id,
            data: updateData,
          })

          // Перевіряємо, чи дані збереглися
          const updated = await payload.findByID({
            collection: 'currencies',
            id: item.id,
          })
          console.log(`Verified currency ${item.id} baseRates:`, updated.baseRates)
          console.log(`Verified currency ${item.id} exchangeableWith:`, updated.exchangeableWith)

          return { success: true, id: item.id }
        } catch (error: any) {
          // Якщо це WriteConflict помилка і є ще спроби - повторюємо
          if (error.code === 112 && attempt < retries - 1) {
            // Затримка перед повтором (експоненційна: 100ms, 200ms, 400ms)
            await new Promise(resolve => setTimeout(resolve, 100 * Math.pow(2, attempt)))
            continue
          }
          console.error(`Error saving currency ${item.id}:`, error)
          return { success: false, id: item.id, error: error.message }
        }
      }
      return { success: false, id: item.id, error: 'Max retries exceeded' }
    }

    // Виконуємо оновлення послідовно, але з retry для WriteConflict
    const results = []
    for (const item of items) {
      // Використовуємо значення sell з форми, якщо вони введені
      // Якщо не введені (0) - не зберігаємо їх (залишаємо null)
      const sell1000 = item.sell1000 && item.sell1000 > 0 ? item.sell1000 : null
      const sell5000 = item.sell5000 && item.sell5000 > 0 ? item.sell5000 : null

      // Оновлюємо з retry механізмом
      const result = await updateWithRetry(item, sell1000 || 0, sell5000 || 0)
      results.push(result)
    }

    return { success: true, results }
  } catch (error: any) {
    console.error('saveCurrenciesRates error:', error)
    return { success: false, error: error.message }
  }
}
