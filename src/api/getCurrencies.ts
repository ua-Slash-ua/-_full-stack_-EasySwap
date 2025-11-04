import { getPayload } from 'payload'
import config from 'next/config'

export async function getCurrencies(sort: boolean = true) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig as any })

  const result = await payload.find({
    collection: 'currencies',
    limit: 100,
    depth: 2,
  })

  if (sort) {
    result.docs.sort((a: any, b: any) => a.order - b.order)
  }

  return result
}
