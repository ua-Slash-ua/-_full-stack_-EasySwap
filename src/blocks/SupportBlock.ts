import type { Block } from 'payload'
import { StyledText } from '@/plugin/sl_StyledText'

export const SupportBlock: Block = {
  slug: 'support-block',
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
      type: 'textarea',
      required: true,
      label: 'Title',
      admin: {
        components: {
          Field: StyledText,
        },
      },
    },
    {
      name:'description',
      type: 'textarea',
      required: true,
      label: 'Description',
    }
  ]
}