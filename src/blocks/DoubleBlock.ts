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
      label: 'Чому ми кращі?',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Заголовок',
        },
        {
          name: 'why_point',
          type: 'array',
          label: 'Пункти',
          labels: {
            plural:'Пункти',
            singular:'Пункт'
          },
          fields: [
            {
              name: 'why_icon',
              type: 'textarea',
              required: true,
              localized: true,
              label: 'Зображення',
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
              label: 'Опис',
            },
          ],
        },
      ],
    },
    {
      name: 'what_do_you_get',
      type: 'group',
      required: true,
      label: 'Що ви отримуєте?',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Заголовок',
        },
        {
          name: 'what_point',
          type: 'array',
          label: 'Пункти',
          labels: {
            plural:'Пункти',
            singular:'Пункт'
          },
          fields: [
            {
              name: 'what_icon',
              type: 'textarea',
              required: true,
              localized: true,
              label: 'Зображення',
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
              label: 'Опис',
            },
          ],
        },
      ],
    },
  ],
}
