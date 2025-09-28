'use client'

import s from './TableCurrencies.module.css'
import TableLine from '@/plugin/sl_SimpleTableCurrencies/components/TableLine/TableLine'
import BtnSave from '@/plugin/sl_SimpleTableCurrencies/components/BtnSave/BtnSave'
import { useEffect, useState } from 'react'

export default function TableCurrencies({ currencies }: {
  currencies: {
    docs: any[]
  }
}) {
  const [currenciesItem, setCurrenciesItem] = useState<any[]>([])
  const currenciesNames = currenciesItem.map((currency: any) => ({
    name: currency.name,
    id: currency.id,
    code: currency.code,
    currency: currency.currency,
    ratesByCurrency: currency.ratesByCurrency,
  }))

  useEffect(() => {
    // console.log('currencies UPDATED')
    setCurrenciesItem(currencies.docs)
  },[currencies])

  return (
    <>
      <div className={s.table_container} id={'sl_table-container'}>
        <div className={s.table_info}>
          <TableLine key={'table-header'} dataType={'curr-name'} zeroItem={'Name'} tableLine={currenciesNames} editable={true} />
        </div>
        <div className={s.table_currencies}>
          {
            currenciesItem.map((currency: any, index: number) => (
              <TableLine
                key={`table-currencies-${index}`}
                zeroItem={currency}
                tableLine={currency.ratesByCurrency}
                editable={true}
                currenciesNames={currenciesNames}
                name={currency.name}
              />
            ))
          }

        </div>
      </div>

      <BtnSave />

    </>
  )
}