import { GlobalConfig } from 'payload'
import { PreviewSvg } from '@/plugin/sl_PreviewSvg'

export const Contacts: GlobalConfig = {
  slug: 'contacts',
  label: 'Contacts',
  fields: [
    {
      name: 'phone',
      label: 'Телефон',
      type: 'text',
    },
    {
      name: 'social_networks',
      label: 'Social Networks',
      type: 'group',
      fields: [
        {
          name: 'instagram',
          label: 'Instagram',
          type: 'group',
          fields: [
            {
              name: 'footer_icon',
              label: 'Icon in footer',
              type: 'textarea',
              admin:{
                components: {
                  Field: PreviewSvg,
                }
              }
            },
            {
              name: 'location_icon',
              label: 'Icon in location',
              type: 'textarea',
              admin:{
                components: {
                  Field: PreviewSvg,
                }
              }
            },
            {
              name: 'link',
              label: 'Link',
              type: 'text',
            }

          ],
        },
        {
          name: 'telegram',
          label: 'Telegram',
          type: 'group',
          fields: [
            {
              name: 'footer_icon',
              label: 'Icon in footer',
              type: 'textarea',
              admin:{
                components: {
                  Field: PreviewSvg,
                }
              }
            },
            {
              name: 'location_icon',
              label: 'Icon in location',
              type: 'textarea',
              admin:{
                components: {
                  Field: PreviewSvg,
                }
              }
            },
            {
              name: 'link',
              label: 'Link',
              type: 'text',
            }

          ],
        },
        {
          name: 'tik_tok',
          label: 'TikTok',
          type: 'group',
          fields: [
            {
              name: 'footer_icon',
              label: 'Icon in footer',
              type: 'textarea',
              admin:{
                components: {
                  Field: PreviewSvg,
                }
              }
            },
            {
              name: 'location_icon',
              label: 'Icon in location',
              type: 'textarea',
              admin:{
                components: {
                  Field: PreviewSvg,
                }
              }
            },
            {
              name: 'link',
              label: 'Link',
              type: 'text',
            }

          ],
        },
        {
          name: 'locations',
          label:'Locations',
          type:'array',
          fields:[
            {
              name:'address',
              label: 'Location Address',
              type: 'text',
            },
            {
              name:'description',
              label: 'Location Description',
              type: 'text',
            },
            {
              name:'schedule',
              label: 'Location Schedule',
              type: 'text',
            },
            {
              name:'phone',
              label: 'Location Phone',
              type: 'text',
            },
            {
              name:'coords',
              label: 'Location Coordinates',
              type: 'point',
            },
          ]
        }
      ],
    },
  ],
}
