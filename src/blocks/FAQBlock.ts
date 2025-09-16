import type { Block } from 'payload'
import { PreviewSvg } from '@/plugin/sl_PreviewSvg'
import { StyledText } from '@/plugin/sl_StyledText'


export const FAQBlock: Block = {
  slug: 'faq-block',
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Показувати цей блок',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name:'elements',
      type:'array',
      label: 'Елемент',
      labels: {
        plural:'Елементи',
        singular:'Елемент'
      },
      fields:[
        {
          name:'question',
          type: 'text',
          required: true,
          label: 'Питання',
        },
        {
          name:'answer',
          type: 'text',
          required: true,
          label: 'Відповідь',
        },

      ]
    }
  ],
}
