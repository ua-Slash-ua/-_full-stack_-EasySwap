import config from '@payload-config'
import { getPayload } from 'payload'

export async function getPage(slug?: string, id?: string): Promise<any> {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { docs } = await payload.find({
    collection: 'pages',
    pagination: false,
  })

  if (slug) {
    return docs.find(doc => doc.slug === slug)
  } else if (id) {
    return docs.find(doc => doc.id === id)
  } else {
    return docs
  }
}

// ✅ правильний спосіб
export async function generateMetadata(slug?: string, id?: string) {
  const page = await getPage(slug,id)

  return {
    title: page?.meta?.title || 'Easy Swap 1',
    description: page?.meta?.description || 'Easy Swap desc',
  }
}
