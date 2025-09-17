import type { CollectionConfig } from 'payload'
import { NumbersBlock } from '@/blocks/NumbersBlock'
import { HeroBlock } from '@/blocks/HeroBlock'
import { PromiseBlock } from '@/blocks/PromiseBlock'
import { DoubleBlock } from '@/blocks/DoubleBlock'
import { ServiceBlock } from '@/blocks/ServiceBlock'
import { FAQBlock } from '@/blocks/FAQBlock'
import { SupportBlock } from '@/blocks/SupportBlock'
import { ReviewBlock } from '@/blocks/ReviewBlock'
import { ContactBlock } from '@/blocks/ContactBlock'
import { ApplicationBlock } from '@/blocks/ApplicationBlock'
import { CurrenciesBlock } from '@/blocks/CurrenciesBlock'
import { AccordionBlock } from '@/blocks/AccordionBlock'


export const Pages: CollectionConfig = {
  slug: 'pages',
  labels:{
    singular:'Сторінка',
    plural:'Сторінки',
  },
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
      type: 'textarea',
      localized: true,
      required: true,
      label: 'Заголовок',
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: 'Опис',
    },
    {
      type: 'blocks',
      name: 'blocks',
      blocks: [
        HeroBlock,
        NumbersBlock,
        PromiseBlock,
        DoubleBlock,
        ServiceBlock,
        CurrenciesBlock,
        FAQBlock,
        SupportBlock,
        ReviewBlock,
        ApplicationBlock,
        ContactBlock,
        AccordionBlock,
      ],
    },
  ],
}
