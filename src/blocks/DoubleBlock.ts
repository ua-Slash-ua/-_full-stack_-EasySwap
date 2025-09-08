import type { Block } from 'payload'
import { PreviewSvg } from '@/plugin/sl_PreviewSvg'

export const DoubleBlock: Block = {
  slug: 'double-block',
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Показувати цей блок',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'why_we_the_best',
      type: 'group',
      required: true,
      label: 'Why we the best?',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
        },
        {
          name: 'why_point',
          type: 'array',
          label: 'Point',
          fields: [
            {
              name: 'why_icon',
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
            {
              name: 'why_description',
              type: 'textarea',
              required: true,
              localized: true,
              label: 'Description',
            },
          ],
        },
      ],
    },
    {
      name: 'what_do_you_get',
      type: 'group',
      required: true,
      label: 'What do you get?',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
        },
        {
          name: 'what_point',
          type: 'array',
          label: 'Point',
          fields: [
            {
              name: 'what_icon',
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
            {
              name: 'what_description',
              type: 'textarea',
              required: true,
              localized: true,
              label: 'Description',
            },
          ],
        },
      ],
    },
  ],
}
