import { CollectionConfig } from 'payload';

const Applications: CollectionConfig = {
  slug: 'applications',
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
      name: 'email',
      type: 'email',
      required: true,
      admin: {
        readOnly: true, // 🔒 нередаговане поле
      },
    },
    {
      name: 'telegramNick',
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'meta',
      type: 'array',
      label: 'Мета-дані',
      admin: {
        readOnly: true,
      },
      fields: [
        {
          name: 'key',
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'value',
          type: 'text',
          admin: { width: '50%' },
        },
      ],
    },
  ],
};

export default Applications;
