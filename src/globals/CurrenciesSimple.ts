import { GlobalConfig } from 'payload'
import { SimpleTableCurrencies } from '@/plugin/sl_SimpleTableCurrencies'

export const CurrenciesSimple:GlobalConfig = {
  slug: 'currencies-simple',
  label: 'Валюти (Скорочено)',
  fields: [
    {
      name:'currencies_table',
      label:'Currencies Table',
      type:'textarea',
      admin:{
        components:{
          Field:SimpleTableCurrencies
        }
      }
    }
  ]
}