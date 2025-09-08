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
      name:'description',
      type: 'textarea',
      required: true,
      label: 'Description',
    }
  ]
}