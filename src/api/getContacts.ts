import { getPayload } from 'payload'
import config from 'next/config'

export async function getContacts() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig as any })

  return await payload.findGlobal({
    slug: 'contacts',
  })
}