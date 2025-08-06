import type { Block } from 'payload'

export const CurrenciesBlock: Block = {
  slug: 'currencies-block',
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Показувати цей блок',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
  ],
}
