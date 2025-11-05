'use client'

import BtnSaveRates from '@/plugin/sl_SimpleTableCurrenciesRates/components/BtnSaveRates/BtnSaveRates'
import TableLineRates from '@/plugin/sl_SimpleTableCurrenciesRates/components/TableLineRates/TableLineRates'
import { useEffect, useState } from 'react'
import s from './TableCurrenciesRates.module.css'

export default function TableCurrenciesRates({
  currencies,
}: {
  currencies: {
    docs: any[]
  }
}) {
  const [currenciesItem, setCurrenciesItem] = useState<any[]>([])

  useEffect(() => {
    console.log('TableCurrenciesRates received currencies:', currencies)

    if (!currencies || !currencies.docs || currencies.docs.length === 0) {
      console.warn('No currencies data received')
      setCurrenciesItem([])
      return
    }

    // Логуємо структуру даних для діагностики
    currencies.docs.forEach((currency: any) => {
      console.log(`Currency ${currency.code}:`, {
        id: currency.id,
        name: currency.name,
        baseRates: currency.baseRates,
        hasBaseRates: !!currency.baseRates,
      })
    })

    // Сортуємо валюти: UAN (гривня) остання
    const sortedCurrencies = [...currencies.docs].sort((a, b) => {
      const aIsUAN = a.code === 'UAN' || a.name?.toLowerCase().includes('гривн')
      const bIsUAN = b.code === 'UAN' || b.name?.toLowerCase().includes('гривн')

      if (aIsUAN && !bIsUAN) return 1 // UAN йде в кінець
      if (!aIsUAN && bIsUAN) return -1 // UAN йде в кінець
      return 0 // Інші залишаються на місці
    })

    console.log('Sorted currencies:', sortedCurrencies)
    setCurrenciesItem(sortedCurrencies)
  }, [currencies])

  if (currenciesItem.length === 0) {
    return (
      <div style={{ padding: '1rem' }}>
        Валюти не знайдено або дані ще завантажуються.
        <br />
        Перевірте консоль браузера для деталей.
      </div>
    )
  }

  return (
    <>
      <div className={s.table_container} id={'sl_rates-table-container'}>
        <div className={s.table_header}>
          <div className={s.header_cell}>Валюта</div>
          <div className={s.header_cell}>
            <div className={s.header_group}>
              <div className={s.header_group_title}>Від 1000</div>
              <div className={s.header_group_sub}>
                <div className={s.header_sub_cell}>Купівля</div>
                <div className={s.header_sub_cell}>Продаж</div>
              </div>
            </div>
          </div>
          <div className={s.header_cell}>
            <div className={s.header_group}>
              <div className={s.header_group_title}>Від 5000</div>
              <div className={s.header_group_sub}>
                <div className={s.header_sub_cell}>Купівля</div>
                <div className={s.header_sub_cell}>Продаж</div>
              </div>
            </div>
          </div>
          <div className={s.header_cell}>Доступні пари</div>
        </div>
        <div className={s.table_body}>
          {currenciesItem.map((currency: any, index: number) => (
            <TableLineRates
              key={`table-rates-${index}`}
              currency={currency}
              allCurrencies={currenciesItem}
            />
          ))}
        </div>
      </div>

      <BtnSaveRates />
    </>
  )
}
