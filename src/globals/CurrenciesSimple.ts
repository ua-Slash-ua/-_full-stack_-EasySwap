import { SimpleTableCurrencies } from '@/plugin/sl_SimpleTableCurrencies'
import { GlobalConfig } from 'payload'

export const CurrenciesSimple: GlobalConfig = {
  slug: 'currencies-simple',
  label: 'Валюти (Скорочено)',
  admin: {
    hidden: true, // Приховуємо з адмін-панелі
  },
  fields: [
    {
      name: 'currencies_table',
      label: 'Currencies Table',
      type: 'textarea',
      admin: {
        components: {
          Field: SimpleTableCurrencies,
        },
      },
    },
  ],
}
