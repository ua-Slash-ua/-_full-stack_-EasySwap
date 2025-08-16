'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import s from './SelectCurrencies.module.css'

type CurrencyIcon = {
  url: string
  alt: string
}

type Currency = {
  code: string
  icon: CurrencyIcon
}

type RateItem = {
  currency: Currency
  from_1000?: {
    sell1000?: number
  }
}

type SelectCurrenciesProps = {
  currency: (Currency | RateItem)[]
  changeCurrCode: Function | null
  changeCurrCount: Function | null
}

export default function SelectCurrencies({
                                           currency,
                                           changeCurrCode,
                                           changeCurrCount
                                         }: SelectCurrenciesProps) {
  const defaultCurrency: Currency = {
    code: 'UAN',
    icon: { url: '/api/media/file/Vector%20(10).svg', alt: 'USD' }
  }

  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(() => {
    if (changeCurrCode) {
      const found = currency.find(c => {
        const code = (c as RateItem).currency?.code ?? (c as Currency).code
        return code?.trim() === 'UAN'
      })
      return (found as RateItem)?.currency ?? (found as Currency) ?? defaultCurrency
    } else {
      const first = currency[0]
      return (first as RateItem)?.currency ?? (first as Currency) ?? defaultCurrency
    }
  })
  useEffect(() => {
    if (!changeCurrCount || currency.length === 0) return

    const rateItem = currency.find(c => {
      const code = (c as RateItem).currency?.code ?? (c as Currency).code
      return code?.trim() === selectedCurrency.code.trim()
    }) as RateItem | undefined

    const sellRate = rateItem?.from_1000?.sell1000 ?? 0
    changeCurrCount(sellRate)
  }, [selectedCurrency, currency, changeCurrCount])
  useEffect(() => {
    if (!Array.isArray(currency) || currency.length === 0) return

    const found = currency.find(c => {
      const code = (c as RateItem).currency?.code ?? (c as Currency).code
      return code?.trim() === selectedCurrency.code.trim()
    })

    const updated = (found as RateItem)?.currency ?? (found as Currency)
    if (updated) {
      setSelectedCurrency(updated)
    }
  }, [currency])


  const [active, setActive] = useState(false)

  const handleSelect = (item: Currency | RateItem) => {
    const curr = (item as RateItem).currency ?? (item as Currency)
    const code = curr.code.trim()

    setSelectedCurrency(curr)
    setActive(false)
    changeCurrCode?.(code)

    const rateItem = currency.find(c => {
      const cCode = (c as RateItem).currency?.code ?? (c as Currency).code
      return cCode.trim() === code
    }) as RateItem | undefined

    const sellRate = rateItem?.from_1000?.sell1000 ?? 0
    changeCurrCount?.(sellRate)
  }

  return (
    <div className={s.select_container}>
      <div className={s.select} onClick={() => setActive(!active)}>
        <div className={s.info}>
          <div className={s.icon_back}>
            <Image
              src={selectedCurrency.icon.url}
              alt={selectedCurrency.icon.alt}
              width={24}
              height={12}
            />
          </div>
          <span>{selectedCurrency.code.trim()}</span>
        </div>
        <svg
          className={`${s.btn_arrow} ${active ? s.rotate : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 12"
          fill="none"
        >
          <g clipPath="url(#clip0_767_2997)">
            <path
              d="M17.4178 2.45199L18.4778 3.51299L12.7008 9.29199C12.6082 9.38514 12.4982 9.45907 12.3769 9.50952C12.2557 9.55997 12.1256 9.58594 11.9943 9.58594C11.863 9.58594 11.733 9.55997 11.6117 9.50952C11.4905 9.45907 11.3804 9.38514 11.2878 9.29199L5.50781 3.51299L6.56781 2.45299L11.9928 7.87699L17.4178 2.45199Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_767_2997">
              <rect
                width="12"
                height="24"
                fill="white"
                transform="matrix(0 1 -1 0 24 0)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>

      {active && (
        <ul className={s.select_options}>
          {currency.length > 0 ? (
            currency.map((item, index) => {
              const curr = (item as RateItem).currency ?? (item as Currency)
              return (
                <li
                  key={curr.code.trim() + index}
                  onClick={() => handleSelect(item)}
                >
                  <div className={s.icon_back_reverse}>
                    <Image
                      src={curr.icon.url}
                      alt={curr.icon.alt}
                      width={24}
                      height={12}
                    />
                  </div>
                  <span>{curr.code.trim()}</span>
                </li>
              )
            })
          ) : (
            <p>Немає для обміну!</p>
          )}
        </ul>
      )}
    </div>
  )
}
