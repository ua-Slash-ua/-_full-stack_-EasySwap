import type { Block } from 'payload'
import { PreviewSvg } from '@/plugin/sl_PreviewSvg'
import { StyledText } from '@/plugin/sl_StyledText'


export const ServiceBlock: Block = {
  slug: 'service-block',
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Показувати цей блок',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name:'services',
      type:'array',
      labels:{
        singular:'Сервіс',
        plural:'Сервіси'
      },
      fields:[
        {
          name:'service_title',
          type: 'text',
          required: true,
          label: 'Заголовок',
        },
        {
          name: 'service_icon',
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
          name:'how_does_it_work',
          type: 'array',
          required: true,
          label: 'Як це працює?',
          labels: {
            plural:'Пункти',
            singular:'Пункт'
          },
          fields:[
            {
              name:'how_does_it_work_description',
              type: 'text',
              label: 'Опис',
            }
          ]
        },
        {
          name:'features',
          type: 'array',
          required: true,
          label: 'Особливості',
          labels: {
            plural:'Пункти',
            singular:'Пункт'
          },
          fields:[
            {
              name:'features_description',
              type: 'text',
              label: 'Опис',
            }
          ]
        }
      ]
    }
  ],
}
