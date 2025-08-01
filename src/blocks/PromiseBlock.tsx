import type { Block } from 'payload'
import { PreviewSvg } from '@/plugin/sl_PreviewSvg'

export const PromiseBlock: Block = {
  slug: 'promise-block',
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Показувати цей блок',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'word',
      type: 'text',
      required: true,
      label: 'Word',
    },
    {
      name: 'icon',
      type: 'textarea',
      required: true,
      localized: true,
      label: 'Icon',
      admin: {
        components: {
          Field: PreviewSvg,
        },
      },
    },
  ],
}
