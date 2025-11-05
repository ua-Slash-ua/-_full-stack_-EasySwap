import { SimpleTableCurrenciesRates } from '@/plugin/sl_SimpleTableCurrenciesRates'
import { GlobalConfig } from 'payload'

export const CurrenciesRates: GlobalConfig = {
  slug: 'currencies-rates',
  label: 'Курси валют',
  fields: [
    {
      name: 'currencies_rates_table',
      label: 'Таблиця курсів',
      type: 'textarea',
      admin: {
        components: {
          Field: SimpleTableCurrenciesRates,
        },
      },
    },
  ],
}
