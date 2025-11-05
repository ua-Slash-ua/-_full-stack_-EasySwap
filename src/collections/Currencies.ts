import { CollectionConfig } from 'payload'

export const Currencies: CollectionConfig = {
  slug: 'currencies',

  labels: {
    singular: 'Валюта',
    plural: 'Валюти',
  },
  admin: {
    useAsTitle: 'name', // показувати в заголовку код валюти
    defaultColumns: ['code', 'name', 'symbol', 'order'],
    listSearchableFields: ['code', 'name'],
    pagination: {
      defaultLimit: 50,
    },
  },
  defaultSort: 'order', // від меншого до більшого
  fields: [
    {
      name: 'code',
      label: 'Код (наприклад, USD)',
      type: 'text',
      required: true,
      unique: false,
    },
    {
      name: 'order',
      label: '🔢 Порядок',
      type: 'number',
      required: true,
      defaultValue: 100,
      admin: {
        position: 'sidebar',
        description: 'Чим менше число — тим вище в списку',
        step: 1,
      },
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
      relationTo: 'media',
      required: true,
      label: 'Icon',
      type: 'upload',
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
      name: 'baseRates',
      label: 'Базові курси (відносно гривні)',
      type: 'group',
      admin: {
        description: 'Курси цієї валюти відносно гривні (UAN). Продаж обчислюється автоматично.',
      },
      fields: [
        {
          name: 'from_1000',
          label: 'Від 1000',
          type: 'group',
          fields: [
            {
              name: 'buy1000',
              label: 'Купівля',
              type: 'number',
              admin: {
                description: 'Курс купівлі від 1000 UAN',
              },
            },
            {
              name: 'sell1000',
              label: 'Продаж (автоматично)',
              type: 'number',
              admin: {
                readOnly: true,
                description: 'Обчислюється автоматично',
              },
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
              label: 'Купівля',
              type: 'number',
              admin: {
                description: 'Курс купівлі від 5000 UAN',
              },
            },
            {
              name: 'sell5000',
              label: 'Продаж (автоматично)',
              type: 'number',
              admin: {
                readOnly: true,
                description: 'Обчислюється автоматично',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'exchangeableWith',
      label: 'Доступні пари для обміну',
      type: 'relationship',
      relationTo: 'currencies',
      hasMany: true,
      admin: {
        description: 'Виберіть валюти, з якими можна обміняти цю валюту (крім гривні)',
      },
    },
    {
      name: 'ratesByCurrency',
      label: 'Курси по валютах (стара структура)',
      type: 'array',
      labels: {
        singular: 'Курс',
        plural: 'Курси',
      },
      admin: {
        description: 'Стара структура курсів. Використовується для сумісності.',
        condition: data => !data.baseRates, // Показувати тільки якщо немає baseRates
      },

      fields: [
        {
          name: 'currency',
          label: 'Валюта',
          type: 'relationship',
          relationTo: 'currencies',
          required: true,
          admin: {
            isSortable: true,
          },
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
