import type { CollectionConfig } from 'payload'
import { NumbersBlock } from '@/blocks/NumbersBlock'
import { HeroBlock } from '@/blocks/HeroBlock'
import { PromiseBlock } from '@/blocks/PromiseBlock'


export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value)
              return value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            if (data?.title) {
              return data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      localized: true,
    },
    {
      type: 'blocks',
      name: 'blocks',
      blocks: [
        HeroBlock,
        NumbersBlock,
        PromiseBlock,
      ],
    },
  ],
}
