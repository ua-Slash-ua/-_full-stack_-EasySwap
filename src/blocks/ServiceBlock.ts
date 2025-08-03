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
      name: 'aside_title',
      type: 'textarea',
      required: true,
      localized: true,
      label: 'Aside Title',
      admin: {
        components: {
          Field: StyledText,
        },
      },
    },

    {
      name:'services',
      type:'array',
      label:'Services',
      fields:[
        {
          name:'service_title',
          type: 'text',
          required: true,
          label: 'Service Title',
        },
        {
          name: 'service_icon',
          type: 'textarea',
          required: true,
          localized: true,
          label: 'Service Icon',
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
          label: 'How does it work?',
          fields:[
            {
              name:'how_does_it_work_description',
              type: 'text',
              label: 'How does it work -- Description',
            }
          ]
        },
        {
          name:'features',
          type: 'array',
          required: true,
          label: 'Features',
          fields:[
            {
              name:'features_description',
              type: 'text',
              label: 'Features -- Description',
            }
          ]
        }
      ]
    }
  ],
}
