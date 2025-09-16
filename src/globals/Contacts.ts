import { GlobalConfig } from 'payload'
import { PreviewSvg } from '@/plugin/sl_PreviewSvg'

export const Contacts: GlobalConfig = {
  slug: 'contacts',
  label: 'Контакти',
  fields: [
    {
      name: 'phone',
      label: 'Телефон',
      type: 'text',
    },
    {
      name: 'footer_words',
      label: 'Слова',
      type: 'group',
      fields: [
        {
          name: 'word_1',
          label: 'Слово 1',
          type: 'text',
          required:true
        },
        {
          name: 'word_2',
          label: 'Слово 2',
          type: 'text',
          required:true
        },
        {
          name: 'word_3',
          label: 'Слово 3',
          type: 'text',
          required:true
        },
      ],
    },

    {
      name: 'social_networks',
      label: 'Соціальні мережі',
      type: 'group',
      fields: [
        {
          name: 'telegram',
          label: 'Телеграм',
          type: 'group',
          fields: [
            {
              name: 'footer_icon',
              label: 'Зображення у футері',
              type: 'textarea',
              admin: {
                components: {
                  Field: PreviewSvg,
                },
              },
            },
            {
              name: 'location_icon',
              label: 'Зображення в контактах',
              type: 'textarea',
              admin: {
                components: {
                  Field: PreviewSvg,
                },
              },
            },
            {
              name: 'link',
              label: 'Посилання',
              type: 'text',
            },
          ],
        },
        {
          name: 'instagram',
          label: 'Instagram',
          type: 'group',
          fields: [
            {
              name: 'footer_icon',
              label: 'Зображення у футері',
              type: 'textarea',
              admin: {
                components: {
                  Field: PreviewSvg,
                },
              },
            },
            {
              name: 'location_icon',
              label: 'Зображення в контактах',
              type: 'textarea',
              admin: {
                components: {
                  Field: PreviewSvg,
                },
              },
            },
            {
              name: 'link',
              label: 'Посилання',
              type: 'text',
            },
          ],
        },
        {
          name: 'tik_tok',
          label: 'TikTok',
          type: 'group',
          fields: [
            {
              name: 'footer_icon',
              label: 'Зображення у футері',
              type: 'textarea',
              admin: {
                components: {
                  Field: PreviewSvg,
                },
              },
            },
            {
              name: 'location_icon',
              label: 'Зображення в контактах',
              type: 'textarea',
              admin: {
                components: {
                  Field: PreviewSvg,
                },
              },
            },
            {
              name: 'link',
              label: 'Посилання',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'locations',
      label: 'Локації',
      labels: {
        plural:'Локації',
        singular:'Локація'
      },
      type: 'array',
      fields: [
        {
          name: 'is_location',
          type: 'checkbox',
          label: 'Is Location',
          defaultValue: false,
        },

        {
          name: 'address',
          label: 'Адреса',
          type: 'text',
        },
        {
          name: 'description',
          label: 'Опис',
          type: 'text',
        },
        {
          name: 'schedule',
          label: 'Графік роботи',
          type: 'text',
        },
        {
          name: 'phone',
          label: 'Телефон',
          type: 'text',
        },
        {
          name: 'coords',
          label: 'Координати',
          type: 'point',
        },
      ],
    },
  ],
}
