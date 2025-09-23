'use server'

import { getPayload } from 'payload'
import config from 'next/config'

type RateItem = {
  id?: string | null
  currency: string | { id: string } // або Payload об’єкт
  from_1000: { buy1000: number; sell1000: number }
  from_5000: { buy5000: number; sell5000: number }
}

type ChangeCurrenciesHandlerProps = {
  id: string
  data: {
    name: string
    ratesByCurrency?: RateItem[]
  }
}[]

export async function changeCurrenciesHandler(items: ChangeCurrenciesHandlerProps) {
  try {
    if (!items || items.length === 0) return { success: false, error: 'No items provided' }
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig as any })

    const results = []

    for (const item of items) {
      const updated = await payload.update({
        collection: 'currencies',
        id: item.id,
        data: { name: item.data.name },
      })
      results.push({ success: true, updated })
    }

    return results
  } catch (error: any) {
    console.error(error)
    return { success: false, error: error.message }
  }
}




