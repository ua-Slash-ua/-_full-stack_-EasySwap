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
      name: 'footer_words',
      label: 'Footer Words',
      type: 'group',
      fields: [
        {
          name: 'word_1',
          label: 'Word 1',
          type: 'text',
          required:true
        },
        {
          name: 'word_2',
          label: 'Word 2',
          type: 'text',
          required:true
        },
        {
          name: 'word_3',
          label: 'Word 3',
          type: 'text',
          required:true
        },
      ],
    },

    {
      name: 'social_networks',
      label: 'Social Networks',
      type: 'group',
      fields: [
        {
          name: 'telegram',
          label: 'Telegram',
          type: 'group',
          fields: [
            {
              name: 'footer_icon',
              label: 'Icon in footer',
              type: 'textarea',
              admin: {
                components: {
                  Field: PreviewSvg,
                },
              },
            },
            {
              name: 'location_icon',
              label: 'Icon in location',
              type: 'textarea',
              admin: {
                components: {
                  Field: PreviewSvg,
                },
              },
            },
            {
              name: 'link',
              label: 'Link',
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
              label: 'Icon in footer',
              type: 'textarea',
              admin: {
                components: {
                  Field: PreviewSvg,
                },
              },
            },
            {
              name: 'location_icon',
              label: 'Icon in location',
              type: 'textarea',
              admin: {
                components: {
                  Field: PreviewSvg,
                },
              },
            },
            {
              name: 'link',
              label: 'Link',
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
              label: 'Icon in footer',
              type: 'textarea',
              admin: {
                components: {
                  Field: PreviewSvg,
                },
              },
            },
            {
              name: 'location_icon',
              label: 'Icon in location',
              type: 'textarea',
              admin: {
                components: {
                  Field: PreviewSvg,
                },
              },
            },
            {
              name: 'link',
              label: 'Link',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'locations',
      label: 'Locations',
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
          label: 'Location Address',
          type: 'text',
        },
        {
          name: 'description',
          label: 'Location Description',
          type: 'text',
        },
        {
          name: 'schedule',
          label: 'Location Schedule',
          type: 'text',
        },
        {
          name: 'phone',
          label: 'Location Phone',
          type: 'text',
        },
        {
          name: 'coords',
          label: 'Location Coordinates',
          type: 'point',
        },
      ],
    },
  ],
}
