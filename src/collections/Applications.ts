import { CollectionConfig } from 'payload'

const Applications: CollectionConfig = {
  slug: 'applications',
  labels: { plural: 'Заявки', singular: 'Заявки' },
  admin: {
    useAsTitle: 'telegramNick',
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => false, // ❌ заборонити редагування
    delete: () => false,
  },
  fields: [
    {
      name: 'requestCategory',
      type: 'relationship',
      relationTo: 'request-categories',
      required: false,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'phone',
      type: 'text',
      admin: {
        readOnly: true, // 🔒 нередаговане поле
      },
      label: 'Телефон',
    },
    {
      name: 'telegramNick',
      type: 'text',
      admin: {
        readOnly: true,
      },
      label: 'Телеграм',
    },
    {
      name: 'meta',
      type: 'array',
      label: 'Мета-дані',
      admin: {
        readOnly: true,
      },
      labels:{
        plural:'Мета дані',
        singular:'Полу',

      },
      fields: [
        {
          name: 'key',
          type: 'text',
          required: true,
          admin: { width: '50%' },
          label:'Назва'
        },
        {
          name: 'value',
          type: 'text',
          admin: { width: '50%' },
          label:'Значення'
        },
      ],
    },
  ],
}

export default Applications
