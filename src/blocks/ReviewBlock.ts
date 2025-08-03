import type { Block } from 'payload'
import { PreviewSvg } from '@/plugin/sl_PreviewSvg'

export const ReviewBlock: Block = {
  slug: 'review-block',
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Показувати цей блок',
      defaultValue: true,
      admin: { position: 'sidebar' },
    }
  ]}