// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { seoPlugin } from '@payloadcms/plugin-seo'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from '@/collections/Pages'
import { Reviews } from '@/collections/Reviews'
import { Contacts } from '@/globals/Contacts'
import { Currencies } from '@/collections/Currencies'
import Applications from '@/collections/Applications'
import categotyApplications from '@/collections/categories/categotyApplications'
import { CreateApp } from '@/endpoints/createApp'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Pages,
    Reviews,
    Currencies,
    Applications,
    categotyApplications,
  ],
  globals: [Contacts],
  endpoints:[CreateApp,],
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
    })
  ],
})
