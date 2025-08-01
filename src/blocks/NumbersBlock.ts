import type { Block } from 'payload'
import { PreviewSvg } from '@/plugin/sl_PreviewSvg'
import { StyledText } from '@/plugin/sl_StyledText'


export const NumbersBlock: Block = {
  slug: 'numbers-block',
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
      name: 'aside_icon',
      type: 'textarea',
      required: true,
      localized: true,
      label: 'Aside Icon',
      admin: {
        components: {
          Field: PreviewSvg,
        },
      },
    },
    {
      name:'aside_number',
      type: 'text',
      required: true,
      label: 'Aside Number',
    },
    {
      name:'aside_description',
      type: 'text',
      required: true,
      label: 'Aside Description',
    },
    {
      name:'cards',
      type:'array',
      label:'Cards',
      maxRows: 3,
      minRows: 3,
      fields:[
        {
          name:'card_title',
          type: 'text',
          required: true,
          label: 'Card Title',
        },
        {
          name:'card_number',
          type: 'text',
          required: true,
          label: 'Card Number',
        },
        {
          name:'card_description',
          type: 'textarea',
          required: true,
          label: 'Card Description',
        }
      ]
    }
  ],
}
