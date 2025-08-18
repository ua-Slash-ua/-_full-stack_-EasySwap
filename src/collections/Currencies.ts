import { CollectionConfig } from 'payload'
import { PreviewSvg } from '@/plugin/sl_PreviewSvg'

export const Currencies: CollectionConfig = {
  slug: 'currencies',

  labels: {
    singular: 'Валюта',
    plural: 'Валюти',
  },
  admin: {
    useAsTitle: 'name', // показувати в заголовку код валюти
    defaultColumns: ['code', 'name', 'symbol'],
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'code',
      label: 'Код (наприклад, USD)',
      type: 'text',
      required: true,
      unique: false,
    },
    {
      name: 'name',
      label: 'Назва (наприклад, Долар США)',
      type: 'text',
      required: true,
    },
    {
      name: 'cat_type',
      label: 'Тип',
      type: 'select',
      required: true,
      defaultValue: 'fiat',
      options: [
        { label: 'Фіат', value: 'fiat' },
        { label: 'Криптовалюта', value: 'crypto' },
      ],
    },
    {
      name: 'cat_date',
      label: 'Старість',
      type: 'select',
      required: true,
      defaultValue: 'standard',
      options: [
        { label: 'Стандарт', value: 'standard' },
        { label: 'Нова', value: 'new' },
        { label: 'Стара', value: 'old' },
      ],
    },
    {
      name: 'icon',
      localized: true,
      relationTo:'media',
      required:true,
      label: 'Icon',
      type:'upload'

    },
    // {
    //   name: 'icon',
    //   type: 'textarea',
    //   localized: true,
    //   label: 'Icon',
    //   admin: {
    //     components: {
    //       Field: PreviewSvg,
    //     },
    //   },
    // },
    {
      name: 'ratesByCurrency',
      label: 'Курси по валютах',
      type: 'array',
      labels: {
        singular: 'Курс',
        plural: 'Курси',
      },
      fields: [
        {
          name: 'currency',
          label: 'Валюта',
          type: 'relationship',
          relationTo: 'currencies',
          required: true,
        },
        {
          name: 'from_1000',
          label: 'Від 1000',
          type: 'group',
          fields: [
            {
              name: 'buy1000',
              label: 'Купівля ',
              type: 'number',
              required: true,
            },
            {
              name: 'sell1000',
              label: 'Продаж ',
              type: 'number',
              required: true,
            },
          ],
        },
        {
          name: 'from_5000',
          label: 'Від 5000',
          type: 'group',
          fields: [
            {
              name: 'buy5000',
              label: 'Купівля ',
              type: 'number',
              required: true,
            },
            {
              name: 'sell5000',
              label: 'Продаж ',
              type: 'number',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
