'use client'

import BtnSave from '@/plugin/sl_SimpleTableCurrencies/components/BtnSave/BtnSave'
import TableLine from '@/plugin/sl_SimpleTableCurrencies/components/TableLine/TableLine'
import { useEffect, useState } from 'react'
import s from './TableCurrencies.module.css'

export default function TableCurrencies({
  currencies,
}: {
  currencies: {
    docs: any[]
  }
}) {
  const [currenciesItem, setCurrenciesItem] = useState<any[]>([])
  const [currenciesNames, setCurrenciesNames] = useState<any[]>([])

  useEffect(() => {
    // Сортуємо валюти: UAN (гривня) остання
    const sortedCurrencies = [...currencies.docs].sort((a, b) => {
      const aIsUAN = a.code === 'UAN' || a.name?.toLowerCase().includes('гривн')
      const bIsUAN = b.code === 'UAN' || b.name?.toLowerCase().includes('гривн')

      if (aIsUAN && !bIsUAN) return 1 // UAN йде в кінець
      if (!aIsUAN && bIsUAN) return -1 // UAN йде в кінець
      return 0 // Інші залишаються на місці
    })

    const names = sortedCurrencies.map((currency: any) => ({
      name: currency.name,
      id: currency.id,
      code: currency.code,
      currency: currency.currency,
      ratesByCurrency: currency.ratesByCurrency,
    }))

    setCurrenciesItem(sortedCurrencies)
    setCurrenciesNames(names)
  }, [currencies])

  return (
    <>
      <div className={s.table_container} id={'sl_table-container'}>
        <div className={s.table_info}>
          <TableLine
            key={'table-header'}
            dataType={'curr-name'}
            zeroItem={'Name'}
            tableLine={currenciesNames}
            editable={true}
          />
        </div>
        <div className={s.table_currencies}>
          {currenciesItem.map((currency: any, index: number) => (
            <TableLine
              key={`table-currencies-${index}`}
              zeroItem={currency}
              tableLine={currency.ratesByCurrency}
              editable={true}
              currenciesNames={currenciesNames}
              name={currency.name}
            />
          ))}
        </div>
      </div>

      <BtnSave />
    </>
  )
}
