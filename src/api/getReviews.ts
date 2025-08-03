import { getPayload } from 'payload'
import config from 'next/config'

export async function getReviews() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig as any })

  return await payload.find({
    collection: 'reviews',
  })
}