import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import Applications from '@/collections/Applications'
import categotyApplications from '@/collections/categories/categotyApplications'
import { Currencies } from '@/collections/Currencies'
import { Pages } from '@/collections/Pages'
import { Reviews } from '@/collections/Reviews'
import { CreateApp } from '@/endpoints/createApp'
import { Contacts } from '@/globals/Contacts'
import { CurrenciesRates } from '@/globals/CurrenciesRates'
import { CurrenciesSimple } from '@/globals/CurrenciesSimple'
import { Media } from './collections/Media'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Pages, Reviews, Currencies, Applications, categotyApplications],
  globals: [Contacts, CurrenciesSimple, CurrenciesRates],
  endpoints: [CreateApp],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    seoPlugin({
      collections: ['pages'],
      globals: ['site-settings'], // додайте це
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => {
        return doc?.title ? `${doc.title} — Easy Swap` : 'Easy Swap'
      },
      generateDescription: ({ doc }) => {
        return doc?.description || 'Default description'
      },
      generateURL: ({ doc, collectionSlug }) => {
        return doc?.slug
          ? `https://easy-swap.com/${collectionSlug}/${doc.slug}`
          : `https://easy-swap.com/${collectionSlug}`
      },
      tabbedUI: true,
    }),
  ],
})
